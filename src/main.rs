//! One Router
//!
//! A high-performance API gateway with pluggable storage backends.

use anyhow::Result;
use one_router::{config::Settings, server::App};
use tracing_subscriber::{fmt, layer::SubscriberExt, util::SubscriberInitExt, Layer};

#[tokio::main]
async fn main() -> Result<()> {
    // Load configuration from environment
    let mut settings = Settings::load()?;

    // Initialize tracing
    init_tracing(&settings.log_level);

    // Generate ephemeral API key for dev convenience
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

    // Build and run the application
    let app = App::new(settings).await?;
    app.run_with_graceful_shutdown().await?;

    tracing::info!("Application shutdown complete");
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
