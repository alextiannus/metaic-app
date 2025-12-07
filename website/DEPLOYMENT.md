# MetaIC.ai Deployment Guide

Quick deployment guide for the MetaIC.ai landing page.

## 🚀 Quick Deploy Options

### 1. Netlify (Easiest - Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to website directory
cd website

# Deploy
netlify deploy --prod

# Follow prompts to configure:
# - Site name: metaic-ai
# - Publish directory: . (current directory)
# - Build command: (leave empty)
```

Then configure custom domain in Netlify dashboard:
1. Go to Site settings → Domain management
2. Add custom domain: `metaic.ai`
3. Follow DNS configuration instructions

### 2. Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to website directory
cd website

# Deploy
vercel --prod

# Configure custom domain in Vercel dashboard
```

### 3. GitHub Pages

```bash
# Create gh-pages branch
git checkout -b gh-pages

# Copy website files to root
cp -r website/* .

# Commit and push
git add .
git commit -m "Deploy website"
git push origin gh-pages
```

Then in GitHub:
1. Settings → Pages
2. Source: Deploy from branch `gh-pages`
3. Add custom domain: `metaic.ai`

### 4. Traditional Server (Apache/Nginx)

See `README.md` for detailed instructions.

## 📋 Pre-Deployment Checklist

- [ ] Update all placeholder links in `index.html`
- [ ] Configure AI chatbot API endpoint (if connecting to backend)
- [ ] Set up DNS records
- [ ] Configure SSL certificate
- [ ] Test on mobile devices
- [ ] Verify all images load correctly
- [ ] Check browser console for errors
- [ ] Test chatbot widget functionality

## 🔗 Domain Configuration

### DNS Records

```
Type    Name    Value                    TTL
A       @       YOUR_SERVER_IP           3600
A       www     YOUR_SERVER_IP           3600
CNAME   www     metaic.ai               3600
```

### SSL Certificate

Use Let's Encrypt (free):
```bash
sudo certbot --nginx -d metaic.ai -d www.metaic.ai
```

Or use Cloudflare for automatic SSL.

## ✅ Post-Deployment

1. Test website: `https://metaic.ai`
2. Test www: `https://www.metaic.ai`
3. Verify SSL certificate
4. Check mobile responsiveness
5. Test chatbot widget
6. Run Lighthouse audit
7. Submit to Google Search Console

## 🐛 Troubleshooting

**404 errors on refresh:**
- Ensure `.htaccess` (Apache) or `nginx.conf` (Nginx) is configured
- Verify mod_rewrite is enabled (Apache)

**SSL not working:**
- Check DNS propagation: `dig metaic.ai`
- Verify certificate: `openssl s_client -connect metaic.ai:443`
- Check firewall allows port 443

**Chatbot not working:**
- Check browser console for errors
- Verify API endpoint is accessible
- Check CORS settings on backend

## 📞 Support

For issues, check:
1. Server error logs
2. Browser console
3. Network tab in dev tools
4. DNS propagation status

