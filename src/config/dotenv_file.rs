//! Minimal, careful `.env` editing for key migrations.
//!
//! Only used to replace a single `KEY=value` line (master-key hashing,
//! encryption-key wrapping). The file is rewritten atomically (temp file in the
//! same directory + rename) with mode `0600`; every other line, including
//! comments, is preserved verbatim.

use std::io::Write;
use std::path::Path;

/// Default `.env` location (the only one `Settings::load` reads).
pub const DOTENV_PATH: &str = ".env";

/// The value `key` has in the `.env` file at `path`, if the file parses and
/// defines it.
pub fn read_value(path: &Path, key: &str) -> Option<String> {
    let iter = dotenvy::from_path_iter(path).ok()?;
    let mut found = None;
    for item in iter.flatten() {
        if item.0 == key {
            found = Some(item.1);
        }
    }
    found
}

fn defines(line: &str, key: &str) -> bool {
    let t = line.trim_start();
    let t = t.strip_prefix("export ").unwrap_or(t).trim_start();
    t.strip_prefix(key)
        .is_some_and(|rest| rest.trim_start().starts_with('='))
}

/// Replace the first definition of `key` with `key=value` (preceded by
/// `comment` lines), drop any later duplicates, or append when absent.
pub fn upsert(path: &Path, key: &str, value: &str, comment: &[&str]) -> std::io::Result<()> {
    let existing = match std::fs::read_to_string(path) {
        Ok(s) => s,
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => String::new(),
        Err(e) => return Err(e),
    };
    let mut out: Vec<String> = Vec::new();
    let mut replaced = false;
    for line in existing.lines() {
        if defines(line, key) {
            if !replaced {
                out.extend(comment.iter().map(|c| format!("# {c}")));
                out.push(format!("{key}={value}"));
                replaced = true;
            }
            continue;
        }
        out.push(line.to_string());
    }
    if !replaced {
        if out.last().is_some_and(|l| !l.trim().is_empty()) {
            out.push(String::new());
        }
        out.extend(comment.iter().map(|c| format!("# {c}")));
        out.push(format!("{key}={value}"));
    }
    let mut text = out.join("\n");
    text.push('\n');
    write_private_atomic(path, text.as_bytes())
}

/// Write `data` to `path` via a `0600` temp file + rename.
pub fn write_private_atomic(path: &Path, data: &[u8]) -> std::io::Result<()> {
    let dir = path
        .parent()
        .filter(|p| !p.as_os_str().is_empty())
        .unwrap_or_else(|| Path::new("."));
    let mut tmp = tempfile::Builder::new()
        .prefix(".env.tmp")
        .tempfile_in(dir)?;
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        tmp.as_file()
            .set_permissions(std::fs::Permissions::from_mode(0o600))?;
    }
    tmp.write_all(data)?;
    tmp.as_file().sync_all()?;
    tmp.persist(path).map_err(|e| e.error)?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn upsert_replaces_in_place_and_keeps_other_lines() {
        let dir = tempfile::tempdir().unwrap();
        let p = dir.path().join(".env");
        std::fs::write(
            &p,
            "# my config\nPORT=9000\nMASTER_API_KEY=sk-old\nexport MASTER_API_KEY = dup\nLOG_LEVEL=debug\n",
        )
        .unwrap();
        upsert(&p, "MASTER_API_KEY", "sha256:abc", &["hashed"]).unwrap();
        let s = std::fs::read_to_string(&p).unwrap();
        assert_eq!(
            s,
            "# my config\nPORT=9000\n# hashed\nMASTER_API_KEY=sha256:abc\nLOG_LEVEL=debug\n"
        );
        assert_eq!(
            read_value(&p, "MASTER_API_KEY").as_deref(),
            Some("sha256:abc")
        );
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            let mode = std::fs::metadata(&p).unwrap().permissions().mode() & 0o777;
            assert_eq!(mode, 0o600);
        }
    }

    #[test]
    fn upsert_appends_when_missing_and_does_not_match_prefixes() {
        let dir = tempfile::tempdir().unwrap();
        let p = dir.path().join(".env");
        std::fs::write(&p, "MASTER_API_KEY_OLD=x").unwrap();
        upsert(&p, "MASTER_API_KEY", "v", &[]).unwrap();
        assert_eq!(
            std::fs::read_to_string(&p).unwrap(),
            "MASTER_API_KEY_OLD=x\n\nMASTER_API_KEY=v\n"
        );
    }
}
