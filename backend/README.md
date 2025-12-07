# MetaIC Backend API

Backend API server for the MetaIC platform.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+ (optional for development)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start database with Docker (recommended):**
```bash
docker-compose up -d
```

Or use your own PostgreSQL instance.

4. **Set up database:**
```bash
# Make script executable
chmod +x scripts/setup-db.sh

# Run setup script
./scripts/setup-db.sh
```

Or manually:
```bash
createdb metaic
psql metaic < migrations/001_initial_schema.sql
```

5. **Start the server:**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user

### Business Cards
- `GET /api/v1/cards/:slug` - Get public card by slug
- `POST /api/v1/cards` - Create new card (authenticated)
- `PUT /api/v1/cards/:id` - Update card (authenticated)

## Development

### Project Structure
```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── services/         # Service modules
│   │   ├── auth/        # Authentication service
│   │   ├── card/        # Business card service
│   │   └── contact/     # Contact service
│   ├── shared/          # Shared utilities
│   └── index.ts         # Main server file
├── migrations/          # Database migrations
├── scripts/             # Utility scripts
└── package.json
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - Secret for JWT tokens
- `PORT` - Server port (default: 3000)

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## API Documentation

See `API_DESIGN.md` for complete API documentation.

## Database

See `DATABASE_SCHEMA.md` for database schema details.

## Architecture

See `SERVICES_ARCHITECTURE.md` for architecture documentation.

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check connection credentials in `.env`
- Verify database exists: `psql -l | grep metaic`

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using the port

### Redis Connection Issues
- Redis is optional for basic functionality
- Comment out Redis usage if not available

## Next Steps

1. Complete remaining services (Contact, File, AI, etc.)
2. Add comprehensive error handling
3. Implement rate limiting
4. Add API documentation (Swagger)
5. Set up CI/CD pipeline
