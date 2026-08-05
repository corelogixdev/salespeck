# Update Release Guide

> **Client delivery & licensing:** see [CLIENT_DEPLOYMENT_ROADMAP.md](./CLIENT_DEPLOYMENT_ROADMAP.md).  
> **Full from-scratch build, publish, license, and client install:** [BUILD_AND_DEPLOY.md](./BUILD_AND_DEPLOY.md).

## What Happens When the App Starts After an Update
1. The app resolves the writable SQLite DB path in user data.
2. The app makes a backup of the current database.
3. The app runs `prisma migrate deploy`.
4. The app checks a seed marker in `softwaresetting`.
5. The app ensures must-data exists (company setting + chart of accounts):
   - runs must-data seeder on first run
   - also re-checks even if the marker already exists

Result: schema changes and required must-data are applied automatically on app startup.

This automatic backup + `migrate deploy` flow is for installed/packaged app updates.
It is intentionally skipped during `npm run dev`.

## Brand / upload (StitchCore)
- Build artifact: **`stitchcore.exe`** (`productName` in `desktop/package.json`).
- Upload target: GitLab generic package `packages/generic/stitchcore/release` (`stitchcore.exe` + `latest.yml`).
- Create that package folder on GitLab if it does not exist yet (do not upload a lone file at the package root).
- **Code signing:** see [CODE_SIGNING.md](./CODE_SIGNING.md) before shipping to clients.
- Packaged builds **do not** include `.env` (developer tokens stay on the build machine only).

## Release Steps (Operators / CI)
1. Update the desktop version in `desktop/package.json`.
2. Generate the Prisma client:
```bash
cd desktop
npm run prisma:generate
```
3. Build the installer:
```bash
npm run build
```
4. Upload:
```bash
npm run upload
```
Uploads to `https://gitlab.com/api/v4/projects/<CI_PROJECT_ID>/packages/generic/stitchcore/release`.

## Other installer notes
1. Clear or replace previous package files under the GitLab package registry until update flow is verified.
2. Files must live under a folder such as `.../stitchcore/release/`, not at the bare package root.

## Pre-Release Checklist
- `desktop/prisma/schema.prisma` and migrations are committed.
- must-data seed is idempotent (it is).
- installer builds successfully.
- installed-app local update test passes using `cd desktop && npm run test-local-installed-update 1.0.8`
- see `z-docs/test-local-installed-update.md` for the local installed update workflow

## Post-Release Checks (On a machine with existing data)
1. App opens normally (no startup dialog).
2. Login works (if this is a fresh install, register branch manager once).
3. Test: dashboard, products, sales, purchases, reports, settings.

## Install locations (Windows)
With `productName` / app data folder **`stitchcore`**:

1. `%LOCALAPPDATA%\Programs\stitchcore` — installed application
2. `%LOCALAPPDATA%\stitchcore-updater` — updater cache (electron-updater)
3. `%APPDATA%\stitchcore` — `.settings`, uploads, logs, and `stitch.sqlite`
