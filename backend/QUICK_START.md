# MetaIC Backend - Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ PostgreSQL 14+ installed and running
- ⚠️ Redis (optional, but recommended)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
```

Edit `.env` and set:
- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_NAME=metaic`
- `DB_USER=postgres`
- `DB_PASSWORD=your_password`

### 3. Create Database

**Option A: Using psql**
```bash
createdb metaic
psql metaic < migrations/001_initial_schema.sql
```

**Option B: Using the setup script**
```bash
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh
```

### 4. Start the Server
```bash
npm run dev
```

You should see:
```
✅ Database connected
✅ Redis connected (if available)
🚀 MetaIC Backend API Server running on port 3000
```

### 5. Test the API

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Register a User:**
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

**Get a Card (will use default data for now):**
```bash
curl http://localhost:3000/api/v1/cards/alextianye
```

## Common Issues

### "Database connection error"
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l | grep metaic`

### "Port 3000 already in use"
- Change `PORT` in `.env` to another port (e.g., 3001)
- Or find and kill the process: `lsof -ti:3000 | xargs kill`

### "Redis connection error"
- Redis is optional - the app will work without it
- Some features may be limited without Redis

## Next: Connect Frontend

Once the backend is running, the frontend can connect to it at `http://localhost:3000/api/v1`

The frontend API client is already set up in `src/utils/api.ts` and will automatically use this URL.

