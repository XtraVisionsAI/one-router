#!/usr/bin/env bash
set -euo pipefail

# Generate the Ed25519 key pair used to sign release checksums.
#
# Self-update (and docker/Dockerfile.release) only install releases whose
# `<asset>.sha256` carries a valid `<asset>.sha256.sig` from this key.
#
# Usage:
#   ./scripts/release-keygen.sh [OUTPUT_DIR]     (default: ./release-signing)
#
# Then, in the GitHub repository settings:
#   - Secret   RELEASE_SIGNING_KEY  = contents of release-signing.key.pem
#   - Variable RELEASE_PUBLIC_KEY   = the base64 public key printed below
# Keep the private key offline afterwards (password manager / HSM) and delete
# the local copy. Requires OpenSSL 3.

OUT="${1:-./release-signing}"
mkdir -p "$OUT"
chmod 700 "$OUT"
KEY="$OUT/release-signing.key.pem"
if [[ -e "$KEY" ]]; then
    echo "Refusing to overwrite existing $KEY" >&2
    exit 1
fi
(umask 077 && openssl genpkey -algorithm ed25519 -out "$KEY")
PUB_B64=$(openssl pkey -in "$KEY" -pubout -outform DER | base64 | tr -d '\n')
echo "$PUB_B64" > "$OUT/release-signing.pub.b64"

echo "Private key: $KEY  (store as the RELEASE_SIGNING_KEY secret, then remove locally)"
echo "Public key (RELEASE_PUBLIC_KEY variable / ONE_ROUTER_RELEASE_PUBKEY build env):"
echo "  $PUB_B64"
