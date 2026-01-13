# Quick Start Guide

## 🚀 One-Command Testing

### Test Updates Locally (Simplified)

**Terminal 1 - Start Update Server:**
```bash
npm run test:update
```
This will:
- ✅ Build your app
- ✅ Copy files to local server  
- ✅ Start update server on port 8000
- ⚠️ **Keep this terminal running!**

**Terminal 2 - Run Your App:**
```bash
# Option A: Development mode
npm run dev

# Option B: Or install the built app
npm run build
# Then install dist/openmenu.exe
```

**Important:** The update server (Terminal 1) must stay running while you test!

### Complete Testing Workflow

#### 1. First Time Setup
```bash
# Install dependencies
npm install

# Run the app in development
npm run dev
```

#### 2. Build & Test Updates

**Step 1:** Temporarily modify `main.js` (line ~111)
```javascript
// Change from:
url: `https://gitlab.com/api/v4/projects/${projectId}/packages/generic/openmenu/release`

// To:
url: "http://localhost:8000"
```

**Step 2:** Start update server (Terminal 1 - Keep running!)
```bash
npm run test:update
```

**Step 3:** Run your app (Terminal 2)
```bash
# Option A: Development mode
npm run dev

# Option B: Build and install
npm run build
# Then install dist/openmenu.exe
```

**Step 4:** Test an update (in Terminal 1, press Ctrl+C to stop, then:)
```bash
# Update version and rebuild
node zothers/test-update.js 1.0.8
# Server restarts automatically
```
The running app will detect the new version!

**Step 5:** Revert `main.js` back to GitLab URL after testing

---

## 📦 Build for Production

```bash
# Update version in package.json first
npm run build
npm run upload
```

---

## 🎯 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run app in development mode |
| `npm run build` | Build installer |
| `npm run test:update` | Build + start local update server (keep running!) |
| `npm run upload` | Upload to GitLab |
| `node test-update.js 1.0.8` | Build with version update + restart server |

## 🔄 Typical Testing Workflow

### Option A: With Installed App (Recommended for Update Testing)

**Step 1:** Build and install the app first
```bash
npm run build
# Install dist/openmenu.exe
```

**Step 2:** Start update server
```bash
npm run test:update  # Keep this running
```

**Step 3:** Run the installed app
- Launch the installed app from Start Menu or desktop
- It will check the update server for updates

**Step 4:** Test an update
- In the update server terminal, press Ctrl+C
- Run: `node test-update.js 1.0.8` (with new version)
- Server restarts with new version
- The installed app will detect and prompt for update!

### Option B: With Dev Mode

**Terminal 1:**
```bash
npm run test:update  # Starts update server, keep it running
```

**Terminal 2:**
```bash
npm run dev  # Run your app to test updates
```

When you want to test an update, in Terminal 1:
- Press Ctrl+C to stop
- Run: `node test-update.js 1.0.8`
- Server restarts with new version
- Your app (Terminal 2) will detect the update!

---

## ⚠️ Important Notes

1. **For local testing:** Use `http://localhost:8000` in `main.js`
2. **For production:** Use GitLab URL in `main.js`
3. **Update logs:** Check `%APPDATA%\openmenu\logs\main.log`
4. **Version format:** Use semantic versioning (1.0.7 → 1.0.8)

---

## 🐛 Troubleshooting

**Port already in use?**
- Stop other servers on port 8000
- Or change PORT in `test-update.js`

**Update not detected?**
- Check version is higher than installed version
- Verify `latest.yml` exists in `local-update-server/`
- Check `main.js` uses correct URL

**Build fails?**
- Run `npm install` first
- Check Node.js version compatibility
