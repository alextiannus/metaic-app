// Business Card Data Structure
export interface BusinessCard {
  // Basic Information
  id: string;
  slug: string; // URL slug like "alextianye"
  
  // Personal Info
  personal: {
    fullName: string;
    firstName: string;
    lastName: string;
    chineseName?: string;
    avatar?: string;
    title: string;
    tagline?: string; // Short description
    location: {
      city: string;
      country: string;
      timezone?: string;
    };
  };

  // Business/Companies
  businesses: Array<{
    id: string;
    name: string;
    chineseName?: string;
    role: string; // Founder, CEO, etc.
    description: string;
    logo?: string;
    website?: string;
    services: string[];
    isActive: boolean;
  }>;

  // Contact Details
  contact: {
    emails: Array<{
      type: 'primary' | 'business' | 'other';
      email: string;
      label?: string;
    }>;
    phones: Array<{
      type: 'mobile' | 'office' | 'whatsapp';
      number: string;
      countryCode: string;
      label?: string;
    }>;
    addresses?: Array<{
      type: 'office' | 'home';
      street?: string;
      city: string;
      country: string;
      postalCode?: string;
    }>;
  };

  // Online Presence
  links: {
    website?: string[];
    linkedin?: string;
    twitter?: string;
    github?: string;
    wechat?: string;
    whatsapp?: string;
    telegram?: string;
    metaicProfile?: string;
    customLinks?: Array<{
      label: string;
      url: string;
      icon?: string;
    }>;
  };

  // Professional Info
  professional: {
    headline: string; // Inspirational quote or mission
    bio: string[]; // Array of paragraphs
    expertise: string[]; // Skills/expertise areas
    worksAndServices?: Array<{
      id: string;
      name: string;
      englishName?: string;
      type: 'app' | 'service';
      description: string;
      icon?: string;
      appStoreUrl?: string; // For iOS apps
      playStoreUrl?: string; // For Android apps
      websiteUrl?: string; // For services
    }>;
    industries: string[];
    languages?: string[];
  };

  // Interests & Hobbies
  personal_interests: {
    hobbies: string[];
    activities: string[];
    passions?: string[];
  };

  // Looking For / Networking
  networking: {
    lookingFor: string[]; // Types of people/opportunities
    canHelpWith: string[]; // What you offer
    idealConnections: string[];
  };

  // AI & Metadata
  ai: {
    enabled: boolean;
    summary?: string; // AI-generated summary
    conversationStarter?: string;
    insights?: string[];
  };

  // Settings
  settings: {
    isPublic: boolean;
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
    theme?: 'dark' | 'light';
  };

  // Analytics
  analytics?: {
    views: number;
    shares: number;
    saves: number;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Meeting Note/Context when exchanging cards
export interface MeetingContext {
  id: string;
  cardId: string; // Reference to business card
  meetingDate: Date;
  activity: string; // Event/conference name
  location: string;
  notes?: string;
  tags?: string[];
  followUpDate?: Date;
  createdAt: Date;
}

// Contact saved from card
export interface SavedContact extends BusinessCard {
  savedBy: string; // User who saved this
  meetingContext?: MeetingContext;
  relationship?: string;
  lastInteraction?: Date;
  notes?: string;
  tags?: string[];
}
