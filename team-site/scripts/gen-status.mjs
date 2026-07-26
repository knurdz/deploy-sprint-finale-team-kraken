#!/usr/bin/env node
/**
 * gen-status.mjs
 * Run before `vite build` to write public/health/index.html and
 * public/status/index.html with commit SHA, deploy time, release ID, and T01 marker.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

const status = {
  team: process.env.VITE_TEAM_NAME || process.env.TEAM_NAME || 'Kraken',
  task: 'T01',
  commitSha: process.env.VITE_COMMIT_SHA || process.env.GITHUB_SHA || 'local',
  releaseId: process.env.VITE_RELEASE_ID || process.env.GITHUB_RUN_ID || 'local',
  deployTime: process.env.VITE_DEPLOY_TIME || new Date().toISOString(),
  publicUrl: process.env.VITE_PUBLIC_URL || process.env.PUBLIC_URL || process.env.IP_PUBLIC_URL || process.env.DOMAIN_PUBLIC_URL || '',
  branch: process.env.VITE_BRANCH || process.env.GITHUB_REF_NAME || 'unknown',
};

const content = JSON.stringify(status, null, 2) + '\n';

// /health — served as directory index, displays in browser
fs.mkdirSync(path.join(publicDir, 'health'), { recursive: true });
fs.writeFileSync(path.join(publicDir, 'health', 'index.html'), 'ok\n', 'utf8');

// /status — served as directory index, displays in browser
fs.mkdirSync(path.join(publicDir, 'status'), { recursive: true });
fs.writeFileSync(path.join(publicDir, 'status', 'index.html'), content, 'utf8');

console.log('Generated public/health/index.html and public/status/index.html:', status);

