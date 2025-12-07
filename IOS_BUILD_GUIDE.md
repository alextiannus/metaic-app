# 📱 iOS Build Guide - MetaIC App

## 🎯 Building iOS App for Testing

Uni-app iOS builds require specific tools and setup. Here are the available methods:

---

## ✅ Method 1: HBuilderX IDE (Recommended - Easiest)

### Step 1: Install HBuilderX
1. **Download HBuilderX:**
   - Visit: https://www.dcloud.io/hbuilderx.html
   - Download the latest version for macOS
   - Install the application

### Step 2: Open Project
1. **Open HBuilderX**
2. **File → Open Directory**
3. **Select:** `/Users/alextian/Documents/GitHub/metaic-app`

### Step 3: Build iOS App
1. **Run → Run to iOS App → Run to iOS Simulator**
   - This will build and launch in iOS Simulator
2. **Or: Run → Run to iOS App → Run to iOS Device**
   - For testing on physical device (requires Apple Developer account)

### Step 4: Generate Xcode Project (Optional)
1. **Run → Run to iOS App → Generate iOS App Resources**
2. **Open generated Xcode project**
3. **Build in Xcode**

---

## ✅ Method 2: Uni-app CLI + Xcode

### Prerequisites
- ✅ Xcode installed (you have this)
- ✅ Xcode Command Line Tools
- ✅ Apple Developer account (for device testing)

### Step 1: Install Uni-app CLI (if needed)
```bash
npm install -g @dcloudio/uni-cli
```

### Step 2: Build iOS Resources
```bash
cd /Users/alextian/Documents/GitHub/metaic-app
uni build -p app-plus --platform ios
```

### Step 3: Open in Xcode
1. **Navigate to:** `dist/build/app-plus/ios/`
2. **Open:** `*.xcodeproj` or `*.xcworkspace` in Xcode
3. **Select target device** (Simulator or Device)
4. **Build and Run** (Cmd+R)

---

## ✅ Method 3: DCloud Cloud Build (No Local Setup)

### Step 1: Register DCloud Account
1. Visit: https://dev.dcloud.net.cn/
2. Register/Login

### Step 2: Create App
1. **Create new app**
2. **Upload project** (zip the project folder)
3. **Select platform:** iOS

### Step 3: Configure
1. **App ID:** `metaic.ai`
2. **Bundle ID:** `ai.metaic.app` (or your custom ID)
3. **Version:** 1.0.0

### Step 4: Build
1. **Click "Build"**
2. **Wait for build to complete**
3. **Download IPA file**

---

## 🔧 Current Project Configuration

### Manifest.json Settings
- **App ID:** `metaic.ai`
- **App Name:** `MetaIC AI`
- **Version:** 1.0.0
- **iOS Config:** Basic (needs enhancement)

### Recommended iOS Configuration

Add to `src/manifest.json` → `app-plus` → `distribute` → `ios`:

```json
"ios": {
    "idfa": false,
    "privacyDescription": {
        "NSPhotoLibraryUsageDescription": "This app needs access to photos",
        "NSCameraUsageDescription": "This app needs access to camera",
        "NSLocationWhenInUseUsageDescription": "This app needs location access"
    },
    "dSYMs": false,
    "urlschemewhitelist": ["metaic", "metaicai"],
    "frameworks": []
}
```

---

## 📋 Build Requirements

### For Simulator Testing:
- ✅ Xcode (you have this)
- ✅ iOS Simulator
- ✅ No Apple Developer account needed

### For Device Testing:
- ✅ Xcode
- ✅ Apple Developer account ($99/year)
- ✅ Provisioning profile
- ✅ Signing certificate

---

## 🚀 Quick Start (HBuilderX Method)

1. **Download HBuilderX:** https://www.dcloud.io/hbuilderx.html
2. **Open project:** `/Users/alextian/Documents/GitHub/metaic-app`
3. **Run → Run to iOS App → Run to iOS Simulator**
4. **Wait for build and launch**

**That's it!** The app will build and launch in iOS Simulator.

---

## 🧪 Testing Options

### iOS Simulator
- **Free** - No Apple Developer account needed
- **Fast** - Quick builds and testing
- **Limitations:** Some features may not work (camera, etc.)

### Physical Device
- **Full features** - All capabilities work
- **Requires:** Apple Developer account
- **Better testing** - Real device performance

---

## 📦 Build Output

After building, you'll find:
- **Xcode Project:** `dist/build/app-plus/ios/`
- **IPA File:** (if built for device)
- **App Bundle:** (for simulator)

---

## 🆘 Troubleshooting

### "Xcode not found"
- Install Xcode from App Store
- Install Command Line Tools: `xcode-select --install`

### "Signing certificate required"
- For simulator: Not needed
- For device: Need Apple Developer account

### "Build failed"
- Check Xcode version compatibility
- Verify manifest.json configuration
- Check for missing dependencies

---

## ✅ Recommended Approach

**For Quick Testing:**
1. Use **HBuilderX** (Method 1)
2. Run to iOS Simulator
3. Test immediately

**For Production:**
1. Use **HBuilderX** to generate Xcode project
2. Open in Xcode
3. Configure signing
4. Build and archive
5. Upload to App Store

---

## 📝 Next Steps

1. **Choose build method** (HBuilderX recommended)
2. **Build iOS app**
3. **Test in simulator or device**
4. **Iterate and improve**

---

**Status:** Ready to build with HBuilderX

**Location:** `/Users/alextian/Documents/GitHub/metaic-app`

