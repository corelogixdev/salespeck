# Test Local Installed Update Guide

## Goal
Test a real installed app update locally. The installed `1.0.7` app should download `1.0.8` from your local update server and upgrade the existing database automatically.

## Terminal 1 - Build And Start Local Update Server
```bash
npm run test-local-installed-update 1.0.8
```

This will:
- build the newer version
- prepare `latest.yml` and installer files
- temporarily point the installed app `.settings` `update_url` to `http://localhost:8000`
- start the local update server
- restore `package.json` after the build so your workspace version stays unchanged
- restore the installed app update URL when you stop the script

Keep this terminal running during the full test.

You do not need to change anything inside the installed app folder.
You also do not need to edit the installed app `.settings` file manually for this local update test.
The helper script updates the installed app `.settings` file for you and restores it after the test.

## Installed App Test
1. Make sure OpenMenu `1.0.7` is already installed in Windows.
2. Close any dev app started with `npm run dev` or `npm run start:electron`.
3. Start the installed app from the Start menu or desktop shortcut.
4. Wait for the installed app to check `http://localhost:8000`.
5. Accept the update when `1.0.8` is offered.
6. Let the installer finish and reopen the app.

## What To Verify
1. The installed app updates from `1.0.7` to `1.0.8`.
2. App starts normally after update.
3. Existing database is preserved.
4. Prisma migration runs automatically on first start of the new version.
5. Login and core pages still work.

## If Schema Changed
Also confirm:
- the upgraded database does not crash on startup
- must-data still exists
- the new table exists, for example `delivery_queue`

## Restore After Test
After finishing local update testing:
- stop the helper server with `Ctrl+C`
- the script will restore the installed app `update_url`
- keep `desktop/main.js` on `const updateUrl = config.update_url;`

## Important Notes
1. Update server must stay running while the installed app checks for updates.
2. The update version must be higher than the installed version.
3. Do not use `npm run start:electron` for this installed-app update test.
4. `npm run dev` is only for development checks, not for the packaged update flow.
5. If port `8000` is already in use, it usually means another local update server is already running. Reuse that one or stop it before starting a new one.
