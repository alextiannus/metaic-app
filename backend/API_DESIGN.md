# MetaIC AI - API Design

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
Most endpoints require authentication via Bearer token:
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Business Cards
- `GET /cards/:slug` - Get public card by slug
- `POST /cards` - Create new card (authenticated)
- `PUT /cards/:id` - Update card (authenticated)

### AI Services
- `POST /ai/generate-profile` - Generate profile using AI
  - Input: `{ inputType, imageBase64?, resumeText?, basicInfo? }`
  - Returns: Generated profile data
- `POST /ai/chatbot` - Public chatbot for profile pages
  - Input: `{ cardId, sessionId, message, history? }`
  - Returns: AI response

### Token Management
- `GET /tokens/balance` - Get user token balance and subscription info
- `POST /tokens/verify-lions-club` - Verify Lions Club ID
  - Input: `{ lionsClubId }`
- `POST /tokens/upgrade` - Upgrade subscription tier
  - Input: `{ tierId }`

### Network Insights
- `POST /network/insights/:contactId` - Generate network insights
- `GET /network/insights/:contactId` - Get network insights
- `POST /network/monitoring/:contactId` - Enable change monitoring
  - Input: `{ checkFrequency?, changeTypes? }`
- `GET /network/tags/:contactId` - Get contact tags

### Communication Plans
- `POST /communication/generate/:contactId` - Generate communication plan
  - Input: `{ planType, context? }`
- `GET /communication/plans` - Get all plans (query: `?status=pending`)
- `POST /communication/schedule/:planId` - Schedule communication
  - Input: `{ scheduledDate, channel }`
- `POST /communication/greeting/:contactId` - Generate greeting message

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { ... }
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

## Error Codes

- `AUTH_REQUIRED` - Authentication required
- `AUTH_INVALID` - Invalid or expired token
- `VALIDATION_ERROR` - Request validation failed
- `NOT_FOUND` - Resource not found
- `INSUFFICIENT_TOKENS` - Not enough tokens
- `AI_GENERATION_ERROR` - AI generation failed
- `INTERNAL_ERROR` - Server error

## Rate Limiting

- 100 requests per 15 minutes per IP
- AI endpoints may have additional limits based on token balance

## Environment Variables

Required for full functionality:
- `GEMINI_API_KEY` - Google Gemini API key
- `JWT_SECRET` - JWT signing secret
- `DATABASE_URL` - PostgreSQL connection string
