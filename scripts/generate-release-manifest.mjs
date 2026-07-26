import { writeFileSync } from 'node:fs';

const manifest = {
  task: 'T23',
  tasks: ['T23'],
  commit: process.env.GITHUB_SHA ?? 'unknown',
  artifact: `site-dist-${process.env.GITHUB_SHA ?? 'unknown'}`,
  workflowRun: process.env.GITHUB_RUN_ID ?? 'local',
  deployedAt: new Date().toISOString(),
};

writeFileSync('release-manifest.json', JSON.stringify(manifest, null, 2));
console.log('Wrote release-manifest.json:', manifest);
