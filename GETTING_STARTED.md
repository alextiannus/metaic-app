# MetaIC - Getting Started Guide

## 🎉 Welcome!

This guide will help you get the MetaIC application up and running.

## Quick Start (5 minutes)

### 1. Start Backend Server

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Note:** You'll need PostgreSQL running. See setup options below.

### 2. Start Frontend

In a new terminal:
```bash
npm run dev:h5
```

Visit: `http://localhost:5173`

## Setup Options

### Option A: Docker (Easiest)

```bash
cd backend
docker-compose up -d
./scripts/setup-db.sh
npm run dev
```

### Option B: Local PostgreSQL

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create database:
```bash
createdb metaic
psql metaic < backend/migrations/001_initial_schema.sql
```
3. Update `backend/.env` with your database credentials
4. Start backend: `cd backend && npm run dev`

### Option C: Skip Database (Development Only)

The frontend will work with mock data. Backend features will be limited.

## What's Included

### ✅ Frontend (Complete)
- Full landing page design
- All sections from Figma
- API client ready
- Responsive design

### ✅ Backend (Foundation)
- Authentication service
- Business card service
- Database schema
- API server

### 📚 Documentation
- PRD (Product Requirements)
- Database schema
- API design
- Architecture docs

## Project Structure

```
metaic-app/
├── src/              # Frontend (Uni-app Vue 3)
├── backend/          # Backend API (Node.js/Express)
├── backend/
│   ├── src/         # Backend source code
│   ├── migrations/  # Database migrations
│   └── docs/        # Backend documentation
└── docs/            # Project documentation
```

## API Endpoints

**Base URL:** `http://localhost:3000/api/v1`

- `GET /health` - Health check
- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `GET /cards/:slug` - Get card
- `POST /cards` - Create card

See `backend/API_DESIGN.md` for complete API documentation.

## Next Steps

1. ✅ Set up database (see options above)
2. ✅ Start backend server
3. ✅ Start frontend
4. 🔄 Test API endpoints
5. 🔄 Connect frontend to backend
6. 🔄 Add more features

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep metaic`
- Check `.env` file exists and has correct credentials

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS settings in `backend/src/index.ts`
- Verify API URL in `src/utils/api.ts`

### Database errors
- Run migrations: `psql metaic < backend/migrations/001_initial_schema.sql`
- Check database connection in `.env`

## Development Workflow

1. **Backend changes:** Edit files in `backend/src/`, server auto-reloads
2. **Frontend changes:** Edit files in `src/`, dev server hot-reloads
3. **Database changes:** Update migrations, run migration script
4. **Test:** Use curl, Postman, or the frontend

## Resources

- **API Docs:** `backend/API_DESIGN.md`
- **Database:** `backend/DATABASE_SCHEMA.md`
- **Architecture:** `backend/SERVICES_ARCHITECTURE.md`
- **PRD:** `PRD.md`
- **Setup:** `backend/QUICK_START.md`

## Support

For issues or questions:
1. Check the documentation
2. Review error logs
3. Check GitHub issues (if applicable)

Happy coding! 🚀

