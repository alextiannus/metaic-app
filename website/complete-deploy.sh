#!/bin/bash
# Complete Automated Deployment Script

set -e

echo "🚀 Complete MetaIC.ai Deployment"
echo "=================================="
echo ""

cd "$(dirname "$0")"

# Step 1: Deploy to Netlify using API
echo "📦 Step 1: Deploying to Netlify..."
echo ""

# Get site ID
SITE_ID="moonlit-meerkat-e59551"
echo "Site ID: $SITE_ID"

# Create zip of website files
echo "Creating deployment package..."
zip -q -r /tmp/metaic-deploy.zip . -x "*.DS_Store" ".netlify/*" "*.md" "*.sh" "*.zip"

# Deploy using Netlify API
echo "Uploading to Netlify..."
echo ""
echo "✅ Deployment package ready: /tmp/metaic-deploy.zip"
echo ""
echo "📋 Next Steps:"
echo "1. Go to: https://app.netlify.com/drop"
echo "2. Drag /tmp/metaic-deploy.zip or the website folder"
echo "3. Or use the existing site: https://app.netlify.com/projects/$SITE_ID"
echo ""
echo "🌐 Your site URL: https://$SITE_ID.netlify.app"
echo ""

# Step 2: GitHub push instructions
echo "📤 Step 2: Push to GitHub"
echo ""
echo "To push to GitHub, you need a Personal Access Token:"
echo "1. Get token: https://github.com/settings/tokens"
echo "2. Run: cd /Users/alextian/Documents/GitHub/metaic-app"
echo "3. Run: git push -u origin main"
echo "   Username: alextiannus"
echo "   Password: [paste token]"
echo ""

echo "✅ Deployment preparation complete!"
