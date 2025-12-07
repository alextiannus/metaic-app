# MetaIC Backend Services Architecture

## Overview
Microservices architecture for MetaIC platform with clear separation of concerns and scalable design.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway (Kong/Nginx)                │
│                  - Routing, Rate Limiting, Auth              │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼──────┐ ┌─────▼──────┐
│  Auth Service │ │ Card Service│ │ Contact Service│
└───────┬──────┘ └────┬──────┘ └─────┬──────┘
        │              │              │
┌───────▼──────┐ ┌────▼──────┐ ┌─────▼──────┐
│  AI Service  │ │ File Service│ │ Notification│
└───────┬──────┘ └────┬──────┘ └─────┬──────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │      PostgreSQL Database     │
        │      Redis Cache             │
        │      S3/Object Storage       │
        └──────────────────────────────┘
```

## Services

### 1. API Gateway Service
**Technology:** Kong / Nginx / AWS API Gateway  
**Responsibilities:**
- Request routing
- Authentication/Authorization
- Rate limiting
- Request/Response transformation
- API versioning
- CORS handling
- SSL/TLS termination

**Endpoints:**
- All public API routes
- Webhook endpoints

### 2. Authentication Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- User registration
- Login/Logout
- JWT token generation/validation
- OAuth integration (Google, Apple, WeChat)
- Password reset
- Email/Phone verification
- Session management

**Key Features:**
- Multi-factor authentication support
- Social login integration
- Token refresh mechanism
- Account security management

**Database:**
- `users` table
- `sessions` table (Redis)

### 3. Business Card Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- CRUD operations for business cards
- Card data aggregation
- Slug generation and validation
- Card visibility management
- Analytics tracking

**Key Features:**
- Card versioning
- Draft/Publish workflow
- Template system
- Bulk operations

**Database:**
- `business_cards`
- `businesses`
- `business_services`
- `contact_information`
- `social_links`
- `works_and_services`
- `personal_interests`
- `networking_preferences`

### 4. Contact Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- Saved contacts management
- Contact search and filtering
- Tag management
- Meeting context storage
- Follow-up reminders

**Key Features:**
- Contact deduplication
- Import/Export (vCard, CSV)
- Contact enrichment
- Relationship tracking

**Database:**
- `saved_contacts`
- `communication_history`

### 5. AI Service
**Technology:** Python / FastAPI / OpenAI / LangChain  
**Responsibilities:**
- AI conversation management
- Card summary generation
- Networking suggestions
- Communication planning
- Insight generation

**Key Features:**
- Natural language processing
- Context-aware responses
- Multi-language support
- Conversation history

**External Services:**
- OpenAI GPT-4
- Vector database (Pinecone/Weaviate)
- Embedding service

**Database:**
- `ai_conversations`

### 6. File Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- File upload handling
- Image processing and optimization
- QR code generation
- CDN integration
- File storage management

**Key Features:**
- Image resizing/optimization
- Format conversion (WebP)
- Virus scanning
- Storage quota management

**Storage:**
- AWS S3 / Cloudflare R2
- CDN: Cloudflare / AWS CloudFront

### 7. Notification Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- Push notifications
- Email notifications
- SMS notifications
- In-app notifications
- Notification preferences

**Key Features:**
- Multi-channel delivery
- Notification scheduling
- Template system
- Delivery tracking

**External Services:**
- SendGrid (Email)
- Twilio (SMS)
- Firebase Cloud Messaging (Push)

**Database:**
- `notifications`

### 8. Analytics Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- Event tracking
- Analytics aggregation
- Reporting
- Dashboard data

**Key Features:**
- Real-time analytics
- Custom event tracking
- Data export
- Privacy-compliant tracking

**Database:**
- `card_views`
- `card_shares`
- Time-series database (TimescaleDB)

### 9. Search Service
**Technology:** Elasticsearch / Algolia / Meilisearch  
**Responsibilities:**
- Full-text search
- Card indexing
- Search ranking
- Autocomplete

**Key Features:**
- Fuzzy search
- Faceted search
- Relevance ranking
- Search analytics

### 10. Communication Service
**Technology:** Node.js / Express / TypeScript  
**Responsibilities:**
- WhatsApp integration
- Email sending
- In-app messaging
- Communication templates

**External Services:**
- WhatsApp Business API
- SendGrid
- Twilio

**Database:**
- `communication_history`

## Infrastructure Components

### Database
**Primary:** PostgreSQL 14+
- Main application data
- ACID compliance
- Complex queries
- Relationships

**Cache:** Redis
- Session storage
- Rate limiting
- Frequently accessed data
- Real-time features

**Search:** Elasticsearch
- Full-text search
- Analytics
- Log aggregation

**Time-Series:** TimescaleDB (PostgreSQL extension)
- Analytics data
- Metrics storage

### Message Queue
**Technology:** RabbitMQ / AWS SQS / Redis Streams  
**Use Cases:**
- Async task processing
- Email/SMS sending
- File processing
- Analytics events
- Notification delivery

### Object Storage
**Technology:** AWS S3 / Cloudflare R2  
**Use Cases:**
- User avatars
- Business logos
- QR codes
- Card images
- File uploads

### CDN
**Technology:** Cloudflare / AWS CloudFront  
**Use Cases:**
- Static assets
- Images
- API caching

## Data Flow

### Card View Flow
1. User requests card via API Gateway
2. API Gateway validates auth (if required)
3. Card Service fetches card data
4. Card Service increments view counter
5. Analytics Service logs view event
6. Response returned to user

### Contact Save Flow
1. User saves contact via API
2. Contact Service validates data
3. Contact Service creates saved_contact record
4. Notification Service sends notification to card owner
5. AI Service generates follow-up suggestions
6. Response returned to user

### AI Conversation Flow
1. User sends message to AI Service
2. AI Service retrieves card context
3. AI Service queries LLM with context
4. AI Service stores conversation
5. AI Service returns response
6. Response returned to user

## Security

### Authentication & Authorization
- JWT tokens with short expiration
- Refresh token rotation
- Role-based access control (RBAC)
- API key management for webhooks

### Data Protection
- Encryption at rest (database)
- Encryption in transit (TLS 1.3)
- PII data encryption
- GDPR compliance
- Data anonymization for analytics

### API Security
- Rate limiting per user/IP
- Request validation
- SQL injection prevention
- XSS protection
- CSRF tokens

## Scalability

### Horizontal Scaling
- Stateless services
- Load balancing
- Auto-scaling groups
- Container orchestration (Kubernetes)

### Caching Strategy
- Redis for hot data
- CDN for static assets
- Database query caching
- API response caching

### Database Scaling
- Read replicas
- Connection pooling
- Query optimization
- Partitioning for large tables

## Monitoring & Observability

### Logging
- Centralized logging (ELK Stack / Loki)
- Structured logging (JSON)
- Log levels and filtering
- Log retention policies

### Metrics
- Prometheus for metrics collection
- Grafana for visualization
- Custom business metrics
- Infrastructure metrics

### Tracing
- Distributed tracing (Jaeger / Zipkin)
- Request correlation IDs
- Performance monitoring
- Error tracking (Sentry)

### Alerting
- PagerDuty / Opsgenie integration
- Critical error alerts
- Performance degradation alerts
- Capacity alerts

## Deployment

### Environments
- **Development:** Local development
- **Staging:** Pre-production testing
- **Production:** Live environment

### CI/CD
- GitHub Actions / GitLab CI
- Automated testing
- Code quality checks
- Automated deployments
- Blue-green deployments

### Containerization
- Docker containers
- Kubernetes orchestration
- Helm charts
- Service mesh (Istio)

## Technology Stack Summary

| Component | Technology |
|-----------|-----------|
| API Gateway | Kong / Nginx |
| Backend Services | Node.js, TypeScript, Express |
| AI Service | Python, FastAPI, OpenAI |
| Database | PostgreSQL 14+ |
| Cache | Redis |
| Search | Elasticsearch |
| Message Queue | RabbitMQ / AWS SQS |
| Object Storage | AWS S3 / Cloudflare R2 |
| CDN | Cloudflare |
| Monitoring | Prometheus, Grafana |
| Logging | ELK Stack |
| Containerization | Docker, Kubernetes |

## API Documentation
- OpenAPI 3.0 specification
- Swagger UI for interactive docs
- Postman collection
- Code examples

## Development Guidelines
- RESTful API design
- Error handling standards
- Logging standards
- Testing requirements (unit, integration, e2e)
- Code review process
- Documentation requirements

