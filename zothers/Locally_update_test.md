# Local Update Testing Guide

**Terminal 1 - Update Server:**
```bash
# 2. Build and start server with the next version
npm run test:update 1.0.8
# Server is now running on port 8000 with version 1.0.8 it will change package to version for build and self revert that
```

**Terminal 2 - Test App:**
```bash
npm run start:electron
# App will detect update from 1.0.7 → 1.0.8!
```

---

## ⚙️ Configuration

**For Production:**
- After testing, change it back:
  - From: `const updateUrl = "http://localhost:8000";`
  - To:   `const updateUrl = config.update_url;`

---

## ⚠️ Important Notes

1. **Update Server Must Stay Running** - Keep Terminal 1 running while testing
2. **Version Must Be Higher** - New version must be greater than current version
3. **Revert package.json** - Always revert to older version before testing
4. **Local Testing Only** - Remember to change `main.js` back for production
