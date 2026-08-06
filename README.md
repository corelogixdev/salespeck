# SalesPeck

Desktop POS for stitching businesses — stock, sales (product and service/design), returns, purchases, parties, accounting, and reports.

## Stack

- **Electron** desktop shell
- **Express** + **EJS** UI
- **Prisma** + **SQLite** (local, offline-first)
- Optional marketing site under `website/` (separate from the desktop app)

## Repository layout

| Path | Purpose |
|------|---------|
| `desktop/` | Main Electron + Express application |
| `desktop/prisma/` | Schema, migrations, seeds, query layer |
| `desktop/db/` | Dev SQLite DB (`stitch.sqlite`); dated copies in `db/backups/` |
| `website/` | Public marketing / sales / support site (Next.js) |
| `z-docs/` | Dev, release, and client-delivery documentation |

## Features (desktop)

- Dashboard (sales metrics, category revenue, low stock)
- Stock: products, batches, inventory logs, purchases / purchase services
- Parties: customers and vendors
- Sales: POS sale, service/design sales (Excel bulk import), sales returns
- Accounting: chart of accounts, journals, expenses, cash closing
- Reports: sales, purchases, inventory, customers (PDF export)
- Settings: company, printer, server switch (LAN)

## Quick start (development)

```bash
cd desktop
npm install
npm run prisma:generate
npm run dev
```

Details: [z-docs/dev-quickstart.md](z-docs/dev-quickstart.md).

Ensure `desktop/.settings` has `env=development` when developing locally.

## Common scripts (`desktop/`)

| Script | Purpose |
|--------|---------|
| `npm run dev` | Nodemon + Electron |
| `npm run start:electron` | Electron only |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:push` / `prisma:migrate` | Schema sync / migrate |
| `npm run prisma:seed` | Must-data seed (COA, company defaults) |
| `npm run build` | Windows NSIS installer → `dist/salespeck.exe` |
| `npm run upload` | Upload `salespeck.exe` + `latest.yml` to GitLab package `salespeck/release` |

Release flow: [z-docs/update-release.md](z-docs/update-release.md).  
**Full from-scratch build & deploy:** [z-docs/BUILD_AND_DEPLOY.md](z-docs/BUILD_AND_DEPLOY.md).

## Data locations

| Runtime | SQLite | Settings / uploads |
|---------|--------|--------------------|
| Development | `desktop/db/stitch.sqlite` | `desktop/.settings` (local) |
| Installed (Windows) | `%APPDATA%\salespeck\stitch.sqlite` | `%APPDATA%\salespeck\` |

## Documentation

- [**Build & deploy (from scratch)**](z-docs/BUILD_AND_DEPLOY.md) — full release + client install procedure
- [Client deployment & licensing roadmap](z-docs/CLIENT_DEPLOYMENT_ROADMAP.md)
- [Client onboarding checklist](z-docs/CLIENT_ONBOARDING.md)
- [Licensing (issue & activate keys)](z-docs/LICENSING.md)
- [Backup & restore](z-docs/BACKUP_RESTORE.md)
- [Update release guide](z-docs/update-release.md)
- [Windows code signing](z-docs/CODE_SIGNING.md)
- [Local installed update test](z-docs/test-local-installed-update.md)
- [Dev quickstart](z-docs/dev-quickstart.md)

## Current gaps (honest)

- **Code signing certificate** — process documented; you still need a real Authenticode cert on the release PC
- **Cloud sync** — not implemented (desktop is offline SQLite)
- **Full packaged update smoke test** — run [test-local-installed-update.md](z-docs/test-local-installed-update.md) on a clean Windows install before wide rollout

## Product identity

This product is **SalesPeck** (package/app id `salespeck`). It is no longer branded OpenMenu.
