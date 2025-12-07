# 🚀 Deploy MetaIC.ai Website NOW

## ✅ Fastest Method: Netlify Drop (2 Minutes)

### Step 1: Go to Netlify Drop
**Visit:** https://app.netlify.com/drop

### Step 2: Deploy
1. **Drag and drop** the entire `website` folder onto the page
2. Wait 10-20 seconds
3. **Get instant deployment URL!** (e.g., `https://random-name-123.netlify.app`)

### Step 3: Configure Custom Domain
1. In Netlify dashboard, go to your site
2. **Site settings** → **Domain management**
3. Click **"Add custom domain"**
4. Enter: `metaic.ai`
5. Follow DNS instructions

### Step 4: Update DNS
Netlify will show you what DNS records to add:
- **CNAME** record: `www` → `your-site.netlify.app`
- Or **A** record: `@` → Netlify IP (provided)

### Step 5: Wait for SSL
- Netlify automatically provisions SSL certificates
- Wait 5-10 minutes after DNS update
- Your site will be live at `https://metaic.ai`!

---

## 🔧 Alternative: Netlify CLI (Interactive)

If you prefer CLI, run these commands and answer the prompts:

```bash
cd /Users/alextian/Documents/GitHub/metaic-app/website
netlify deploy --prod
```

**When prompted:**
- **"Create new site?"** → Select: **"Yes, create and configure a new project"**
- **Team:** Select **"Immedi AI"**
- **Site name:** Leave blank (auto-generated) or enter: `metaic-ai-landing`
- **Build command:** Press **Enter** (no build needed)
- **Publish directory:** Enter **`.`** (current directory)

Then add custom domain in dashboard.

---

## 📋 What Gets Deployed

- ✅ `index.html` - Main landing page
- ✅ `favicon.svg` - Favicon
- ✅ `netlify.toml` - Configuration
- ✅ All assets and styles (inline in HTML)

---

## ✅ Success Checklist

- [ ] Website deployed to Netlify
- [ ] Got deployment URL
- [ ] Added custom domain `metaic.ai`
- [ ] Updated DNS records
- [ ] SSL certificate active
- [ ] Website accessible at `https://metaic.ai`

---

## 🎯 Recommended: Use Netlify Drop

**Why?**
- ✅ Fastest (2 minutes)
- ✅ No CLI needed
- ✅ No prompts to answer
- ✅ Instant deployment
- ✅ Works immediately

**Just drag and drop the `website` folder!**

---

**Ready?** Go to: https://app.netlify.com/drop

