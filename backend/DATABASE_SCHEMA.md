# MetaIC AI Database Schema Design

## Overview
This document describes the complete database schema for MetaIC AI platform, including all tables, relationships, and indexes.

## Database: PostgreSQL 14+

## Core Tables

### 1. users
Stores user account information, authentication, and token balance.

**Key Fields:**
- `token_balance` - Current token balance
- `subscription_tier` - Current subscription tier (free, professional, enterprise)
- `lions_club_id` - Lions Club membership ID
- `referral_code` - Unique referral code
- `referred_by_user_id` - User who referred this user

### 2. business_cards
Digital business card information with AI generation tracking.

**Key Fields:**
- `ai_generated` - Whether card was AI-generated
- `last_ai_generation_at` - Last AI generation timestamp
- `edit_count` - Number of manual edits
- `language` - Primary language (en, zh, etc.)

### 3. subscription_tiers
Subscription tier definitions.

**Tiers:**
- Free: 1,000 monthly tokens
- Professional: 10,000 monthly tokens
- Enterprise: Unlimited tokens

### 4. token_transactions
All token transactions (earned, spent, purchased, etc.).

**Transaction Types:**
- `earned` - Monthly allocation, referral rewards
- `spent` - AI feature usage
- `purchased` - Token purchases
- `donation` - Donation rewards
- `referral` - Referral bonuses
- `lions_club` - Lions Club bonuses

### 5. ai_profile_generations
History of AI profile generations.

**Input Types:**
- `business_card_image` - From uploaded card image
- `resume` - From resume/CV text
- `manual_input` - From basic information

### 6. network_insights
AI-generated network insights for contacts.

**Insight Types:**
- `common_connection` - Mutual contacts
- `business_opportunity` - Collaboration opportunities
- `shared_interest` - Common interests
- `conversation_topic` - Conversation starters

### 7. communication_plans
AI-generated communication plans.

**Plan Types:**
- `greeting` - New contact greetings
- `birthday` - Birthday wishes
- `milestone` - Business milestones
- `follow_up` - Follow-up messages
- `check_in` - Regular check-ins

### 8. contact_images
Multiple images per contact for visual memory.

**Image Types:**
- `meeting` - Meeting photos
- `event` - Event photos
- `social` - Social gathering photos
- `other` - Other photos

### 9. contact_tags
AI-generated and manual tags for contacts.

**Tag Categories:**
- `industry` - Industry tags
- `role` - Job role tags
- `interest` - Interest tags
- `connection` - Connection type tags
- `ai_generated` - AI-generated tags
- `manual` - User-created tags

### 10. contact_change_monitoring
Settings for monitoring contact changes.

**Check Frequencies:**
- `daily` - Daily checks
- `weekly` - Weekly checks
- `monthly` - Monthly checks

### 11. contact_changes_detected
Detected changes in monitored contacts.

**Change Types:**
- `job_change` - Job position changes
- `company_change` - Company changes
- `promotion` - Promotions
- `achievement` - Achievements
- `social_update` - Social media updates

### 12. ai_conversations_public
Public chatbot conversations on profile pages.

### 13. profile_visibility_settings
Control visibility of profile sections.

**Visibility Levels:**
- `public` - Visible to everyone
- `contacts_only` - Visible to saved contacts only
- `private` - Hidden

### 14. card_shares_enhanced
Enhanced sharing tracking with multiple methods.

**Share Methods:**
- `qr_code` - QR code scanning
- `url` - URL sharing
- `whatsapp` - WhatsApp sharing
- `image_download` - Image download
- `print_file` - Print file download
- `nfc` - NFC sharing
- `vcard` - vCard export

### 15. donations
Donation records (Buy Me a Coffee integration).

### 16. referrals
Referral tracking and rewards.

### 17. lions_club_organizations
Lions Club organization information.

## Relationships

```
users
  ├── business_cards (1:N)
  ├── saved_contacts (1:N)
  ├── token_transactions (1:N)
  ├── user_subscriptions (1:N)
  └── referrals (1:N as referrer/referred)

business_cards
  ├── businesses (1:N)
  ├── contact_information (1:N)
  ├── social_links (1:N)
  ├── ai_profile_generations (1:N)
  └── profile_visibility_settings (1:N)

saved_contacts
  ├── contact_images (1:N)
  ├── contact_tags (1:N)
  ├── network_insights (1:N)
  ├── communication_plans (1:N)
  └── contact_change_monitoring (1:1)
```

## Indexes

All foreign keys and frequently queried fields are indexed for optimal performance.

## Migration Files

1. `001_initial_schema.sql` - Core tables
2. `002_ai_features.sql` - AI features, tokens, subscriptions

## Data Retention

- Soft deletes used where applicable
- Historical data preserved for analytics
- Token transactions never deleted
