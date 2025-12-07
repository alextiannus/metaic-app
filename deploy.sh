#!/bin/bash

# MetaIC AI - Deployment Script

set -e

echo "🚀 MetaIC AI - Deployment Script"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if package exists
if [ ! -d "dist/package" ]; then
    echo "❌ Package not found. Building..."
    npm run build:h5
    mkdir -p dist/package
    cp -r dist/build/h5/* dist/package/
fi

echo "📦 Package found: dist/package/"
echo ""

# Deployment options
echo "Select deployment method:"
echo "1) Netlify (requires Netlify CLI)"
echo "2) Vercel (requires Vercel CLI)"
echo "3) Local server (for testing)"
echo "4) Create deployment package only"
echo "5) Docker deployment"
read -p "Enter choice [1-5]: " choice

case $choice in
    1)
        echo -e "${BLUE}Deploying to Netlify...${NC}"
        if command -v netlify &> /dev/null; then
            cd dist/package
            netlify deploy --prod
            echo -e "${GREEN}✅ Deployed to Netlify!${NC}"
        else
            echo "❌ Netlify CLI not found. Install with: npm install -g netlify-cli"
            exit 1
        fi
        ;;
    2)
        echo -e "${BLUE}Deploying to Vercel...${NC}"
        if command -v vercel &> /dev/null; then
            cd dist/package
            vercel --prod
            echo -e "${GREEN}✅ Deployed to Vercel!${NC}"
        else
            echo "❌ Vercel CLI not found. Install with: npm install -g vercel"
            exit 1
        fi
        ;;
    3)
        echo -e "${BLUE}Starting local server...${NC}"
        cd dist/package
        PORT=${PORT:-8080}
        echo "🌐 Server starting on http://localhost:$PORT"
        if command -v python3 &> /dev/null; then
            python3 -m http.server $PORT
        elif command -v python &> /dev/null; then
            python -m http.server $PORT
        elif command -v npx &> /dev/null; then
            npx serve -p $PORT
        else
            echo "❌ No server found. Install Python or Node.js"
            exit 1
        fi
        ;;
    4)
        echo -e "${GREEN}✅ Package ready in dist/package/${NC}"
        echo "Upload this directory to your hosting service"
        ;;
    5)
        echo -e "${BLUE}Creating Docker deployment...${NC}"
        cat > dist/package/Dockerfile << 'EOF'
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
        cd dist/package
        docker build -t metaic-ai:latest .
        echo -e "${GREEN}✅ Docker image created!${NC}"
        echo "Run with: docker run -p 8080:80 metaic-ai:latest"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

