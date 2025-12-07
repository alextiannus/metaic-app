-- MetaIC AI - Additional Features Migration
-- Adds support for AI features, tokens, subscriptions, and enhanced contact management

-- Subscription tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE, -- 'free', 'professional', 'enterprise'
    display_name VARCHAR(100) NOT NULL,
    monthly_tokens INTEGER DEFAULT 0,
    price_monthly DECIMAL(10, 2) DEFAULT 0,
    price_yearly DECIMAL(10, 2) DEFAULT 0,
    features JSONB, -- Array of feature names
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tier_id UUID NOT NULL REFERENCES subscription_tiers(id),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT false,
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_tier_id ON user_subscriptions(tier_id);

-- Token transactions table
CREATE TABLE IF NOT EXISTS token_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- 'earned', 'spent', 'purchased', 'donation', 'referral', 'lions_club'
    amount INTEGER NOT NULL, -- Positive for earned, negative for spent
    balance_after INTEGER NOT NULL,
    description TEXT,
    reference_id UUID, -- Reference to related entity (subscription, donation, etc.)
    reference_type VARCHAR(50), -- 'ai_request', 'subscription', 'donation', 'referral'
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_token_transactions_user_id ON token_transactions(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_token_transactions_type ON token_transactions(transaction_type, created_at);

-- User token balance (denormalized for performance)
ALTER TABLE users ADD COLUMN IF NOT EXISTS token_balance INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(50) DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS lions_club_id VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(50) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referred_by_user_id UUID REFERENCES users(id);

CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_lions_club_id ON users(lions_club_id) WHERE lions_club_id IS NOT NULL;

-- Contact images table (multiple images per contact)
CREATE TABLE IF NOT EXISTS contact_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    saved_contact_id UUID NOT NULL REFERENCES saved_contacts(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type VARCHAR(50), -- 'meeting', 'event', 'social', 'other'
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_images_contact_id ON contact_images(saved_contact_id);

-- Contact tags table (AI-generated and manual)
CREATE TABLE IF NOT EXISTS contact_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    saved_contact_id UUID NOT NULL REFERENCES saved_contacts(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    tag_category VARCHAR(50), -- 'industry', 'role', 'interest', 'connection', 'ai_generated', 'manual'
    confidence_score DECIMAL(3, 2), -- For AI-generated tags (0.00 to 1.00)
    created_by_ai BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_tags_contact_id ON contact_tags(saved_contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_tags_name ON contact_tags(tag_name);

-- AI profile generation history
CREATE TABLE IF NOT EXISTS ai_profile_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    business_card_id UUID REFERENCES business_cards(id) ON DELETE SET NULL,
    input_type VARCHAR(50) NOT NULL, -- 'business_card_image', 'resume', 'manual_input'
    input_data JSONB, -- Original input data
    generated_content JSONB, -- AI-generated profile content
    tokens_used INTEGER DEFAULT 0,
    generation_status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'processing', 'completed', 'failed'
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_profile_generations_user_id ON ai_profile_generations(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_profile_generations_card_id ON ai_profile_generations(business_card_id);

-- Network insights table
CREATE TABLE IF NOT EXISTS network_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    saved_contact_id UUID NOT NULL REFERENCES saved_contacts(id) ON DELETE CASCADE,
    insight_type VARCHAR(50) NOT NULL, -- 'common_connection', 'business_opportunity', 'shared_interest', 'conversation_topic'
    insight_content TEXT NOT NULL,
    confidence_score DECIMAL(3, 2),
    source VARCHAR(50), -- 'metaic_database', 'web_search', 'ai_analysis'
    metadata JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_network_insights_contact_id ON network_insights(saved_contact_id, is_active);
CREATE INDEX IF NOT EXISTS idx_network_insights_type ON network_insights(insight_type);

-- Communication plans table
CREATE TABLE IF NOT EXISTS communication_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    saved_contact_id UUID NOT NULL REFERENCES saved_contacts(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'greeting', 'birthday', 'milestone', 'follow_up', 'check_in'
    message_template TEXT,
    scheduled_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'scheduled', 'sent', 'cancelled'
    channel VARCHAR(50), -- 'whatsapp', 'email', 'sms'
    tokens_used INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_communication_plans_user_id ON communication_plans(user_id, status);
CREATE INDEX IF NOT EXISTS idx_communication_plans_contact_id ON communication_plans(saved_contact_id);
CREATE INDEX IF NOT EXISTS idx_communication_plans_scheduled ON communication_plans(scheduled_date, status) WHERE status = 'scheduled';

-- AI conversations (for chatbot on profile pages)
CREATE TABLE IF NOT EXISTS ai_conversations_public (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    visitor_ip VARCHAR(45),
    visitor_user_agent TEXT,
    message_type VARCHAR(50) NOT NULL, -- 'user', 'assistant', 'system'
    message_content TEXT NOT NULL,
    tokens_used INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_public_card_id ON ai_conversations_public(business_card_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_public_session ON ai_conversations_public(session_id, created_at);

-- Contact change monitoring (for auto-discovery)
CREATE TABLE IF NOT EXISTS contact_change_monitoring (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    saved_contact_id UUID NOT NULL REFERENCES saved_contacts(id) ON DELETE CASCADE,
    monitoring_enabled BOOLEAN DEFAULT true,
    check_frequency VARCHAR(50) DEFAULT 'weekly', -- 'daily', 'weekly', 'monthly'
    last_checked_at TIMESTAMP WITH TIME ZONE,
    last_change_detected_at TIMESTAMP WITH TIME ZONE,
    change_types TEXT[], -- Types of changes to monitor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_change_monitoring_user_id ON contact_change_monitoring(user_id, monitoring_enabled);
CREATE INDEX IF NOT EXISTS idx_contact_change_monitoring_contact_id ON contact_change_monitoring(saved_contact_id);

-- Detected contact changes
CREATE TABLE IF NOT EXISTS contact_changes_detected (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_change_monitoring_id UUID NOT NULL REFERENCES contact_change_monitoring(id) ON DELETE CASCADE,
    change_type VARCHAR(50) NOT NULL, -- 'job_change', 'company_change', 'promotion', 'achievement', 'social_update'
    change_description TEXT NOT NULL,
    source VARCHAR(50), -- 'web_search', 'social_media', 'news', 'ai_analysis'
    confidence_score DECIMAL(3, 2),
    metadata JSONB,
    is_notified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_changes_detected_monitoring_id ON contact_changes_detected(contact_change_monitoring_id, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_changes_detected_notified ON contact_changes_detected(is_notified, created_at) WHERE is_notified = false;

-- Profile visibility settings (for show/hide features)
CREATE TABLE IF NOT EXISTS profile_visibility_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    section_name VARCHAR(100) NOT NULL, -- 'personal_info', 'contact_info', 'businesses', 'social_links', etc.
    is_visible BOOLEAN DEFAULT true,
    visibility_level VARCHAR(50) DEFAULT 'public', -- 'public', 'contacts_only', 'private'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(business_card_id, section_name)
);

CREATE INDEX IF NOT EXISTS idx_profile_visibility_card_id ON profile_visibility_settings(business_card_id);

-- Sharing methods tracking
CREATE TABLE IF NOT EXISTS card_shares_enhanced (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
    shared_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    share_method VARCHAR(50) NOT NULL, -- 'qr_code', 'url', 'whatsapp', 'image_download', 'print_file', 'nfc', 'vcard'
    share_format VARCHAR(50), -- For downloads: 'png', 'pdf', 'vcf'
    recipient_info TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_card_shares_enhanced_card_id ON card_shares_enhanced(business_card_id, created_at);
CREATE INDEX IF NOT EXISTS idx_card_shares_enhanced_method ON card_shares_enhanced(share_method, created_at);

-- Donations table (Buy Me a Coffee integration)
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    recipient_user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for general donations
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_provider VARCHAR(50), -- 'buy_me_a_coffee', 'stripe', 'paypal'
    payment_id VARCHAR(255),
    tokens_awarded INTEGER DEFAULT 0,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON donations(donor_user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_donations_recipient_id ON donations(recipient_user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status, created_at);

-- Referral tracking
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referral_code VARCHAR(50) NOT NULL,
    tokens_awarded_referrer INTEGER DEFAULT 0,
    tokens_awarded_referred INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'expired'
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_user_id, status);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);

-- Lions Club organization table
CREATE TABLE IF NOT EXISTS lions_club_organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_name VARCHAR(255) NOT NULL,
    lions_club_id VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    monthly_token_allocation INTEGER DEFAULT 0,
    contact_email VARCHAR(255),
    contact_name VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lions_club_org_id ON lions_club_organizations(lions_club_id);

-- AI request logging (for token tracking and analytics)
CREATE TABLE IF NOT EXISTS ai_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    request_type VARCHAR(50) NOT NULL, -- 'profile_generation', 'network_insights', 'communication_plan', 'chatbot', 'content_generation'
    tokens_used INTEGER DEFAULT 0,
    request_status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'processing', 'completed', 'failed'
    error_message TEXT,
    response_time_ms INTEGER,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_requests_user_id ON ai_requests(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_requests_type ON ai_requests(request_type, created_at);

-- Update saved_contacts to support enhanced features
ALTER TABLE saved_contacts ADD COLUMN IF NOT EXISTS ai_insights_generated_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE saved_contacts ADD COLUMN IF NOT EXISTS last_insight_update_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE saved_contacts ADD COLUMN IF NOT EXISTS communication_plan_enabled BOOLEAN DEFAULT true;

-- Update business_cards for profile editing tracking
ALTER TABLE business_cards ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN DEFAULT false;
ALTER TABLE business_cards ADD COLUMN IF NOT EXISTS last_ai_generation_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE business_cards ADD COLUMN IF NOT EXISTS edit_count INTEGER DEFAULT 0;
ALTER TABLE business_cards ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en';

-- Insert default subscription tiers
INSERT INTO subscription_tiers (id, name, display_name, monthly_tokens, price_monthly, price_yearly, features) VALUES
    ('00000000-0000-0000-0000-000000000001', 'free', 'Free', 1000, 0.00, 0.00, '["basic_profile", "basic_sharing", "limited_ai"]'::jsonb),
    ('00000000-0000-0000-0000-000000000002', 'professional', 'Professional', 10000, 9.99, 99.99, '["advanced_profile", "all_sharing", "unlimited_ai", "network_insights", "communication_plans"]'::jsonb),
    ('00000000-0000-0000-0000-000000000003', 'enterprise', 'Enterprise', 999999, 99.99, 999.99, '["unlimited_everything", "team_management", "api_access", "custom_branding", "priority_support"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Insert default Lions Club organization
INSERT INTO lions_club_organizations (id, organization_name, lions_club_id, monthly_token_allocation, is_active) VALUES
    ('00000000-0000-0000-0000-000000000004', 'Lions Club International', 'LCI_DEFAULT', 5000, true)
ON CONFLICT (lions_club_id) DO NOTHING;

-- Function to update token balance
CREATE OR REPLACE FUNCTION update_user_token_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET token_balance = (
        SELECT COALESCE(SUM(amount), 0)
        FROM token_transactions
        WHERE user_id = NEW.user_id
    )
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update token balance on transaction
CREATE TRIGGER update_token_balance_trigger
AFTER INSERT ON token_transactions
FOR EACH ROW
EXECUTE FUNCTION update_user_token_balance();

