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

| Task | PR | Evidence | Notes |
| --- | --- | --- | --- |
| T01 | #3 | /status and /health endpoints | Live on IP |
| T02 | #9 | A/TXT records live in DNS, HTTP 200 on domain + raw IP, dist/domain-status.json shows domain.connected=true (assignedDomain field) | DNS confirmed via nslookup (A -> 4.246.121.59, TXT -> deploy-sprint-kraken). HTTPS not live as of this evidence; flagged to organizers as infra-side TLS provisioning gap. |
| T03 | TBD | /release-candidate/artifact.json | Added deploy-dry-run job in CI that reuses the artifact |
| T04 | #3 | rollback.yml run + resolved SHA in job summary | Manual rollback via workflow_dispatch, release_ref input |
| T05 | (TBD - PR not yet opened) | PUBLIC_URL sourced from GitHub Secret + repo variable, ci.yml already references secrets.PUBLIC_URL fallback, dist/config-status.json shows publicUrlConfigured=true | No raw config values hardcoded in source (verified via git grep); config-status.json exposes only a boolean, never the actual URL value. |
| T06 | #5 | site-dist artifact with npm ci | Workflow correctly configured |
| T07 | #6 | /api/weather endpoint & WeatherWidget | Fetched server-side, secret secured |
| T08 |  |  |  |
| T09 |  |  |  |
| T10 |  |  |  |
| T11 |  |  |  |
| T12 |  |  |  |
| T13 |  |  |  |
| T14 |  |  |  |
| T15 |  |  |  |
| T16 |  |  |  |
| T17 |  |  |  |
| T18 |  |  |  |
| T19 |  |  |  |
| T20 |  |  |  |
| T21 |  |  |  |
| T22 |  |  |  |
| T23 |  |  |  |
| T24 |  |  |  |
| T25 |  |  |  |
| T26 |  |  |  |
| T27 |  |  |  |
| T28 |  |  |  |
| T29 |  |  |  |
| T30 |  |  |  |

## Public Notes

List anything judges should know without exposing credentials or private infrastructure details.


