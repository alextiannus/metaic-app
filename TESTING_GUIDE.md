# MetaIC Testing Guide

## ✅ Setup Complete!

The application is now ready for testing. Here's what has been set up:

### Backend
- ✅ PostgreSQL database created and migrated
- ✅ Test data seeded (user, card, businesses, contacts, etc.)
- ✅ Backend server running on `http://localhost:3000`
- ✅ API endpoints ready

### Frontend
- ✅ API client configured
- ✅ Ready to connect to backend
- ✅ Fallback to default data if API unavailable

## 🧪 Testing the Application

### 1. Test Backend Health

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-07T...",
  "service": "metaic-backend"
}
```

### 2. Test Card API

```bash
curl http://localhost:3000/api/v1/cards/alextianye
```

This should return the full card data with:
- Personal information
- Businesses
- Contact information
- Social links
- Interests
- Networking preferences

### 3. Test User Registration

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "full_name": "New User",
    "auth_provider": "email"
  }'
```

### 4. Test User Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@immedi.ai",
    "password": "password123"
  }'
```

### 5. Test Frontend

1. Start frontend (if not already running):
```bash
npm run dev:h5
```

2. Visit: `http://localhost:5173`

3. The page should:
   - Load card data from API (if backend is running)
   - Fallback to default data if API is unavailable
   - Display all sections correctly
   - Show loading states appropriately

## 📊 Test Data Available

The database has been seeded with:

**User:**
- Email: `alex@immedi.ai`
- Password: `password123`
- Name: Alex Tian Ye

**Business Card:**
- Slug: `alextianye`
- Full profile with businesses, contacts, social links, etc.

## 🔍 Verification Checklist

- [ ] Backend server is running (`http://localhost:3000/health`)
- [ ] Database is accessible
- [ ] Card API returns data (`/api/v1/cards/alextianye`)
- [ ] Frontend loads successfully
- [ ] Frontend can fetch data from backend
- [ ] All UI sections display correctly
- [ ] API client handles errors gracefully

## 🐛 Troubleshooting

### Backend not starting
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep metaic`
- Check logs in `backend/logs/`

### API returns 404
- Verify card slug exists: `psql metaic -c "SELECT slug FROM business_cards"`
- Check server logs for errors

### Frontend can't connect
- Verify backend is running on port 3000
- Check CORS settings in backend
- Check browser console for errors
- Verify API URL in `src/utils/api.ts`

### Database connection errors
- Check `.env` file has correct credentials
- Verify PostgreSQL user has access
- Try: `psql -h localhost -d metaic -c "SELECT 1"`

## 🚀 Next Steps

1. **Test all API endpoints** - Use Postman or curl
2. **Test frontend-backend integration** - Verify data flows correctly
3. **Test error handling** - Try invalid requests
4. **Test authentication** - Register, login, use protected endpoints
5. **Add more test data** - Create additional cards and users

## 📝 Test Scenarios

### Scenario 1: View Public Card
1. Open `http://localhost:5173`
2. Card should load from API
3. All sections should display
4. View count should increment

### Scenario 2: Register New User
1. Call `/api/v1/auth/register`
2. Receive token
3. Use token to create card
4. View new card

### Scenario 3: Update Card
1. Login as user
2. Get card ID
3. Update card via API
4. Verify changes

## 🎯 Success Criteria

The app is ready for testing when:
- ✅ Backend responds to all endpoints
- ✅ Database has test data
- ✅ Frontend can fetch and display data
- ✅ Error handling works
- ✅ Authentication flow works

## 📞 Support

If you encounter issues:
1. Check server logs
2. Check browser console
3. Verify database state
4. Review error messages
5. Check documentation

Happy testing! 🎉

