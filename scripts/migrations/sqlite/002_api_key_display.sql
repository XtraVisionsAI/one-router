-- Migration 002: Add key_display column for masked API key display
--
-- Stores middle-masked form like "sk-abcd••••5678" for UI display.
-- The actual HMAC hashing backfill runs at application startup.
--
-- Idempotent: the column may already exist from auto-migration.

ALTER TABLE api_keys ADD COLUMN key_display TEXT DEFAULT '';
