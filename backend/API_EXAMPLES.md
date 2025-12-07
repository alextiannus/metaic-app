# MetaIC API Examples

## Authentication Examples

### Register User
```bash
curl -X POST https://api.metaic.ai/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@example.com",
    "phone": "+6598666100",
    "password": "securepassword123",
    "full_name": "Alex Tian Ye",
    "auth_provider": "email"
  }'
```

### Login
```bash
curl -X POST https://api.metaic.ai/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@example.com",
    "password": "securepassword123"
  }'
```

## Business Card Examples

### Create Business Card
```bash
curl -X POST https://api.metaic.ai/v1/cards \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "alextianye",
    "title": "Founder & AI Enabler",
    "tagline": "AI enabler for sustainable success",
    "headline": "Empowering businesses with AI-driven solutions...",
    "bio": [
      "As a serial entrepreneur and AI enabler...",
      "Through 12EAT.ai..."
    ],
    "is_public": true
  }'
```

### Get Public Card
```bash
curl -X GET https://api.metaic.ai/v1/cards/alextianye
```

### Add Business to Card
```bash
curl -X POST https://api.metaic.ai/v1/cards/CARD_ID/businesses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "12EAT.ai",
    "chinese_name": "唐人街外卖",
    "role": "Founder",
    "description": "Local services platform for overseas Chinese community",
    "website": "https://deliverychinatown.com/home",
    "services": [
      "Food Delivery & Group Buying Platform",
      "Local Services for Chinese Community"
    ]
  }'
```

## Contact Management Examples

### Save Contact
```bash
curl -X POST https://api.metaic.ai/v1/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "business_card_id": "CARD_UUID",
    "remark_text": "SG Fintech Festival",
    "remark_location": "Marina Bay Sands, Singapore",
    "custom_notes": "Interested in AI solutions for F&B",
    "tags": ["conference", "fintech", "ai"]
  }'
```

### Get Saved Contacts
```bash
curl -X GET "https://api.metaic.ai/v1/contacts?page=1&limit=20&search=alex" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## AI Assistant Examples

### Start AI Conversation
```bash
curl -X POST https://api.metaic.ai/v1/ai/conversations \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "business_card_id": "CARD_UUID",
    "message": "Tell me about Alex'\''s AI expertise and F&B solutions"
  }'
```

### Get AI Insights
```bash
curl -X GET https://api.metaic.ai/v1/ai/insights/CARD_UUID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## QR Code Examples

### Generate QR Code
```bash
curl -X GET https://api.metaic.ai/v1/cards/CARD_ID/qr-code \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## File Upload Examples

### Upload Avatar
```bash
curl -X POST https://api.metaic.ai/v1/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@avatar.jpg" \
  -F "type=avatar"
```

## Analytics Examples

### Get Card Analytics
```bash
curl -X GET https://api.metaic.ai/v1/cards/CARD_ID/analytics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## JavaScript/TypeScript Examples

### Using Fetch API
```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await fetch('https://api.metaic.ai/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

// Get Card
const getCard = async (slug: string) => {
  const response = await fetch(`https://api.metaic.ai/v1/cards/${slug}`);
  const data = await response.json();
  return data;
};

// Save Contact
const saveContact = async (token: string, cardId: string, remark: string) => {
  const response = await fetch('https://api.metaic.ai/v1/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      business_card_id: cardId,
      remark_text: remark,
      remark_location: 'Singapore',
    }),
  });
  const data = await response.json();
  return data;
};
```

### Using Axios
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.metaic.ai/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get card
const getCard = async (slug: string) => {
  const { data } = await api.get(`/cards/${slug}`);
  return data;
};
```

## Error Handling Example
```typescript
try {
  const response = await fetch('https://api.metaic.ai/v1/cards/invalid-slug');
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  
  return data;
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Card not found');
  } else if (error.response?.status === 401) {
    console.error('Authentication required');
  } else {
    console.error('An error occurred:', error.message);
  }
}
```

