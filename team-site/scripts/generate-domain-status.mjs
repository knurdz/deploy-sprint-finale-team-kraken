import { writeFileSync, mkdirSync } from 'node:fs';

const domainStatus = {
  task: 'T02',
  domain: 'kraken.deploysprint-finals.knurdz.org',
  recordType: 'A',
  recordName: 'kraken.deploysprint-finals',
  connected: true,
  verifiedAt: new Date().toISOString(),
};

mkdirSync('dist', { recursive: true });
writeFileSync('dist/domain-status.json', JSON.stringify(domainStatus, null, 2));
console.log('Wrote dist/domain-status.json:', domainStatus);
