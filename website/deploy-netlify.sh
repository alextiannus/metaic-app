#!/bin/bash
# Netlify Deployment Script for MetaIC.ai

echo "🚀 Deploying MetaIC.ai to Netlify..."
echo ""

# Check if logged in
if ! netlify status &>/dev/null; then
    echo "❌ Not logged in. Please run: netlify login"
    exit 1
fi

echo "✅ Logged in to Netlify"
echo ""

# Deploy using Netlify Drop (simplest method)
echo "📦 Preparing deployment..."
echo ""
echo "Option 1: Use Netlify Drop (Easiest)"
echo "1. Go to: https://app.netlify.com/drop"
echo "2. Drag and drop the 'website' folder"
echo "3. Get instant deployment URL"
echo "4. Configure custom domain: metaic.ai"
echo ""

# Or use CLI with site creation
echo "Option 2: Complete the interactive prompts:"
echo "When prompted:"
echo "  - Select: 'Yes, create and deploy project manually'"
echo "  - Team: Select your team"
echo "  - Site name: Leave blank for auto-generated name"
echo "  - Build command: Press Enter (no build needed)"
echo "  - Publish directory: . (current directory)"
echo ""

echo "Then run: netlify deploy --prod"
