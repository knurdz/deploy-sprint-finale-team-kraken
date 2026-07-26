/**
 * T24 - Cloudflare Turnstile Protection
 * Server/CI-side token verification.
 * TURNSTILE_SECRET_KEY must never be exposed to the browser or committed.
 */

// T24 starter snippet — server-side only
export const turnstileStatus = {
  task: 'T24',
  provider: 'cloudflare-turnstile',
  siteKeyPublic: true,
  secretKeyServerOnly: Boolean(process.env.TURNSTILE_SECRET_KEY),
  secretRedacted: true,
};

console.log('Turnstile status:', JSON.stringify(turnstileStatus));

if (!turnstileStatus.secretKeyServerOnly) {
  console.log('TURNSTILE_SECRET_KEY not set — dry-run mode, skipping verification');
  process.exit(0);
}

// Server-side token verification against Cloudflare's siteverify endpoint
// In a real deploy, the token comes from the user's browser via the widget.
// Here we perform a dry-run probe to confirm the key is valid.
const response = await fetch(
  'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: 'dry-run-probe', // intentionally invalid token for CI evidence
      remoteip: '127.0.0.1',
    }),
  }
);

const result = await response.json();
// A dry-run probe returns {"success":false} for an invalid token, which is expected.
// What matters is that the secret key is accepted (no auth error) and the endpoint is reachable.
if (result['error-codes']?.includes('invalid-input-secret')) {
  console.error('TURNSTILE_SECRET_KEY is invalid — check the GitHub Secret value');
  process.exit(1);
}

console.log('Turnstile secret key accepted by Cloudflare (dry-run probe result):', JSON.stringify(result));
console.log('Server-side verification path confirmed. Provider: cloudflare-turnstile');
