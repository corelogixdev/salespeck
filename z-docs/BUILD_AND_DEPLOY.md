# StitchCore — Build & Deploy (from scratch)

End-to-end procedure to set up a release machine, build the Windows installer, publish updates, issue licenses, and install on a client PC.

Related docs: [LICENSING.md](./LICENSING.md) · [CLIENT_ONBOARDING.md](./CLIENT_ONBOARDING.md) · [CODE_SIGNING.md](./CODE_SIGNING.md) · [BACKUP_RESTORE.md](./BACKUP_RESTORE.md) · [update-release.md](./update-release.md)

---

## 0. What you ship

| Artifact | Purpose |
|----------|---------|
| `desktop/dist/stitchcore.exe` | Windows NSIS installer |
| `desktop/dist/latest.yml` | electron-updater metadata (version + file hashes) |
| Signed license key (Base64) | Seats + plan expiry for that client |

| Runtime path (installed) | Contents |
|--------------------------|----------|
| `%LOCALAPPDATA%\Programs\stitchcore` | Application |
| `%LOCALAPPDATA%\stitchcore-updater` | Updater cache |
| `%APPDATA%\stitchcore` | `.settings`, `license.json`, uploads, logs, `stitch.sqlite` |

---

## 1. Prerequisites (release / developer PC)

### Software

1. **Windows 10/11** (build target is Windows NSIS).
2. **Node.js LTS** (18+ recommended) and npm.
3. **Git** — clone this repo.
4. **curl** available in PATH (used by `npm run upload`; Windows 10+ usually has it).
5. Optional but recommended: **Authenticode certificate** (`.pfx` + password) — see [CODE_SIGNING.md](./CODE_SIGNING.md).

### Clone and install

```bash
git clone <your-repo-url> stitchcore
cd stitchcore/desktop
npm install
npm run prisma:generate
```

### One-time license signing keys (developer only)

Do this **once** per product keypair (or after a deliberate rotation):

```bash
cd desktop
npm run license:keys
```

- Creates `desktop/config/license-keys/private.pem` and `public.pem` (**gitignored** — never commit `private.pem`).
- Ensure `EMBEDDED_PUBLIC_KEY_PEM` in `desktop/utils/license.js` matches `public.pem`.
- Keep `private.pem` offline / backed up securely. Without it you cannot issue new licenses.

### Release credentials (upload only)

Create `desktop/.env` on the **build machine only** (never commit; excluded from the installer):

```env
GITLAB_TOKEN=glpat-xxxxxxxx
```

Confirm `desktop/.settings` (or defaults in `installEnv.js`) include:

```ini
CI_PROJECT_ID=62990895
update_url=https://gitlab.com/api/v4/projects/62990895/packages/generic/stitchcore/release
```

Adjust `CI_PROJECT_ID` / `update_url` if your GitLab project differs. Client installs inherit `update_url` from defaults on first run unless you change it in Settings.

### GitLab package folder (once)

Upload target:

`https://gitlab.com/api/v4/projects/<CI_PROJECT_ID>/packages/generic/stitchcore/release/`

Create the **`stitchcore/release`** generic package folder in the project Package Registry if the first upload fails. Files must live under that folder, not at the package root.

---

## 2. Local development (optional smoke before release)

```bash
cd desktop
npm install
npm run prisma:generate
npm run dev
```

Set `env=development` in `desktop/.settings` after first run if needed — see [dev-quickstart.md](./dev-quickstart.md).

Dev mode does **not** auto-backup the DB or run `prisma migrate deploy` on startup. For schema work use `npm run prisma:migrate` / `prisma:push` manually.

Activate a license in the app (or place `desktop/license.json`) before registering a branch manager. Issue a long-lived dev key if needed:

```bash
npm run license:issue -- --seats 50 --plan yearly --client "Dev" --days 3650
```

---

## 3. Build the installer

### 3.1 Bump version

Edit `desktop/package.json` → `"version"` (example: `1.0.8`).  
Installed clients only update when the published version is **higher** than theirs.

Commit schema/migrations if you changed Prisma.

### 3.2 Generate Prisma client + build

```bash
cd desktop
npm run prisma:generate
npm run build
```

(`prebuild` also runs `prisma generate`.)

Expected outputs:

- `desktop/dist/stitchcore.exe`
- `desktop/dist/latest.yml`

### 3.3 Sign the installer (recommended for clients)

**Option A — electron-builder (during build):**

```powershell
$env:CSC_LINK = "C:\secure\stitchcore-codesign.pfx"
$env:CSC_KEY_PASSWORD = "<pfx-password>"
cd desktop
npm run build
```

**Option B — signtool after build:**

```bash
signtool sign /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 /f C:\secure\stitchcore-codesign.pfx /p <password> dist\stitchcore.exe
signtool verify /pa dist\stitchcore.exe
```

Unsigned builds work but Windows SmartScreen may warn. Full detail: [CODE_SIGNING.md](./CODE_SIGNING.md).

### 3.4 Pre-upload checklist

- [ ] Version bumped in `package.json`
- [ ] Migrations committed; `prisma:generate` succeeded
- [ ] `dist/stitchcore.exe` and `dist/latest.yml` exist
- [ ] Installer signed (if shipping to clients)
- [ ] `GITLAB_TOKEN` in `.env`; `CI_PROJECT_ID` in `.settings`

---

## 4. Deploy / publish update feed

```bash
cd desktop
npm run upload
```

Uploads:

1. `dist/stitchcore.exe` → GitLab `.../packages/generic/stitchcore/release/stitchcore.exe`
2. `dist/latest.yml` → same folder

Installed apps poll `update_url` (from `.settings`) via electron-updater and offer the new version when `latest.yml` reports a higher version.

### Manual download (no auto-update)

You may also give the client a direct download link to `stitchcore.exe` and have them run the installer over the previous install (data under `%APPDATA%\stitchcore` is preserved).

### After publish — smoke on an existing install

1. Open installed StitchCore; accept update if offered.
2. App should: backup DB → `prisma migrate deploy` → ensure must-data → open normally.
3. Confirm login, dashboard, sale, settings.

Local update simulation without GitLab: [test-local-installed-update.md](./test-local-installed-update.md).

---

## 5. Issue a client license

On the machine that holds `private.pem`:

```bash
cd desktop
npm run license:issue -- --seats 5 --plan yearly --client "Client Name" --days 365
```

- Prints a Base64 license key — send securely to the client / use on site.
- Appends a row to `desktop/config/license-keys/issued-licenses.csv` (gitignored).

**Plans:** `monthly` or `yearly` (commercial term; `--days` sets actual expiry).

**Optional machine bind** (single-PC lock):

```bash
# On client PC (after install, or from a copy of the repo utils):
node -e "console.log(require('./utils/license').getMachineFingerprint())"

# On your PC:
npm run license:issue -- --seats 5 --plan yearly --client "Client Name" --days 365 --fingerprint <hash>
```

Or `--bind` to bind to the **current** machine (useful for your own test PC).

You can run `license:issue` anytime (new client, renewal, seat upgrade). Details: [LICENSING.md](./LICENSING.md).

---

## 6. Install on a client PC (from scratch)

Full ops checklist: [CLIENT_ONBOARDING.md](./CLIENT_ONBOARDING.md).

1. Run `stitchcore.exe` (admin if prompted — installer requests elevation).
2. Launch **StitchCore** from Start Menu / desktop.
3. **License Activation** — paste key → Activate.  
   File stored at `%APPDATA%\stitchcore\license.json`.
4. **Register** branch manager (uses 1 staff seat).
5. Log in → **Settings**: company name, phone, address, printer.
6. Create remaining **Users** (staff) up to seat limit. Customers/vendors do not use seats.
7. Smoke: product or service sale, optional return, one report.
8. Tell the client backup path: `%APPDATA%\stitchcore\stitch.sqlite` — see [BACKUP_RESTORE.md](./BACKUP_RESTORE.md).
9. Record renewal date; schedule reminder ~14 days before expiry.

### Staff vs manager

| Role | Access |
|------|--------|
| `branchmanager` | Full (settings, users, purchases create, accounting admin, …) |
| `user` (staff) | POS / list / reports subset; no Settings / user admin / purchase create |

---

## 7. Renewals and seat upgrades

| Event | Action |
|-------|--------|
| Renewal | Issue new key with new `--days` / plan → client pastes on `/license/activate` |
| More seats | Issue new key with higher `--seats` → re-activate |
| Expired | 7-day grace (banner); after grace only activation works until a valid key is entered |

---

## 8. What happens on packaged update (installed app)

On startup after an update:

1. Resolve writable SQLite path under `%APPDATA%\stitchcore`
2. Backup current DB
3. Run `prisma migrate deploy`
4. Ensure must-data (company + chart of accounts)

This does **not** run in `npm run dev`. See [update-release.md](./update-release.md).

---

## 9. Quick reference commands

```bash
cd desktop

# Dev
npm install
npm run prisma:generate
npm run dev

# License (once / as needed)
npm run license:keys
npm run license:issue -- --seats 5 --plan yearly --client "Name" --days 365

# Release
# 1) bump version in package.json
npm run prisma:generate
npm run build
# optional: sign dist/stitchcore.exe
npm run upload

# Local installed update test
npm run test-local-installed-update 1.0.8
```

---

## 10. Troubleshooting

| Problem | Check |
|---------|--------|
| `GITLAB_TOKEN is not defined` | Create `desktop/.env` with `GITLAB_TOKEN=...` |
| `CI_PROJECT_ID is not defined` | Set in `desktop/.settings` |
| Upload 404 / package missing | Create GitLab generic package folder `stitchcore/release` |
| SmartScreen warning | Sign installer ([CODE_SIGNING.md](./CODE_SIGNING.md)) |
| App stuck on license screen | Issue/activate a valid key; check clock/date; grace expired |
| Cannot create staff user | Seat limit reached — issue higher `--seats` key |
| Update not offered | Published version must be **greater** than installed; `update_url` must reach `latest.yml` |
| Login fails after bcrypt rollout | Legacy passwords upgrade on successful login; reset password if needed |
| Restore DB | Close app → replace `%APPDATA%\stitchcore\stitch.sqlite` → start ([BACKUP_RESTORE.md](./BACKUP_RESTORE.md)) |

---

## 11. Do not commit / ship

- `desktop/.env` (tokens)
- `desktop/config/license-keys/private.pem`
- `desktop/config/license-keys/issued-licenses.csv`
- `desktop/license.json` / client `license.json`
- `desktop/.settings` with production secrets (session_secret is per-machine)
- Code-signing `.pfx` / passwords

`.env` is excluded from electron-builder `files`. Session secrets are generated per install into writable `.settings`.
