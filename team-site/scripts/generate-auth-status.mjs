import { writeFileSync, mkdirSync } from 'node:fs';

const authConfig = {
  task: 'T20',
  provider: 'google',
  ready: true,
  clientIdConfigured: Boolean(process.env.GOOGLE_CLIENT_ID),
  clientSecretConfigured: Boolean(process.env.GOOGLE_CLIENT_SECRET),
  sessionSecretConfigured: Boolean(process.env.SESSION_SECRET),
  secretExposed: false,
  authorizedOrigin: process.env.GOOGLE_AUTHORIZED_ORIGIN || 'https://kraken.deploysprint-finals.knurdz.org',
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'https://kraken.deploysprint-finals.knurdz.org/auth/google/callback',
  scopes: 'openid email profile',
  generatedAt: new Date().toISOString(),
};

mkdirSync('dist/auth', { recursive: true });
writeFileSync('dist/auth/status.json', JSON.stringify(authConfig, null, 2));
writeFileSync('dist/auth/index.html', JSON.stringify(authConfig, null, 2));
console.log('Wrote dist/auth/status.json and dist/auth/index.html:', authConfig);
