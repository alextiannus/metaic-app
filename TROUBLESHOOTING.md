# Troubleshooting Guide

## If You Cannot See the App

### 1. Check Server Status

**Backend:**
```bash
curl http://localhost:3000/health
```
Should return: `{"status":"ok",...}`

**Frontend:**
```bash
curl http://localhost:5173
```
Should return HTML content.

### 2. Check Browser Console

Open browser developer tools (F12) and check:
- **Console tab** - Look for JavaScript errors
- **Network tab** - Check if resources are loading
- **Elements tab** - Check if HTML is rendering

### 3. Common Issues

#### White/Blank Screen
- Check browser console for errors
- Verify JavaScript is enabled
- Check if there are CORS errors
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

#### Page Loads But No Content
- Check if card data is loading
- Look for API errors in console
- Verify default data is available

#### Connection Errors
- Verify both servers are running
- Check firewall settings
- Try accessing from different browser

### 4. Restart Servers

**Stop all servers:**
```bash
pkill -f "tsx.*index"
pkill -f "vite"
pkill -f "npm.*dev"
```

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend (new terminal):**
```bash
npm run dev:h5
```

### 5. Verify URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API: http://localhost:3000/api/v1

### 6. Check Logs

**Backend logs:**
- Check terminal where backend is running
- Look for error messages
- Verify database connection

**Frontend logs:**
- Check browser console
- Look for network errors
- Check for JavaScript errors

### 7. Test API Directly

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test card endpoint
curl http://localhost:3000/api/v1/cards/alextianye
```

### 8. Clear Browser Cache

- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear cache and reload
- Try incognito/private mode

### 9. Check Port Conflicts

```bash
# Check if ports are in use
lsof -ti:5173
lsof -ti:3000

# If ports are taken, kill processes or change ports
```

### 10. Verify File Structure

Ensure these files exist:
- `src/main.ts`
- `src/App.vue`
- `src/pages/index/index.vue`
- `src/pages.json`

## Still Having Issues?

1. Check the browser console for specific error messages
2. Verify both servers are running
3. Check network connectivity
4. Try accessing from a different browser
5. Check if there are any firewall or security software blocking connections

