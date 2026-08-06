# SalesPeck deployment — XYZ Company

> **Operator guide (commands, updates, renewals):** [OPERATOR_DEPLOY.md](./OPERATOR_DEPLOY.md)

Clean install checklist for **XYZ**. Follow the steps in order. Do not skip ahead.

| Item | Value |
|------|--------|
| Client | XYZ |
| Plan | Monthly |
| Seats | 7 staff logins (branch manager + cashiers) |
| Duration | 31 days |
| Expires | 2026-09-06 |
| Installer | SalesPeck **1.0.13** (`salespeck-1.0.13.exe`) |
| USB pack | `desktop/dist/deploy-xyz/` |

---

## What to copy to USB

From the build PC, copy the folder:

`D:\corelogix\pos\stitchcore\desktop\dist\deploy-xyz\`

It must contain:

| File | Purpose |
|------|---------|
| `salespeck-1.0.13.exe` | Installer only |
| `license-key.txt` | Paste this in the app |
| `license.json` | Optional drop-in (see Step 3B) |

**Do not copy** the whole `dist` folder. **Do not copy** `win-unpacked`.

---

## Step 1 — Clean the client PC

On the XYZ machine:

1. Close SalesPeck if it is open (Task Manager → end `salespeck`).
2. **Settings → Apps** → uninstall **salespeck** / SalesPeck if listed.
3. Delete these folders if they still exist:
   - `%LOCALAPPDATA%\Programs\salespeck`
   - `%APPDATA%\salespeck`

   Tip: Win+R → paste each path → Enter → delete the folder.

---

## Step 2 — Install

1. From USB, run **`salespeck-1.0.13.exe`**.
2. Use a normal install (accept UAC if Windows asks).
3. Launch SalesPeck.
4. Confirm the title bar shows **SalesPeck v1.0.13** (not a blank white page with only “salespeck”).
5. You should see **License Activation** (or Register/Login if already licensed).

If you still see a **blank white window**: close the app, uninstall, delete `%APPDATA%\salespeck`, reinstall **1.0.13**, then try again.

If **Register / Sign Up** fails with Prisma / `fk_partytype_id`: install **1.0.13** and restart once (migration runs on startup). If it still fails, close the app, delete only `%APPDATA%\salespeck\stitch.sqlite`, start again, then register.

If the app will not start at all (error dialog), install [VC++ Redistributable x64](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist), reboot, try again. Collect logs from `%APPDATA%\salespeck` if it still fails.

---

## Step 3 — Activate license (pick one method)

### Method A — Paste key (preferred)

1. On USB, open **`license-key.txt`** in Notepad.
2. Press **Ctrl+A**, then **Ctrl+C**.
3. In SalesPeck → License Activation → click the key box → **Ctrl+V**.
4. The key must:
   - Start with `eyJwYXlsb2Fk`
   - Be about **460 characters** (one long line)
5. Click **Activate**.

### Method B — Drop `license.json` (if paste keeps failing)

1. Close SalesPeck completely.
2. Win+R → `%APPDATA%\salespeck` → Enter.  
   Create the folder if the app has never started successfully.
3. Copy USB file **`license.json`** into that folder (overwrite if asked).
4. Start SalesPeck.

**Important:** `license.json` must start with `{` and contain `"payload"`.  
Do **not** rename `license-key.txt` to `license.json`.

---

## Step 4 — Register branch manager

1. After activation, open **Register**.
2. Create the **branch manager** account (uses **1 of 7** seats).
3. Log in with that account.

---

## Step 5 — Smoke test

1. **Settings** → company name / phone / address (and printer if needed).
2. **Settings → License** → confirm:
   - Client: **XYZ**
   - Plan: **monthly**
   - Seats: used / **7**
   - Expiry around **2026-09-06**
3. Create extra staff users only up to 7 total seats.
4. Create a product (or use seed data) → **New Sale** → complete one sale.
5. Restart the app → login still works.

---

## Flow (do not reorder)

```text
Uninstall old → Install 1.0.9 → App starts
       → Activate license
       → Register manager
       → Login → Settings/License check → One sale
```

You cannot activate until the app starts.  
You cannot register until the license is active.

---

## License details (reference)

- **Client:** XYZ  
- **Seats:** 7  
- **Plan:** monthly  
- **Issued:** 2026-08-06  
- **Expires:** 2026-09-06  
- **License ID:** `7fc149a8-d7a2-491e-8535-20c4a8264181`  
- Key file on build PC: `desktop/config/license-keys/xyz-activate-key.txt`  
- Issued log: `desktop/config/license-keys/issued-licenses.csv`

---

## Common mistakes

| Mistake | Result |
|---------|--------|
| Copying whole `dist` / `win-unpacked` | USB copy errors; broken install |
| Installing old 1.0.7 / 1.0.8 | Migration / blank / startup failures |
| Pasting only part of the key | “JSON could not be parsed” |
| Putting files in the install folder | App ignores them |
| Renaming `.txt` key to `license.json` | Blank or activation fails |
| Skipping uninstall of old app | Mixed/old files |

---

## After go-live (optional)

- Set backup folder in Settings and run **Export DB** once.
- Renew before **2026-09-06** (or during the grace period) with a new key from the build PC.
