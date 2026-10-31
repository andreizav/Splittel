#!/usr/bin/env bash
set -euo pipefail

CERT_DIR="${1:-./certs}"
mkdir -p "$CERT_DIR"

openssl req -x509 \
  -newkey ec \
  -pkeyopt ec_paramgen_curve:prime256v1 \
  -nodes \
  -keyout "$CERT_DIR/localhost-key.pem" \
  -out "$CERT_DIR/localhost-cert.pem" \
  -days 365 \
  -subj "/CN=localhost/O=Splittel MCP" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

echo "Generated TLS certificate at $CERT_DIR/localhost-cert.pem"

