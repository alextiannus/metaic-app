# Authentication & Onboarding Flow

## Overview
MetaIC now includes a complete authentication and onboarding system for new users with AI-powered business card generation.

## Features

### 🔐 Authentication Page (`/components/auth/LoginPage.tsx`)
- **Multiple Login Methods:**
  - Apple Sign-In (OAuth)
  - Google Sign-In (OAuth)
  - Email/Password
  - Phone Number (with country code selector)
- **Toggle between Login/Sign Up**
- **Password visibility toggle**
- **Forgot password link**
- **Terms of service acceptance**

### 📸 Card Photo Capture (`/components/onboarding/CardPhotoCapture.tsx`)
- **Camera capture** - Take photo directly from device camera
- **Gallery upload** - Upload existing business card photo
- **Image preview** with retake option
- **AI Processing simulation** - Shows loading state with AI badge
- **Skip option** - Users can choose manual input instead
- **Tips for best results** - Guidance for optimal card capture

### ✍️ Manual Card Input (`/components/onboarding/ManualCardInput.tsx`)
- **Personal Information:**
  - Full Name (required)
  - Chinese Name (optional)
  - Job Title (required)
  - Company (required)
- **Contact Information:**
  - Email (required)
  - Phone (required)
  - Website (optional)
  - Address (optional)
  - LinkedIn (optional)
- **AI Enhancement Button** - Triggers AI search to enrich profile
- **Pre-filled data** - If coming from photo capture, shows extracted data
- **Back navigation** - Can return to photo capture

### 🎨 Card Customization (`/components/onboarding/CardCustomization.tsx`)
- **Theme Selection:**
  - Dark Mode
  - Light Mode
- **6 Color Themes:**
  - Yellow & Blue (default)
  - Purple & Pink
  - Green & Teal
  - Orange & Red
  - Blue & Indigo
  - Cyan & Blue
- **4 Card Styles:**
  - Modern (glassmorphism)
  - Classic (clean professional)
  - Minimal (simple elegant)
  - Gradient (bold gradient)
- **Live Preview** - See changes in real-time
- **Back navigation** - Can return to input form

### 🎉 Welcome Screen (`/components/onboarding/WelcomeSuccess.tsx`)
- Success animation with pulsing gradient
- Personalized welcome message
- Feature highlights:
  - AI-Powered Networking
  - Easy Sharing
  - Contact Management
- "Get Started" button to enter app

## User Flow

### New User Journey:
1. **Login Page** → Click "Sign Up"
2. **Choose auth method** → Create account
3. **Photo Capture** → Take photo or upload card (optional)
4. **Manual Input** → Fill/edit information
5. **AI Enhancement** → Click to enrich with AI search
6. **Customization** → Choose colors and style
7. **Welcome Screen** → See success message
8. **Enter App** → Access full MetaIC features

### Existing User Journey:
1. **Login Page** → Enter credentials
2. **Direct to App** → Skip onboarding

## Demo Toggle

A demo toggle button (top-right corner) allows switching between:
- **Demo Mode** - Skip authentication, go straight to app
- **Auth Mode** - Show complete login and onboarding flow

## Technical Details

### State Management
- `currentView` - Tracks active screen (login, onboarding, mobileapp, etc.)
- `navigationHistory` - Enables back navigation
- `isNewUser` - Determines if onboarding is needed
- `userData` - Stores user profile and customization

### AI Processing Simulation
- Photo capture: 2-second processing animation
- Manual enhancement: 2-second AI search simulation
- In production, these would call actual AI APIs

### Customization Data Structure
```typescript
{
  theme: 'dark' | 'light',
  primaryColor: '#FACC15',
  secondaryColor: '#38BDF8',
  style: 'modern' | 'classic' | 'minimal' | 'gradient'
}
```

### User Data Structure
```typescript
{
  fullName: string,
  chineseName?: string,
  title: string,
  company: string,
  email: string,
  phone: string,
  website?: string,
  address?: string,
  linkedin?: string,
  customization: CardCustomization,
  capturedImage?: string
}
```

## Integration Points

### Backend Integration (To Do)
1. **OAuth Providers:**
   - Implement Apple Sign-In SDK
   - Implement Google Sign-In SDK
   - Handle OAuth callbacks

2. **AI Services:**
   - OCR API for card text extraction
   - Web scraping/LinkedIn API for profile enrichment
   - Image processing for card photo optimization

3. **Database:**
   - Store user profiles
   - Store card customizations
   - Store uploaded card images

4. **API Endpoints:**
   - POST `/auth/register`
   - POST `/auth/login`
   - POST `/auth/oauth/callback`
   - POST `/cards/extract` (OCR)
   - POST `/cards/enhance` (AI enrichment)
   - POST `/cards/create`

## Styling

All components follow the MetaIC design system:
- **Background:** `#020617` (dark blue)
- **Cards:** `#0F172A/80` with backdrop blur (glassmorphism)
- **Primary:** `#FACC15` (yellow)
- **Secondary:** `#38BDF8` (blue)
- **Borders:** `white/10` (subtle)
- **Text:** White with various opacities

## Mobile Optimization

- Touch-friendly buttons (minimum 44px)
- Responsive layouts with max-width constraints
- Camera/gallery access for mobile devices
- Smooth animations and transitions
- Bottom sheet style navigation on mobile

## Accessibility

- Proper form labels and ARIA attributes
- Keyboard navigation support
- Focus states on interactive elements
- High contrast color combinations
- Clear error messages and validation

## Future Enhancements

1. **Social Proof:** Show "Join 10,000+ professionals" counter
2. **Onboarding Tutorial:** Interactive guide after signup
3. **Profile Completion:** Progress bar showing % complete
4. **Card Templates:** Pre-designed templates users can choose
5. **Bulk Import:** Import contacts from phone/LinkedIn
6. **QR Code on Welcome:** Generate QR immediately after creation
7. **Email Verification:** Send confirmation email
8. **Phone Verification:** SMS OTP for phone login
9. **Biometric Auth:** Face ID/Touch ID support
10. **Multi-language:** Support more languages in signup
