# SQLite backup and restore

## Where the database lives

| Runtime | Path |
|---------|------|
| Development | `desktop/db/stitch.sqlite` |
| Installed (Windows) | `%APPDATA%\stitchcore\stitch.sqlite` |

Related files in the same folder may include Prisma migration state. Prefer copying the whole `stitchcore` app-data directory when doing a full disaster recovery.

Dated copies from prep work may also exist under `desktop/db/backups/` (gitignored).

## Backup (support / before upgrade)

1. Close StitchCore (quit Electron completely).
2. Copy `stitch.sqlite` to a safe location, e.g.:
   ```
   %USERPROFILE%\Documents\stitchcore-backups\stitch-YYYYMMDD.sqlite
   ```
3. Optionally also copy `%APPDATA%\stitchcore\.settings` and `license.json`.

Packaged app updates already create an automatic DB backup before `prisma migrate deploy` (see [update-release.md](./update-release.md)).

## Restore

1. Close StitchCore.
2. Replace `%APPDATA%\stitchcore\stitch.sqlite` with the backup file (keep the name `stitch.sqlite`).
3. Start the app. If the schema is older than the installed version, startup migrate should apply pending migrations.
4. Confirm login and a sample sale/report.

## Notes

- Do not restore a backup from a **newer** app version onto an older installer.
- License file (`license.json`) is separate from the DB; restoring the DB does not restore the license.
- Keep backups offline / encrypted if they contain customer data.
