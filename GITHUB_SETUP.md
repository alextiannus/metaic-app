# 🚀 GitHub Setup Guide for MetaIC AI

## ✅ Git Repository Initialized!

Your code has been committed locally. Now let's push it to GitHub.

---

## 📋 **Step 1: Create GitHub Repository**

1. Go to **https://github.com/new**
2. Repository name: `metaic-app` (or `metaic-ai`)
3. Description: `MetaIC AI - AI-Powered Digital Business Card Platform`
4. Visibility: Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

---

## 🔗 **Step 2: Connect and Push**

After creating the repository, GitHub will show you commands. Use these:

```bash
cd /Users/alextian/Downloads/metaic-app

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/metaic-app.git

# Push to GitHub
git push -u origin main
```

**Or if you prefer SSH:**

```bash
git remote add origin git@github.com:YOUR_USERNAME/metaic-app.git
git push -u origin main
```

---

## 🔐 **Step 3: Authentication**

If prompted for authentication:

### Option A: Personal Access Token (Recommended)
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. Use it as password when pushing

### Option B: SSH Key
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to GitHub: https://github.com/settings/keys
3. Use SSH URL for remote

---

## 📁 **What's Being Committed**

✅ **Frontend:**
- Uni-app Vue 3 application
- Figma integration
- Design tokens and branding
- API client and composables

✅ **Backend:**
- Node.js/Express API
- Database schema and migrations
- AI services (Gemini integration)
- Token and subscription services
- Network and communication services

✅ **Website:**
- MetaIC.ai landing page
- Netlify deployment config
- Server configurations

✅ **Documentation:**
- PRD (Product Requirements Document)
- API design
- Database schema
- Deployment guides

---

## 🚫 **What's NOT Committed** (in .gitignore)

- `node_modules/` - Dependencies
- `dist/` - Build outputs
- `.env` files - Environment variables
- `.netlify/` - Local Netlify files
- Logs and temporary files

---

## 🔄 **Future Updates**

After initial push, for future commits:

```bash
# Make changes
git add .
git commit -m "Description of changes"
git push
```

---

## 🌐 **After Pushing to GitHub**

### Enable Netlify Continuous Deployment:

1. Go to your Netlify site dashboard
2. **Site settings** → **Build & deploy** → **Continuous Deployment**
3. Click **Link to Git provider**
4. Authorize Netlify to access GitHub
5. Select repository: `metaic-app`
6. Configure:
   - **Base directory:** `website`
   - **Build command:** (leave empty)
   - **Publish directory:** `website`
7. Click **Deploy site**

Now every push to `main` will automatically deploy! 🎉

---

## 📝 **Repository Structure**

```
metaic-app/
├── website/          # Landing page (metaic.ai)
├── src/              # Frontend Uni-app
├── backend/          # Backend API
├── PRD.md           # Product requirements
├── DEPLOYMENT_*.md  # Deployment guides
└── ...
```

---

## ✅ **Checklist**

- [x] Git repository initialized
- [x] Files committed locally
- [ ] GitHub repository created
- [ ] Remote added
- [ ] Code pushed to GitHub
- [ ] Netlify connected (optional, for auto-deploy)

---

## 🆘 **Troubleshooting**

### "Repository not found"
- Check repository name matches
- Verify you have access
- Check remote URL is correct

### "Authentication failed"
- Use Personal Access Token instead of password
- Or set up SSH keys

### "Permission denied"
- Check GitHub account permissions
- Verify repository access

---

## 🎉 **Next Steps**

After pushing to GitHub:

1. **Set up Netlify auto-deploy** (see above)
2. **Add README.md** with project overview
3. **Set up GitHub Actions** for CI/CD (optional)
4. **Configure branch protection** (optional)
5. **Add collaborators** (if needed)

---

## 📞 **Need Help?**

- **GitHub Docs:** https://docs.github.com/
- **Git Basics:** https://git-scm.com/doc

