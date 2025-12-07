#!/bin/bash
# Automated Netlify Deployment Script

set -e

echo "🚀 Automated Netlify Deployment"
echo ""

cd "$(dirname "$0")"

# Check if netlify is logged in
if ! netlify status &>/dev/null; then
    echo "❌ Not logged in to Netlify"
    echo "Please run: netlify login"
    exit 1
fi

echo "✅ Netlify authenticated"
echo ""

# Try to create site if it doesn't exist
SITE_NAME="metaic-ai-$(date +%s)"
echo "📦 Creating site: $SITE_NAME"

# Deploy using API
echo "🌐 Deploying to Netlify..."
echo ""

# Use netlify deploy with non-interactive flags
netlify deploy --prod --dir=. --site="$SITE_NAME" 2>&1 || {
    echo "⚠️  Interactive deployment required"
    echo ""
    echo "Please run manually:"
    echo "  cd /Users/alextian/Documents/GitHub/metaic-app/website"
    echo "  netlify deploy --prod"
    echo ""
    echo "Or use Netlify Drop:"
    echo "  https://app.netlify.com/drop"
    exit 1
}

echo "✅ Deployment complete!"
