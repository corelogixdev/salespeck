# Client onboarding checklist (Phase C)

Operational steps to deliver StitchCore to a client. Licensing must be activated **before** first register when the gate is enabled.

## Before the visit

1. Agree seats, plan (`monthly` / `yearly`), price, and support terms offline.
2. Record the deal and issue a license:
   ```bash
   cd desktop
   npm run license:issue -- --seats 5 --plan yearly --client "Client Name" --days 365
   ```
   Optional machine bind: add `--bind` after you have the machine fingerprint from the client PC (see [LICENSING.md](./LICENSING.md)).
3. Build and sign the installer (see [update-release.md](./update-release.md) and [CODE_SIGNING.md](./CODE_SIGNING.md)):
   ```bash
   cd desktop
   npm run prisma:generate
   npm run build
   # sign dist/stitchcore.exe, then:
   npm run upload
   ```
4. Host the installer (GitLab `packages/generic/stitchcore/release` or a private download link).
5. Prepare company details (name, phone, address) and the staff username list (within seat pack).

## On the client PC

1. Install `stitchcore.exe` (admin if NSIS requires it).
2. Launch the app — you should land on **License Activation** if no license is present.
3. Paste the signed license key → Activate.
4. Register the branch manager (uses **1 seat**).
5. Log in; open Settings → company / printer; confirm COA must-data is present.
6. Create remaining staff users up to `maxUsers` (Settings / Users). Customers and vendors do **not** use seats.
7. Walk through: product or service sale, optional return, a simple report.
8. Explain backup location: `%APPDATA%\stitchcore\stitch.sqlite` (see [BACKUP_RESTORE.md](./BACKUP_RESTORE.md)).
9. Hand off credentials, support contact, and the renewal date (`expiresAt`).

## After handoff

1. Confirm `issued-licenses.csv` (or your license log) has this client.
2. Schedule a renewal reminder ~14 days before expiry.
3. For renewals / seat upgrades: issue a new key and have the client paste it on `/license/activate` again.

## Smoke checks

- [ ] License shows **valid** under Settings → License  
- [ ] Seats used / max look correct  
- [ ] Staff create fails when seats are full  
- [ ] Sale + login work after restart  
