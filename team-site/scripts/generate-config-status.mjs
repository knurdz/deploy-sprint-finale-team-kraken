import { writeFileSync, mkdirSync } from 'node:fs';

const config = {
  task: 'T05',
  publicUrlConfigured: Boolean(process.env.PUBLIC_URL || process.env.VITE_PUBLIC_URL),
  secretsRedacted: true,
  generatedAt: new Date().toISOString(),
};

mkdirSync('dist', { recursive: true });
writeFileSync('dist/config-status.json', JSON.stringify(config, null, 2));
console.log('Wrote dist/config-status.json:', config);
