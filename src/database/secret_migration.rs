//! Stored-secret format checks and the offline v1/plaintext → v2 migration.
//!
//! Covers `backends.config` and the sensitive `system_settings` values
//! (`api::admin::system_settings::is_sensitive_setting`). The server only reads
//! v2 ([`Encryptor::decrypt`]); [`find_legacy_secrets`] makes startup abort
//! while any legacy row remains, and [`migrate_secrets`] (the
//! `one-router migrate-secrets` CLI) rewrites them. Output never contains
//! secret values — only backend names / setting keys and formats.

use std::sync::Arc;

use anyhow::Result;

use super::encryption::{backend_context, setting_context, Encryptor, SecretFormat};
use super::models::{BackendRecord, SystemSettingRecord};
use super::traits::DatabaseService;

/// Which table a stored secret lives in.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SecretKind {
    Backend,
    Setting,
}

impl SecretKind {
    pub fn label(self) -> &'static str {
        match self {
            Self::Backend => "backend",
            Self::Setting => "setting",
        }
    }
}

/// A stored secret row (identity + current format; never the value).
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SecretRow {
    pub kind: SecretKind,
    /// Backend name or setting key.
    pub id: String,
    pub format: SecretFormat,
}

impl std::fmt::Display for SecretRow {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{} {} ({})",
            self.kind.label(),
            self.id,
            self.format.label()
        )
    }
}

fn context(kind: SecretKind, id: &str) -> String {
    match kind {
        SecretKind::Backend => backend_context(id),
        SecretKind::Setting => setting_context(id),
    }
}

/// Every non-empty stored secret: (row, stored value).
async fn list_secrets(db: &Arc<dyn DatabaseService>) -> Result<Vec<(SecretRow, String)>> {
    let mut out = Vec::new();
    for b in db.backends().list_all_backends().await? {
        let format = SecretFormat::of(&b.config);
        if format != SecretFormat::Empty {
            out.push((
                SecretRow {
                    kind: SecretKind::Backend,
                    id: b.name,
                    format,
                },
                b.config,
            ));
        }
    }
    for s in db.system_settings().list_settings().await? {
        if !crate::api::admin::system_settings::is_sensitive_setting(&s.key, &s.ui_schema) {
            continue;
        }
        let format = SecretFormat::of(&s.value);
        if format != SecretFormat::Empty {
            out.push((
                SecretRow {
                    kind: SecretKind::Setting,
                    id: s.key,
                    format,
                },
                s.value,
            ));
        }
    }
    Ok(out)
}

/// Stored secrets that are not v2 (plaintext / legacy v1). Startup refuses to
/// run while this is non-empty.
pub async fn find_legacy_secrets(db: &Arc<dyn DatabaseService>) -> Result<Vec<SecretRow>> {
    Ok(list_secrets(db)
        .await?
        .into_iter()
        .filter_map(|(row, _)| row.format.is_legacy().then_some(row))
        .collect())
}

/// Stored secrets the runtime cannot read: legacy formats plus v2 values that
/// fail to decrypt (wrong key / copied between rows). Reported by
/// `GET /admin/api/status`; such rows are skipped on config load.
pub async fn find_unreadable_secrets(
    db: &Arc<dyn DatabaseService>,
    encryptor: &Encryptor,
) -> Result<Vec<SecretRow>> {
    Ok(list_secrets(db)
        .await?
        .into_iter()
        .filter(|(row, value)| {
            encryptor
                .decrypt(value, &context(row.kind, &row.id))
                .is_err()
        })
        .map(|(row, _)| row)
        .collect())
}

/// Error message for startup when legacy rows remain.
pub fn startup_abort_message(rows: &[SecretRow]) -> String {
    let list = rows
        .iter()
        .map(|r| format!("  - {r}"))
        .collect::<Vec<_>>()
        .join("\n");
    format!(
        "{} stored secret(s) are not in the v2 encryption format:\n{list}\n\
         The server only reads v2. Stop all one-router instances, back up the database, \
         then run `one-router migrate-secrets --dry-run` followed by \
         `one-router migrate-secrets`, and start again.",
        rows.len()
    )
}

/// Outcome of one row in [`migrate_secrets`].
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum RowOutcome {
    /// Re-encrypted as v2 (or would be, in a dry run).
    Migrated { from: SecretFormat },
    /// Already v2 and decrypts with the current key.
    Current,
    /// Could not be decrypted with the current key — left untouched.
    DecryptFailed,
    /// Write failed (or the row changed concurrently) — left untouched.
    WriteFailed,
}

#[derive(Debug, Default)]
pub struct MigrationReport {
    pub rows: Vec<(SecretKind, String, RowOutcome)>,
}

impl MigrationReport {
    fn count(&self, f: impl Fn(&RowOutcome) -> bool) -> usize {
        self.rows.iter().filter(|(_, _, o)| f(o)).count()
    }
    pub fn migrated(&self) -> usize {
        self.count(|o| matches!(o, RowOutcome::Migrated { .. }))
    }
    pub fn current(&self) -> usize {
        self.count(|o| matches!(o, RowOutcome::Current))
    }
    pub fn failed(&self) -> usize {
        self.count(|o| matches!(o, RowOutcome::DecryptFailed | RowOutcome::WriteFailed))
    }

    /// Per-row lines for the CLI (no secret values). Current rows are omitted.
    pub fn lines(&self, dry_run: bool) -> Vec<String> {
        let suffix = if dry_run { " (dry run)" } else { "" };
        self.rows
            .iter()
            .filter_map(|(kind, id, outcome)| {
                let what = match outcome {
                    RowOutcome::Migrated { from } => format!("{} → v2{suffix}", from.label()),
                    RowOutcome::Current => return None,
                    RowOutcome::DecryptFailed => "decrypt failed (skipped)".to_string(),
                    RowOutcome::WriteFailed => "write failed (skipped)".to_string(),
                };
                Some(format!("{} {id}: {what}", kind.label()))
            })
            .collect()
    }

    pub fn summary(&self, dry_run: bool) -> String {
        if self.migrated() == 0 && self.failed() == 0 {
            return format!(
                "Nothing to migrate ({} secret(s) already v2).",
                self.current()
            );
        }
        format!(
            "{} {} to v2, {} already v2, {} failed.",
            self.migrated(),
            if dry_run {
                "would be migrated"
            } else {
                "migrated"
            },
            self.current(),
            self.failed()
        )
    }
}

/// Re-encrypt every plaintext / v1 secret as v2. Each row is decrypted with
/// the legacy-capable reader, re-read right before the write and only
/// rewritten if unchanged. v2 rows are verified (decrypt) but never rewritten.
/// `dry_run` performs no writes. The caller must ensure a key is configured.
pub async fn migrate_secrets(
    db: &Arc<dyn DatabaseService>,
    encryptor: &Encryptor,
    dry_run: bool,
) -> Result<MigrationReport> {
    anyhow::ensure!(encryptor.is_enabled(), "ENCRYPTION_KEY is not configured");
    let mut report = MigrationReport::default();

    for (row, value) in list_secrets(db).await? {
        let ctx = context(row.kind, &row.id);
        let outcome = match encryptor.decrypt_legacy(&value, &ctx) {
            Err(_) => RowOutcome::DecryptFailed,
            Ok(_) if row.format == SecretFormat::V2 => RowOutcome::Current,
            Ok(_) if dry_run => RowOutcome::Migrated { from: row.format },
            Ok(plain) => {
                let new_value = encryptor.encrypt(&plain, &ctx);
                match write_if_unchanged(db, row.kind, &row.id, &value, new_value).await {
                    Ok(true) => RowOutcome::Migrated { from: row.format },
                    Ok(false) => RowOutcome::WriteFailed,
                    Err(e) => {
                        tracing::warn!(target = %row, error = %e, "Failed to write migrated secret");
                        RowOutcome::WriteFailed
                    }
                }
            }
        };
        report.rows.push((row.kind, row.id, outcome));
    }
    Ok(report)
}

async fn write_if_unchanged(
    db: &Arc<dyn DatabaseService>,
    kind: SecretKind,
    id: &str,
    old_value: &str,
    new_value: String,
) -> Result<bool> {
    match kind {
        SecretKind::Backend => match db.backends().get_backend(id).await? {
            Some(cur) if cur.config == old_value => {
                db.backends()
                    .upsert_backend(&BackendRecord {
                        config: new_value,
                        ..cur
                    })
                    .await?;
                Ok(true)
            }
            _ => Ok(false),
        },
        SecretKind::Setting => match db.system_settings().get_setting(id).await? {
            Some(cur) if cur.value == old_value => {
                db.system_settings()
                    .upsert_setting(&SystemSettingRecord {
                        value: new_value,
                        ..cur
                    })
                    .await?;
                Ok(true)
            }
            _ => Ok(false),
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::database::seed::SeedMode;

    fn backend(name: &str, config: String) -> BackendRecord {
        BackendRecord {
            name: name.into(),
            backend_type: "openai".into(),
            config,
            enabled: true,
            priority: 0,
            weight: 1,
            strategy: "round_robin".into(),
            max_failures: 3,
            retry_after_secs: 300,
            service_tier: None,
            models: None,
            created_at: 0,
            updated_at: None,
        }
    }

    async fn setting(db: &Arc<dyn DatabaseService>, key: &str, value: &str) {
        db.system_settings()
            .upsert_setting(&SystemSettingRecord {
                key: key.into(),
                value: value.into(),
                description: String::new(),
                ui_schema: None,
                updated_at: None,
            })
            .await
            .unwrap();
    }

    async fn db() -> (tempfile::TempDir, Arc<dyn DatabaseService>) {
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("t.db");
        let sqlite = crate::database::sqlite::SqliteBackend::new(path.to_str().unwrap())
            .await
            .unwrap();
        sqlite.initialize(None, SeedMode::Off).await.unwrap();
        (dir, Arc::new(sqlite))
    }

    async fn snapshot(db: &Arc<dyn DatabaseService>) -> Vec<String> {
        let mut v: Vec<String> = db
            .backends()
            .list_all_backends()
            .await
            .unwrap()
            .into_iter()
            .map(|b| format!("{}={}", b.name, b.config))
            .collect();
        v.extend(
            db.system_settings()
                .list_settings()
                .await
                .unwrap()
                .into_iter()
                .map(|s| format!("{}={}", s.key, s.value)),
        );
        v.sort();
        v
    }

    const PLAIN_CFG: &str = r#"{"api_keys":["sk-plain"]}"#;

    /// plaintext + v1 + v2 + wrong-key backends, plaintext sensitive setting,
    /// empty sensitive setting, non-sensitive setting.
    async fn seed(db: &Arc<dyn DatabaseService>, enc: &Encryptor) -> String {
        let other = Encryptor::new(Some("other-key"));
        let v2 = enc.encrypt(r#"{"api_keys":["sk-new"]}"#, &backend_context("fresh"));
        for (name, cfg) in [
            ("plain", PLAIN_CFG.to_string()),
            (
                "old",
                enc.encrypt_v1_for_tests(r#"{"api_keys":["sk-old"]}"#),
            ),
            ("fresh", v2.clone()),
            (
                "foreign",
                other.encrypt(r#"{"api_keys":["sk-x"]}"#, &backend_context("foreign")),
            ),
        ] {
            db.backends()
                .upsert_backend(&backend(name, cfg))
                .await
                .unwrap();
        }
        setting(db, "web_search_api_key", "tvly-plain").await;
        setting(db, "budget_alert_webhook_url", "").await;
        setting(db, "rate_limit", "100").await;
        v2
    }

    #[tokio::test]
    async fn detects_legacy_and_unreadable_rows() {
        let (_d, db) = db().await;
        let enc = Encryptor::new(Some("k"));
        seed(&db, &enc).await;

        let legacy = find_legacy_secrets(&db).await.unwrap();
        let ids: Vec<_> = legacy.iter().map(|r| r.id.as_str()).collect();
        assert_eq!(ids.len(), 3, "{ids:?}");
        for id in ["plain", "old", "web_search_api_key"] {
            assert!(ids.contains(&id), "{ids:?}");
        }
        let msg = startup_abort_message(&legacy);
        assert!(msg.contains("backend old (v1)"), "{msg}");
        assert!(msg.contains("setting web_search_api_key (plaintext)"));
        assert!(msg.contains("migrate-secrets --dry-run"));
        assert!(!msg.contains("tvly-plain") && !msg.contains("sk-plain"));

        // Unreadable = legacy + the wrong-key v2 row.
        let unreadable = find_unreadable_secrets(&db, &enc).await.unwrap();
        assert_eq!(unreadable.len(), 4);
        assert!(unreadable.iter().any(|r| r.id == "foreign"));
    }

    #[tokio::test]
    async fn dry_run_writes_nothing() {
        let (_d, db) = db().await;
        let enc = Encryptor::new(Some("k"));
        seed(&db, &enc).await;
        let before = snapshot(&db).await;

        let report = migrate_secrets(&db, &enc, true).await.unwrap();
        assert_eq!(report.migrated(), 3);
        assert_eq!(report.current(), 1);
        assert_eq!(report.failed(), 1);
        assert!(report
            .lines(true)
            .contains(&"backend old: v1 → v2 (dry run)".to_string()));
        assert_eq!(snapshot(&db).await, before);
    }

    #[tokio::test]
    async fn migrates_plaintext_and_v1_and_is_idempotent() {
        let (_d, db) = db().await;
        let enc = Encryptor::new(Some("k"));
        let v2 = seed(&db, &enc).await;

        let report = migrate_secrets(&db, &enc, false).await.unwrap();
        let lines = report.lines(false);
        assert!(lines.contains(&"backend plain: plaintext → v2".to_string()));
        assert!(lines.contains(&"backend old: v1 → v2".to_string()));
        assert!(lines.contains(&"setting web_search_api_key: plaintext → v2".to_string()));
        assert!(lines.contains(&"backend foreign: decrypt failed (skipped)".to_string()));
        assert_eq!(lines.len(), 4, "{lines:?}");
        assert!(lines
            .iter()
            .all(|l| !l.contains("sk-") && !l.contains("tvly")));
        assert_eq!(
            (report.migrated(), report.current(), report.failed()),
            (3, 1, 1)
        );

        // Runtime (strict) reader now accepts them.
        let plain = db.backends().get_backend("plain").await.unwrap().unwrap();
        assert_eq!(
            enc.decrypt(&plain.config, &backend_context("plain"))
                .unwrap(),
            PLAIN_CFG
        );
        let old = db.backends().get_backend("old").await.unwrap().unwrap();
        assert_eq!(
            enc.decrypt(&old.config, &backend_context("old")).unwrap(),
            r#"{"api_keys":["sk-old"]}"#
        );
        let s = db
            .system_settings()
            .get_setting("web_search_api_key")
            .await
            .unwrap()
            .unwrap();
        assert_eq!(
            enc.decrypt(&s.value, &setting_context("web_search_api_key"))
                .unwrap(),
            "tvly-plain"
        );
        // v2 row untouched; empty + non-sensitive settings untouched.
        let fresh = db.backends().get_backend("fresh").await.unwrap().unwrap();
        assert_eq!(fresh.config, v2);
        let rl = db
            .system_settings()
            .get_setting("rate_limit")
            .await
            .unwrap()
            .unwrap();
        assert_eq!(rl.value, "100");
        let wh = db
            .system_settings()
            .get_setting("budget_alert_webhook_url")
            .await
            .unwrap()
            .unwrap();
        assert_eq!(wh.value, "");

        assert!(find_legacy_secrets(&db).await.unwrap().is_empty());

        // Idempotent: second run migrates nothing (the wrong-key row still fails).
        let again = migrate_secrets(&db, &enc, false).await.unwrap();
        assert_eq!(
            (again.migrated(), again.current(), again.failed()),
            (0, 4, 1)
        );

        // Once the foreign row is gone: "nothing to migrate".
        db.backends().delete_backend("foreign").await.unwrap();
        let clean = migrate_secrets(&db, &enc, false).await.unwrap();
        assert_eq!(clean.failed(), 0);
        assert!(clean.summary(false).starts_with("Nothing to migrate"));
    }

    #[tokio::test]
    async fn refuses_without_key() {
        let (_d, db) = db().await;
        assert!(migrate_secrets(&db, &Encryptor::new(None), true)
            .await
            .is_err());
    }

    /// Bytes of the database file and its WAL (the `-shm` index is
    /// bookkeeping that readers may touch).
    fn file_state(path: &std::path::Path) -> Vec<(String, Vec<u8>)> {
        let mut out = Vec::new();
        for suffix in ["", "-wal"] {
            let p = format!("{}{suffix}", path.display());
            if let Ok(bytes) = std::fs::read(&p) {
                out.push((suffix.to_string(), bytes));
            }
        }
        out
    }

    #[tokio::test]
    async fn dry_run_on_read_only_open_changes_no_bytes() {
        use crate::database::{open_existing_database, OpenMode};
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("t.db");
        let enc = Encryptor::new(Some("k"));
        {
            let sqlite = crate::database::sqlite::SqliteBackend::new(path.to_str().unwrap())
                .await
                .unwrap();
            sqlite.initialize(None, SeedMode::Off).await.unwrap();
            let db: Arc<dyn DatabaseService> = Arc::new(sqlite);
            seed(&db, &enc).await;
        }
        // Writer fully closed so its files are settled.
        let w = crate::database::sqlite::SqliteBackend::new(path.to_str().unwrap())
            .await
            .unwrap();
        w.close().await;
        let before = file_state(&path);

        let uri = format!("sqlite://{}", path.display());
        let db = open_existing_database(&uri, OpenMode::ReadOnly)
            .await
            .unwrap();
        let report = migrate_secrets(&db, &enc, true).await.unwrap();
        assert_eq!(
            (report.migrated(), report.current(), report.failed()),
            (3, 1, 1)
        );
        // The read-only connection refuses writes outright.
        assert!(db
            .backends()
            .upsert_backend(&backend("x", String::new()))
            .await
            .is_err());
        drop(db);
        assert_eq!(file_state(&path), before);
    }

    #[tokio::test]
    async fn dry_run_does_not_upgrade_an_old_schema() {
        use crate::database::{open_existing_database, OpenMode};
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("old.db");
        // A pre-current schema: `backends` without the newer columns.
        {
            let opts = sqlx::sqlite::SqliteConnectOptions::new()
                .filename(&path)
                .create_if_missing(true);
            let pool = sqlx::SqlitePool::connect_with(opts).await.unwrap();
            sqlx::query("CREATE TABLE backends (name TEXT PRIMARY KEY, config TEXT)")
                .execute(&pool)
                .await
                .unwrap();
            pool.close().await;
        }
        let before = file_state(&path);
        let uri = format!("sqlite://{}", path.display());
        let db = open_existing_database(&uri, OpenMode::ReadOnly)
            .await
            .unwrap();
        // Reading fails (no initialize ran) instead of silently migrating.
        assert!(migrate_secrets(&db, &Encryptor::new(Some("k")), true)
            .await
            .is_err());
        drop(db);
        assert_eq!(file_state(&path), before);
    }

    #[tokio::test]
    async fn missing_sqlite_file_is_an_error_and_not_created() {
        use crate::database::{open_existing_database, OpenMode};
        let dir = tempfile::tempdir().unwrap();
        let path = dir.path().join("sub").join("missing.db");
        let uri = format!("sqlite://{}", path.display());
        for mode in [OpenMode::ReadOnly, OpenMode::ReadWrite] {
            let err = open_existing_database(&uri, mode)
                .await
                .err()
                .expect("missing file must fail");
            assert!(err.to_string().contains("not found"), "{err}");
        }
        assert!(!path.exists());
        assert!(!path.parent().unwrap().exists());
    }
}
