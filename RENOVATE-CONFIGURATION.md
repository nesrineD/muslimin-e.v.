# Renovate Configuration

## Overview

This repository uses [Renovate](https://docs.renovatebot.com/) for automated dependency management. Renovate automatically creates Pull Requests to update dependencies when new versions are available.

## Key Configuration Changes

### Vulnerability Detection

The following changes have been made to ensure Renovate properly detects and creates PRs for security vulnerabilities:

#### 1. OSV Vulnerability Alerts
```json
"osvVulnerabilityAlerts": true
```
Enables scanning against the [Open Source Vulnerabilities (OSV) database](https://osv.dev/) to detect known vulnerabilities in dependencies.

#### 2. Explicit Vulnerability Alerts Configuration
```json
"vulnerabilityAlerts": {
  "enabled": true,
  "labels": ["security"],
  "automerge": false,
  "schedule": ["at any time"]
}
```

- **`enabled: true`**: Explicitly enables vulnerability alert handling
- **`schedule: ["at any time"]`**: Overrides the global schedule to create security PRs immediately, not just on Monday mornings
- **`automerge: false`**: Security updates require manual review before merging
- **`labels: ["security"]`**: Tags security PRs for easy identification

#### 3. Security Updates Package Rule
```json
{
  "description": "Security updates - always create PRs immediately",
  "matchDatasources": ["npm"],
  "matchUpdateTypes": ["patch", "minor", "major"],
  "labels": ["security", "priority"],
  "schedule": ["at any time"],
  "automerge": false
}
```

This rule ensures that:
- Security vulnerabilities in npm packages trigger PR creation immediately
- All update types (patch, minor, major) are included for security fixes
- Security PRs are labeled with both `security` and `priority`
- Schedule restrictions don't block security updates
- Works in conjunction with `osvVulnerabilityAlerts` and `vulnerabilityAlerts` configuration

#### 4. Next.js Major Updates
```json
{
  "groupName": "Next.js monorepo",
  "matchPackageNames": ["next", "eslint-config-next"],
  "matchUpdateTypes": ["patch", "minor", "major"]
}
```

Changed from `["patch", "minor"]` to include `"major"` updates, ensuring critical security fixes in major versions are not skipped.

> **Note**: Package patterns use the regex format `/^pattern/` in the configuration, which is Renovate's migration format for better pattern matching.

## Current Vulnerabilities

As of the last scan, the following vulnerabilities were detected:

1. **glob** (high severity): Command injection via -c/--cmd
   - Affects: `eslint-config-next` dependency chain
   - CVE: [GHSA-5j98-mcp5-4vw2](https://github.com/advisories/GHSA-5j98-mcp5-4vw2)
   - Fix: Upgrade to `eslint-config-next@16.0.7` or later

2. **js-yaml** (moderate severity): Prototype pollution
   - CVE: [GHSA-mh29-5h37-fv8m](https://github.com/advisories/GHSA-mh29-5h37-fv8m)
   - Fix: Upgrade to `js-yaml@4.1.1` or later

## Schedule

- **Regular updates**: Before 6am on Monday (Europe/Berlin timezone)
- **Security updates**: At any time (immediate)
- **Lock file maintenance**: First day of the month before 6am

## Rate Limits

- **Concurrent PRs**: Maximum 5 at once
- **Hourly limit**: Maximum 2 PRs per hour

## Troubleshooting

### Renovate Not Creating PRs

If Renovate is not creating PRs:

1. **Check Renovate App Installation**: Ensure the [Renovate GitHub App](https://github.com/apps/renovate) is installed and has access to this repository
2. **Check Schedule**: Regular updates only run on Monday mornings (security updates bypass this)
3. **Check Rate Limits**: May be hitting the 2 PRs/hour limit
4. **Check Renovate Dashboard**: Visit the Dependency Dashboard issue (if enabled) for status
5. **Check GitHub Security**: Ensure GitHub's Dependabot or Security Advisory features are not conflicting

### Manual Trigger

To manually trigger Renovate:
1. Go to the Renovate app in GitHub
2. Select "Check now" for this repository

Or check the Renovate logs in the GitHub Actions tab if using the GitHub Action instead of the app.

## Additional Resources

- [Renovate Documentation](https://docs.renovatebot.com/)
- [Renovate Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [Vulnerability Detection](https://docs.renovatebot.com/configuration-options/#vulnerabilityalerts)
