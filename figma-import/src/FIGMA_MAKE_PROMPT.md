# MetaIC - AI Business Card Complete Figma Make Prompt

## 🎯 Project Overview

Build "MetaIC – AI Business Card", a high-end professional networking platform with AI-powered digital business cards. This is a mobile-first application with dark mode glassmorphism aesthetic designed for modern professionals to create, manage, and share intelligent business cards.

---

## 🎨 Design System

### Color Palette
- **Background**: `#020617` (Deep dark blue-black)
- **Secondary Background**: `#0F172A` (Lighter dark blue)
- **Yellow Accent**: `#FACC15` (Warm gold)
- **Blue Accent**: `#38BDF8` (Sky blue)
- **Success/Green**: `#10B981` (Emerald)
- **Orange Accent**: `#F59E0B` (Amber)
- **Purple Gradient**: From `#5b21b6` to `#4c1d95`

### Glassmorphism Style
All cards and containers use:
```
bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl
```

Rounded corners: `rounded-[24px]` for cards, `rounded-[20px]` for nested elements, `rounded-[16px]` for small items

### Typography Rules
- **DO NOT** use Tailwind font size, font weight, or line-height classes unless specifically requested
- Let the default typography from `/styles/globals.css` handle all text styling
- Only use text color classes: `text-white`, `text-white/60`, `text-white/50`, etc.

### Touch Optimization
- All interactive buttons must include `touch-manipulation` class
- Minimum touch target: 44x44px
- Use `active:scale-[0.98]` for press feedback
- Floating action buttons: 56x56px minimum

---

## 🏗️ Application Architecture

### State Management

Create two React contexts:

#### 1. UserContext (`/contexts/UserContext.tsx`)
```typescript
interface UserContextType {
  hasCreatedCard: boolean;
  setHasCreatedCard: (value: boolean) => void;
  aiTokens: number;
  setAiTokens: (value: number) => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  subscriptionTier: 'free' | 'basic' | 'pro' | 'enterprise';
  setSubscriptionTier: (tier: 'free' | 'basic' | 'pro' | 'enterprise') => void;
}
```

Default values:
- `hasCreatedCard: false` (new users)
- `aiTokens: 500` (free tier starting tokens)
- `isPremium: false`
- `subscriptionTier: 'free'`

#### 2. LanguageContext (`/contexts/LanguageContext.tsx`)
```typescript
interface LanguageContextType {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
  t: (key: string) => string;
}
```

Must support bilingual UI (English & Chinese) with translation function `t()`.

---

## 📱 Main Application Structure

### App.tsx
- Demo mode toggle (can switch between demo mode and auth flow)
- Default to demo mode: `demoMode: 'demo'` → shows mobile app directly
- Auth mode: `demoMode: 'auth'` → shows login flow first
- Navigation history stack for back button functionality
- Wraps everything with UserContext and LanguageContext providers

### Views
1. `login` - Social login page (Apple, Google, Email/Phone)
2. `phoneEmailLogin` - Email/password login
3. `onboarding` - Card creation flow for new users
4. `mobileapp` - Main mobile app with 4 bottom tabs
5. `public` - Public card view (shareable link)
6. `editProfile` - Edit card details
7. `subscription` - Subscription plans
8. `coffee` - Buy me coffee page

---

## 🗂️ Main Mobile App Structure (`/components/MobileAppHome.tsx`)

### Fixed Bottom Navigation (Always Visible)
Four tabs with gradient active states:

1. **My Card** - `CreditCard` icon
   - Active: Yellow to blue gradient
   - Default view for all users

2. **Contacts** - `Users` icon
   - Active: Yellow to blue gradient
   
3. **AI** - `Sparkles` icon with token badge
   - Active: Yellow to blue gradient
   - Badge shows token count (e.g., "500" in yellow circle)
   
4. **Settings** - `Settings` icon
   - Active: Yellow to blue gradient

### Top Bar (Dynamic per tab)
- Left: Language toggle button (EN/中文)
- Center: Tab title
- Right: Context-specific actions (varies by tab)

### Active Tab Indicator
- Gradient background from yellow to blue
- Icon and text turn dark (`text-[#020617]`)
- Smooth transitions

---

## 📇 Tab 1: My Card Tab (`/components/tabs/MyCardTab.tsx`)

### Welcome Screen (New Users - `hasCreatedCard: false`)

**Layout:**
1. **Logo Section** (centered)
   - 80x80 circular gradient background (yellow to blue)
   - Sparkles icon inside
   - Main heading: "Welcome to MetaIC!"
   - Subtitle: "Create Your Professional Presence with AI"

2. **The Power of MetaIC Card**
   - Glassmorphism container
   - Title: "✨ The Power of MetaIC"
   - 4 Features with icons (40x40 circular backgrounds):

   **Feature 1: AI-Powered Card Creation** 📸
   - Icon: Camera (yellow)
   - Title: "📸 AI-Powered Card Creation"
   - Description: "Let AI create a name card for easy sharing with any style you like"
   
   **Feature 2: Smart Information Extraction** 🤖
   - Icon: Sparkles (blue)
   - Title: "🤖 Smart Information Extraction"
   - Description: "AI automatically extracts your professional info from LinkedIn, websites, and more"
   
   **Feature 3: Smart Network Analytics** 🤝
   - Icon: Users (green)
   - Title: "🤝 Smart Network Analytics"
   - Description: "AI analyzes your connections and provides personalized networking insights"
   
   **Feature 4: Instant Share & Exchange** ⚡
   - Icon: Lightning (orange)
   - Title: "⚡ Instant Share & Exchange"
   - Description: "Share via QR code, links, or face-to-face radar exchange"

3. **CTA Button**
   - Full width, `py-4 px-6`, `rounded-2xl`
   - Gradient: yellow to blue
   - Text: "Create My Card Now" with Sparkles icon
   - Action: Shows alert → sets `hasCreatedCard: true`

4. **Encouragement Text**
   - Small text: "Just 30 seconds to let AI build your professional presence 🚀"

**Chinese Translation:**
- "欢迎来到 MetaIC！"
- "用 AI 打造你的专业形象"
- "✨ MetaIC 的强大功能"
- Features translated appropriately
- "开始创建我的名片"
- "只需 30 秒，让 AI 为你打造专业形象 🚀"

### Card View (Existing Users - `hasCreatedCard: true`)

**Section 1: Card Header**
- Glassmorphism card container
- Avatar: 80x80 with gradient border, AI badge (blue circle with sparkles)
- Share button (top right corner): Circular gradient button with Share2 icon
- Name + Chinese name in parentheses
- Title in blue accent color
- Tagline in yellow italic
- Phone number with icon

**Section 2: Meeting Remark Card**
- Yellow/blue gradient background with border
- Editable fields:
  - "Nice meeting you at [Event]" (editable input)
  - Location with MapPin icon (editable)
  - Timestamp with Clock icon (auto-generated)

**Section 3: Companies**
- List of businesses with gradient cards
- Each business shows:
  - Company name (English + Chinese)
  - Role/title
  - Description
  - Services (expandable list)
  - Website link icon
- "Show All Services" toggle button

**Section 4: Headline**
- Professional headline in centered glassmorphism card

**Section 5: Contact Information**
- Phone numbers with yellow icons
- Addresses with blue icons
- Emails with blue icons
- Each in rounded containers with icons

**Section 6: Connect**
- LinkedIn and Website links
- Grid layout (2 columns)
- LinkedIn with specific blue (#0077B5)

**Section 7: Works & Services**
- Grid of service cards with icons/images
- Links to external resources
- External link icon on each

**Section 8: Looking to Connect With**
- Pills/badges showing target connections
- Yellow/blue gradient backgrounds

**Section 9: Hobbies & Interests**
- Pills with hobbies
- White/transparent backgrounds

**Section 10: About**
- Expandable bio section
- "Read More" / "Show Less" toggle

**Share Modal Component** (`/components/ShareModal.tsx`)
- QR Code display
- Share link with copy button
- Social sharing options
- Remark display
- Close button

---

## 👥 Tab 2: Contacts Tab (`/components/tabs/ContactsTab.tsx`)

### Top Bar
- Left: Language toggle
- Center: "Contacts" / "联系人"
- Right: Search icon (magnifying glass)

### Search Bar
- Full width with search icon
- Placeholder: "Search contacts..."
- Glassmorphism style

### Contact Cards
Each contact card displays:
- Avatar (60x60) with gradient border
- Name + role
- Company
- Last contact date with clock icon
- 3-dot menu (top right) with options:
  1. "View AI Analysis" → Network Insights
  2. "View Communication Plan" → Communication Plan
  3. "View History" → Communication History

### Floating Add Button (Bottom Right)
- Fixed position: `fixed bottom-24 right-6`
- Size: 56x56px
- Gradient background (yellow to blue)
- Plus icon
- Hover effect: `hover:scale-110`

**Dropdown Menu (on click):**
Opens upward with 3 options:
1. **Add Contact Manually** - UserPlus icon → AddContactPage
2. **Face to Face Exchange** - Radio icon → FaceToFaceExchangePage
3. **Contact Radar** - Radar icon → ContactRadarPage

### Contact Card Click
Opens ContactCardView (detailed contact view)

---

## 🔍 Contact Sub-Pages

### 1. Add Contact Page (`/components/AddContactPage.tsx`)
- Manual contact entry form
- Fields: Name, Company, Title, Email, Phone, etc.
- Save button

### 2. Face to Face Exchange Page (`/components/FaceToFaceExchangePage.tsx`)
- NFC-style exchange interface
- Animated radar/pulse effect
- "Tap to Exchange" instruction
- Success animation

### 3. Contact Radar Page (`/components/ContactRadarPage.tsx`)
- Animated radar scanning interface
- Circular radar with sweeping animation
- "Searching for nearby contacts..." message
- Found contacts appear as they're detected

### 4. Contact Card View (`/components/tabs/ContactCardView.tsx`)
- Full contact details (similar to My Card layout)
- Action buttons:
  - "Add to Contacts" (download vCard)
  - "Say Hello 👋" (opens WhatsApp)
- All contact information sections
- Back button to return to Contacts

---

## 🤖 Tab 3: AI Tab (`/components/tabs/AITab.tsx`)

### Top Bar
- Left: Language toggle
- Center: "AI Assistant" / "AI 助手"
- Right: Token balance in yellow badge (clickable → Subscription Page)

### Quick Actions Grid (3x2 or 2x3)
Six feature cards with icons and titles:

1. **Create My Card** - Camera icon (yellow)
   - Opens card creation flow
   
2. **Scan & Add Contact** - Scan icon (blue)
   - Camera scan to extract contact info
   
3. **Network Insights** - TrendingUp icon (green)
   - Shows network analytics page
   
4. **Communication Plans** - MessageSquare icon (purple)
   - AI-generated communication strategies
   
5. **Contact Updates** - RefreshCw icon (orange)
   - Shows updated contact information
   
6. **Ask AI Anything** - Sparkles icon (pink gradient)
   - Opens general AI chat

### Recent Conversations
- List of recent AI chat threads
- Each shows: Title, preview, timestamp
- Click to resume conversation

### Chat Interface (when feature clicked)
Full-screen chat with:
- Back button (top left)
- Chat title (top center)
- Token cost badge (top right)
- Message bubbles:
  - AI messages: Left-aligned, gradient background
  - User messages: Right-aligned, glassmorphism
- Input bar at bottom with send button

---

## 💬 AI Chat Flows

### Flow 1: Create My Card
**Steps:**
1. Welcome message with instructions
2. Photo upload prompt → CardPhotoCapture component
3. AI analyzes and extracts info
4. Shows extracted data in structured format
5. Confirmation → Card created

**Alternative:** Manual entry option → ManualCardInput component

### Flow 2: Scan & Add Contact
**Steps:**
1. Instructions to scan business card or take photo
2. Camera interface
3. AI extracts contact information
4. Shows extracted data (Name, Company, Title, Email, Phone, LinkedIn, etc.)
5. Edit if needed
6. Confirm → Contact added with success message

### Flow 3: Network Insights
Opens NetworkInsightsPage showing:
- Total contacts count
- Industry breakdown (chart)
- Connection strength analysis
- Suggested actions
- Top connections

### Flow 4: Communication Plans
Opens CommunicationPlanPage showing:
- Select contact
- AI-generated communication strategy
- Recommended topics
- Best time to reach out
- Follow-up schedule

### Flow 5: Contact Updates
**Chat format:**
1. AI shows contacts with recent updates
2. Each contact card shows:
   - Name and photo
   - Highlighted changes (job change, promotion, etc.)
   - "View Details" button
3. User can ask for more details
4. AI provides comprehensive analysis

### Flow 6: Ask AI Anything
Open-ended chat where user can:
- Ask about specific contacts
- Request networking advice
- Get communication tips
- Analyze connection opportunities

---

## ⚙️ Tab 4: Settings Tab (`/components/tabs/SettingsTab.tsx`)

### Profile Section
- Avatar with edit icon
- Name + email
- "Edit Profile" button → EditProfilePage

### Settings Categories

**1. Account Settings**
- Profile Information (with arrow)
- Privacy Settings (with arrow)
- Notifications (with arrow)

**2. Card Settings**
- Card Style & Design (with arrow)
- Public Profile Settings (with arrow)
- QR Code Options (with arrow)

**3. AI Settings**
- AI Token Usage (with arrow)
- Auto-Update Preferences (with arrow)

**4. App Settings**
- Language (EN/中文 toggle)
- Theme (Dark mode - currently locked)
- Data & Storage (with arrow)

**5. Support**
- Help Center (with arrow)
- Contact Support (with arrow)
- ☕ Buy Me a Coffee (with arrow) → BuyMeCoffeePage

**6. About**
- Version info
- Terms of Service
- Privacy Policy

**IMPORTANT: Hidden Subscription Access**
- NO visible "Subscription" or "Upgrade" section in main Settings
- Only accessible via:
  1. Clicking token balance badge in AI tab
  2. Compact button hidden in Settings (optional)

---

## 💳 Subscription Page (`/components/SubscriptionPage.tsx`)

### Design
- Full-screen modal/page
- Back button (top left)
- Title: "Choose Your Plan"

### Current Token Display
- Large circular display showing current balance
- "You have X tokens remaining"

### Subscription Tiers (4 Cards)

**1. Free Tier**
- Price: $0
- 500 tokens/month
- Basic features
- "Current Plan" or "Downgrade" button

**2. Basic Tier**
- Price: $9.99/month
- 2,000 tokens/month
- Standard features
- Priority support
- "Upgrade" button (gradient)

**3. Pro Tier**
- Price: $29.99/month
- 10,000 tokens/month
- Advanced AI features
- Custom card styles
- "Upgrade" button (gradient)

**4. Enterprise Tier**
- Price: Contact Sales
- Unlimited tokens
- Custom integrations
- Dedicated support
- "Contact Us" button

### Token Top-Up Options
- 100 tokens - $2.99
- 500 tokens - $9.99
- 1,000 tokens - $17.99
- "Buy Tokens" buttons

### Features Comparison Table
Side-by-side comparison of all tiers

---

## 📄 Additional Pages & Components

### Login Page (`/components/auth/LoginPage.tsx`)

**Design:**
- Gradient background: `from-[#1e293b] via-[#0f172a] to-[#020617]`
- MetaIC logo with gradient text:
  - "M" in pink-purple-blue gradient
  - "eta" in white
  - "IC" in yellow-blue gradient
- Welcome text
- Subtitle: "AI Business Cards"

**Login Buttons:**
1. Google - with Google icon, glassmorphism style
2. Apple - white background, Apple icon
3. Other Methods - purple gradient button

**Footer:**
- Terms of Service link
- Privacy Policy link

### Phone/Email Login Page (`/components/auth/PhoneEmailLoginPage.tsx`)
- Tabs for Email and Phone
- Input fields
- Sign in button
- Sign up link

### Onboarding Flow (`/components/onboarding/OnboardingFlow.tsx`)

**Step 1: Welcome**
- Welcome message
- AI assistant introduction
- "Get Started" button

**Step 2: Card Photo Capture** (`CardPhotoCapture.tsx`)
- Camera viewfinder interface
- Capture button
- "AI will analyze your photo and extract information from LinkedIn, company websites, and other sources"

**Step 3: Card Customization** (`CardCustomization.tsx`)
- Preview of card
- Style options (templates)
- Color scheme selector
- Layout options

**Step 4: Success** (`WelcomeSuccess.tsx`)
- Celebration animation
- "Your card is ready!"
- "Start Networking" button

### Edit Profile Page (`/components/EditProfilePage.tsx`)
- Form with all editable fields
- Avatar upload
- Business information
- Contact details
- Save button

### Public Card View (`/components/PublicCard.tsx`)
- Publicly shareable card view
- Similar to My Card but read-only
- "Add to Contacts" button
- "Get Your Own MetaIC Card" CTA

### Buy Me Coffee Page (`/components/BuyMeCoffeePage.tsx`)
- Support the developer
- Coffee cup icon
- Donation amounts
- Payment options
- Thank you message

---

## 📊 Data Structures

### BusinessCard Type (`/types/BusinessCard.ts`)

```typescript
interface BusinessCard {
  personal: {
    firstName: string;
    lastName: string;
    fullName: string;
    chineseName?: string;
    title: string;
    titleZh?: string;
    tagline: string;
    taglineZh?: string;
    avatar: string;
    location: {
      city: string;
      country: string;
    };
  };
  businesses: Array<{
    id: string;
    name: string;
    chineseName?: string;
    role: string;
    roleZh?: string;
    description: string;
    descriptionZh?: string;
    website?: string;
    services: string[];
    servicesZh?: string[];
  }>;
  contact: {
    phones: Array<{
      label: string;
      number: string;
    }>;
    emails: Array<{
      label: string;
      email: string;
    }>;
    addresses?: Array<{
      label: string;
      street: string;
      city: string;
      postalCode: string;
      country: string;
    }>;
  };
  professional: {
    headline: string;
    bio: string[];
    worksAndServices?: Array<{
      name: string;
      description: string;
      icon: string;
      url: string;
    }>;
  };
  networking: {
    lookingFor: string[];
    lookingForZh?: string[];
  };
  personal_interests: {
    hobbies: string[];
  };
  links: {
    linkedin?: string;
    website?: string[];
    metaicProfile?: string;
  };
}
```

### Sample Contacts (`/data/sampleContacts.ts`)
Array of contact objects with:
- id
- name
- role
- company
- avatar
- lastContact
- tags
- relationship strength

---

## 🎯 Key User Flows

### Flow 1: New User Onboarding
1. Open app → Login page
2. Login with social/email
3. Onboarding flow starts
4. Capture card photo OR manual entry
5. AI extracts information
6. Customize card style
7. Success screen
8. Redirects to Mobile App (My Card tab showing their new card)

### Flow 2: Existing User
1. Open app → (if in demo mode) Mobile App
2. My Card tab shows their card
3. Can view/edit/share card

### Flow 3: Adding a Contact
1. Contacts tab
2. Click floating + button
3. Choose method:
   - Manual entry
   - Face to face exchange
   - Radar scan
   - OR: AI tab → "Scan & Add Contact"
4. Complete the flow
5. Contact added to list

### Flow 4: Using AI Features
1. AI tab
2. Click feature card OR ask anything
3. Chat interface opens
4. Tokens consumed for each request
5. Results displayed
6. Can save/export insights

### Flow 5: Upgrading Subscription
1. AI tab → Click token badge
   OR: (hidden) Settings → Subscription button
2. Subscription page opens
3. View plans
4. Select plan → Payment (mock)
5. Tokens updated
6. Return to app

### Flow 6: Sharing Card
1. My Card tab → Share button
   OR: Settings → Share options
2. Share modal opens
3. Shows QR code
4. Copy link button
5. Social share buttons
6. Recipient opens link → Public Card View

---

## 🔧 Technical Implementation Details

### Dependencies
```json
{
  "lucide-react": "latest",
  "react": "latest",
  "qrcode.react": "latest" (for QR codes)
}
```

### File Structure
```
/App.tsx
/contexts/
  - UserContext.tsx
  - LanguageContext.tsx
/components/
  - MobileAppHome.tsx (main app with tabs)
  - ShareModal.tsx
  - DemoToggle.tsx
  /tabs/
    - MyCardTab.tsx
    - ContactsTab.tsx
    - AITab.tsx
    - SettingsTab.tsx
    - ContactCardView.tsx
  /auth/
    - LoginPage.tsx
    - PhoneEmailLoginPage.tsx
  /onboarding/
    - OnboardingFlow.tsx
    - CardPhotoCapture.tsx
    - CardCustomization.tsx
    - ManualCardInput.tsx
    - WelcomeSuccess.tsx
  /ai/
    - NetworkInsightsPage.tsx
    - CommunicationPlanPage.tsx
    - CommunicationHistoryPage.tsx
  - AddContactPage.tsx
  - FaceToFaceExchangePage.tsx
  - ContactRadarPage.tsx
  - EditProfilePage.tsx
  - SubscriptionPage.tsx
  - PublicCard.tsx
  - BuyMeCoffeePage.tsx
/data/
  - businessCardData.ts (demo user card data)
  - sampleContacts.ts (demo contacts)
/types/
  - BusinessCard.ts
/styles/
  - globals.css (Tailwind + custom typography)
```

### Responsive Design
- Mobile-first (designed for 375-428px width)
- Safe area insets for iOS notch
- Touch-optimized (minimum 44x44px touch targets)
- Smooth transitions and animations
- Optimized scroll behavior

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast text (WCAG AA compliant)

### Performance
- Lazy load images
- Optimize QR code generation
- Debounced search
- Efficient re-renders with React.memo where needed

---

## 🌐 Internationalization (i18n)

### Supported Languages
- English (en)
- Simplified Chinese (zh)

### Translation Coverage
Every user-facing text must have both English and Chinese versions:

**Tab Names:**
- My Card / 我的名片
- Contacts / 联系人
- AI Assistant / AI 助手
- Settings / 设置

**Common Actions:**
- Share / 分享
- Edit / 编辑
- Save / 保存
- Cancel / 取消
- Delete / 删除
- Add / 添加
- Search / 搜索
- Send / 发送

**Feature Names:**
- All AI feature cards
- All settings options
- All form labels
- All button text
- All error/success messages

### Language Toggle
- Available in top-left of every tab
- Switches between EN and 中文
- Persists across sessions
- Updates all UI immediately

---

## ✨ Animations & Micro-interactions

### Button Interactions
- Hover: `hover:scale-[1.02]` or `hover:bg-opacity-90`
- Active/Press: `active:scale-[0.98]`
- Transitions: `transition-all duration-200`

### Card Entrances
- Fade in + slide up
- Stagger effect for lists

### Loading States
- Skeleton screens for content loading
- Spinner for actions
- Progressive loading for images

### Success States
- Checkmark animation
- Confetti for major actions (card creation)
- Toast notifications

### AI Typing Effect
- Typing indicator dots for AI responses
- Smooth message appearance

### Radar Animation (Contact Radar)
- Rotating scan line
- Pulse rings
- Found contacts fade in

### NFC Exchange (Face to Face)
- Pulse animation
- Connection arc animation
- Success ripple effect

---

## 🔐 Security & Privacy (Mock)

### Authentication
- Mock OAuth flows (Google, Apple)
- Email/password with validation
- No real backend - demo data only

### Data Storage
- LocalStorage for demo persistence
- No real API calls
- Mock delay for realistic feel

### Privacy
- Public/private card toggle
- Control what information is shared
- Analytics opt-in/out

---

## 📱 Platform-Specific Features

### iOS
- Safe area insets (notch, home indicator)
- Haptic feedback on actions
- Share sheet integration (mock)

### Android
- Material Design principles where applicable
- Back button support
- Share intent (mock)

### Web (PWA)
- Install prompt
- Offline support
- Desktop responsive layout

---

## 🎨 Component Design Specifications

### Glassmorphism Cards
```css
background: rgba(15, 23, 42, 0.8);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
border-radius: 24px;
```

### Gradient Buttons (Primary CTA)
```css
background: linear-gradient(to right, #FACC15, #38BDF8);
color: #020617;
font-weight: 500;
padding: 16px 24px;
border-radius: 16px;
```

### Icon Backgrounds (Feature Cards)
- Size: 40x40px or 48x48px
- Border radius: Full circle
- Background: Color with 20% opacity
- Icon: Solid color, 20px or 24px

### Avatar Styling
- Border: Gradient ring (2-3px)
- Inner background: Dark (#020617)
- Size variants: 60px (list), 80px (detail), 40px (small)

### Input Fields
```css
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(250, 204, 21, 0.3);
color: white;
padding: 12px 16px;
border-radius: 12px;
```

### Pills/Badges
```css
padding: 8px 12px;
border-radius: 9999px;
background: gradient or solid with low opacity;
border: 1px solid matching color;
font-size: 12px;
```

---

## 🚀 Future Enhancements (Optional)

### Phase 2 Features
- Real-time collaboration
- Team cards/company profiles
- Analytics dashboard
- CRM integrations
- Email signatures
- Calendar integration
- Meeting scheduling

### Phase 3 Features
- AR business card scanning
- Voice-activated AI
- Blockchain verification
- NFT cards
- Multi-language support (beyond EN/ZH)
- Advanced AI insights (sentiment analysis, relationship scoring)

---

## 📋 Checklist for Implementation

### Core Infrastructure
- [ ] Create UserContext with all state
- [ ] Create LanguageContext with translations
- [ ] Set up App.tsx with view routing
- [ ] Implement demo mode toggle
- [ ] Create globals.css with design tokens

### Main Navigation
- [ ] Build MobileAppHome with 4-tab navigation
- [ ] Implement active tab states
- [ ] Add language toggle to top bar
- [ ] Create smooth tab transitions

### My Card Tab
- [ ] Build welcome screen for new users
- [ ] Create business card display component
- [ ] Implement meeting remark section
- [ ] Add share modal with QR code
- [ ] Make all sections responsive

### Contacts Tab
- [ ] Build contact list with cards
- [ ] Implement search functionality
- [ ] Create 3-dot dropdown menu
- [ ] Add floating + button with dropdown
- [ ] Build contact detail view

### Contact Management Pages
- [ ] AddContactPage (manual entry)
- [ ] FaceToFaceExchangePage (NFC animation)
- [ ] ContactRadarPage (radar scanning animation)
- [ ] ContactCardView (detailed view)

### AI Tab
- [ ] Create quick action grid (6 features)
- [ ] Build chat interface
- [ ] Implement token display and tracking
- [ ] Create all AI chat flows
- [ ] Add recent conversations list

### AI Sub-Pages
- [ ] NetworkInsightsPage with analytics
- [ ] CommunicationPlanPage
- [ ] CommunicationHistoryPage
- [ ] Implement AI responses for each flow

### Settings Tab
- [ ] Build profile section
- [ ] Create all settings categories
- [ ] Implement language toggle
- [ ] Add support options
- [ ] Hide subscription access (token badge only)

### Additional Pages
- [ ] LoginPage with social buttons
- [ ] PhoneEmailLoginPage
- [ ] OnboardingFlow (4 steps)
- [ ] EditProfilePage
- [ ] SubscriptionPage (4 tiers)
- [ ] PublicCard view
- [ ] BuyMeCoffeePage

### Data & Content
- [ ] Create businessCardData.ts with demo card
- [ ] Create sampleContacts.ts with demo contacts
- [ ] Define BusinessCard type
- [ ] Add all translations (EN/ZH)

### Polish
- [ ] Add all animations and transitions
- [ ] Implement loading states
- [ ] Add success/error feedback
- [ ] Test all user flows
- [ ] Optimize for mobile (touch targets, safe areas)
- [ ] Test language switching
- [ ] Verify glassmorphism consistency

---

## 🎯 Critical Success Factors

1. **Visual Consistency**: Every card must use the exact glassmorphism style
2. **Touch Optimization**: All buttons must be easily tappable (44x44px minimum)
3. **Bilingual Support**: Every text must have English and Chinese versions
4. **Token System**: Must be visible in AI tab, clickable to subscription
5. **Welcome Flow**: New users MUST see welcome screen, not empty state
6. **Navigation**: Bottom tabs always visible, smooth transitions
7. **Share Functionality**: QR code and share modal working perfectly
8. **AI Chat**: Each feature must have structured, helpful AI responses
9. **Contact Management**: All 3 methods (manual, F2F, radar) must work
10. **Subscription Hidden**: No visible subscription in Settings main page

---

## 💡 Design Philosophy

**MetaIC represents:**
- **Premium Quality**: High-end glassmorphism design
- **AI-First**: Intelligence embedded in every feature
- **Professional**: Designed for business networking
- **Modern**: Cutting-edge UI/UX patterns
- **Accessible**: Bilingual, touch-optimized, intuitive
- **Complete**: Full-featured from day one

**User Experience Principles:**
- Minimize friction in every interaction
- Provide instant feedback for all actions
- Make AI feel helpful, not intrusive
- Celebrate user achievements (card creation, connections)
- Respect user time (quick actions, saved states)
- Maintain visual harmony (consistent spacing, colors, typography)

---

## 📝 Final Notes

This prompt contains everything needed to recreate MetaIC exactly as designed. Follow the specifications precisely, maintain the glassmorphism aesthetic throughout, ensure bilingual support is complete, and test all user flows thoroughly.

The application should feel premium, intelligent, and effortless to use. Every interaction should be smooth, every transition should be elegant, and every piece of information should be presented clearly and beautifully.

**Welcome to MetaIC – where AI meets professional networking.** 🚀✨
