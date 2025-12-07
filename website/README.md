# MetaIC.ai Website

This is the official landing page for MetaIC AI, deployed at **http://metaic.ai** (and https://metaic.ai when SSL is configured).

## 🎨 Features

- **Modern Design**: Dark-themed glass morphism navigation matching the app design
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Interactive**: Floating AI assistant chatbot widget
- **SEO Optimized**: Meta tags and semantic HTML
- **Fast Loading**: Optimized assets and compression

## 📁 Structure

```
website/
├── index.html          # Main landing page
├── favicon.svg         # MetaIC favicon
├── .htaccess          # Apache configuration
├── nginx.conf         # Nginx configuration
└── README.md          # This file
```

## 🚀 Deployment

### Option 1: Static Hosting (Recommended)

#### Netlify
1. Connect your repository to Netlify
2. Set build directory to `website`
3. Publish directory: `website`
4. Custom domain: `metaic.ai`

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `website` directory
3. Run: `vercel --prod`
4. Configure custom domain: `metaic.ai`

#### GitHub Pages
1. Push `website` folder to `gh-pages` branch
2. Configure GitHub Pages to serve from `gh-pages` branch
3. Add custom domain: `metaic.ai`

### Option 2: Traditional Web Server

#### Apache
1. Upload `website` folder contents to `/var/www/metaic.ai`
2. Copy `.htaccess` to the root directory
3. Configure virtual host:
   ```apache
   <VirtualHost *:80>
       ServerName metaic.ai
       ServerAlias www.metaic.ai
       DocumentRoot /var/www/metaic.ai
       <Directory /var/www/metaic.ai>
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```
4. Enable mod_rewrite: `sudo a2enmod rewrite`
5. Restart Apache: `sudo systemctl restart apache2`

#### Nginx
1. Upload `website` folder contents to `/var/www/metaic.ai`
2. Copy `nginx.conf` to `/etc/nginx/sites-available/metaic.ai`
3. Create symlink: `sudo ln -s /etc/nginx/sites-available/metaic.ai /etc/nginx/sites-enabled/`
4. Test configuration: `sudo nginx -t`
5. Reload Nginx: `sudo systemctl reload nginx`

### Option 3: Cloud Storage (AWS S3, Google Cloud Storage)

1. Upload `website` folder contents to your bucket
2. Enable static website hosting
3. Configure custom domain
4. Set up CDN (CloudFront, Cloud CDN) for better performance

## 🔒 SSL/HTTPS Setup

### Let's Encrypt (Free SSL)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx  # For Nginx
# or
sudo apt-get install certbot python3-certbot-apache  # For Apache

# Obtain certificate
sudo certbot --nginx -d metaic.ai -d www.metaic.ai
# or
sudo certbot --apache -d metaic.ai -d www.metaic.ai

# Auto-renewal is set up automatically
```

### Cloudflare (Recommended)
1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS (Full mode)
4. Enable automatic HTTPS rewrites

## 📝 DNS Configuration

Configure your DNS records:

```
Type    Name    Value           TTL
A       @       YOUR_IP          3600
A       www     YOUR_IP          3600
CNAME   www     metaic.ai       3600
```

For Cloudflare:
- Set proxy status to "Proxied" (orange cloud)
- SSL/TLS encryption mode: Full

## 🧪 Testing Locally

```bash
# Using Python
cd website
python3 -m http.server 8000

# Using Node.js
npx serve website

# Using PHP
php -S localhost:8000 -t website
```

Visit: `http://localhost:8000`

## 📊 Performance

- **Lighthouse Score**: Target 90+ on all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Customization

### Update Logo Colors
Edit the gradient colors in `index.html`:
- Meta gradient: `from-fuchsia-500 to-purple-600`
- IC gradient: `text-yellow-400` and `text-cyan-400`

### Update Content
All content is in `index.html`. Key sections:
- Hero section (line ~80)
- Features grid (line ~200)
- H5 Profile demo (line ~280)
- Pricing (line ~350)
- Footer (line ~400)

### Update Links
Update navigation links and footer links in `index.html` to point to actual pages.

## 📱 Mobile Optimization

The site is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## 🤖 AI Chatbot Widget

The floating chatbot widget uses mock responses. To connect to the actual API:

1. Update `handleChatSubmit` function in `index.html`
2. Replace mock responses with API calls to your backend
3. Endpoint: `POST /api/v1/ai/chat` (from your backend)

## 📄 License

© 2024 MetaIC AI. All rights reserved.

## 🆘 Support

For deployment issues:
1. Check server logs
2. Verify DNS configuration
3. Test with `curl` or browser dev tools
4. Ensure mod_rewrite (Apache) or try_files (Nginx) is enabled

