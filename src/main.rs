//! One Router
//!
//! A high-performance API gateway with pluggable storage backends.

use anyhow::Result;
use clap::{Parser, Subcommand, ValueEnum};
use one_router::{config::Settings, server::App};
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, Layer};

#[derive(Parser)]
#[command(name = "one-router", version = env!("CARGO_PKG_VERSION"))]
struct Cli {
    /// Database connection string (overrides DATABASE env var)
    #[arg(long, short = 'd')]
    database: Option<String>,

    /// HTTP listen port (overrides PORT env var)
    #[arg(long, short = 'p')]
    port: Option<u16>,

    /// HTTP bind host (overrides HOST env var)
    #[arg(long)]
    host: Option<String>,

    /// Log level (overrides LOG_LEVEL env var)
    #[arg(long, short = 'l')]
    log_level: Option<String>,

    /// Maximum HTTP request body size in MB (overrides MAX_BODY_SIZE_MB env var,
    /// default 64)
    #[arg(long, value_name = "MB")]
    max_body_size_mb: Option<u64>,

    /// Master API key for admin access (overrides MASTER_API_KEY env var)
    #[arg(long)]
    master_api_key: Option<String>,

    /// Encryption key for credential storage (overrides ENCRYPTION_KEY env var)
    #[arg(long)]
    encryption_key: Option<String>,

    /// When to seed default model mappings on startup: off, empty (default,
    /// first run only), or missing (legacy: re-insert deleted defaults)
    /// (overrides SEED_DEFAULTS env var)
    #[arg(long, value_name = "MODE")]
    seed_defaults: Option<one_router::database::seed::SeedMode>,

    #[command(subcommand)]
    command: Option<Command>,
}

#[derive(Subcommand)]
enum Command {
    /// Check for updates and optionally apply
    Update {
        /// Only check for updates, don't download or apply
        #[arg(long)]
        check: bool,
    },
    /// Generate a new master key: print it once, store only its SHA-256 in .env
    ResetMasterKey {
        /// Print only; do not modify .env
        #[arg(long)]
        no_write: bool,
    },
    /// Read a key from stdin and print its `sha256:<hex>` form (for MASTER_API_KEY)
    HashKey,
    /// Wrap the current ENCRYPTION_KEY with a key provider and print the new value
    WrapKey {
        #[arg(long, value_enum)]
        provider: WrapProvider,
        /// aws-kms: key id / ARN / alias. vault-transit: transit key name.
        /// systemd-creds: credential name (default `one-router-encryption-key`)
        #[arg(long)]
        key: Option<String>,
        /// aws-kms: region (default: from the key ARN, else AWS_REGION)
        #[arg(long)]
        region: Option<String>,
        /// systemd-creds: encrypted credential output path
        /// (default /etc/credstore.encrypted/<name>)
        #[arg(long)]
        output: Option<std::path::PathBuf>,
        /// Print only; do not modify .env
        #[arg(long)]
        no_write: bool,
    },
}

#[derive(Clone, Copy, ValueEnum)]
enum WrapProvider {
    AwsKms,
    VaultTransit,
    SystemdCreds,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Some(Command::Update { check }) => run_update(check).await,
        Some(Command::ResetMasterKey { no_write }) => run_reset_master_key(no_write),
        Some(Command::HashKey) => run_hash_key(),
        Some(Command::WrapKey {
            provider,
            key,
            region,
            output,
            no_write,
        }) => run_wrap_key(cli.encryption_key, provider, key, region, output, no_write).await,
        None => run_server(cli).await,
    }
}

/// Run the main HTTP server (default behavior).
async fn run_server(cli: Cli) -> Result<()> {
    let mut settings = Settings::load()?;
    settings.apply_overrides(
        cli.database,
        cli.port,
        cli.host,
        cli.log_level,
        cli.max_body_size_mb,
        cli.master_api_key,
        cli.encryption_key,
        cli.seed_defaults,
    );
    // After CLI overrides, so flag-provided keys are never auto-generated.
    settings.ensure_required_keys()?;
    init_tracing(&settings.log_level);
    settings.migrate_master_key();
    settings.resolve_encryption_key().await?;
    let database_display = one_router::config::settings::redact_database_uri(&settings.database);

    println!("\n{}", "=".repeat(60));
    println!("  One Router v{}", settings.app_version);
    println!("{}", "=".repeat(60));
    println!("  Database:  {database_display}");
    println!("  Listen:    {}:{}", settings.host, settings.port);
    println!("  Max body:  {} MB", settings.max_body_size_mb);

    if cfg!(debug_assertions) {
        let ephemeral_key = settings.generate_ephemeral_key();
        println!();
        println!("  Ephemeral API Key (valid for this session only):");
        println!("  {ephemeral_key}");
        println!();
        println!("  Usage:");
        println!("    export ANTHROPIC_API_KEY=\"{ephemeral_key}\"");
        println!(
            "    export ANTHROPIC_BASE_URL=\"http://{}:{}\"",
            settings.host, settings.port
        );
    }

    println!("{}\n", "=".repeat(60));

    tracing::info!(
        version = %settings.app_version,
        host = %settings.host,
        port = %settings.port,
        database = %database_display,
        "Starting One Router"
    );

    let app = App::new(settings).await?;
    app.run_with_graceful_shutdown().await?;

    tracing::info!("Application shutdown complete");
    Ok(())
}

const DOTENV: &str = one_router::config::dotenv_file::DOTENV_PATH;

/// `reset-master-key`: new key, shown once; only the hash is persisted.
fn run_reset_master_key(no_write: bool) -> Result<()> {
    use one_router::config::{dotenv_file, master_key};
    let key = master_key::generate();
    let hashed = master_key::hash(&key);
    println!("New master key (shown once — store it now):\n\n  {key}\n");
    println!("Configured value:\n\n  MASTER_API_KEY={hashed}\n");
    if !no_write {
        dotenv_file::upsert(
            std::path::Path::new(DOTENV),
            "MASTER_API_KEY",
            &hashed,
            &["Master key stored as its SHA-256 (one-router reset-master-key)."],
        )?;
        println!("Saved to {DOTENV}. Restart one-router to apply.");
    }
    // `.env` never overrides a real environment variable.
    if std::env::var("MASTER_API_KEY").is_ok_and(|v| !v.is_empty()) {
        println!(
            "Note: MASTER_API_KEY is also set in the process environment, which takes \
             precedence over .env — update it there to the value above."
        );
    }
    Ok(())
}

/// `hash-key`: stdin → `sha256:<hex>`.
fn run_hash_key() -> Result<()> {
    use std::io::{BufRead, IsTerminal};
    if std::io::stdin().is_terminal() {
        eprint!("Key (input is echoed): ");
    }
    let mut line = String::new();
    std::io::stdin().lock().read_line(&mut line)?;
    let key = line.trim_end_matches(['\n', '\r']);
    if key.is_empty() {
        anyhow::bail!("no key on stdin");
    }
    if !one_router::config::master_key::is_strong(key) {
        eprintln!(
            "Warning: this key is weak (short or a well-known value); an unsalted hash of it \
             can be brute-forced. Prefer `one-router reset-master-key`."
        );
    }
    println!("{}", one_router::config::master_key::hash(key));
    Ok(())
}

/// `wrap-key`: wrap the effective ENCRYPTION_KEY with a provider.
async fn run_wrap_key(
    cli_encryption_key: Option<String>,
    provider: WrapProvider,
    key: Option<String>,
    region: Option<String>,
    output: Option<std::path::PathBuf>,
    no_write: bool,
) -> Result<()> {
    use one_router::config::{dotenv_file, key_provider};
    let mut settings = Settings::load()?;
    if let Some(v) = cli_encryption_key {
        settings.encryption_key = Some(v);
    }
    let original = settings
        .encryption_key
        .clone()
        .ok_or_else(|| anyhow::anyhow!("ENCRYPTION_KEY is not set"))?;
    let (plain, source) = key_provider::resolve(&original)
        .await
        .map_err(|e| anyhow::anyhow!("current ENCRYPTION_KEY: {e}"))?;
    eprintln!("Current ENCRYPTION_KEY source: {}", source.label());

    let new_value = match provider {
        WrapProvider::AwsKms => {
            let key_id =
                key.ok_or_else(|| anyhow::anyhow!("--key <KMS key id/ARN/alias> is required"))?;
            let region = region
                .or_else(|| key_provider::region_from_key_arn(&key_id))
                .or_else(|| std::env::var("AWS_REGION").ok())
                .or_else(|| std::env::var("AWS_DEFAULT_REGION").ok())
                .ok_or_else(|| {
                    anyhow::anyhow!("--region is required (not derivable from --key)")
                })?;
            key_provider::wrap(&key_provider::WrapTarget::AwsKms { key_id, region }, &plain)
                .await
                .map_err(|e| anyhow::anyhow!(e))?
        }
        WrapProvider::VaultTransit => {
            let key = key.ok_or_else(|| anyhow::anyhow!("--key <transit key name> is required"))?;
            key_provider::wrap(&key_provider::WrapTarget::VaultTransit { key }, &plain)
                .await
                .map_err(|e| anyhow::anyhow!(e))?
        }
        WrapProvider::SystemdCreds => {
            let name = key.unwrap_or_else(|| "one-router-encryption-key".to_string());
            let new_value = format!("systemd-creds:{name}");
            key_provider::KeySource::parse(&new_value).map_err(|e| anyhow::anyhow!(e))?;
            let output = output
                .unwrap_or_else(|| std::path::Path::new("/etc/credstore.encrypted").join(&name));
            systemd_encrypt(&name, &output, &plain)?;
            println!("Encrypted credential written to {}.", output.display());
            println!("Add to the one-router systemd unit:\n");
            println!("  [Service]");
            println!("  LoadCredentialEncrypted={name}:{}", output.display());
            println!("  Environment=ENCRYPTION_KEY={new_value}\n");
            new_value
        }
    };

    println!("New value:\n\n  ENCRYPTION_KEY={new_value}\n");
    let path = std::path::Path::new(DOTENV);
    if !no_write
        && dotenv_file::read_value(path, "ENCRYPTION_KEY").as_deref() == Some(original.as_str())
    {
        dotenv_file::upsert(
            path,
            "ENCRYPTION_KEY",
            &new_value,
            &[&format!(
                "Wrapped with {} (one-router wrap-key).",
                source_label(provider)
            )],
        )?;
        println!("Updated {DOTENV}. The plaintext key is no longer stored there.");
    } else {
        println!(
            "ENCRYPTION_KEY is not taken from {DOTENV} (or --no-write): set the value above \
             where it is configured."
        );
    }
    if std::env::var("ENCRYPTION_KEY").is_ok_and(|v| !v.is_empty() && v != new_value) {
        println!(
            "Note: ENCRYPTION_KEY is set in the process environment, which takes precedence \
             over .env — update it there."
        );
    }
    Ok(())
}

fn source_label(p: WrapProvider) -> &'static str {
    match p {
        WrapProvider::AwsKms => "aws-kms",
        WrapProvider::VaultTransit => "vault-transit",
        WrapProvider::SystemdCreds => "systemd-creds",
    }
}

/// `systemd-creds encrypt --with-key=tpm2` with the key on stdin, then a
/// decrypt round trip to verify.
fn systemd_encrypt(name: &str, output: &std::path::Path, plain: &str) -> Result<()> {
    use std::io::Write;
    use std::process::{Command as Proc, Stdio};
    let run = |args: &[&str], input: &str| -> Result<Vec<u8>> {
        let mut child = Proc::new("systemd-creds")
            .args(args)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .stderr(Stdio::inherit())
            .spawn()
            .map_err(|e| {
                anyhow::anyhow!("running systemd-creds: {e} (Linux with systemd ≥ 250 required)")
            })?;
        child
            .stdin
            .take()
            .expect("piped stdin")
            .write_all(input.as_bytes())?;
        let out = child.wait_with_output()?;
        if !out.status.success() {
            anyhow::bail!("systemd-creds {} failed ({})", args[0], out.status);
        }
        Ok(out.stdout)
    };
    let out = output.to_string_lossy();
    run(
        &[
            "encrypt",
            "--with-key=tpm2",
            &format!("--name={name}"),
            "-",
            &out,
        ],
        plain,
    )?;
    let back = run(&["decrypt", &format!("--name={name}"), &out, "-"], "")?;
    if String::from_utf8_lossy(&back).trim_end_matches(['\n', '\r']) != plain {
        anyhow::bail!("systemd-creds round trip did not return the original key");
    }
    Ok(())
}

/// Run the CLI update subcommand (no HTTP server).
async fn run_update(check_only: bool) -> Result<()> {
    // Minimal tracing for CLI mode
    let filter = tracing_subscriber::EnvFilter::new("warn");
    tracing_subscriber::registry()
        .with(
            fmt::layer()
                .with_target(false)
                .without_time()
                .with_filter(filter),
        )
        .init();

    let update_svc = one_router::services::UpdateService::new();
    let current = env!("CARGO_PKG_VERSION");

    println!("One Router v{current}");
    println!("Checking for updates...\n");

    let info = update_svc.check_latest().await?;

    if let Some(ref latest) = info.latest_version {
        if info.update_available {
            println!("  New version available: v{latest} (current: v{current})");
            if let Some(ref notes) = info.release_notes {
                let summary: String = notes.lines().take(5).collect::<Vec<_>>().join("\n");
                println!("\n  Release notes:\n  {summary}");
            }
        } else {
            println!("  Already up to date (v{current}).");
            return Ok(());
        }
    } else {
        println!("  Could not determine latest version.");
        return Ok(());
    }

    if check_only {
        return Ok(());
    }

    println!("\n  Downloading and applying update...");
    update_svc.download_and_apply().await?;
    println!("\n  Update applied! Restart one-router to activate the new version.");

    Ok(())
}

/// Initialize tracing subscriber
fn init_tracing(log_level: &str) {
    // The level applies to this crate and generic deps, but the AWS signing /
    // SDK internals are capped: at trace, aws-sigv4 logs the canonical request,
    // which includes the x-amz-security-token value.
    let directives = format!(
        "{log_level},aws_sigv4=warn,aws_smithy_runtime=warn,aws_smithy_runtime_api=warn,\
         aws_config=warn,aws_credential_types=warn,hyper=info,reqwest=info,h2=info"
    );
    let filter = tracing_subscriber::EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new(directives));

    tracing_subscriber::registry()
        .with(fmt::layer().json().with_filter(filter))
        .init();
}
