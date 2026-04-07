//! One Router
//!
//! A high-performance API gateway with pluggable storage backends.

use anyhow::Result;
use clap::{Parser, Subcommand};
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

    /// Master API key for admin access (overrides MASTER_API_KEY env var)
    #[arg(long)]
    master_api_key: Option<String>,

    /// Encryption key for credential storage (overrides ENCRYPTION_KEY env var)
    #[arg(long)]
    encryption_key: Option<String>,

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
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Some(Command::Update { check }) => run_update(check).await,
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
        cli.master_api_key,
        cli.encryption_key,
    );
    init_tracing(&settings.log_level);

    let ephemeral_key = settings.generate_ephemeral_key();

    println!("\n{}", "=".repeat(60));
    println!("  One Router v{}", settings.app_version);
    println!("{}", "=".repeat(60));
    println!("  Database:  {}", settings.database);
    println!("  Listen:    {}:{}", settings.host, settings.port);
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
    println!("{}\n", "=".repeat(60));

    tracing::info!(
        version = %settings.app_version,
        host = %settings.host,
        port = %settings.port,
        database = %settings.database,
        "Starting One Router"
    );

    let app = App::new(settings).await?;
    app.run_with_graceful_shutdown().await?;

    tracing::info!("Application shutdown complete");
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
    let filter = tracing_subscriber::EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new(log_level));

    tracing_subscriber::registry()
        .with(fmt::layer().json().with_filter(filter))
        .init();
}
