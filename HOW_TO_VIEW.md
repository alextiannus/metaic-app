# How to View the App

## ✅ Both Servers Are Running

- **Frontend:** http://localhost:5173 ✅
- **Backend:** http://localhost:3000 ✅

## 🚀 Steps to View the App

### 1. Open in Browser
Open your web browser and navigate to:
```
http://localhost:5173
```

### 2. If You See a Blank Page

**Check Browser Console:**
1. Press `F12` (or `Cmd+Option+I` on Mac) to open Developer Tools
2. Click on the **Console** tab
3. Look for any red error messages
4. Share the error messages if you see any

**Try Hard Refresh:**
- **Mac:** `Cmd + Shift + R`
- **Windows/Linux:** `Ctrl + Shift + R`

**Check Network Tab:**
1. In Developer Tools, click **Network** tab
2. Refresh the page
3. Look for any failed requests (red)
4. Check if resources are loading

### 3. Common Issues

#### White/Blank Screen
- The page might be loading
- Wait 2-3 seconds
- Check console for errors
- Try hard refresh

#### JavaScript Errors
- Check browser console
- Look for specific error messages
- Verify JavaScript is enabled in browser

#### CORS Errors
- Backend CORS is configured
- If you see CORS errors, check backend logs
- Verify backend is running

### 4. What You Should See

When the app loads, you should see:
- Hero section with avatar and name
- Business card information
- Contact details
- Social links
- All sections from the design

### 5. Still Not Working?

**Verify Servers:**
```bash
# Check frontend
curl http://localhost:5173

# Check backend
curl http://localhost:3000/health
```

**Restart Servers:**
```bash
# Stop all
pkill -f "tsx|vite|npm.*dev"

# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
npm run dev:h5
```

**Check Logs:**
- Backend: Check terminal where backend is running
- Frontend: Check browser console (F12)

## 📞 Need Help?

If you still can't see the app:
1. Share the browser console errors
2. Share what you see (blank page, error message, etc.)
3. Share your browser and OS version
4. Check if JavaScript is enabled

The app should be visible at http://localhost:5173

