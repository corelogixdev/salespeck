# SalesPeck licensing (Phase B)

Developer-issued signed licenses control **staff seats** and **monthly/yearly** expiry.

> **How it works internally (architecture):** [LICENSING_ARCHITECTURE.md](./LICENSING_ARCHITECTURE.md)

## How it works

1. Developer keeps `desktop/config/license-keys/private.pem` offline (gitignored).
2. App embeds the matching public key in `desktop/utils/license.js`.
3. `npm run license:issue -- --seats 5 --plan yearly --client "Acme" --days 365` prints a Base64 key and appends `issued-licenses.csv`.
4. Client opens **License Activation** (`/license/activate`), pastes the key → stored as `license.json` next to app data (dev: `desktop/license.json`; installed: `%APPDATA%\salespeck\license.json`).
5. Middleware blocks the app when license is missing/invalid/expired past a **7-day grace**, or when clock/fingerprint checks fail.
6. Creating `branchmanager` / `user` accounts is capped by `maxUsers`. Customers/vendors do not consume seats.

## Machine binding (preferred)

1. On the client PC open **Activate** or **Settings → License** and copy **This PC fingerprint**.
2. Issue with that hash:

```bash
npm run license:issue -- --seats 5 --plan monthly --client "Acme" --days 31 --fingerprint <hash>
```

From **1.0.13**, activation also writes `boundFingerprint` for unbound keys so the same paste cannot freely move to another PC after first activate. Signed `--fingerprint` is still preferred for renewals.

Hardware / Windows user rename can change the fingerprint → re-issue a key for the new hash.

## Clock rollback guard (1.0.13+)

- Forward-only `lastSeenAt` in `license.json`, mirrored as softwaresetting `license_last_seen`.
- Clock moved backward more than ~2 hours vs last seen → blocked (`clock_tamper`).
- Clock set before license `issuedAt` (1-day skew) → blocked (`clock_invalid`).
- Fixing the system clock restores access if still within expiry/grace.

Offline only — no NTP. Clearing both watermark stores resets the timer; fingerprint bind still applies.

## Commands

```bash
cd desktop
npm run license:keys          # once (or --force to rotate; update embedded public key)
npm run license:issue -- --seats 5 --plan yearly --client "Acme Tailors" --days 365

# Bind to this PC
npm run license:issue -- --seats 5 --plan yearly --client "Acme" --days 365 --bind

# Bind to client fingerprint (from Settings → License)
npm run license:issue -- --seats 5 --plan yearly --client "Acme" --days 365 --fingerprint <hash>
```

You can run `license:issue` anytime later — before a new client install, renewal, or seat upgrade.

## Rotate keys

1. `node scripts/generate-license-keys.js --force`
2. Copy new `public.pem` into `EMBEDDED_PUBLIC_KEY_PEM` in `utils/license.js`
3. Rebuild the app; re-issue licenses for all clients

## Settings

Settings → **License** shows plan, expiry, seats, bind mode, clock check, and this PC’s fingerprint.
