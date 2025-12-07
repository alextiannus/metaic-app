-- Seed Data for Testing
-- This script creates test data for development

-- Insert test user
INSERT INTO users (id, email, password_hash, full_name, first_name, last_name, is_verified, is_active, auth_provider)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'alex@immedi.ai',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', -- password: password123
  'Alex Tian Ye',
  'Alex',
  'Tian Ye',
  true,
  true,
  'email'
) ON CONFLICT (email) DO NOTHING;

-- Insert test business card
INSERT INTO business_cards (
  id, user_id, slug, title, tagline, headline, bio, theme, is_public,
  show_email, show_phone, allow_messages
)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'alextianye',
  'Founder & AI Enabler',
  'AI enabler for sustainable success',
  'Empowering businesses with AI-driven solutions for the digital age. Building bridges between technology and sustainable growth.',
  ARRAY[
    'As a serial entrepreneur and AI enabler, I specialize in transforming traditional businesses through intelligent technology solutions.',
    'Through 12EAT.ai (唐人街外卖), I''ve built the leading food delivery and local services platform serving overseas Chinese communities.'
  ],
  'dark',
  true,
  true,
  true,
  true
) ON CONFLICT (slug) DO NOTHING;

-- Insert businesses
INSERT INTO businesses (id, business_card_id, name, chinese_name, role, description, website, is_active, display_order)
VALUES
  (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    '12EAT.ai',
    '唐人街外卖',
    'Founder',
    'Local services platform for overseas Chinese community',
    'https://deliverychinatown.com/home',
    true,
    0
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000002',
    'Immedi.AI',
    NULL,
    'Founder',
    'AI Enabler and Consulting Services',
    'https://wormwood.com.sg',
    true,
    1
  )
ON CONFLICT DO NOTHING;

-- Insert contact information
INSERT INTO contact_information (id, business_card_id, type, label, value, country_code, is_primary, display_order)
VALUES
  (
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000002',
    'phone',
    'Mobile / WhatsApp',
    '+6598666100',
    '+65',
    true,
    0
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000002',
    'email',
    'Immedi.AI',
    'alextian@immedi.ai',
    NULL,
    true,
    0
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    '00000000-0000-0000-0000-000000000002',
    'email',
    '12EAT.ai',
    'tianye@deliverychinatown.com',
    NULL,
    false,
    1
  )
ON CONFLICT DO NOTHING;

-- Insert address
INSERT INTO contact_information (id, business_card_id, type, label, value, street, city, postal_code, country, display_order)
VALUES
  (
    '00000000-0000-0000-0000-000000000008',
    '00000000-0000-0000-0000-000000000002',
    'address',
    'Office Address',
    '#03-04, m38 Jln Pemimpin, Singapore 577178',
    '#03-04, m38 Jln Pemimpin',
    'Singapore',
    '577178',
    'Singapore',
    0
  )
ON CONFLICT DO NOTHING;

-- Insert social links
INSERT INTO social_links (id, business_card_id, platform, url, display_order)
VALUES
  (
    '00000000-0000-0000-0000-000000000009',
    '00000000-0000-0000-0000-000000000002',
    'linkedin',
    'https://www.linkedin.com/in/alextianye',
    0
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    '00000000-0000-0000-0000-000000000002',
    'whatsapp',
    '+6598666100',
    1
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000002',
    'metaic',
    'https://metaic.ai/u/alextianye',
    2
  )
ON CONFLICT DO NOTHING;

-- Insert personal interests
INSERT INTO personal_interests (id, business_card_id, category, name, display_order)
VALUES
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 'hobby', 'Marathon Running', 0),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000002', 'hobby', 'Swimming', 1),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000002', 'hobby', 'Snorkeling', 2),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000002', 'hobby', 'Badminton', 3),
  ('00000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000002', 'hobby', 'Traveling', 4),
  ('00000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000002', 'hobby', 'Cooking', 5)
ON CONFLICT DO NOTHING;

-- Insert networking preferences
INSERT INTO networking_preferences (id, business_card_id, category, name, display_order)
VALUES
  ('00000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000002', 'looking_for', 'F&B Restaurant Owners', 0),
  ('00000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000002', 'looking_for', 'Bakery & Cafe Owners', 1),
  ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000002', 'looking_for', 'Businesses Ready for AI Transformation', 2),
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'looking_for', 'Cloud Migration Partners', 3),
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000002', 'looking_for', 'Logistics Service Providers', 4),
  ('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000002', 'looking_for', 'Technology Collaborators', 5)
ON CONFLICT DO NOTHING;
