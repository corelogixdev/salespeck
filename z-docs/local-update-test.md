# Local Update Test (Prisma-First)

## Goal
Simulate a real update locally and verify that Prisma migrations + must-data seeding run automatically when the new version starts.

## Steps
1. Prepare the newer desktop version in `desktop/package.json`.
2. Start the local update server:
```bash
npm run test:update 1.0.8
```
3. In another terminal, launch the installed app so it downloads and installs the update.

## What To Verify After Update
1. App starts without hanging dialogs.
2. No manual DB steps are required.
3. Login and core flows work:
   login, dashboard, products, sales, purchases, reports, settings.

## If You Changed Schema
Specifically confirm:
- existing database upgrades without crash
- required must-data exists after upgrade (company setting + chart of accounts)

