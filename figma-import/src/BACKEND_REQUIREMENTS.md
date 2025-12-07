# MetaIC Backend Service Requirements

## 📋 Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [AI/ML Services](#aiml-services)
6. [File Storage & CDN](#file-storage--cdn)
7. [Real-time Services](#real-time-services)
8. [Payment Processing](#payment-processing)
9. [Third-Party Integrations](#third-party-integrations)
10. [Security Requirements](#security-requirements)
11. [Infrastructure & DevOps](#infrastructure--devops)
12. [Performance Requirements](#performance-requirements)
13. [Monitoring & Analytics](#monitoring--analytics)

---

## 🏗️ System Architecture Overview

### Tech Stack Recommendations

**Backend Framework:**
- **Node.js + Express** (TypeScript) - Fast, scalable, JavaScript ecosystem
- **Alternative**: Python + FastAPI (better for AI/ML integration)

**Database:**
- **Primary DB**: PostgreSQL 14+ (relational data, ACID compliance)
- **Cache**: Redis 7+ (session management, rate limiting, caching)
- **Search**: Elasticsearch 8+ (contact search, full-text search)
- **Vector DB**: Pinecone or Weaviate (AI embeddings for smart matching)

**AI/ML Services:**
- OpenAI GPT-4 API (conversational AI)
- OpenAI Vision API (card photo analysis)
- Custom ML models (network analysis, relationship scoring)

**File Storage:**
- AWS S3 or Cloudflare R2 (images, QR codes, documents)
- CloudFront or Cloudflare CDN (global distribution)

**Message Queue:**
- AWS SQS or RabbitMQ (async processing, AI tasks)

**Real-time:**
- Socket.io or Pusher (face-to-face exchange, contact radar)

**Payment:**
- Stripe (subscriptions, one-time purchases)

---

## 🔐 Authentication & Authorization

### Authentication Methods

#### 1. Social OAuth (Google, Apple)
**Requirements:**
- OAuth 2.0 implementation
- Google Sign-In SDK integration
- Apple Sign-In SDK integration
- Automatic account creation on first login
- Profile data extraction (name, email, avatar)

**Endpoints:**
```
POST /api/v1/auth/google/callback
POST /api/v1/auth/apple/callback
POST /api/v1/auth/google/connect (link existing account)
POST /api/v1/auth/apple/connect (link existing account)
```

#### 2. Email/Password Authentication
**Requirements:**
- Bcrypt password hashing (cost factor: 12)
- Email verification flow
- Password reset flow
- Account recovery options

**Endpoints:**
```
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/verify-email
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

#### 3. Phone/SMS Authentication
**Requirements:**
- SMS verification via Twilio
- Phone number validation
- OTP generation and verification
- Rate limiting (max 3 attempts per 15 minutes)

**Endpoints:**
```
POST /api/v1/auth/phone/send-otp
POST /api/v1/auth/phone/verify-otp
```

### Session Management
**Requirements:**
- JWT tokens (access + refresh)
- Access token expiry: 15 minutes
- Refresh token expiry: 30 days
- Redis-based session storage
- Device fingerprinting
- Multi-device support

**Endpoints:**
```
POST /api/v1/auth/refresh-token
POST /api/v1/auth/revoke-token
GET  /api/v1/auth/sessions (list active sessions)
DELETE /api/v1/auth/sessions/:sessionId (logout specific device)
```

### Authorization Levels
1. **Free User** - Basic features, 500 tokens/month
2. **Basic User** - Standard features, 2,000 tokens/month
3. **Pro User** - Advanced features, 10,000 tokens/month
4. **Enterprise User** - Unlimited features, custom integrations

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50) UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  password_hash VARCHAR(255), -- nullable for social auth
  full_name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  language VARCHAR(10) DEFAULT 'en', -- en, zh
  timezone VARCHAR(50) DEFAULT 'UTC',
  subscription_tier VARCHAR(20) DEFAULT 'free', -- free, basic, pro, enterprise
  subscription_status VARCHAR(20) DEFAULT 'active', -- active, canceled, expired
  subscription_period_start TIMESTAMP,
  subscription_period_end TIMESTAMP,
  ai_tokens_balance INTEGER DEFAULT 500,
  ai_tokens_used_total INTEGER DEFAULT 0,
  ai_tokens_reset_date TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  has_created_card BOOLEAN DEFAULT FALSE,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  deleted_at TIMESTAMP -- soft delete
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
```

### Social Auth Table
```sql
CREATE TABLE social_auth (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL, -- google, apple, linkedin
  provider_user_id VARCHAR(255) NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP,
  profile_data JSONB, -- raw profile data from provider
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider, provider_user_id)
);

CREATE INDEX idx_social_auth_user_id ON social_auth(user_id);
CREATE INDEX idx_social_auth_provider ON social_auth(provider);
```

### Business Cards Table
```sql
CREATE TABLE business_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_slug VARCHAR(100) UNIQUE, -- for public URLs: metaic.com/card/alex-chen
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  chinese_name VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  title_zh VARCHAR(255),
  tagline TEXT,
  tagline_zh TEXT,
  avatar_url TEXT,
  
  -- Location
  city VARCHAR(100),
  country VARCHAR(100),
  
  -- Professional
  headline TEXT,
  bio TEXT[], -- array of paragraphs
  
  -- Card Customization
  card_style VARCHAR(50) DEFAULT 'default', -- default, minimal, bold, elegant
  theme_color VARCHAR(7) DEFAULT '#FACC15', -- hex color
  layout VARCHAR(50) DEFAULT 'standard', -- standard, compact, detailed
  
  -- Privacy Settings
  is_public BOOLEAN DEFAULT TRUE,
  show_email BOOLEAN DEFAULT TRUE,
  show_phone BOOLEAN DEFAULT TRUE,
  show_address BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  qr_code_url TEXT, -- generated QR code image
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_business_cards_user_id ON business_cards(user_id);
CREATE INDEX idx_business_cards_slug ON business_cards(card_slug);
CREATE INDEX idx_business_cards_public ON business_cards(is_public);
```

### Businesses Table
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  chinese_name VARCHAR(255),
  role VARCHAR(255) NOT NULL,
  role_zh VARCHAR(255),
  description TEXT,
  description_zh TEXT,
  website_url TEXT,
  logo_url TEXT,
  services TEXT[], -- array of services
  services_zh TEXT[],
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_businesses_card_id ON businesses(card_id);
```

### Contact Information Table
```sql
CREATE TABLE contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  info_type VARCHAR(50) NOT NULL, -- phone, email, address, social
  label VARCHAR(100), -- Mobile, Work, Personal, etc.
  value TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  metadata JSONB, -- additional data like country code, is_whatsapp, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_info_card_id ON contact_info(card_id);
CREATE INDEX idx_contact_info_type ON contact_info(info_type);
```

### Social Links Table
```sql
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- linkedin, twitter, facebook, website, etc.
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_social_links_card_id ON social_links(card_id);
```

### Hobbies & Interests Table
```sql
CREATE TABLE hobbies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  hobby VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_hobbies_card_id ON hobbies(card_id);
```

### Looking to Connect With Table
```sql
CREATE TABLE networking_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  target_description VARCHAR(255) NOT NULL,
  target_description_zh VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_networking_targets_card_id ON networking_targets(card_id);
```

### Works & Services Table
```sql
CREATE TABLE works_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url TEXT,
  url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_works_services_card_id ON works_services(card_id);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  contact_user_id UUID REFERENCES users(id), -- if contact is also a MetaIC user
  
  -- Contact Information
  full_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  chinese_name VARCHAR(100),
  title VARCHAR(255),
  company VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  avatar_url TEXT,
  
  -- Relationship Data
  relationship_strength INTEGER DEFAULT 0, -- 0-100 score
  tags TEXT[], -- array of tags
  notes TEXT,
  
  -- Meeting Context
  first_met_at TIMESTAMP,
  first_met_location VARCHAR(255),
  first_met_event VARCHAR(255),
  last_contact_at TIMESTAMP,
  contact_frequency INTEGER DEFAULT 0, -- contacts per month
  
  -- Source
  source VARCHAR(50), -- manual, scan, face_to_face, radar, imported
  source_card_id UUID REFERENCES business_cards(id),
  
  -- AI Analysis
  ai_analysis JSONB, -- AI-generated insights
  communication_plan JSONB, -- AI-generated communication strategy
  last_ai_update_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_contacts_contact_user_id ON contacts(contact_user_id);
CREATE INDEX idx_contacts_company ON contacts(company);
CREATE INDEX idx_contacts_tags ON contacts USING GIN(tags);
```

### Contact Interactions Table
```sql
CREATE TABLE contact_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL, -- email, call, meeting, message, note
  interaction_date TIMESTAMP NOT NULL,
  subject VARCHAR(255),
  content TEXT,
  duration_minutes INTEGER, -- for calls/meetings
  location VARCHAR(255), -- for meetings
  sentiment VARCHAR(20), -- positive, neutral, negative
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_interactions_contact_id ON contact_interactions(contact_id);
CREATE INDEX idx_contact_interactions_date ON contact_interactions(interaction_date);
```

### AI Chat Sessions Table
```sql
CREATE TABLE ai_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_type VARCHAR(50) NOT NULL, -- create_card, scan_contact, network_insights, etc.
  title VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active', -- active, completed, abandoned
  context JSONB, -- session-specific context data
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_ai_chat_sessions_user_id ON ai_chat_sessions(user_id);
CREATE INDEX idx_ai_chat_sessions_type ON ai_chat_sessions(session_type);
```

### AI Chat Messages Table
```sql
CREATE TABLE ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- user, assistant, system
  content TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text', -- text, image, structured_data
  metadata JSONB, -- extracted data, attachments, etc.
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_chat_messages_session_id ON ai_chat_messages(session_id);
```

### AI Token Transactions Table
```sql
CREATE TABLE ai_token_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL, -- usage, purchase, refund, bonus, subscription_renewal
  amount INTEGER NOT NULL, -- positive for additions, negative for usage
  balance_after INTEGER NOT NULL,
  session_id UUID REFERENCES ai_chat_sessions(id),
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_token_transactions_user_id ON ai_token_transactions(user_id);
CREATE INDEX idx_ai_token_transactions_type ON ai_token_transactions(transaction_type);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  tier VARCHAR(20) NOT NULL, -- free, basic, pro, enterprise
  status VARCHAR(20) NOT NULL, -- active, canceled, past_due, unpaid
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMP,
  trial_start TIMESTAMP,
  trial_end TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
```

### Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_id VARCHAR(255) UNIQUE,
  payment_type VARCHAR(50) NOT NULL, -- subscription, token_purchase, tip
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) NOT NULL, -- pending, succeeded, failed, refunded
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_payment_id);
```

### Card Views Table (Analytics)
```sql
CREATE TABLE card_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES users(id), -- null for anonymous viewers
  viewer_ip VARCHAR(45),
  viewer_country VARCHAR(2), -- ISO country code
  viewer_city VARCHAR(100),
  user_agent TEXT,
  referer TEXT,
  view_duration_seconds INTEGER,
  viewed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_card_views_card_id ON card_views(card_id);
CREATE INDEX idx_card_views_date ON card_views(viewed_at);
```

### Contact Exchange Events Table
```sql
CREATE TABLE contact_exchanges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiator_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  exchange_method VARCHAR(50) NOT NULL, -- qr_scan, face_to_face, radar, link
  exchange_location VARCHAR(255),
  exchange_latitude DECIMAL(10, 8),
  exchange_longitude DECIMAL(11, 8),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_exchanges_initiator ON contact_exchanges(initiator_user_id);
CREATE INDEX idx_contact_exchanges_recipient ON contact_exchanges(recipient_user_id);
```

### Network Insights Cache Table
```sql
CREATE TABLE network_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  insight_type VARCHAR(50) NOT NULL, -- industry_breakdown, connection_strength, communication_patterns
  insight_data JSONB NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  UNIQUE(user_id, insight_type)
);

CREATE INDEX idx_network_insights_user_id ON network_insights(user_id);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  notification_type VARCHAR(50) NOT NULL, -- contact_update, new_connection, token_low, subscription_expiry
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
```

---

## 🔌 API Endpoints

### Authentication & User Management

#### Auth Endpoints
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh-token
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/google/callback
POST   /api/v1/auth/apple/callback
POST   /api/v1/auth/phone/send-otp
POST   /api/v1/auth/phone/verify-otp
GET    /api/v1/auth/sessions
DELETE /api/v1/auth/sessions/:sessionId
```

#### User Profile Endpoints
```
GET    /api/v1/users/me
PATCH  /api/v1/users/me
DELETE /api/v1/users/me
PATCH  /api/v1/users/me/language
PATCH  /api/v1/users/me/avatar
GET    /api/v1/users/me/tokens
GET    /api/v1/users/me/subscription
```

### Business Card Endpoints

#### Card CRUD
```
POST   /api/v1/cards                    # Create card
GET    /api/v1/cards/me                 # Get my card
GET    /api/v1/cards/:cardId            # Get card by ID
GET    /api/v1/cards/slug/:slug         # Get public card by slug
PATCH  /api/v1/cards/:cardId            # Update card
DELETE /api/v1/cards/:cardId            # Delete card
POST   /api/v1/cards/:cardId/publish    # Publish card
POST   /api/v1/cards/:cardId/unpublish  # Unpublish card
```

#### Card Components
```
POST   /api/v1/cards/:cardId/businesses       # Add business
PATCH  /api/v1/cards/:cardId/businesses/:id   # Update business
DELETE /api/v1/cards/:cardId/businesses/:id   # Delete business

POST   /api/v1/cards/:cardId/contact-info     # Add contact info
PATCH  /api/v1/cards/:cardId/contact-info/:id # Update contact info
DELETE /api/v1/cards/:cardId/contact-info/:id # Delete contact info

POST   /api/v1/cards/:cardId/social-links     # Add social link
DELETE /api/v1/cards/:cardId/social-links/:id # Delete social link

POST   /api/v1/cards/:cardId/hobbies          # Add hobby
DELETE /api/v1/cards/:cardId/hobbies/:id      # Delete hobby

POST   /api/v1/cards/:cardId/networking-targets # Add target
DELETE /api/v1/cards/:cardId/networking-targets/:id

POST   /api/v1/cards/:cardId/works-services   # Add work/service
DELETE /api/v1/cards/:cardId/works-services/:id
```

#### Card Sharing & Analytics
```
POST   /api/v1/cards/:cardId/qr-code      # Generate QR code
GET    /api/v1/cards/:cardId/share-link   # Get shareable link
POST   /api/v1/cards/:cardId/track-view   # Track card view
GET    /api/v1/cards/:cardId/analytics    # Get card analytics
POST   /api/v1/cards/:cardId/share        # Track share event
```

#### Card Customization
```
PATCH  /api/v1/cards/:cardId/style        # Update card style
PATCH  /api/v1/cards/:cardId/privacy      # Update privacy settings
GET    /api/v1/cards/:cardId/preview      # Preview card changes
```

### Contact Management Endpoints

#### Contacts CRUD
```
GET    /api/v1/contacts                  # List all contacts
POST   /api/v1/contacts                  # Add contact manually
GET    /api/v1/contacts/:contactId       # Get contact details
PATCH  /api/v1/contacts/:contactId       # Update contact
DELETE /api/v1/contacts/:contactId       # Delete contact
GET    /api/v1/contacts/search           # Search contacts (q=query)
```

#### Contact Import/Export
```
POST   /api/v1/contacts/import           # Import contacts (CSV, vCard)
GET    /api/v1/contacts/export           # Export contacts
POST   /api/v1/contacts/scan             # Scan business card (photo)
```

#### Contact Exchange
```
POST   /api/v1/contacts/exchange/initiate      # Start F2F exchange
POST   /api/v1/contacts/exchange/accept        # Accept exchange
POST   /api/v1/contacts/exchange/radar         # Nearby contacts (geolocation)
GET    /api/v1/contacts/exchange/history       # Exchange history
```

#### Contact Interactions
```
GET    /api/v1/contacts/:contactId/interactions        # Get interaction history
POST   /api/v1/contacts/:contactId/interactions        # Add interaction
PATCH  /api/v1/contacts/:contactId/interactions/:id    # Update interaction
DELETE /api/v1/contacts/:contactId/interactions/:id    # Delete interaction
```

#### Contact Tags & Notes
```
POST   /api/v1/contacts/:contactId/tags         # Add tag
DELETE /api/v1/contacts/:contactId/tags/:tag    # Remove tag
PATCH  /api/v1/contacts/:contactId/notes        # Update notes
```

### AI Services Endpoints

#### AI Chat
```
POST   /api/v1/ai/chat/sessions                # Create new chat session
GET    /api/v1/ai/chat/sessions                # List sessions
GET    /api/v1/ai/chat/sessions/:sessionId     # Get session details
POST   /api/v1/ai/chat/sessions/:sessionId/messages  # Send message
DELETE /api/v1/ai/chat/sessions/:sessionId     # Delete session
```

#### AI Card Creation
```
POST   /api/v1/ai/card/analyze-photo           # Upload photo, extract data
POST   /api/v1/ai/card/extract-info            # Extract from LinkedIn/web
POST   /api/v1/ai/card/generate                # Generate card from data
POST   /api/v1/ai/card/suggestions             # Get AI suggestions
```

#### AI Contact Scanning
```
POST   /api/v1/ai/contacts/scan-card           # Scan business card photo
POST   /api/v1/ai/contacts/extract-info        # Extract contact from sources
POST   /api/v1/ai/contacts/enrich              # Enrich contact with AI
```

#### AI Network Insights
```
GET    /api/v1/ai/insights/network             # Get network analysis
GET    /api/v1/ai/insights/industry            # Industry breakdown
GET    /api/v1/ai/insights/connection-strength # Connection strength analysis
GET    /api/v1/ai/insights/recommendations     # Connection recommendations
POST   /api/v1/ai/insights/generate            # Generate new insights
```

#### AI Communication Plans
```
GET    /api/v1/ai/communication-plans/:contactId      # Get comm plan
POST   /api/v1/ai/communication-plans/:contactId      # Generate comm plan
PATCH  /api/v1/ai/communication-plans/:contactId      # Update comm plan
GET    /api/v1/ai/communication-plans/:contactId/history # Get history
```

#### AI Contact Updates
```
GET    /api/v1/ai/contact-updates              # Get recent updates
POST   /api/v1/ai/contact-updates/check        # Check for updates
POST   /api/v1/ai/contact-updates/mark-read/:id # Mark update as read
```

#### AI Token Management
```
GET    /api/v1/ai/tokens/balance               # Get token balance
GET    /api/v1/ai/tokens/usage                 # Get usage history
GET    /api/v1/ai/tokens/cost-estimate         # Estimate cost for action
```

### Subscription & Payment Endpoints

#### Subscriptions
```
GET    /api/v1/subscriptions/plans             # List available plans
GET    /api/v1/subscriptions/current           # Get current subscription
POST   /api/v1/subscriptions/create            # Create subscription
PATCH  /api/v1/subscriptions/change-plan       # Change plan
POST   /api/v1/subscriptions/cancel            # Cancel subscription
POST   /api/v1/subscriptions/reactivate        # Reactivate subscription
GET    /api/v1/subscriptions/invoices          # Get invoices
```

#### Token Purchases
```
POST   /api/v1/tokens/purchase                 # Purchase tokens
GET    /api/v1/tokens/packages                 # Get token packages
```

#### Stripe Webhooks
```
POST   /api/v1/webhooks/stripe                 # Stripe webhook handler
```

### Notifications Endpoints
```
GET    /api/v1/notifications                   # List notifications
GET    /api/v1/notifications/unread-count      # Get unread count
PATCH  /api/v1/notifications/:id/read          # Mark as read
PATCH  /api/v1/notifications/read-all          # Mark all as read
DELETE /api/v1/notifications/:id               # Delete notification
```

### Analytics Endpoints
```
GET    /api/v1/analytics/dashboard             # Dashboard overview
GET    /api/v1/analytics/card-performance      # Card performance metrics
GET    /api/v1/analytics/contact-growth        # Contact growth over time
GET    /api/v1/analytics/engagement            # Engagement metrics
```

### Admin Endpoints (Future)
```
GET    /api/v1/admin/users                     # List all users
GET    /api/v1/admin/users/:userId             # Get user details
PATCH  /api/v1/admin/users/:userId             # Update user
DELETE /api/v1/admin/users/:userId             # Delete user
GET    /api/v1/admin/analytics                 # Platform analytics
POST   /api/v1/admin/tokens/grant              # Grant tokens to user
```

---

## 🤖 AI/ML Services

### 1. Card Photo Analysis Service

**Purpose:** Extract information from user's photo to create business card

**Technology:**
- OpenAI Vision API (GPT-4 Vision)
- Custom OCR fallback (Tesseract.js)

**Input:**
- User photo (selfie or profile picture)
- Optional: LinkedIn profile URL
- Optional: Company website URL

**Process:**
1. **Visual Analysis:**
   - Analyze photo for professional appearance
   - Extract visible text (company name on clothing, background)
   - Assess photo quality and suggest improvements

2. **Web Scraping:**
   - If LinkedIn provided: Extract name, title, company, education, experience
   - If company website provided: Extract company info, role verification
   - Search Google for: "[Name] + [Company]" to find additional info
   - Search LinkedIn, Facebook, Twitter for public profiles

3. **Data Extraction:**
   ```json
   {
     "fullName": "string",
     "chineseName": "string (if applicable)",
     "title": "string",
     "company": "string",
     "email": "string",
     "phone": "string",
     "location": "string",
     "linkedin": "string",
     "website": "string",
     "bio": "string",
     "skills": ["string"],
     "experience": [{"company": "string", "role": "string", "duration": "string"}],
     "education": [{"school": "string", "degree": "string"}],
     "confidence": 0.95
   }
   ```

4. **AI Enhancement:**
   - Generate professional tagline
   - Suggest headline
   - Recommend hobbies/interests based on online presence
   - Suggest networking targets

**API Endpoint:**
```
POST /api/v1/ai/card/analyze-photo
Content-Type: multipart/form-data

{
  "photo": File,
  "linkedinUrl": "optional",
  "companyUrl": "optional"
}

Response:
{
  "extractedData": { ... },
  "suggestions": { ... },
  "confidence": 0.95,
  "tokensUsed": 500
}
```

### 2. Business Card Scanning Service

**Purpose:** Extract contact information from scanned business cards

**Technology:**
- Google Cloud Vision API or AWS Textract
- OpenAI GPT-4 for data structuring
- Custom NLP for entity extraction

**Input:**
- Business card photo/scan

**Process:**
1. **OCR Extraction:**
   - Extract all text from image
   - Identify layout (vertical/horizontal, multi-language)

2. **Entity Recognition:**
   - Name extraction
   - Company name
   - Job title
   - Email addresses
   - Phone numbers (with country code detection)
   - Addresses
   - Website/social URLs
   - Logo detection

3. **Data Structuring:**
   - GPT-4 structures OCR text into JSON
   - Validates email/phone formats
   - Enriches with web search (find LinkedIn, company website)

**API Endpoint:**
```
POST /api/v1/ai/contacts/scan-card
Content-Type: multipart/form-data

{
  "cardImage": File
}

Response:
{
  "contactData": { ... },
  "confidence": 0.92,
  "tokensUsed": 300
}
```

### 3. Network Insights Service

**Purpose:** Analyze user's contact network and provide insights

**Technology:**
- Custom ML model (NetworkX for graph analysis)
- OpenAI GPT-4 for insight generation
- Vector embeddings for similarity matching

**Analysis Types:**

#### a) Industry Breakdown
- Analyze contacts by industry
- Identify dominant sectors
- Suggest untapped industries

#### b) Connection Strength Analysis
- Score each contact (0-100)
- Factors: interaction frequency, recency, interaction quality
- Identify strong vs. weak connections

#### c) Communication Patterns
- Analyze interaction history
- Identify best times to reach contacts
- Suggest optimal communication frequency

#### d) Network Graph Analysis
- Identify clusters/communities
- Find central connectors (people who bridge groups)
- Detect isolated contacts

#### e) Growth Opportunities
- Identify missing connections
- Suggest introductions (mutual connections)
- Recommend events/groups

**API Endpoint:**
```
GET /api/v1/ai/insights/network

Response:
{
  "industryBreakdown": [
    { "industry": "Technology", "count": 45, "percentage": 35 }
  ],
  "connectionStrength": {
    "strong": 15,
    "medium": 45,
    "weak": 40
  },
  "topContacts": [...],
  "recommendations": [...],
  "networkScore": 72,
  "tokensUsed": 200
}
```

### 4. Communication Plan Service

**Purpose:** Generate AI-powered communication strategies for contacts

**Technology:**
- OpenAI GPT-4 Turbo
- Retrieval-Augmented Generation (RAG)
- Contact history analysis

**Input:**
- Contact ID
- Interaction history
- Contact's LinkedIn/social activity
- User's goals

**Output:**
```json
{
  "contactId": "uuid",
  "strategy": {
    "objective": "Strengthen relationship for potential collaboration",
    "approach": "Value-first, non-salesy",
    "timeline": "3-month plan"
  },
  "communicationPlan": [
    {
      "week": 1,
      "action": "Send personalized message referencing recent achievement",
      "channel": "LinkedIn",
      "template": "Hi [Name], congrats on...",
      "expectedOutcome": "Re-establish connection"
    }
  ],
  "talkingPoints": [
    "Recent company funding",
    "Shared interest in AI",
    "Mutual connection: John Doe"
  ],
  "bestTimeToReach": "Weekday mornings 9-11 AM",
  "doNotMention": ["Competitor company"],
  "tokensUsed": 800
}
```

**API Endpoint:**
```
POST /api/v1/ai/communication-plans/:contactId
{
  "goal": "collaboration" | "reconnect" | "sales" | "general"
}
```

### 5. Contact Update Monitoring Service

**Purpose:** Monitor contact's online presence for updates

**Technology:**
- Web scraping (Puppeteer, Playwright)
- LinkedIn API (if available)
- Change detection algorithms
- OpenAI for summarization

**Monitored Sources:**
- LinkedIn (job changes, posts, achievements)
- Company websites (press releases, team pages)
- Twitter/X (public posts)
- Facebook (public posts)
- Company blogs

**Change Detection:**
- Job title changes
- Company changes
- Location changes
- New skills/certifications
- Published articles/content
- Company news (funding, awards, etc.)

**Update Types:**
```json
{
  "updates": [
    {
      "contactId": "uuid",
      "updateType": "job_change",
      "oldValue": "Senior Developer at TechCorp",
      "newValue": "CTO at StartupCo",
      "detectedAt": "2025-01-15T10:00:00Z",
      "source": "LinkedIn",
      "sourceUrl": "https://...",
      "importance": "high",
      "aiSummary": "Alex Chen has been promoted to CTO at StartupCo. This is a significant career advancement and a great opportunity to reach out with congratulations.",
      "suggestedAction": "Send congratulations message within 48 hours"
    }
  ]
}
```

**API Endpoints:**
```
GET  /api/v1/ai/contact-updates           # Get recent updates
POST /api/v1/ai/contact-updates/check    # Trigger update check
POST /api/v1/ai/contact-updates/subscribe/:contactId # Subscribe to updates
```

**Background Job:**
- Runs daily for all contacts
- Priority given to high-value contacts
- Rate-limited to avoid detection/blocking

### 6. AI Chat Service

**Purpose:** Conversational AI for general queries

**Technology:**
- OpenAI GPT-4 Turbo
- Streaming responses
- Context management

**Features:**
- Answer questions about contacts
- Provide networking advice
- Suggest conversation topics
- Draft messages
- Analyze relationships

**Example Queries:**
- "Who should I reach out to this week?"
- "Help me write a message to John about collaboration"
- "Who in my network works in fintech?"
- "What's the best way to reconnect with Sarah?"

**API Endpoint:**
```
POST /api/v1/ai/chat/sessions/:sessionId/messages
{
  "message": "Who should I reach out to this week?",
  "context": { ... }
}

Response (Streaming):
data: {"type": "token", "content": "Based"}
data: {"type": "token", "content": " on"}
data: {"type": "token", "content": " your"}
data: {"type": "done", "tokensUsed": 150}
```

---

## 📦 File Storage & CDN

### Storage Requirements

#### User Uploads
- **Avatars**: Max 5MB, JPG/PNG/WebP
- **Card Photos**: Max 10MB, JPG/PNG
- **Business Card Scans**: Max 10MB, JPG/PNG/PDF
- **Company Logos**: Max 2MB, JPG/PNG/SVG

#### Generated Files
- **QR Codes**: PNG, 512x512px
- **Card Thumbnails**: JPG, 300x400px
- **Exported vCards**: VCF format

### Storage Architecture

**Primary Storage: AWS S3 (or Cloudflare R2)**

Bucket Structure:
```
metaic-production/
├── avatars/
│   ├── original/{userId}.{ext}
│   ├── thumbnail/{userId}_thumb.jpg
│   └── medium/{userId}_medium.jpg
├── cards/
│   ├── photos/{userId}/{cardId}.{ext}
│   └── qr-codes/{cardId}.png
├── contacts/
│   ├── scans/{userId}/{contactId}/{scanId}.{ext}
│   └── avatars/{userId}/{contactId}.{ext}
├── logos/
│   └── {businessId}.{ext}
└── exports/
    └── vcards/{userId}/{exportId}.vcf
```

**CDN: CloudFront or Cloudflare CDN**
- Cache avatars, logos, QR codes (1 year)
- Edge locations: Global
- Image optimization: WebP conversion, responsive sizes

### Image Processing Pipeline

**On Upload:**
1. Validate file type and size
2. Scan for malware (ClamAV)
3. Strip EXIF data (privacy)
4. Generate thumbnails (150x150, 300x300)
5. Convert to WebP (if browser supports)
6. Upload to S3
7. Invalidate CDN cache
8. Return CDN URLs

**API Endpoints:**
```
POST /api/v1/upload/avatar
POST /api/v1/upload/card-photo
POST /api/v1/upload/business-card-scan
POST /api/v1/upload/logo

Response:
{
  "urls": {
    "original": "https://cdn.metaic.com/avatars/original/...",
    "thumbnail": "https://cdn.metaic.com/avatars/thumbnail/...",
    "medium": "https://cdn.metaic.com/avatars/medium/..."
  }
}
```

---

## 🔄 Real-time Services

### 1. Face-to-Face Exchange (WebSocket)

**Technology:** Socket.io or Pusher

**Flow:**
1. User A initiates exchange
2. Server generates unique room ID
3. User A shows QR code or proximity UI
4. User B scans QR or detects via Bluetooth
5. Both users connect to same room via WebSocket
6. Server validates both parties
7. Card data exchanged in real-time
8. Success notification to both

**WebSocket Events:**
```javascript
// Client -> Server
socket.emit('exchange:initiate', { userId: 'uuid' });
socket.emit('exchange:join', { roomId: 'room123', userId: 'uuid' });
socket.emit('exchange:confirm', { roomId: 'room123' });

// Server -> Client
socket.on('exchange:room-created', { roomId, qrCode });
socket.on('exchange:partner-joined', { partnerId, partnerName });
socket.on('exchange:data', { cardData });
socket.on('exchange:success', { contactId });
socket.on('exchange:error', { message });
```

**API Endpoints:**
```
POST /api/v1/realtime/exchange/initiate
POST /api/v1/realtime/exchange/join
POST /api/v1/realtime/exchange/confirm
GET  /api/v1/realtime/exchange/status/:roomId
```

### 2. Contact Radar (Geolocation)

**Technology:** Socket.io + Geolocation

**Flow:**
1. User enables radar
2. Client sends location every 5 seconds
3. Server queries nearby users (within 50m)
4. Server sends list of nearby contacts
5. User can initiate exchange with nearby contact

**Geospatial Query:**
```sql
-- PostgreSQL with PostGIS extension
SELECT u.id, u.full_name, u.avatar_url,
       ST_Distance(
         ST_SetSRID(ST_MakePoint(u.longitude, u.latitude), 4326),
         ST_SetSRID(ST_MakePoint($1, $2), 4326)
       ) AS distance
FROM users u
WHERE u.id != $3
  AND u.radar_enabled = true
  AND ST_DWithin(
    ST_SetSRID(ST_MakePoint(u.longitude, u.latitude), 4326),
    ST_SetSRID(ST_MakePoint($1, $2), 4326),
    50 -- 50 meters
  )
ORDER BY distance ASC
LIMIT 20;
```

**WebSocket Events:**
```javascript
socket.emit('radar:enable', { latitude, longitude });
socket.emit('radar:update-location', { latitude, longitude });
socket.emit('radar:disable');

socket.on('radar:contacts-nearby', { contacts: [...] });
socket.on('radar:contact-approaching', { contact });
socket.on('radar:contact-left', { contactId });
```

### 3. Notifications (Server-Sent Events or WebSocket)

**Real-time Notifications:**
- New contact added you
- Contact updated their info
- AI found updates for your contacts
- Token balance low
- Subscription expiring soon

**WebSocket Events:**
```javascript
socket.on('notification:new', { notification });
socket.on('notification:update', { notificationId, status });
```

---

## 💳 Payment Processing

### Stripe Integration

#### Subscription Management

**Products:**
1. **Basic Plan** - $9.99/month (price_basic_monthly)
2. **Pro Plan** - $29.99/month (price_pro_monthly)
3. **Enterprise Plan** - Contact Sales (custom pricing)

**Webhook Events to Handle:**
```javascript
// Subscription events
'customer.subscription.created'
'customer.subscription.updated'
'customer.subscription.deleted'
'customer.subscription.trial_will_end'

// Payment events
'invoice.payment_succeeded'
'invoice.payment_failed'
'payment_intent.succeeded'
'payment_intent.payment_failed'

// Customer events
'customer.created'
'customer.updated'
'customer.deleted'
```

**Webhook Handler:**
```javascript
POST /api/v1/webhooks/stripe

Process:
1. Verify webhook signature
2. Parse event type
3. Update database accordingly
4. Send notification to user (if applicable)
5. Log event
6. Return 200 OK
```

#### Token Purchases (One-time payments)

**Products:**
- 100 tokens - $2.99
- 500 tokens - $9.99 (17% savings)
- 1,000 tokens - $17.99 (40% savings)

**Flow:**
1. User selects token package
2. Create Stripe Checkout Session
3. Redirect to Stripe
4. User completes payment
5. Webhook receives `payment_intent.succeeded`
6. Add tokens to user's balance
7. Redirect user back to app

**API Endpoints:**
```
POST /api/v1/payments/create-checkout-session
GET  /api/v1/payments/checkout/success
GET  /api/v1/payments/checkout/cancel
```

#### Subscription Management API
```
POST /api/v1/subscriptions/create
  - Creates Stripe Customer
  - Creates Stripe Subscription
  - Returns client_secret for confirmation

POST /api/v1/subscriptions/change-plan
  - Updates Stripe Subscription
  - Prorates billing

POST /api/v1/subscriptions/cancel
  - Cancels at period end
  - User retains access until end date

POST /api/v1/subscriptions/reactivate
  - Removes cancel_at_period_end flag

GET /api/v1/subscriptions/billing-portal
  - Returns Stripe Customer Portal URL
  - User can manage payment methods, view invoices
```

---

## 🔗 Third-Party Integrations

### 1. LinkedIn API (if available)

**Purpose:** Extract user data, monitor updates

**OAuth Flow:**
```
GET /api/v1/integrations/linkedin/authorize
  - Redirects to LinkedIn OAuth
  
GET /api/v1/integrations/linkedin/callback
  - Handles OAuth callback
  - Stores access token
  - Extracts profile data
```

**Permissions Needed:**
- `r_basicprofile` - Basic profile info
- `r_emailaddress` - Email address
- `w_member_social` - (if posting enabled)

### 2. Google Contacts API

**Purpose:** Import contacts from Google

**OAuth Flow:**
```
GET /api/v1/integrations/google/authorize
GET /api/v1/integrations/google/callback
POST /api/v1/integrations/google/import-contacts
```

### 3. Email Service (SendGrid or AWS SES)

**Purpose:** Transactional emails

**Email Types:**
- Welcome email
- Email verification
- Password reset
- Subscription confirmation
- Invoice receipts
- Token purchase confirmation
- Weekly network digest
- Contact update alerts

**Templates:**
```
/email-templates/
├── welcome.html
├── verify-email.html
├── reset-password.html
├── subscription-confirmation.html
├── invoice.html
├── token-purchase.html
├── weekly-digest.html
└── contact-update.html
```

### 4. SMS Service (Twilio)

**Purpose:** Phone verification, SMS notifications

**SMS Types:**
- OTP codes
- Login alerts
- Subscription expiry warnings

### 5. Web Scraping Service

**Purpose:** Monitor contact updates

**Tools:**
- Puppeteer (headless browser)
- Cheerio (HTML parsing)
- Bright Data or ScraperAPI (proxy service)

**Rate Limiting:**
- Max 1 request per domain per 5 seconds
- Rotate proxies
- Respect robots.txt
- Cache results (24 hours)

---

## 🔒 Security Requirements

### 1. Authentication Security

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase, 1 lowercase, 1 number
- Bcrypt hashing (cost factor: 12)
- Password history (last 5 passwords)

**JWT Security:**
- Access token: 15 minutes expiry
- Refresh token: 30 days expiry
- Rotate refresh tokens on use
- Blacklist revoked tokens (Redis)
- Sign with RS256 (asymmetric keys)

**Rate Limiting:**
```
/auth/login: 5 attempts per 15 minutes per IP
/auth/register: 3 attempts per hour per IP
/auth/forgot-password: 3 attempts per hour per IP
/auth/phone/send-otp: 3 attempts per 15 minutes per phone
```

### 2. API Security

**Authentication:**
- All endpoints (except public card view) require JWT
- Bearer token in Authorization header
- Validate token on every request

**CORS:**
```javascript
{
  origin: ['https://metaic.com', 'https://www.metaic.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

**Rate Limiting (per user):**
```
Global: 1000 requests per 15 minutes
AI endpoints: 50 requests per hour
Upload endpoints: 10 requests per hour
```

**Input Validation:**
- Validate all inputs with Joi or Zod
- Sanitize HTML inputs
- Validate file uploads (type, size, content)
- Parameterized SQL queries (prevent SQL injection)

### 3. Data Privacy

**PII Protection:**
- Encrypt sensitive data at rest (AES-256)
- Email addresses hashed for search
- Phone numbers encrypted
- Social security numbers not stored

**GDPR Compliance:**
- Right to access (export data)
- Right to deletion (soft delete + hard delete after 30 days)
- Right to portability (export in JSON/CSV)
- Privacy policy acceptance required
- Cookie consent

**Data Retention:**
- Active users: Indefinite
- Deleted accounts: 30 days (soft delete), then purged
- Logs: 90 days
- Analytics: Anonymized after 12 months

### 4. File Upload Security

**Validation:**
- Check file type (magic bytes, not just extension)
- Scan for malware (ClamAV)
- Strip EXIF data
- Re-encode images (prevent exploits)
- Max file sizes enforced

**Storage:**
- Private S3 buckets (no public list)
- Signed URLs for temporary access
- CDN with authentication for sensitive files

---

## 🏗️ Infrastructure & DevOps

### Technology Stack

**Backend:**
- Node.js 20 LTS + Express (TypeScript)
- PostgreSQL 14+ (primary database)
- Redis 7+ (cache, sessions, queues)
- Elasticsearch 8+ (search)

**Hosting:**
- **Production**: AWS (or GCP, Azure)
  - EC2 or ECS for application servers
  - RDS for PostgreSQL
  - ElastiCache for Redis
  - S3 for file storage
  - CloudFront for CDN
  - Route 53 for DNS
  
- **Alternative**: Vercel/Netlify (frontend), Railway/Render (backend)

**CI/CD:**
- GitHub Actions or GitLab CI
- Automated testing
- Automated deployment (staging + production)
- Database migrations (Prisma Migrate or Flyway)

### Architecture Diagram

```
[Client Apps] → [CloudFront CDN]
                      ↓
              [Load Balancer]
                      ↓
           [Application Servers] (Auto-scaling)
                      ↓
    ┌─────────────────┼─────────────────┐
    ↓                 ↓                 ↓
[PostgreSQL]      [Redis]        [Elasticsearch]
    ↓
[S3 Storage]

[Background Jobs Queue] → [Worker Servers]
    ↓
[AI Services (OpenAI API)]
```

### Environments

**Development:**
- Local Docker Compose setup
- Seeded database
- Mock AI responses (fast)

**Staging:**
- Mirrors production
- Real AI but limited tokens
- Test payment mode (Stripe Test)

**Production:**
- High availability (multi-AZ)
- Auto-scaling
- Real AI and payments
- Full monitoring

### Database Backups

**Automated Backups:**
- Daily full backups (retained 30 days)
- Hourly incremental backups (retained 7 days)
- Point-in-time recovery enabled
- Cross-region replication (disaster recovery)

### Monitoring & Alerting

**Metrics to Monitor:**
- Request rate, latency, error rate
- Database connections, query performance
- Redis memory usage
- AI token consumption rate
- Payment success/failure rates
- User signup/churn rates

**Alerting:**
- Error rate > 1% → Page on-call
- API latency > 2s → Slack alert
- Database CPU > 80% → Email alert
- AI API failures → Immediate notification
- Payment webhook failures → Critical alert

**Tools:**
- Datadog or New Relic (APM)
- Sentry (error tracking)
- PagerDuty (on-call management)
- Grafana + Prometheus (metrics visualization)

---

## ⚡ Performance Requirements

### Response Time SLAs

**API Endpoints:**
- Authentication: < 200ms (p95)
- Card retrieval: < 150ms (p95)
- Contact list: < 300ms (p95)
- Search: < 500ms (p95)
- AI chat: < 2s first token (streaming)
- AI analysis: < 10s (with progress updates)

**Database Queries:**
- Simple queries: < 50ms
- Complex queries: < 200ms
- Full-text search: < 500ms

### Scalability Targets

**Year 1:**
- 100,000 users
- 1M business cards
- 10M contacts
- 100K AI requests/day

**Year 3:**
- 1M users
- 10M business cards
- 100M contacts
- 1M AI requests/day

### Optimization Strategies

**Database:**
- Proper indexing (see schema above)
- Connection pooling (PgBouncer)
- Read replicas for heavy read operations
- Partitioning for large tables (card_views, ai_chat_messages)

**Caching:**
- Redis for:
  - User sessions
  - API rate limiting
  - Frequently accessed cards (public profiles)
  - AI insights (24-hour cache)
  - Network analytics (1-hour cache)

**CDN:**
- Cache all static assets (images, logos, QR codes)
- Cache public card HTML (5 minutes)
- Edge caching for global distribution

**Background Jobs:**
- Queue heavy operations (AI analysis, email sending)
- Process asynchronously
- Retry logic with exponential backoff

---

## 📊 Monitoring & Analytics

### Application Monitoring

**Key Metrics:**
```
- Requests per second (RPS)
- Average response time
- Error rate (4xx, 5xx)
- Database query time
- Cache hit rate
- AI token consumption
- Active users (DAU, MAU)
- Subscription conversion rate
- Churn rate
```

**Logging:**
```
- Structured JSON logs
- Log levels: DEBUG, INFO, WARN, ERROR
- Correlation IDs for request tracing
- User actions logged (audit trail)
- AI interactions logged
- Payment events logged
```

**Tools:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Datadog APM
- Sentry for error tracking

### Business Analytics

**User Metrics:**
- New signups per day/week/month
- Activation rate (created first card)
- Retention rate (D1, D7, D30)
- Churn rate
- LTV (Lifetime Value)

**Feature Usage:**
- Most used AI features
- Card views/shares per user
- Contact additions per user
- Average contacts per user
- Network size distribution

**Revenue Metrics:**
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- ARPU (Average Revenue Per User)
- Subscription conversion rate
- Token purchase rate
- Payment failure rate

**Tools:**
- Mixpanel or Amplitude (product analytics)
- Google Analytics (web traffic)
- Custom dashboard (internal)

---

## 🚀 Deployment Strategy

### Phase 1: MVP (Months 1-3)
- Authentication (email/password, Google, Apple)
- Basic card creation (manual input)
- Card sharing (QR code, link)
- Contact management (manual add)
- Basic AI chat (GPT-4)
- Free tier only

### Phase 2: AI Features (Months 4-6)
- AI card creation (photo analysis)
- AI contact scanning
- Network insights
- Communication plans
- Contact update monitoring
- Subscription tiers

### Phase 3: Advanced Features (Months 7-12)
- Face-to-face exchange
- Contact radar
- Real-time notifications
- Advanced analytics
- Team features (basic)
- API for developers

### Phase 4: Enterprise (Year 2)
- Custom integrations
- White-label solution
- Advanced team features
- CRM integrations
- Dedicated support
- SLA guarantees

---

## 📝 API Documentation

**Documentation Tool:** Swagger/OpenAPI 3.0

**Must Include:**
- All endpoints with descriptions
- Request/response schemas
- Authentication requirements
- Rate limiting info
- Error codes and messages
- Code examples (JavaScript, Python, cURL)
- Webhook documentation
- Changelog

**Example:**
```yaml
/api/v1/cards/{cardId}:
  get:
    summary: Get business card by ID
    description: Retrieves a business card. Returns public data if not authenticated, or full data if owner.
    parameters:
      - name: cardId
        in: path
        required: true
        schema:
          type: string
          format: uuid
    responses:
      200:
        description: Card retrieved successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BusinessCard'
      404:
        description: Card not found
      403:
        description: Access denied (private card)
```

---

## 🔮 Future Enhancements

### Advanced AI Features
- Sentiment analysis of interactions
- Predictive networking (who to reach out to)
- AI-written emails (draft assistance)
- Voice-to-card (voice input for card creation)
- Multi-language support (auto-translate cards)

### Integrations
- Salesforce CRM
- HubSpot CRM
- Zapier integration
- Calendar integration (Google Calendar, Outlook)
- Email signature generator

### Team Features
- Shared contact pools
- Team analytics
- Role-based access control
- Activity feed for team
- Collaborative notes

### Advanced Networking
- Event check-in (QR code at events)
- Virtual business card exchange (Zoom, Teams)
- Networking groups/communities
- Referral tracking
- Introduction requests

---

## ✅ Technical Requirements Checklist

### Infrastructure
- [ ] Set up PostgreSQL database (RDS or managed)
- [ ] Set up Redis cache (ElastiCache or managed)
- [ ] Configure S3 buckets (private + public)
- [ ] Set up CDN (CloudFront or Cloudflare)
- [ ] Configure domain and SSL certificates
- [ ] Set up load balancer
- [ ] Configure auto-scaling

### Backend Services
- [ ] Build authentication system (JWT, OAuth)
- [ ] Implement all API endpoints
- [ ] Set up database migrations
- [ ] Implement rate limiting
- [ ] Set up CORS
- [ ] Implement input validation
- [ ] Add error handling and logging

### AI/ML Services
- [ ] Integrate OpenAI API
- [ ] Build card photo analysis
- [ ] Build business card scanning
- [ ] Implement network insights algorithm
- [ ] Build communication plan generator
- [ ] Set up contact update monitoring
- [ ] Implement AI chat with streaming

### Payment Integration
- [ ] Set up Stripe account
- [ ] Create subscription products
- [ ] Create token packages
- [ ] Implement webhook handling
- [ ] Build subscription management
- [ ] Test payment flows

### Real-time Services
- [ ] Set up WebSocket server (Socket.io)
- [ ] Implement face-to-face exchange
- [ ] Implement contact radar (geolocation)
- [ ] Set up notification system

### File Storage
- [ ] Implement file upload endpoints
- [ ] Set up image processing pipeline
- [ ] Configure CDN caching
- [ ] Implement QR code generation

### Security
- [ ] Implement rate limiting
- [ ] Set up malware scanning
- [ ] Configure HTTPS/TLS
- [ ] Implement CSRF protection
- [ ] Set up security headers
- [ ] Conduct security audit

### Monitoring & DevOps
- [ ] Set up error tracking (Sentry)
- [ ] Configure APM (Datadog/New Relic)
- [ ] Set up log aggregation
- [ ] Configure alerting
- [ ] Set up CI/CD pipeline
- [ ] Configure automated backups
- [ ] Write deployment documentation

### Documentation
- [ ] Write API documentation (Swagger)
- [ ] Create database schema documentation
- [ ] Write deployment guide
- [ ] Create runbook for common issues
- [ ] Document environment variables
- [ ] Create developer onboarding guide

---

## 🎯 Success Metrics

### Technical KPIs
- **Uptime:** 99.9% (target: 99.95%)
- **API Response Time:** < 200ms (p95)
- **Error Rate:** < 0.5%
- **AI Success Rate:** > 95%
- **Payment Success Rate:** > 98%

### Business KPIs
- **User Activation:** 70% create card within 24 hours
- **Retention:** 60% DAU/MAU ratio
- **Conversion:** 10% free to paid
- **NPS Score:** > 50
- **Churn Rate:** < 5% monthly

---

## 📞 Support & Maintenance

### Support Channels
- In-app chat support
- Email support (support@metaic.com)
- Knowledge base / Help Center
- Community forum
- Status page (status.metaic.com)

### Maintenance Windows
- Database maintenance: Sundays 2-4 AM UTC
- Planned downtime: < 4 hours/year
- Emergency patches: As needed (with notification)

### SLA Commitments
- **Free Tier:** Best effort, no SLA
- **Basic Tier:** 99.5% uptime, 24-hour support response
- **Pro Tier:** 99.9% uptime, 8-hour support response
- **Enterprise Tier:** 99.95% uptime, 1-hour support response, dedicated account manager

---

**End of Backend Requirements Document**

This comprehensive backend specification covers all aspects needed to build a production-ready, scalable, and secure backend for MetaIC. Adjust priorities and technologies based on team expertise and budget constraints.
