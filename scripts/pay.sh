#!/usr/bin/env bash
# pay.sh — One-command paid request via tempo wallet transfer + hash credential.
#
# Usage:
#   ./scripts/pay.sh POST http://localhost:3000/api/rfs/<id>/fund '{"amount":"0.003"}'
#   ./scripts/pay.sh GET  http://localhost:3000/api/skills/<id>/content
#
# Requires: tempo CLI, curl, jq, base64

set -euo pipefail

METHOD="${1:?Usage: pay.sh METHOD URL [BODY]}"
URL="${2:?Usage: pay.sh METHOD URL [BODY]}"
BODY="${3:-}"

HEADER_FILE=$(mktemp)
trap 'rm -f "$HEADER_FILE"' EXIT

# ---------------------------------------------------------------------------
# Step 1: Hit the route to get a 402 + WWW-Authenticate header
# ---------------------------------------------------------------------------
echo "→ Step 1: Requesting $METHOD $URL (expecting 402)..."

if [[ -n "$BODY" ]]; then
  CHALLENGE_RAW=$(curl -s -D "$HEADER_FILE" -w "\n%{http_code}" -X "$METHOD" "$URL" \
    -H "Content-Type: application/json" -d "$BODY")
else
  CHALLENGE_RAW=$(curl -s -D "$HEADER_FILE" -w "\n%{http_code}" -X "$METHOD" "$URL")
fi

HTTP_CODE=$(echo "$CHALLENGE_RAW" | tail -1)

if [[ "$HTTP_CODE" != "402" ]]; then
  RESP_BODY=$(echo "$CHALLENGE_RAW" | sed '$d')
  echo "  Expected 402, got $HTTP_CODE. Response:"
  echo "$RESP_BODY" | jq . 2>/dev/null || echo "$RESP_BODY"
  exit 1
fi

echo "  Got 402 ✓"

# ---------------------------------------------------------------------------
# Step 2: Parse WWW-Authenticate header
# ---------------------------------------------------------------------------
WWW_AUTH=$(grep -i '^www-authenticate:' "$HEADER_FILE" | head -1 | sed 's/^[^:]*: *//' | tr -d '\r')

if [[ -z "$WWW_AUTH" ]]; then
  echo "  No WWW-Authenticate header found."
  cat "$HEADER_FILE"
  exit 1
fi

extract_param() {
  echo "$WWW_AUTH" | sed -n "s/.*$1=\"\\([^\"]*\\)\".*/\\1/p"
}

b64url_decode() {
  local input="$1"
  local pad=$(( (4 - ${#input} % 4) % 4 ))
  local padded="${input}$(printf '%*s' "$pad" '' | tr ' ' '=')"
  echo "$padded" | tr -- '-_' '+/' | base64 -d
}

CHALLENGE_ID=$(extract_param id)
CHALLENGE_REALM=$(extract_param realm)
CHALLENGE_METHOD=$(extract_param method)
CHALLENGE_INTENT=$(extract_param intent)
CHALLENGE_EXPIRES=$(extract_param expires)
REQUEST_B64=$(extract_param request)

if [[ -z "$CHALLENGE_ID" || -z "$REQUEST_B64" || -z "$CHALLENGE_METHOD" ]]; then
  echo "  Could not parse challenge from WWW-Authenticate:"
  echo "  $WWW_AUTH"
  exit 1
fi

REQUEST_JSON=$(b64url_decode "$REQUEST_B64")
AMOUNT_BASE=$(echo "$REQUEST_JSON" | jq -r '.amount')
CURRENCY=$(echo "$REQUEST_JSON" | jq -r '.currency')
RECIPIENT=$(echo "$REQUEST_JSON" | jq -r '.recipient')

if [[ -z "$AMOUNT_BASE" || "$AMOUNT_BASE" == "null" ]]; then
  echo "  Failed to parse request fields. Decoded:"
  echo "$REQUEST_JSON" | jq . 2>/dev/null || echo "$REQUEST_JSON"
  exit 1
fi

# Convert base units to decimal (6 decimals for USDC)
DECIMALS=6
AMOUNT_DEC=$(echo "scale=$DECIMALS; $AMOUNT_BASE / 10^$DECIMALS" | bc)
AMOUNT_DEC=$(echo "$AMOUNT_DEC" | sed 's/0*$//' | sed 's/\.$//')
if [[ "$AMOUNT_DEC" == .* ]]; then AMOUNT_DEC="0$AMOUNT_DEC"; fi

echo "  Challenge: id=$CHALLENGE_ID amount=$AMOUNT_BASE ($AMOUNT_DEC USDC) recipient=$RECIPIENT"

# ---------------------------------------------------------------------------
# Step 3: Execute tempo wallet transfer
# ---------------------------------------------------------------------------
echo "→ Step 2: Sending $AMOUNT_DEC USDC to $RECIPIENT via tempo wallet..."

TRANSFER_OUT=$(tempo wallet -t transfer \
  "$AMOUNT_DEC" "$CURRENCY" "$RECIPIENT" 2>&1) || {
  echo "  Transfer failed:"
  echo "$TRANSFER_OUT"
  exit 1
}

TX_HASH=$(echo "$TRANSFER_OUT" | grep -oE '0x[a-fA-F0-9]{64}' | head -1)
if [[ -z "$TX_HASH" ]]; then
  echo "  Could not extract tx hash from transfer output:"
  echo "$TRANSFER_OUT"
  exit 1
fi

echo "  Transfer tx: $TX_HASH ✓"
echo "  Waiting 3s for block confirmation..."
sleep 3

# ---------------------------------------------------------------------------
# Step 4: Build Payment credential
# ---------------------------------------------------------------------------
echo "→ Step 3: Building Payment credential..."

CHALLENGE_OBJ=$(jq -cn \
  --arg id "$CHALLENGE_ID" \
  --arg realm "$CHALLENGE_REALM" \
  --arg method "$CHALLENGE_METHOD" \
  --arg intent "$CHALLENGE_INTENT" \
  --arg request "$REQUEST_B64" \
  --arg expires "$CHALLENGE_EXPIRES" \
  '{ id: $id, realm: $realm, method: $method, intent: $intent, request: $request }
   + (if $expires != "" then { expires: $expires } else {} end)')

CREDENTIAL_JSON=$(jq -cn \
  --argjson challenge "$CHALLENGE_OBJ" \
  --arg txHash "$TX_HASH" \
  '{ challenge: $challenge, payload: { type: "hash", hash: $txHash } }')

# base64url encode (no padding, no line wraps)
CREDENTIAL_B64=$(printf '%s' "$CREDENTIAL_JSON" | base64 | tr -d '\n' | tr -- '+/' '-_' | tr -d '=')

echo "  Credential built ✓"

# ---------------------------------------------------------------------------
# Step 5: Retry the request with Payment credential
# ---------------------------------------------------------------------------
echo "→ Step 4: Retrying $METHOD $URL with Payment credential..."

if [[ -n "$BODY" ]]; then
  RETRY_RAW=$(curl -s -w "\n%{http_code}" -X "$METHOD" "$URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Payment $CREDENTIAL_B64" \
    -d "$BODY")
else
  RETRY_RAW=$(curl -s -w "\n%{http_code}" -X "$METHOD" "$URL" \
    -H "Authorization: Payment $CREDENTIAL_B64")
fi

RETRY_CODE=$(echo "$RETRY_RAW" | tail -1)
RETRY_BODY=$(echo "$RETRY_RAW" | sed '$d')

if [[ "$RETRY_CODE" == "200" ]]; then
  echo "  Success (200) ✓"
  echo "$RETRY_BODY" | jq . 2>/dev/null || echo "$RETRY_BODY"
else
  echo "  Got $RETRY_CODE (expected 200). Response:"
  echo "$RETRY_BODY" | jq . 2>/dev/null || echo "$RETRY_BODY"
  exit 1
fi
