# Windows code signing (Authenticode)

Sign the SalesPeck Windows installer before distributing to clients so SmartScreen warnings are reduced and updates are trusted.

## Prerequisites

1. A valid **code signing certificate** (OV or EV Authenticode) from a trusted CA.
2. Certificate installed in the Windows certificate store, or available as `.pfx` + password.
3. On the build machine: Windows SDK `signtool.exe`, or use electron-builder’s built-in signing.

## Option A — electron-builder (recommended)

Add certificate details via environment variables (never commit secrets):

```bash
# PowerShell example (CI or local release machine)
$env:CSC_LINK = "C:\secure\salespeck-codesign.pfx"
$env:CSC_KEY_PASSWORD = "<pfx-password>"
cd desktop
npm run build
```

electron-builder will sign `dist/salespeck.exe` when `CSC_LINK` is set.

Optional `desktop/package.json` `build.win` fields (if using store name instead of PFX):

```json
"win": {
  "certificateSubjectName": "Your Company Name",
  "signingHashAlgorithms": ["sha256"]
}
```

## Option B — signtool after build

```bash
cd desktop
npm run build

signtool sign /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 /f C:\secure\salespeck-codesign.pfx /p <password> dist\salespeck.exe
signtool verify /pa dist\salespeck.exe
```

## Release checklist

1. Build + sign `salespeck.exe`.
2. Verify signature (`signtool verify /pa`).
3. Upload signed artifact + `latest.yml` via `npm run upload` (see [update-release.md](./update-release.md)).
4. Confirm GitLab package path exists: `packages/generic/salespeck/release`.

## Notes

- Unsigned builds still run but clients may see SmartScreen “Unknown publisher”.
- EV certificates with hardware tokens often require interactive/CI-specific tooling; document your org’s process for that case.
- Keep `.pfx` and passwords out of the repo and out of packaged app files (`.env` is excluded from the installer).
- If `npm run build` fails with **Cannot create symbolic link** under `winCodeSign`, enable Windows **Developer Mode** (or run the terminal as Administrator), delete `%LOCALAPPDATA%\electron-builder\Cache\winCodeSign`, and rebuild. See [BUILD_AND_DEPLOY.md](./BUILD_AND_DEPLOY.md) §3.2.
