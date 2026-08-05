# StitchCore licensing (Phase B)

Developer-issued signed licenses control **staff seats** and **monthly/yearly** expiry.

## How it works

1. Developer keeps `desktop/config/license-keys/private.pem` offline (gitignored).
2. App embeds the matching public key in `desktop/utils/license.js`.
3. `npm run license:issue -- --seats 5 --plan yearly --client "Acme" --days 365` prints a Base64 key and appends `issued-licenses.csv`.
4. Client opens **License Activation** (`/license/activate`), pastes the key → stored as `license.json` next to app data (dev: `desktop/license.json`; installed: `%APPDATA%\stitchcore\license.json`).
5. Middleware blocks the app when license is missing/invalid/expired past a **7-day grace**. Grace shows a banner; after grace only activation is available.
6. Creating `branchmanager` / `user` accounts is capped by `maxUsers`. Customers/vendors do not consume seats.

## Commands

```bash
cd desktop
npm run license:keys          # once (or --force to rotate; update embedded public key)
npm run license:issue -- --seats 5 --plan yearly --client "Acme Tailors" --days 365

# Optional: bind to this PC
npm run license:issue -- --seats 5 --plan yearly --client "Acme" --days 365 --bind

# Or print fingerprint on the client machine, then pass it when issuing:
node -e "console.log(require('./utils/license').getMachineFingerprint())"
npm run license:issue -- --seats 5 --plan yearly --client "Acme" --days 365 --fingerprint <hash>
```

You can run `license:issue` anytime later — before a new client install, renewal, or seat upgrade.
## Rotate keys

1. `node scripts/generate-license-keys.js --force`
2. Copy new `public.pem` into `EMBEDDED_PUBLIC_KEY_PEM` in `utils/license.js`
3. Rebuild the app; re-issue licenses for all clients

## Settings

Settings → **License** tab shows plan, expiry, and seats used/remaining.
