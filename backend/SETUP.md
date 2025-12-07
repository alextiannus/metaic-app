# MetaIC Backend Setup Guide

## Quick Setup (5 minutes)

### Option 1: Using Docker (Recommended)

1. **Start database and Redis:**
```bash
cd backend
docker-compose up -d
```

2. **Set up database:**
```bash
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh
```

3. **Install dependencies:**
```bash
npm install
```

4. **Create .env file:**
```bash
cp .env.example .env
# Edit .env if needed (defaults should work with Docker)
```

5. **Start the server:**
```bash
npm run dev
```

The API will be running at `http://localhost:3000`

### Option 2: Manual Setup

1. **Install PostgreSQL and Redis:**
   - PostgreSQL: https://www.postgresql.org/download/
   - Redis: https://redis.io/download/

2. **Create database:**
```bash
createdb metaic
```

3. **Run migrations:**
```bash
psql metaic < migrations/001_initial_schema.sql
```

4. **Install dependencies:**
```bash
npm install
```

5. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

6. **Start the server:**
```bash
npm run dev
```

## Verify Setup

1. **Check health endpoint:**
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

2. **Test registration:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User",
    "auth_provider": "email"
  }'
```

3. **Test card endpoint:**
```bash
curl http://localhost:3000/api/v1/cards/alextianye
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Verify database exists: `psql -l | grep metaic`

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process: `lsof -ti:3000 | xargs kill`

### Redis Connection Error
- Redis is optional for basic functionality
- The app will work without Redis (some features may be limited)

## Next Steps

1. ✅ Backend is running
2. ✅ Database is set up
3. ✅ API endpoints are available
4. 🔄 Connect frontend to backend
5. 🔄 Test full flow

## Development Workflow

1. **Make code changes** in `src/`
2. **Server auto-reloads** (tsx watch)
3. **Test endpoints** using curl or Postman
4. **Check logs** in console or `logs/` directory

## API Testing

Use the provided examples in `API_EXAMPLES.md` or test with:

- **Postman:** Import the API collection
- **curl:** See examples in `API_EXAMPLES.md`
- **Frontend:** Use the API client in `src/utils/api.ts`

