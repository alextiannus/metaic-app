#!/bin/bash
# iOS Build Script for MetaIC App

echo "📱 Building MetaIC iOS App..."
echo ""

cd "$(dirname "$0")"

# Check Xcode
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ Xcode not found. Please install Xcode from App Store."
    exit 1
fi

echo "✅ Xcode found"
echo ""

# For Uni-app iOS builds, we typically need HBuilderX or use the CLI
# Since we're using CLI, let's prepare the build

echo "📦 Preparing iOS build..."
echo ""

# Check if we need to use HBuilderX or can use CLI
echo "⚠️  Note: Uni-app iOS builds typically require:"
echo "   1. HBuilderX IDE (recommended)"
echo "   2. Or Xcode project generation"
echo ""

# Try to build using uni CLI
echo "🔨 Attempting build with Uni-app CLI..."
uni build -p app-plus --platform ios 2>&1 || {
    echo ""
    echo "📋 Alternative Methods:"
    echo ""
    echo "Method 1: Use HBuilderX (Recommended)"
    echo "   1. Download HBuilderX: https://www.dcloud.io/hbuilderx.html"
    echo "   2. Open this project in HBuilderX"
    echo "   3. Run → Run to iOS App → Run to iOS Simulator"
    echo ""
    echo "Method 2: Generate Xcode Project"
    echo "   1. Use HBuilderX to generate Xcode project"
    echo "   2. Open in Xcode"
    echo "   3. Build and run"
    echo ""
    echo "Method 3: Use Uni-app Cloud Build"
    echo "   1. Use DCloud cloud build service"
    echo "   2. Upload project"
    echo "   3. Build iOS app"
    exit 1
}
