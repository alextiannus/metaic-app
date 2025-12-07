# 🚀 Quick Push to GitHub

## Authentication Required

GitHub requires authentication to push. Here are the easiest methods:

---

## ✅ Method 1: Personal Access Token (Easiest)

### Step 1: Get Token
1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. Name: `metaic-app-push`
4. Select scope: **`repo`** (full control)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Push
```bash
cd /Users/alextian/Documents/GitHub/metaic-app
git push -u origin main
```

**When prompted:**
- **Username:** `alextiannus`
- **Password:** [paste your Personal Access Token]

**Note:** Use the token as the password, NOT your GitHub password!

---

## ✅ Method 2: SSH Key (One-Time Setup)

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "alextiannus@gmail.com"
# Press Enter to accept defaults
# Enter passphrase (optional)
```

### Step 2: Add to GitHub
```bash
# Copy your public key
cat ~/.ssh/id_ed25519.pub
```

1. Go to: **https://github.com/settings/keys**
2. Click **"New SSH key"**
3. Title: `MetaIC App - MacBook`
4. Key: Paste your public key
5. Click **"Add SSH key"**

### Step 3: Change Remote to SSH
```bash
cd /Users/alextian/Documents/GitHub/metaic-app
git remote set-url origin git@github.com:alextiannus/metaic-app.git
git push -u origin main
```

---

## ✅ Method 3: GitHub CLI (Alternative)

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Authenticate
gh auth login

# Push
git push -u origin main
```

---

## 🎯 Recommended: Use Method 1 (Token)

It's the quickest and works immediately. After the first push, credentials are saved.

---

## ✅ After Successful Push

1. **Verify on GitHub:**
   - Visit: https://github.com/alextiannus/metaic-app
   - All files should be visible

2. **Continue with Netlify deployment:**
   ```bash
   cd /Users/alextian/Documents/GitHub/metaic-app/website
   netlify deploy --prod
   ```

---

## 🆘 Troubleshooting

### "Authentication failed"
- Make sure you're using the **token**, not your password
- Token must have `repo` scope
- Check token hasn't expired

### "Repository not found"
- Verify repository exists: https://github.com/alextiannus/metaic-app
- Check you have access
- Verify remote URL: `git remote -v`

### "Permission denied"
- Check your GitHub account has access
- Verify token has correct scopes
- For SSH: Verify key is added to GitHub

---

**Get your token here:** https://github.com/settings/tokens

