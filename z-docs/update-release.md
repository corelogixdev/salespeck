# Update Release Guide (Prisma-First)

## What Happens When the App Starts After an Update
1. The app resolves the writable SQLite DB path in user data.
2. The app makes a backup of the current database.
3. The app runs `prisma migrate deploy`.
4. The app checks a seed marker in `softwaresetting`.
5. The app ensures must-data exists (company setting + chart of accounts):
   - runs must-data seeder on first run
   - also re-checks even if the marker already exists

Result: schema changes and required must-data are applied automatically on app startup.

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
npm run upload (it will upload the new build on https://gitlab.com/api/v4/projects/62990895/packages/generic/openmenu/release)
```

## Other installer notes
1. we need to delete the files from https://gitlab.com/atta_devgiant/openmenu/-/packages until we successfully test the update, after the deploy anywhere and user getting updates then we will do not need to delete
2. Important Note a single file cannot be uploaded to (https://gitlab.com/api/v4/projects/' + process.env.CI_PROJECT_ID + '/packages/generic/openmenu), it should be some folder


## Pre-Release Checklist
- `desktop/prisma/schema.prisma` and migrations are committed.
- must-data seed is idempotent (it is).
- installer builds successfully.

## Post-Release Checks (On a machine with existing data)
1. App opens normally (no startup dialog).
2. Login works (if this is a fresh install, register branch manager once).
3. Test: dashboard, products, sales, purchases, reports, settings.


## install location will be
1. C:\Users\IT LAND\AppData\Local\Programs\openmenu (contain the software files and db)
2. C:\Users\IT LAND\AppData\Local\openmenu-updater (will contain the updater)
3. C:\Users\IT LAND\AppData\Roaming\openmenu (userData folder, App folder contain the logs and other cache files)

