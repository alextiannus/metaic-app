# 🚀 Netlify Deployment Guide for MetaIC.ai

## ✅ You're Already Logged In!

You've successfully authenticated with Netlify. Now let's deploy!

---

## 🎯 **Easiest Method: Netlify Drop** (Recommended)

### Step 1: Go to Netlify Drop
Visit: **https://app.netlify.com/drop**

### Step 2: Drag & Drop
Drag the entire `website` folder onto the page

### Step 3: Get Your URL
Netlify will instantly give you a deployment URL like:
- `https://random-name-123.netlify.app`

### Step 4: Configure Custom Domain
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `metaic.ai`
4. Follow DNS configuration instructions:
   - Add a CNAME record: `www` → `your-site.netlify.app`
   - Or add an A record: `@` → Netlify's IP (they'll provide it)

### Step 5: SSL Certificate
Netlify automatically provisions SSL certificates. Just wait a few minutes after adding the domain.

**✅ Done!** Your site will be live at `https://metaic.ai`

---

## 🔧 **Alternative Method: CLI Deployment**

If you prefer using the CLI, complete the interactive setup:

### Step 1: Initialize Site
```bash
cd website
netlify init
```

**When prompted:**
- **"Create without git?"** → Select: **"Yes, create and deploy project manually"**
- **Team:** Select your team (e.g., "Immedi AI")
- **Site name:** Leave blank (auto-generated) or enter: `metaic-ai-landing`
- **Build command:** Press Enter (no build needed - it's static HTML)
- **Publish directory:** Enter `.` (current directory)

### Step 2: Deploy to Production
```bash
netlify deploy --prod
```

### Step 3: Configure Custom Domain
```bash
netlify domains:add metaic.ai
```

Or configure in the dashboard:
1. Go to your site in Netlify dashboard
2. **Domain settings** → **Add custom domain**
3. Enter: `metaic.ai`
4. Follow DNS instructions

---

## 📋 **Pre-Deployment Checklist**

- [x] ✅ Netlify CLI installed
- [x] ✅ Logged in to Netlify
- [x] ✅ `netlify.toml` configured
- [x] ✅ All website files ready in `website/` folder
- [ ] ⏳ Deploy to Netlify
- [ ] ⏳ Configure custom domain `metaic.ai`
- [ ] ⏳ Verify SSL certificate
- [ ] ⏳ Test website functionality

---

## 🔍 **Verify Deployment**

After deployment, check:

1. **Website loads:** Visit your Netlify URL
2. **All pages work:** Test navigation links
3. **Chatbot widget:** Verify it opens and functions
4. **Mobile responsive:** Test on mobile device
5. **SSL working:** Check `https://` is active

---

## 🐛 **Troubleshooting**

### Issue: "Site name already taken"
**Solution:** Use Netlify Drop or let Netlify auto-generate a name

### Issue: "Build command detected"
**Solution:** The `netlify.toml` file should have `command = ""` to skip build

### Issue: "404 on refresh"
**Solution:** The `netlify.toml` has redirect rules configured - should work automatically

### Issue: "Custom domain not working"
**Solution:** 
- Check DNS propagation: `dig metaic.ai`
- Wait 24-48 hours for DNS to propagate
- Verify DNS records in Netlify dashboard

---

## 📊 **Post-Deployment**

### Analytics
- Netlify provides built-in analytics
- View in: **Site settings** → **Analytics**

### Environment Variables
If you need to add environment variables later:
```bash
netlify env:set VARIABLE_NAME "value"
```

### Continuous Deployment
To enable auto-deploy from GitHub:
1. Connect your GitHub repository
2. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `website`
3. Enable branch deploys

---

## 🎉 **Success!**

Once deployed, your MetaIC.ai landing page will be live at:
- **Netlify URL:** `https://your-site.netlify.app`
- **Custom Domain:** `https://metaic.ai` (after DNS setup)

---

## 📞 **Need Help?**

- **Netlify Docs:** https://docs.netlify.com/
- **Netlify Support:** https://www.netlify.com/support/
- **CLI Help:** `netlify help`

