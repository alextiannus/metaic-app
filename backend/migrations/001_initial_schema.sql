-- MetaIC Database Initial Schema
-- Run this migration to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    auth_provider VARCHAR(50) NOT NULL DEFAULT 'email',
    auth_provider_id VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    chinese_name VARCHAR(100),
    avatar_url TEXT,
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_users_auth_provider ON users(auth_provider, auth_provider_id);

-- Business cards table
CREATE TABLE IF NOT EXISTS business_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    title_zh VARCHAR(255),
    tagline VARCHAR(500),
    tagline_zh VARCHAR(500),
    headline TEXT,
    bio TEXT[],
    theme VARCHAR(50) DEFAULT 'dark',
    is_public BOOLEAN DEFAULT true,
    show_email BOOLEAN DEFAULT true,
    show_phone BOOLEAN DEFAULT true,
    allow_messages BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    saves_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_business_cards_user_id ON business_cards(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_business_cards_slug ON business_cards(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_business_cards_public ON business_cards(is_public, created_at) WHERE deleted_at IS NULL;

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    chinese_name VARCHAR(255),
    role VARCHAR(255),
    role_zh VARCHAR(255),
    description TEXT,
    description_zh TEXT,
    website VARCHAR(500),
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_businesses_card_id ON businesses(business_card_id);

-- Business services table
CREATE TABLE IF NOT EXISTS business_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    service_name_zh VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_business_services_business_id ON business_services(business_id);

-- Contact information table
CREATE TABLE IF NOT EXISTS contact_information (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    label VARCHAR(100),
    value TEXT NOT NULL,
    country_code VARCHAR(10),
    street VARCHAR(500),
    city VARCHAR(100),
    postal_code VARCHAR(50),
    country VARCHAR(100),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_info_card_id ON contact_information(business_card_id);
CREATE INDEX IF NOT EXISTS idx_contact_info_type ON contact_information(type);

-- Social links table
CREATE TABLE IF NOT EXISTS social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_social_links_card_id ON social_links(business_card_id);

-- Works and services table
CREATE TABLE IF NOT EXISTS works_and_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    english_name VARCHAR(255),
    type VARCHAR(50) NOT NULL,
    description TEXT,
    icon_url TEXT,
    app_store_url TEXT,
    play_store_url TEXT,
    website_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_works_card_id ON works_and_services(business_card_id);

-- Personal interests table
CREATE TABLE IF NOT EXISTS personal_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_interests_card_id ON personal_interests(business_card_id);

-- Networking preferences table
CREATE TABLE IF NOT EXISTS networking_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_zh VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_networking_card_id ON networking_preferences(business_card_id);

-- Saved contacts table
CREATE TABLE IF NOT EXISTS saved_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    remark_text VARCHAR(500),
    remark_location VARCHAR(500),
    meeting_date TIMESTAMP WITH TIME ZONE,
    custom_notes TEXT,
    tags TEXT[],
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_saved_contacts_user_id ON saved_contacts(user_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_saved_contacts_card_id ON saved_contacts(business_card_id);
CREATE INDEX IF NOT EXISTS idx_saved_contacts_meeting_date ON saved_contacts(meeting_date) WHERE deleted_at IS NULL;

-- Card views table
CREATE TABLE IF NOT EXISTS card_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    viewer_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    viewer_ip VARCHAR(45),
    viewer_user_agent TEXT,
    referrer TEXT,
    view_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_card_views_card_id ON card_views(business_card_id, created_at);
CREATE INDEX IF NOT EXISTS idx_card_views_viewer ON card_views(viewer_user_id, created_at);

-- Card shares table
CREATE TABLE IF NOT EXISTS card_shares (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    shared_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    share_method VARCHAR(50) NOT NULL,
    recipient_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_card_shares_card_id ON card_shares(business_card_id, created_at);
CREATE INDEX IF NOT EXISTS idx_card_shares_user_id ON card_shares(shared_by_user_id, created_at);

-- AI conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255) NOT NULL,
    message_type VARCHAR(50) NOT NULL,
    message_content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_card_id ON ai_conversations(business_card_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_session ON ai_conversations(session_id, created_at);

-- QR codes table
CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    qr_code_url TEXT NOT NULL,
    qr_code_data TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_qr_codes_card_id ON qr_codes(business_card_id, is_active);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id, is_read, created_at);

-- Communication history table
CREATE TABLE IF NOT EXISTS communication_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_card_id UUID REFERENCES business_cards(id) ON DELETE SET NULL,
    communication_type VARCHAR(50) NOT NULL,
    subject VARCHAR(500),
    content TEXT,
    status VARCHAR(50) DEFAULT 'sent',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comm_history_from ON communication_history(from_user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_comm_history_to ON communication_history(to_user_id, created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_cards_updated_at BEFORE UPDATE ON business_cards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_information
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_works_updated_at BEFORE UPDATE ON works_and_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_contacts_updated_at BEFORE UPDATE ON saved_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comm_history_updated_at BEFORE UPDATE ON communication_history
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

