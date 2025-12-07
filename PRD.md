# MetaIC AI - Product Requirements Document (PRD)

## 1. Executive Summary

**Product Name:** MetaIC AI  
**Version:** 2.0  
**Domain:** MetaIC.ai  
**Last Updated:** December 2024

MetaIC AI is an AI-powered digital business card and networking platform that revolutionizes professional networking through intelligent profile generation, network insights, and automated communication management. Built on Google's Gemini AI, MetaIC AI helps professionals create stunning digital profiles, discover meaningful connections, and maintain relationships effortlessly.

## 2. Product Overview

### 2.1 Vision
To become the world's leading AI-powered professional networking platform, where every professional can effortlessly create, share, and manage their digital identity while building meaningful connections through intelligent automation.

### 2.2 Mission
Empower professionals with AI-driven tools to create personalized digital profiles, discover network opportunities, and maintain meaningful relationships through intelligent automation and insights.

### 2.3 Target Users
- **Primary:** Entrepreneurs, business professionals, consultants, freelancers, sales professionals
- **Secondary:** Event attendees, conference participants, networking enthusiasts
- **Tertiary:** Students, job seekers, Lions Club members
- **Enterprise:** Organizations, teams, Lions Club International

### 2.4 Domain & URL Structure
- **Main Domain:** MetaIC.ai
- **User Profile URLs:** metaic.ai/u/{username}
  - Example: metaic.ai/u/alextianye
- **Product Website:** MetaIC.ai

## 3. Core Features

### 3.1 Application Structure

**Four Main Menus:**
1. **My Card** - Personal profile management and customization
2. **Contacts** - Contact management and network insights
3. **AI** - Core AI features powered by Gemini
4. **Settings** - Account, subscription, and preferences

### 3.2 AI-Powered Profile Generation (Core Feature)

**Profile Creation Methods:**
- Upload business card image → AI extracts and generates profile
- Upload resume/CV → AI generates comprehensive profile
- Input basic information → AI enriches with web research
- Manual input with AI assistance

**AI Capabilities:**
- Automatic information extraction from images
- Web research and data enrichment
- Professional bio generation
- Multi-language content generation
- Theme and design suggestions
- SEO optimization for profile pages

**Profile Customization:**
- AI-generated content can be edited
- Users can hide/show specific profile sections
- Multi-language support (default English, supports Chinese and others)
- Custom branding and themes

### 3.3 Network Insights & Contact Discovery

**AI-Powered Network Analysis:**
- When adding a new contact, AI searches MetaIC database
- Combines with web search for comprehensive insights
- Discovers common connections, interests, and opportunities
- Identifies business opportunities and collaboration potential
- Suggests conversation topics and connection points

**Automatic Contact Tagging:**
- AI automatically tags contacts based on:
  - Industry, role, company
  - Common interests and connections
  - Meeting context and location
  - Communication history
  - Network insights

**Network Insights Updates:**
- AI monitors contact changes based on user settings
- Automatic discovery of:
  - Job changes
  - Company updates
  - Social media activity
  - News and achievements
- Updates network insights automatically
- Refreshes communication plans

### 3.4 Communication Plan Management

**AI-Generated Communication Plans:**
- **Greeting Messages:** Personalized messages for new contacts with meeting context
- **Birthday Wishes:** Automated birthday greetings
- **Business Milestones:** Opening celebrations, promotions, achievements
- **Follow-up Reminders:** Context-aware follow-up suggestions
- **Relationship Maintenance:** Regular check-in suggestions

**Automation Features:**
- Schedule communications based on user preferences
- Template generation with personalization
- Multi-channel support (WhatsApp, Email, SMS)
- Timing optimization based on contact preferences

### 3.5 MetaIC AI Assistant (Chatbot)

**Public Profile Integration:**
- AI chatbot embedded on all user H5 profile pages
- Accessible to visitors without registration
- Capabilities:
  - Answer questions about the profile owner
  - Assist with meeting scheduling
  - Provide additional information
  - Guide visitors to register for MetaIC AI

**In-App AI Assistant:**
- Available in all four main menus
- Context-aware responses
- Profile generation assistance
- Network insights explanations
- Communication plan suggestions

### 3.6 Advanced Sharing Methods

**Multiple Sharing Options:**
1. **Download Card Image** - High-quality image file
2. **Download Print File** - Standard business card format for printing
3. **IM Sharing** - WhatsApp, WeChat, Telegram, etc.
4. **URL Sharing** - Shareable link (metaic.ai/u/{username})
5. **NFC Sharing** - Near Field Communication for instant exchange
6. **QR Code** - Dynamic QR codes for easy scanning
7. **vCard Export** - Standard contact file format

### 3.7 Contact Management Enhancements

**Multiple Images per Contact:**
- Upload multiple photos per contact
- Organize by context (meeting, event, social)
- Image-based contact recognition (future: smart glasses integration)
- Visual memory aids for better recall

**Future: Smart Glasses Integration:**
- Real-time contact recognition
- Automatic information display
- Hands-free networking
- AR-enhanced networking experience

### 3.8 Subscription Tiers & Token System

**Subscription Tiers:**

1. **Free Tier:**
   - Monthly free token allocation
   - Basic AI features
   - Limited profile customization
   - Standard sharing options

2. **Professional Tier:**
   - Higher token allocation
   - Advanced AI features
   - Unlimited profile customization
   - Priority support
   - Advanced analytics

3. **Enterprise Tier:**
   - Unlimited tokens
   - Team management
   - Custom branding
   - API access
   - Dedicated support

**Token System:**
- **Free Monthly Tokens:** All users receive monthly allocation
- **Token Usage:** AI features consume tokens
- **Token Earning:**
  - Referral rewards (user acquisition)
  - "Buy Me a Coffee" donations
  - Activity rewards
- **Lions Club Integration:**
  - Lions Club International as default enterprise partner
  - Free token allocation for organization
  - Members can claim higher token limits with Lions Club ID
  - Special features for Lions Club members

**Donation System:**
- "Buy Me a Coffee" integration
- Support development team
- Receive token rewards
- Community contribution recognition

### 3.9 Multi-Language Support

**Supported Languages:**
- **Default:** English
- **Primary:** Chinese (Simplified & Traditional)
- **Additional:** Expandable to other languages

**Localization Features:**
- UI/UX translation
- AI-generated content in user's language
- Profile content in multiple languages
- Automatic language detection
- User preference settings

### 3.10 Profile Privacy & Customization

**Privacy Controls:**
- Show/hide specific profile sections
- Control visibility of contact information
- Manage public vs. private information
- Customize what AI assistant can share

**Editing Capabilities:**
- Edit AI-generated content
- Manual override of AI suggestions
- Custom field additions
- Section reordering
- Theme customization

## 4. User Flows

### 4.1 First-Time User (Onboarding)
1. User visits MetaIC.ai
2. Clicks "Get Started" or "Create Card"
3. Authentication (Phone/Email/SSO)
4. AI-Assisted Onboarding:
   - Option A: Upload business card → AI extracts info
   - Option B: Upload resume → AI generates profile
   - Option C: Input basic info → AI enriches with research
5. AI generates complete profile
6. User reviews and edits AI-generated content
7. Customize privacy settings
8. Select language preferences
9. Card preview
10. Success screen with sharing options

### 4.2 AI Profile Generation
1. User navigates to "My Card" → "Generate with AI"
2. Chooses input method (card image, resume, or manual)
3. AI processes input and web research
4. AI generates comprehensive profile
5. User reviews generated content
6. User edits/customizes as needed
7. User sets privacy preferences
8. Save and publish

### 4.3 Adding New Contact
1. User navigates to "Contacts" → "Add Contact"
2. Scans QR code, receives link, or manual input
3. AI automatically:
   - Searches MetaIC database for existing profile
   - Performs web research for additional insights
   - Generates network insights
   - Suggests conversation topics
   - Auto-tags contact
4. User reviews AI-generated insights
5. User uploads contact photos (optional)
6. User adds meeting context
7. AI generates communication plan
8. Contact saved

### 4.4 Network Insights Discovery
1. User navigates to "Contacts" → Select contact
2. View AI-generated network insights
3. See common connections and opportunities
4. Review suggested conversation topics
5. Access communication plan
6. AI monitors for contact updates (background)
7. Receive notifications for significant changes
8. Updated insights automatically refresh

### 4.5 Communication Plan Management
1. User navigates to "AI" → "Communication Plans"
2. View all scheduled communications
3. AI suggests:
   - Greeting messages for new contacts
   - Birthday wishes
   - Business milestone congratulations
   - Follow-up reminders
4. User reviews and approves suggestions
5. Schedule communications
6. AI sends at optimal times
7. Track communication history

### 4.6 AI Assistant Interaction (Public Profile)
1. Visitor opens metaic.ai/u/{username}
2. Views profile information
3. Clicks AI Assistant chatbot
4. Asks questions about profile owner
5. AI provides context-aware answers
6. AI assists with scheduling (if enabled)
7. AI guides visitor to register for MetaIC AI

### 4.7 Token Management
1. User navigates to "Settings" → "Subscription"
2. View current tier and token balance
3. See token usage history
4. Options:
   - Upgrade subscription
   - Donate via "Buy Me a Coffee"
   - Claim Lions Club benefits (if applicable)
   - View referral rewards
5. Monitor token consumption

## 5. Technical Requirements

### 5.1 Platform Support
- **Web:** Responsive H5 application (MetaIC.ai)
- **Mobile:** Uni-app (iOS, Android, WeChat Mini Program)
- **API:** RESTful API with GraphQL support
- **Domain:** MetaIC.ai with subdomain routing

### 5.2 AI Integration
- **Primary AI:** Google Gemini (latest model)
- **AI Services:**
  - Image recognition and OCR
  - Natural language processing
  - Web search integration
  - Content generation
  - Chatbot functionality
- **Token Management:** Track and limit AI usage
- **Rate Limiting:** Prevent abuse

### 5.3 Performance Requirements
- Page load time: < 2 seconds
- API response time: < 500ms (p95)
- AI response time: < 3 seconds (p95)
- Image optimization: WebP format, lazy loading
- Offline support: Basic functionality

### 5.4 Security Requirements
- Authentication: JWT tokens, OAuth 2.0
- Data encryption: TLS 1.3, encrypted storage
- Privacy: GDPR compliant, data anonymization
- Rate limiting: API and AI protection
- Token security: Secure token management

### 5.5 Scalability Requirements
- Support 1M+ users
- Handle 10M+ card views/month
- 99.9% uptime SLA
- AI request handling: 100K+ requests/day

## 6. Database & Backend Requirements

### 6.1 Database Schema
- PostgreSQL 14+ with JSONB support
- Tables for: users, profiles, contacts, AI interactions, tokens, subscriptions
- Full-text search capabilities
- Image storage integration

### 6.2 Backend Services
- **User Service:** Authentication, profile management
- **Card Service:** Business card CRUD operations
- **Contact Service:** Contact management, tagging
- **AI Service:** Gemini integration, profile generation, insights
- **Token Service:** Token management, subscription handling
- **Communication Service:** Message scheduling, delivery
- **Analytics Service:** Usage tracking, insights

### 6.3 External Integrations
- Google Gemini API
- Web search APIs
- Image processing services
- Payment processing (subscriptions, donations)
- Email/SMS services
- NFC hardware support

## 7. Non-Functional Requirements

### 7.1 Usability
- Intuitive UI/UX
- Accessible design (WCAG 2.1 AA)
- Multi-language support (English, Chinese, expandable)
- Responsive design for all devices

### 7.2 Reliability
- Data backup and recovery
- Error handling and logging
- Monitoring and alerting
- AI fallback mechanisms

### 7.3 Maintainability
- Clean code architecture
- Comprehensive documentation
- Automated testing
- CI/CD pipeline

## 8. Success Metrics

### 8.1 User Metrics
- Monthly Active Users (MAU)
- Card creation rate
- AI feature usage rate
- Token consumption patterns
- Subscription conversion rate

### 8.2 Engagement Metrics
- Average cards viewed per user
- AI assistant interactions
- Network insights views
- Communication plan completion rate
- Profile edit frequency

### 8.3 Business Metrics
- User retention (30-day, 90-day)
- Premium conversion rate
- Referral rate
- Token economy health
- Lions Club member adoption

## 9. Future Enhancements

### 9.1 Phase 2 Features
- Smart glasses integration
- Advanced CRM integration
- Team/organization management
- Event integration
- API marketplace

### 9.2 Phase 3 Features
- AI-powered matching
- Networking events platform
- Community features
- Advanced analytics dashboard
- White-label solutions

## 10. Constraints & Assumptions

### 10.1 Constraints
- AI token costs
- Gemini API rate limits
- Multi-language content generation complexity
- NFC hardware availability
- Smart glasses market adoption

### 10.2 Assumptions
- Users have smartphones
- Internet connectivity available
- Users understand QR codes and NFC
- Gemini API availability and pricing
- Lions Club partnership agreement

## 11. Risk Assessment

### 11.1 Technical Risks
- AI API rate limits and costs
- Third-party service dependencies
- Data privacy concerns
- Multi-language AI accuracy

### 11.2 Business Risks
- Token economy balance
- Subscription pricing
- User acquisition costs
- Competition from established players

### 11.3 Mitigation Strategies
- Robust error handling and fallbacks
- Multiple AI provider options
- Strong privacy controls
- Focus on unique AI value proposition
- Community-driven growth (referrals, donations)

## 12. Appendix

### 12.1 Key Features Summary
- ✅ AI-powered profile generation
- ✅ Network insights discovery
- ✅ Automated communication plans
- ✅ Public profile AI chatbot
- ✅ Multiple sharing methods (Image, Print, IM, URL, NFC)
- ✅ Multiple images per contact
- ✅ Token system with subscriptions
- ✅ Lions Club integration
- ✅ Multi-language support
- ✅ Profile privacy controls

### 12.2 Technology Stack
- **Frontend:** Uni-app (Vue 3), H5
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL 14+
- **AI:** Google Gemini
- **Hosting:** MetaIC.ai domain
