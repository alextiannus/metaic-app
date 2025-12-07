# 🚀 Complete Deployment Guide

## Step 1: Push to GitHub ✅ (In Progress)

### Authentication Required

**Quick Method - Personal Access Token:**

1. **Get Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: `metaic-app-push`
   - Select scope: `repo` (full control)
   - Generate and copy the token

2. **Push to GitHub:**
   ```bash
   cd /Users/alextian/Documents/GitHub/metaic-app
   git push -u origin main
   ```
   - Username: `alextiannus`
   - Password: [paste your token]

3. **Verify:**
   - Check: https://github.com/alextiannus/metaic-app
   - All files should be visible

---

## Step 2: Deploy Website to Netlify 🌐

### Option A: Netlify Drop (Fastest - Recommended)

1. **Go to Netlify Drop:**
   - Visit: https://app.netlify.com/drop

2. **Deploy:**
   - Drag and drop the `website` folder onto the page
   - Get instant deployment URL

3. **Configure Custom Domain:**
   - Go to Site settings → Domain management
   - Add custom domain: `metaic.ai`
   - Follow DNS configuration instructions

### Option B: Netlify CLI (Already Logged In)

```bash
cd /Users/alextian/Documents/GitHub/metaic-app/website

# Deploy
netlify deploy --prod

# When prompted:
# - Select: "Create & configure a new project"
# - Team: Select your team
# - Site name: Leave blank (auto-generated)
# - Build command: Press Enter (no build needed)
# - Publish directory: . (current directory)
```

### Option C: Connect GitHub (Auto-Deploy)

1. **In Netlify Dashboard:**
   - Add new site → Import from Git
   - Connect GitHub
   - Select repository: `metaic-app`

2. **Configure Build Settings:**
   - Base directory: `website`
   - Build command: (leave empty)
   - Publish directory: `website`

3. **Deploy:**
   - Click "Deploy site"
   - Every push to `main` will auto-deploy!

4. **Add Custom Domain:**
   - Site settings → Domain management
   - Add: `metaic.ai`
   - Configure DNS

---

## Step 3: Configure DNS for metaic.ai

### If Using Netlify:

1. **In Netlify Dashboard:**
   - Site settings → Domain management
   - Add custom domain: `metaic.ai`
   - Netlify will show DNS records needed

2. **Update DNS Records:**
   - Go to your domain registrar (where you bought metaic.ai)
   - Add CNAME record:
     - Name: `www`
     - Value: `your-site.netlify.app`
   - Or add A record (Netlify will provide IP)

3. **Wait for SSL:**
   - Netlify automatically provisions SSL
   - Wait 5-10 minutes after DNS update

### DNS Records Example:

```
Type    Name    Value
CNAME   www     your-site.netlify.app
A       @       Netlify IP (provided by Netlify)
```

---

## Step 4: Verify Deployment ✅

### Check Website:
- Visit: `https://metaic.ai` (after DNS propagates)
- Or: `https://your-site.netlify.app` (immediate)

### Test Features:
- [ ] Landing page loads
- [ ] Navigation works
- [ ] Chatbot widget functions
- [ ] Mobile responsive
- [ ] SSL certificate active

---

## Step 5: Backend Deployment (Optional - Later)

### Recommended: Railway

1. **Go to Railway:**
   - https://railway.app
   - Sign up/login

2. **Deploy Backend:**
   - New Project → Deploy from GitHub
   - Select repository: `metaic-app`
   - Root directory: `backend`
   - Railway auto-detects Node.js

3. **Environment Variables:**
   - Add in Railway dashboard:
     - `DATABASE_URL` (Railway provides PostgreSQL)
     - `GEMINI_API_KEY`
     - `GEMINI_MODEL`
     - `JWT_SECRET`

4. **Get Backend URL:**
   - Railway provides: `https://your-app.railway.app`
   - Update frontend API URL to point here

---

## Step 6: Frontend App Deployment (Optional - Later)

### Recommended: Vercel

1. **Go to Vercel:**
   - https://vercel.com
   - Sign up/login

2. **Deploy:**
   - Import Git repository
   - Select: `metaic-app`
   - Build settings:
     - Build command: `npm run build:h5`
     - Output directory: `dist/build/h5`

3. **Custom Domain:**
   - Add: `app.metaic.ai`
   - Configure DNS

---

## 📋 Deployment Checklist

### Website (metaic.ai)
- [ ] Push to GitHub
- [ ] Deploy to Netlify
- [ ] Configure custom domain
- [ ] Verify SSL
- [ ] Test website

### Backend (api.metaic.ai) - Optional
- [ ] Deploy to Railway
- [ ] Configure environment variables
- [ ] Test API endpoints
- [ ] Update frontend API URL

### Frontend App (app.metaic.ai) - Optional
- [ ] Build frontend
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Test app

---

## 🎯 Quick Start Commands

### Push to GitHub:
```bash
cd /Users/alextian/Documents/GitHub/metaic-app
git push -u origin main
# (Authenticate with token)
```

### Deploy Website (Netlify Drop):
1. Go to: https://app.netlify.com/drop
2. Drag `website` folder
3. Configure domain: `metaic.ai`

### Deploy Website (Netlify CLI):
```bash
cd /Users/alextian/Documents/GitHub/metaic-app/website
netlify deploy --prod
```

---

## 🆘 Troubleshooting

### GitHub Push Fails:
- Use Personal Access Token (not password)
- Token must have `repo` scope
- See: `GITHUB_AUTH.md`

### Netlify Deployment Fails:
- Check `netlify.toml` exists
- Verify `website` folder structure
- Check Netlify build logs

### DNS Not Working:
- Wait 24-48 hours for propagation
- Check DNS: `dig metaic.ai`
- Verify records in domain registrar

---

## ✅ Success Indicators

- ✅ Code pushed to GitHub
- ✅ Website deployed to Netlify
- ✅ Custom domain configured
- ✅ SSL certificate active
- ✅ Website accessible at metaic.ai

---

**Next:** Complete GitHub push, then proceed with Netlify deployment!

