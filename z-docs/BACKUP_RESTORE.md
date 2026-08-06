# SQLite backup and restore

## Where the live database lives

| Runtime | Path |
|---------|------|
| Development | `desktop/db/stitch.sqlite` |
| Installed (Windows) | `%APPDATA%\salespeck\stitch.sqlite` |

## Backup folder (configurable)

Settings → **Environment** → **Database Backup Folder** (`backup_path` in `.settings`).

| Runtime | Default backup folder |
|---------|----------------------|
| Development | `desktop/db/backups/` |
| Installed (Windows) | `%APPDATA%\salespeck\backups/` |

Clients may change this to any writable folder (USB drive, Documents, network path). Use **Browse** in Settings, or type a path. **Default** resets to the built-in folder. Paths are stored with forward slashes in `.settings`.

**What writes there**

- **Others → Export DB** — copies a dated `salespeck-backup-….sqlite` into the configured folder
- **Packaged app updates** — automatic pre-migrate backup into the same folder

## Manual backup (support)

1. Close SalesPeck (quit Electron completely).
2. Copy `stitch.sqlite` (live DB) and/or files from the backup folder to a safe location.
3. Optionally also copy `%APPDATA%\salespeck\.settings` and `license.json`.

## Restore

1. Close SalesPeck.
2. Replace `%APPDATA%\salespeck\stitch.sqlite` with a backup file (keep the name `stitch.sqlite`).
3. Start the app. If the schema is older than the installed version, startup migrate should apply pending migrations.
4. Confirm login and a sample sale/report.

### Restoring a backup that already has tables

Older or exported DBs often have full business tables but an empty / missing `_prisma_migrations` history. On first start after restore, the packaged app:

1. Tries each pending migration statement.
2. If SQLite reports the object already exists (`table … already exists`, `duplicate column name`, etc.), that statement is skipped.
3. The migration is still recorded in `_prisma_migrations` (restore baseline).
4. Later migrations that are truly missing (new tables/columns) still run normally.

You do **not** need to hand-edit `_prisma_migrations` for this case when using a build that includes this startup behavior.

Prefer copying a live `stitch.sqlite` from a PC that already ran the same app version when possible.

## Notes

- Do not restore a backup from a **newer** app version onto an older installer.
- License file (`license.json`) is separate from the DB; restoring the DB does not restore the license.
- Keep backups offline / encrypted if they contain customer data.
- Placing a file only under `db/backups/` does nothing — the live file must be named `stitch.sqlite` in the live path above.
