# Deploy Sprint Finale Submission

Complete this file on `main` as tasks are completed. Do not paste secrets, private keys, token values, or screenshots that reveal credentials.

## Team

- Team name: Kraken
- Team members: Ashinthya, Dineth, Dihini, Uresha
- Live IP URL: http://4.246.121.59
- Assigned domain URL: http://kraken.deploysprint-finals.knurdz.org
- Repository URL: https://github.com/knurdz/deploy-sprint-finale-team-kraken

## Release Evidence

- Current production commit: (Will be available after next deployment)
- Current artifact/image identifier: site-dist-<sha>
- Current deployment workflow run: (Check GitHub Actions)
- Current release manifest path or URL: http://4.246.121.59/status
- Notes on live evidence or fallback evidence: /health returns ok, /status returns JSON payload. CI workflow enforces npm ci and npm run build.

## Score Summary

- Automated points out of 800:
- Judge points out of 200:
- Final total points out of 1000:

## Completed Tasks

Use this section for short public notes and links. Full task instructions and checks are in the finalist dashboard.

| Task | PR  | Evidence | Notes |
| --- |-----| --- | --- |
| T01 | #3  | /status and /health endpoints | Live on IP |
| T02 | #9  | A/TXT records live in DNS, HTTP 200 on domain + raw IP, dist/domain-status.json shows domain.connected=true (assignedDomain field) | DNS confirmed via nslookup (A -> 4.246.121.59, TXT -> deploy-sprint-kraken). HTTPS not live as of this evidence; flagged to organizers as infra-side TLS provisioning gap. |
| T03 | #10 | /release-candidate/artifact.json | Added deploy-dry-run job in CI that reuses the artifact |
| T04 | #3  | rollback.yml run + resolved SHA in job summary | Manual rollback via workflow_dispatch, release_ref input |
| T05 | #12 | PUBLIC_URL sourced from GitHub Secret + repo variable, ci.yml already references secrets.PUBLIC_URL fallback, dist/config-status.json shows publicUrlConfigured=true | No raw config values hardcoded in source (verified via git grep); config-status.json exposes only a boolean, never the actual URL value. |
| T06 | #5  | site-dist artifact with npm ci | Workflow correctly configured |
| T07 | #6  | /api/weather endpoint & WeatherWidget | Fetched server-side, secret secured |
| T08 | #7  | LearningVelocity component & clean rebase | Cherry-picked dda6b34 from task-assets/rebase-feature |
| T09 | #16 | PR Diff | Resolved conflict manually keeping both intended changes |
| T10 | #20 | ContactForm component & /status evidence | Integrated Web3Forms contact form service |
| T11 | #14 | .github/workflows/pr-preview.yml runs on every pull_request, builds team-site, uploads artifact named pr-preview-<PR number>-<commit SHA>, writes GITHUB_STEP_SUMMARY with PR/commit info | Separate workflow file from ci.yml/deploy.yml so preview evidence never touches production deploy logic. |
| T12 | #8  | cache: npm + cache-dependency-path in ci.yml | npm ci preserved, lockfile-keyed cache already in place |
| T13 | #17 | Integrated ReleaseReadiness component & validation script | Temporary review-tracking text cleaned up before merge, validation script passes, build succeeds |
| T14 | #18 | team-site/Dockerfile (multi-stage: node:20-alpine build, nginx:alpine serve), .github/workflows/docker-build.yml builds deploy-sprint/kraken:<commit SHA> and records digest in step summary | Verified locally with real Docker: build succeeded, container served the actual site (HTTP 200) |
| T15 | TBD | /status JSON features flag | Implemented runtime feature flag for LearningVelocity component via Vite env var |
| T16 |     |  |  |
| T17 |     |  |  |
| T18 | #27 | docker-build.yml & deploy.yml container evidence | Containerized application deployed via GitHub Actions |
| T19 | #25 | .github/workflows/smoke-test.yml checks /, /health, /status and fails on bad response. Debug run (PUBLIC_URI/PUBLIC_URL mismatch): visible in PR #25 checks history. Passing run: https://github.com/knurdz/deploy-sprint-finale-team-kraken/actions/runs/30197818502/job/89782390724?pr=25 | Ran starter as-provided first (failed as designed - PUBLIC_URI required), diagnosed the PUBLIC_URI/PUBLIC_URL name mismatch, fixed it, reran and passed against live site |
| T20 |     |  |  |
| T21 | #30 | deploy.yml concurrency and permissions blocks | Updated deploy.yml to use the 'deploy-kraken-production' concurrency group with cancel-in-progress: false to queue deployments safely. Enforced least-privilege by setting explicit read-only permissions and verified no workflows use the unsafe pull_request_target trigger. |
| T22 |     |  |  |
| T23 |     |  |  |
| T24 |     |  |  |
| T25 |     |  |  |
| T26 |     |  |  |
| T27 |     |  |  |
| T28 |     |  |  |
| T29 |     |  |  |
| T30 |     |  |  |

## Public Notes

List anything judges should know without exposing credentials or private infrastructure details.


