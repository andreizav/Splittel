#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# @Splittel — One-Command Google Cloud Run HTTPS Deployment Script
# Usage:
#   GCP_PROJECT_ID="your-gcp-project" GCP_REGION="europe-west1" ./scripts/deploy-cloud-run.sh
# ==============================================================================

SERVICE_NAME="${SERVICE_NAME:-splittel-mcp}"
GCP_REGION="${GCP_REGION:-europe-west1}"
GCP_PROJECT_ID="${GCP_PROJECT_ID:-$(gcloud config get-value project 2>/dev/null || true)}"

if [[ -z "${GCP_PROJECT_ID}" ]]; then
  echo "Error: GCP_PROJECT_ID is not set and no active gcloud project was found."
  echo "Run: GCP_PROJECT_ID=my-project ./scripts/deploy-cloud-run.sh"
  exit 1
fi

OAUTH_JWT_SECRET="${OAUTH_JWT_SECRET:-$(openssl rand -hex 32)}"
UI_ACTION_SECRET="${UI_ACTION_SECRET:-$(openssl rand -hex 32)}"

echo "==> Deploying ${SERVICE_NAME} to Google Cloud Run (${GCP_PROJECT_ID} / ${GCP_REGION})..."
gcloud run deploy "${SERVICE_NAME}" \
  --project="${GCP_PROJECT_ID}" \
  --region="${GCP_REGION}" \
  --source="." \
  --allow-unauthenticated \
  --port=8080 \
  --min-instances=0 \
  --max-instances=10 \
  --set-env-vars="NODE_ENV=production,HTTPS_ENABLED=false,TRUST_PROXY=true,STORAGE_DRIVER=auto,OAUTH_JWT_SECRET=${OAUTH_JWT_SECRET},UI_ACTION_SECRET=${UI_ACTION_SECRET}"

SERVICE_URL="$(gcloud run services describe "${SERVICE_NAME}" \
  --project="${GCP_PROJECT_ID}" \
  --region="${GCP_REGION}" \
  --format='value(status.url)')"

echo "==> Binding OAuth 2.1 & MCP endpoints to ${SERVICE_URL}..."
gcloud run services update "${SERVICE_NAME}" \
  --project="${GCP_PROJECT_ID}" \
  --region="${GCP_REGION}" \
  --update-env-vars="PUBLIC_BASE_URL=${SERVICE_URL},OAUTH_ISSUER_URL=${SERVICE_URL},OAUTH_AUDIENCE=${SERVICE_URL}/mcp"

echo ""
echo "=================================================================="
echo "@Splittel Remote MCP Server is LIVE on HTTPS!"
echo "  Base HTTPS URL : ${SERVICE_URL}"
echo "  MCP Endpoint   : ${SERVICE_URL}/mcp"
echo "  SSE Endpoint   : ${SERVICE_URL}/sse"
echo "  UI Bill-Board  : ${SERVICE_URL}/ui/bill-board"
echo "  OAuth Discovery: ${SERVICE_URL}/.well-known/oauth-protected-resource"
echo "  Terms URL      : ${SERVICE_URL}/terms"
echo "  Privacy URL    : ${SERVICE_URL}/privacy"
echo "=================================================================="

