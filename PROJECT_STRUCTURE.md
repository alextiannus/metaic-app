# 📁 MetaIC AI - Project Structure

## 🎯 Project Location
```
/Users/alextian/Documents/GitHub/metaic-app
```

## 📦 Directory Structure

```
metaic-app/
├── backend/                 # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── config/         # Database, Redis, Logger configs
│   │   ├── services/       # API services
│   │   │   ├── ai/         # AI service (Gemini)
│   │   │   ├── auth/       # Authentication
│   │   │   ├── card/       # Business cards
│   │   │   ├── communication/  # Communication plans
│   │   │   ├── network/    # Network insights
│   │   │   └── token/      # Token management
│   │   └── shared/         # Middleware, types
│   ├── migrations/         # Database migrations
│   └── scripts/            # Setup scripts
│
├── src/                     # Frontend Uni-app (Vue 3)
│   ├── pages/              # App pages
│   │   └── index/          # Main landing page
│   ├── composables/        # Vue composables
│   ├── utils/              # Utilities (API, Figma)
│   ├── static/             # Static assets (logo, favicon)
│   └── styles/             # SCSS styles
│
├── website/                 # Landing page (metaic.ai)
│   ├── index.html          # Main landing page
│   ├── favicon.svg         # Favicon
│   ├── netlify.toml        # Netlify config
│   └── README.md           # Deployment guide
│
├── figma-import/            # Figma design files
│   └── src/                # React components (reference)
│
└── Documentation files
    ├── PRD.md              # Product Requirements
    ├── DEPLOYMENT_STEPS.md  # Deployment guide
    └── ...
```

## 🔑 Key Files

### Frontend
- `src/pages/index/index.vue` - Main business card page
- `src/utils/api.ts` - API client
- `src/composables/useApi.ts` - API composable
- `package.json` - Frontend dependencies

### Backend
- `backend/src/index.ts` - Server entry point
- `backend/src/services/*/` - All API services
- `backend/migrations/` - Database migrations
- `backend/package.json` - Backend dependencies

### Website
- `website/index.html` - Landing page
- `website/netlify.toml` - Netlify configuration

## 🚀 Quick Start

### Development
```bash
# Frontend
npm run dev:h5

# Backend
cd backend && npm run dev
```

### Access
- Frontend: http://localhost:5173 (or 5174)
- Backend: http://localhost:3000
- API: http://localhost:3000/api/v1

## 📊 Project Stats
- **Total Files:** 137+ source files
- **Backend Services:** 6 services
- **Frontend Pages:** 1 main page
- **Database Tables:** 20+ tables

## 🎯 Next Steps
1. Open project in Cursor
2. Review code structure
3. Continue with deployment
4. Push to GitHub
5. Deploy to Netlify

---

**Location:** `/Users/alextian/Documents/GitHub/metaic-app`

