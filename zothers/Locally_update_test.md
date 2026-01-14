# Local Update Testing Guide

## 🚀 Quick Testing Workflow

### Step-by-Step Process

**1. Update Version in package.json**
```bash
# Edit package.json and change version (e.g., from 1.0.10 to 1.0.11)
# Or use: node test-update.js 1.0.11
```

**2. Build and Start Update Server**
```bash
npm run test:update
```
This will:
- Build the app with the new version
- Copy files to local update server
- Start server on port 8000
- ⚠️ **Keep this terminal running!**

**3. Revert package.json Version**
```bash
# Manually revert package.json version back to the older version (e.g., 1.0.10)
# Or use git: git checkout package.json
```

**4. Run App with Older Version**
```bash
npm run start:electron
```
The app will:
- Start with the older version from package.json
- Check for updates from the local server
- Detect the newer version and prompt for update!

---

## 📋 Complete Example

**Terminal 1 - Update Server:**
```bash
# 1. Change version in package.json to 1.0.11
# 2. Build and start server
npm run test:update
# Server is now running on port 8000 with version 1.0.11
```

**Terminal 2 - Test App:**
```bash
# 1. Revert package.json version back to 1.0.10
# 2. Run app with older version
npm run start:electron
# App will detect update from 1.0.10 → 1.0.11!
```

---

## ⚙️ Configuration

**For Local Testing:**
- In `main.js` around line 100 temporarily change:
  - From: `const updateUrl = config.update_url;`
  - To:   `const updateUrl = "http://localhost:8000";`

**For Production:**
- After testing, change it back:
  - From: `const updateUrl = "http://localhost:8000";`
  - To:   `const updateUrl = config.update_url;`

---

## 🎯 Commands Reference

| Command | Description |
|---------|-------------|
| `npm run start:electron` | Run app without nodemon (for testing) |
| `npm run dev` | Run app in development mode (with nodemon) |
| `npm run build` | Build installer |
| `npm run test:update` | Build + start local update server |
| `npm run upload` | Upload to GitLab (production) |

---

## ⚠️ Important Notes

1. **Update Server Must Stay Running** - Keep Terminal 1 running while testing
2. **Version Must Be Higher** - New version must be greater than current version
3. **Revert package.json** - Always revert to older version before testing
4. **Local Testing Only** - Remember to change `main.js` back for production

---

## 🐛 Troubleshooting

**Update not detected?**
- Verify version in `package.json` is lower than version on server
- Check `main.js` uses `http://localhost:8000` for testing
- Ensure update server is running

**Port already in use?**
- Stop other servers on port 8000
- Or change PORT in `zothers/test-update.js`

**Build fails?**
- Run `npm install` first
- Check Node.js version compatibility

---

## 💡 Summary Flow You Described

1. Change version in `package.json` to **next version** (e.g., 1.0.7 → 1.0.8)
2. Temporarily set `updateUrl` in `main.js` to `"http://localhost:8000"`
3. Run `npm run test:update` (build + start local server)
4. Change `package.json` version **back** to the old version
5. Run `npm run start:electron` with the older version
6. App detects update from local server and offers to update
7. After testing, revert `main.js` back to use `config.update_url`
