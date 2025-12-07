# 🚀 MetaIC AI - Deployment Guide

## ✅ Deployment Options

### Option 1: Local Testing Server (Currently Running)

**Status:** ✅ **RUNNING**

The app is currently running on:
```
http://localhost:8080
```

**To stop:**
```bash
pkill -f "python3 -m http.server"
```

**To restart:**
```bash
cd dist/package
python3 -m http.server 8080
```

### Option 2: Netlify Deployment

**Prerequisites:**
```bash
npm install -g netlify-cli
netlify login
```

**Deploy:**
```bash
cd dist/package
netlify deploy --prod
```

**Or use Netlify Drop:**
1. Go to https://app.netlify.com/drop
2. Drag and drop the `dist/package` folder
3. Get instant deployment URL

### Option 3: Vercel Deployment

**Prerequisites:**
```bash
npm install -g vercel
vercel login
```

**Deploy:**
```bash
cd dist/package
vercel --prod
```

### Option 4: GitHub Pages

```bash
# Create gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/package/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Option 5: Docker Deployment

**Build:**
```bash
docker build -t metaic-ai:latest -f Dockerfile .
```

**Run:**
```bash
docker run -d -p 8080:80 --name metaic-ai metaic-ai:latest
```

**Access:**
```
http://localhost:8080
```

**Stop:**
```bash
docker stop metaic-ai
docker rm metaic-ai
```

### Option 6: Traditional Web Server

**Apache:**
```bash
# Copy to web root
sudo cp -r dist/package/* /var/www/html/

# .htaccess is included for SPA routing
```

**Nginx:**
```bash
# Copy to web root
sudo cp -r dist/package/* /usr/share/nginx/html/

# Use included nginx.conf
sudo cp dist/package/nginx.conf /etc/nginx/sites-available/metaic-ai
sudo ln -s /etc/nginx/sites-available/metaic-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Option 7: AWS S3 + CloudFront

```bash
# Install AWS CLI
aws configure

# Upload to S3
aws s3 sync dist/package/ s3://your-bucket-name/ --delete

# Enable static website hosting
aws s3 website s3://your-bucket-name/ --index-document index.html

# Set up CloudFront distribution
```

### Option 8: Use Deployment Script

```bash
./deploy.sh
```

Follow the prompts to select your deployment method.

## 🔧 Configuration

### API Endpoint

Before deploying, configure the API endpoint:

**Option A: Environment Variable**
```bash
export VITE_API_URL=https://api.metaic.ai/api/v1
npm run build:h5
```

**Option B: Edit after build**
Edit `dist/package/assets/index-*.js` and search for `localhost:3000` to replace.

**Option C: Use .env.production**
Create `.env.production`:
```
VITE_API_URL=https://api.metaic.ai/api/v1
```

## 📊 Current Deployment Status

✅ **Local Server:** Running on http://localhost:8080
✅ **Package:** Ready in `dist/package/`
✅ **Docker:** Image can be built
✅ **Documentation:** Complete

## 🎯 Quick Deploy Commands

**Local Testing:**
```bash
cd dist/package && python3 -m http.server 8080
```

**Docker:**
```bash
docker build -t metaic-ai:latest -f Dockerfile .
docker run -d -p 8080:80 metaic-ai:latest
```

**Netlify:**
```bash
cd dist/package && netlify deploy --prod
```

**Vercel:**
```bash
cd dist/package && vercel --prod
```

## 📝 Notes

1. **SPA Routing:** All deployment methods include SPA routing support
2. **CORS:** Ensure backend API allows requests from your domain
3. **HTTPS:** Recommended for production
4. **CDN:** Consider using CDN for better performance

## 🆘 Troubleshooting

**Port already in use:**
```bash
# Find and kill process
lsof -ti:8080 | xargs kill
```

**Docker issues:**
```bash
# Check if Docker is running
docker ps

# View logs
docker logs metaic-ai
```

**Build issues:**
```bash
# Rebuild
npm run build:h5
```

---

**Ready to deploy!** Choose your preferred method above. 🚀

