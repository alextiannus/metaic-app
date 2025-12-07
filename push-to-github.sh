#!/bin/bash
# Push MetaIC App to GitHub

echo "🚀 Pushing MetaIC App to GitHub..."
echo ""

cd /Users/alextian/Documents/GitHub/metaic-app

# Check if authenticated
if git push -u origin main 2>&1 | grep -q "could not read Username"; then
    echo "❌ Authentication required"
    echo ""
    echo "📋 Steps to authenticate:"
    echo ""
    echo "1. Get Personal Access Token:"
    echo "   → https://github.com/settings/tokens"
    echo "   → Generate new token (classic)"
    echo "   → Select scope: 'repo'"
    echo "   → Copy the token"
    echo ""
    echo "2. Run this command:"
    echo "   git push -u origin main"
    echo ""
    echo "3. When prompted:"
    echo "   Username: alextiannus"
    echo "   Password: [paste your token]"
    echo ""
else
    echo "✅ Pushed successfully!"
    echo ""
    echo "View on GitHub:"
    echo "https://github.com/alextiannus/metaic-app"
fi
