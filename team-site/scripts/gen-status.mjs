#!/usr/bin/env node
/**
 * gen-status.mjs
 * Run before `vite build` to write public/status.json
 * with commit SHA, deploy time, release ID, and T01 marker.
 *
 * AI-REVIEW-MARKER: participant must manually remove this marker
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

const status = {
  team: process.env.VITE_TEAM_NAME || 'Team Kraken',
  task: 'T01',
  commitSha: process.env.VITE_COMMIT_SHA || process.env.GITHUB_SHA || 'local',
  releaseId: process.env.VITE_RELEASE_ID || process.env.GITHUB_RUN_ID || 'local',
  deployTime: process.env.VITE_DEPLOY_TIME || new Date().toISOString(),
  publicUrl: process.env.VITE_PUBLIC_URL || '',
  branch: process.env.VITE_BRANCH || process.env.GITHUB_REF_NAME || 'unknown',
};

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(
  path.join(publicDir, 'status.json'),
  JSON.stringify(status, null, 2) + '\n',
  'utf8',
);

console.log('Generated public/status.json:', status);
