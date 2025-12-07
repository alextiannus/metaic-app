<template>
  <scroll-view class="page-container" scroll-y="true" v-if="card && card.personal">
    <!-- Hero Section -->
    <view class="hero-section glass-card">
      <view class="avatar-container">
        <view class="avatar-wrapper">
          <image class="avatar" :src="card.personal?.avatar || '/static/logo.svg'" mode="aspectFill" />
        </view>
        <view class="avatar-badge">✨</view>
      </view>
      <view class="hero-info">
        <text class="name">{{ card.personal?.fullName || 'Loading...' }}</text>
        <text v-if="card.personal?.chineseName" class="chinese-name">({{ card.personal.chineseName }})</text>
        <text class="title">{{ card.personal?.title || '' }}</text>
        <text class="tagline">{{ card.personal?.tagline || '' }}</text>
        <view class="phone-info" v-if="card.contact?.phones && card.contact.phones.length > 0">
          <text class="phone-label">📱 Mobile / WhatsApp:</text>
          <text class="phone-number">{{ card.contact.phones[0]?.number || '' }}</text>
        </view>
      </view>
      <view class="hero-actions">
        <button class="add-contact-btn" @click="handleAddContact">
          <text class="btn-icon">👤</text>
          <text class="btn-text">Add Contact</text>
        </button>
        <button class="say-hello-btn" @click="handleSayHello">
          <text class="btn-icon">💬</text>
          <text class="btn-text">Say Hello</text>
        </button>
      </view>
    </view>

    <!-- Meeting Note -->
    <view class="meeting-note glass-card">
      <view class="note-header">
        <view class="note-icon">✨</view>
        <view class="note-content">
          <view class="note-row">
            <text class="note-label">Nice meeting you at</text>
            <input
              v-model="remarkText"
              class="note-input"
              placeholder="Event/Activity"
              type="text"
            />
          </view>
          <view class="note-details">
            <view class="note-detail">
              <text class="detail-icon">📍</text>
              <input
                v-model="remarkLocation"
                class="detail-input"
                placeholder="Location"
                type="text"
              />
            </view>
            <view class="note-detail">
              <text class="detail-icon">🕐</text>
              <text class="detail-text">{{ currentDateTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Businesses Section -->
    <view class="section glass-card">
      <view class="section-header">
        <text class="section-icon">🏢</text>
        <text class="section-title">Companies</text>
      </view>
      <view class="businesses-list">
        <view
          v-for="business in card.businesses"
          :key="business.id"
          class="business-card"
        >
          <view class="business-header">
            <view class="business-info">
              <text class="business-name">{{ business.name }}</text>
              <text v-if="business.chineseName" class="business-chinese">({{ business.chineseName }})</text>
              <text class="business-role">{{ business.role }}</text>
            </view>
            <view v-if="business.website" class="business-website" @click="openWebsite(business.website)">
              <text class="website-icon">🌐</text>
            </view>
          </view>
          <text class="business-description">{{ business.description }}</text>
          <view v-if="showAllBusinesses || card.businesses.indexOf(business) === 0" class="business-services">
            <text class="services-label">Services:</text>
            <view v-for="(service, idx) in business.services" :key="idx" class="service-item">
              <text class="service-dot">•</text>
              <text class="service-text">{{ service }}</text>
            </view>
          </view>
        </view>
      </view>
      <button
        v-if="card.businesses.length > 1"
        class="toggle-btn"
        @click="showAllBusinesses = !showAllBusinesses"
      >
        <text>{{ showAllBusinesses ? 'Show Less' : 'Show All Services' }}</text>
      </button>
    </view>

    <!-- Headline -->
    <view class="section glass-card">
      <text class="headline-text">{{ card.professional.headline }}</text>
    </view>

    <!-- Contact Information -->
    <view class="section glass-card">
      <text class="section-title">Contact Information</text>
      <view class="contact-list">
        <view
          v-for="(phone, index) in card.contact.phones"
          :key="index"
          class="contact-item"
        >
          <view class="contact-icon-wrapper phone-icon">
            <text class="contact-icon-emoji">📱</text>
          </view>
          <view class="contact-details">
            <text class="contact-label">{{ phone.label || 'Phone' }}</text>
            <text class="contact-value">{{ phone.number }}</text>
          </view>
        </view>

        <view
          v-for="(address, index) in card.contact.addresses"
          :key="'addr-' + index"
          class="contact-item"
        >
          <view class="contact-icon-wrapper address-icon">
            <text class="contact-icon-emoji">📍</text>
          </view>
          <view class="contact-details">
            <text class="contact-label">{{ address.type === 'office' ? 'Office Address' : 'Address' }}</text>
            <text class="contact-value">{{ address.street }}</text>
            <text class="contact-value">{{ address.city }} {{ address.postalCode }}</text>
          </view>
        </view>

        <view
          v-for="(email, index) in card.contact.emails"
          :key="'email-' + index"
          class="contact-item"
          @click="handleEmailClick(email.email)"
        >
          <view class="contact-icon-wrapper email-icon">
            <text class="contact-icon-emoji">✉️</text>
          </view>
          <view class="contact-details">
            <text class="contact-label">{{ email.label || 'Email' }}</text>
            <text class="contact-value">{{ email.email }}</text>
          </view>
        </view>

        <view
          v-for="(website, index) in card.links.website"
          :key="'web-' + index"
          class="contact-item"
          @click="openWebsite(website)"
        >
          <view class="contact-icon-wrapper website-icon">
            <text class="contact-icon-emoji">🌐</text>
          </view>
          <view class="contact-details">
            <text class="contact-label">Website {{ index + 1 }}</text>
            <text class="contact-value">{{ website }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- Social Links -->
    <view class="section glass-card">
      <text class="section-title">Connect</text>
      <view class="social-grid">
        <view v-if="card.links.linkedin" class="social-item" @click="openWebsite(card.links.linkedin)">
          <text class="social-icon">💼</text>
          <text class="social-label">LinkedIn</text>
        </view>
        <view v-if="card.links.whatsapp" class="social-item" @click="handleWhatsApp">
          <text class="social-icon">💬</text>
          <text class="social-label">WhatsApp</text>
        </view>
        <view v-if="card.links.metaicProfile" class="social-item metaic-item" @click="openWebsite(card.links.metaicProfile)">
          <text class="social-icon">✨</text>
          <text class="social-label">MetaIC Profile</text>
        </view>
      </view>
    </view>

    <!-- Works & Services -->
    <view v-if="card.professional.worksAndServices && card.professional.worksAndServices.length > 0" class="section glass-card">
      <view class="section-header">
        <text class="section-icon">💼</text>
        <text class="section-title">Works & Services</text>
      </view>
      <view class="works-grid">
        <view
          v-for="item in card.professional.worksAndServices"
          :key="item.id"
          class="work-item"
          :class="{ 'work-app': item.type === 'app' }"
          @click="handleWorkClick(item)"
        >
          <view class="work-icon-wrapper">
            <image
              v-if="item.icon && item.icon.startsWith('http')"
              class="work-icon-img"
              :src="item.icon"
              mode="aspectFill"
            />
            <text v-else class="work-icon-emoji">{{ item.icon || '📱' }}</text>
          </view>
          <view class="work-info">
            <view class="work-header">
              <text class="work-name">{{ item.name }}</text>
              <view v-if="item.type === 'app'" class="app-badge">
                <text class="app-badge-icon">📱</text>
              </view>
            </view>
            <text v-if="item.englishName" class="work-english">{{ item.englishName }}</text>
            <text class="work-description">{{ item.description }}</text>
            <view v-if="item.type === 'app'" class="work-download">
              <text class="download-text">Download App</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Looking to Connect With -->
    <view class="section glass-card">
      <view class="section-header">
        <text class="section-icon">👥</text>
        <text class="section-title">Looking to Connect With</text>
      </view>
      <view class="tags-container">
        <view
          v-for="(item, index) in card.networking.lookingFor"
          :key="index"
          class="tag"
        >
          <text>{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- Hobbies & Interests -->
    <view class="section glass-card">
      <view class="section-header">
        <text class="section-icon">❤️</text>
        <text class="section-title">Hobbies & Interests</text>
      </view>
      <view class="tags-container">
        <view
          v-for="(hobby, index) in card.personal_interests.hobbies"
          :key="index"
          class="tag hobby-tag"
        >
          <text>{{ hobby }}</text>
        </view>
      </view>
    </view>

    <!-- About Section -->
    <view class="section glass-card">
      <text class="section-title">About</text>
      <view class="about-content">
        <text class="about-paragraph">{{ card.professional.bio[0] }}</text>
        <template v-if="isAboutExpanded">
          <text
            v-for="(paragraph, index) in card.professional.bio.slice(1)"
            :key="index"
            class="about-paragraph"
          >{{ paragraph }}</text>
        </template>
      </view>
      <button class="toggle-btn" @click="isAboutExpanded = !isAboutExpanded">
        <text>{{ isAboutExpanded ? 'Show Less' : 'Read More' }}</text>
      </button>
    </view>

    <!-- Bottom Fixed Dock -->
    <view class="bottom-dock">
      <view class="dock-container glass-card">
        <button class="whatsapp-btn" @click="handleWhatsApp">
          <text class="whatsapp-text">WhatsApp</text>
        </button>
        <button class="save-contact-btn" @click="handleSaveContact">
          <text class="save-icon">💾</text>
        </button>
      </view>
    </view>

    <!-- AI Assistant Widget -->
    <button
      v-if="!showAIAssistant"
      class="ai-assistant-btn"
      @click="showAIAssistant = true"
    >
      <text class="ai-icon">✨</text>
    </button>

    <!-- AI Assistant Panel -->
    <view v-if="showAIAssistant" class="ai-assistant-panel glass-card">
      <view class="ai-header">
        <view class="ai-header-left">
          <view class="ai-avatar">✨</view>
          <view class="ai-title-group">
            <text class="ai-title">AI Assistant</text>
            <text class="ai-subtitle">Ask me about Alex</text>
          </view>
        </view>
        <button class="ai-close-btn" @click="showAIAssistant = false">
          <text class="close-icon">✕</text>
        </button>
      </view>
      <scroll-view class="ai-content" scroll-y="true">
        <view class="ai-message-bubble">
          <view class="ai-avatar-small">✨</view>
          <view class="ai-message-content">
            <text class="ai-message-text">{{ card.ai.conversationStarter }}</text>
            <text class="ai-message-summary">{{ card.ai.summary }}</text>
          </view>
        </view>
      </scroll-view>
      <view class="ai-input-container">
        <input
          v-model="aiInput"
          class="ai-input"
          placeholder="Type your question..."
          type="text"
        />
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { alexTianYeCard } from '../../data/alexTianYe'
import { useApi } from '../../composables/useApi'
import { apiClient } from '../../utils/api'

// API
const { isLoading: isApiLoading, error: apiError, execute } = useApi()

// Card data - will be loaded from API or use default
// Initialize with default data immediately to prevent rendering errors
const card = ref<typeof alexTianYeCard>({ ...alexTianYeCard })
const cardSlug = ref('alextianye') // This would come from route params
const cardLoaded = ref(false) // Track if card was loaded from API

// Ensure card always has valid structure
if (!card.value.personal || !card.value.contact || !card.value.businesses) {
  card.value = { ...alexTianYeCard }
}

// State
const remarkText = ref('SG Fintech Festival')
const remarkLocation = ref('Marina Bay Sands, Singapore')
const showAllBusinesses = ref(false)
const isAboutExpanded = ref(false)
const showAIAssistant = ref(false)
const aiInput = ref('')

// Computed
const currentDateTime = computed(() => {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Load card from API (completely non-blocking - fire and forget)
const loadCard = () => {
  // Don't await - just fire the request and continue
  // Use a very short timeout to fail fast
  const timeoutId = setTimeout(() => {
    console.log('⏱️ API request taking too long, using default data')
  }, 3000)
  
  // Fire the request but don't block
  execute(() => apiClient.getCardBySlug(cardSlug.value))
    .then((response: any) => {
      clearTimeout(timeoutId)
      if (response && response.card) {
        card.value = response.card
        cardLoaded.value = true
        console.log('✅ Card loaded from API:', card.value?.personal?.fullName)
      }
    })
    .catch((error: any) => {
      clearTimeout(timeoutId)
      console.warn('⚠️ API request failed, using default data:', error?.message || error)
      // Don't do anything - default data is already set
    })
}

// Handlers
const handleAddContact = () => {
  const currentCard = card.value
  const remarkNote = `Nice meeting you at ${remarkText.value}. ${remarkLocation.value} | ${currentDateTime.value}`
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${currentCard.personal.fullName}
N:${currentCard.personal.lastName};${currentCard.personal.firstName};;;
TITLE:${currentCard.personal.title}
EMAIL;TYPE=INTERNET:${currentCard.contact.emails[0].email}
EMAIL;TYPE=INTERNET:${currentCard.contact.emails[1]?.email || ''}
TEL;TYPE=CELL:${currentCard.contact.phones[0].number}
URL:${currentCard.links.website?.[0] || ''}
URL:${currentCard.links.metaicProfile || ''}
ADR:;;${currentCard.personal.location.city};;;${currentCard.personal.location.country}
NOTE:${remarkNote}
ORG:${currentCard.businesses[0].name};${currentCard.businesses[1]?.name || ''}
END:VCARD`

  // In uni-app, we'd use uni.downloadFile or similar
  console.log('vCard generated:', vCard)
  uni.showToast({
    title: 'Contact saved!',
    icon: 'success'
  })
}

const handleSayHello = () => {
  const currentCard = card.value
  const message = encodeURIComponent(`Hi Alex! Nice meeting you at ${remarkText.value}. I'd love to learn more about your AI solutions!`)
  const whatsappUrl = `https://wa.me/${currentCard.contact.phones[0].number.replace(/\+/g, '')}?text=${message}`
  // #ifdef H5
  window.open(whatsappUrl, '_blank')
  // #endif
  // #ifndef H5
  plus.runtime.openURL(whatsappUrl)
  // #endif
}

const handleWhatsApp = () => {
  handleSayHello()
}

const handleSaveContact = () => {
  handleAddContact()
}

const handleEmailClick = (email: string) => {
  // #ifdef H5
  window.location.href = `mailto:${email}`
  // #endif
  // #ifndef H5
  plus.runtime.openURL(`mailto:${email}`)
  // #endif
}

const openWebsite = (url: string) => {
  // #ifdef H5
  window.open(url, '_blank')
  // #endif
  // #ifndef H5
  plus.runtime.openURL(url)
  // #endif
}

const handleWorkClick = (item: any) => {
  if (item.type === 'app') {
    // Detect device and open appropriate store
    // #ifdef H5
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      if (item.appStoreUrl) window.open(item.appStoreUrl, '_blank')
    } else if (/android/i.test(userAgent)) {
      if (item.playStoreUrl) window.open(item.playStoreUrl, '_blank')
    } else {
      if (item.appStoreUrl) window.open(item.appStoreUrl, '_blank')
    }
    // #endif
  }
}

// Load card on mount (completely non-blocking)
onMounted(() => {
  console.log('✅ Page mounted')
  
  // Ensure default data is available immediately - CRITICAL
  if (!card.value || !card.value.personal || !card.value.contact || !card.value.businesses) {
    console.log('📋 Initializing with default card data')
    card.value = { ...alexTianYeCard }
  }
  
  console.log('📄 Card data ready:', card.value.personal?.fullName)
  
  // Try to load card from API in background AFTER page has rendered
  // Use longer delay to ensure page is fully rendered first
  setTimeout(() => {
    console.log('🔄 Attempting to load card from API (non-blocking)...')
    loadCard() // Fire and forget - don't await
  }, 500) // Delay to ensure page renders first
})
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.page-container {
  min-height: 100vh;
  background: $color-background;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 200rpx;
}

.glass-card {
  background: $glass-bg;
  backdrop-filter: $glass-backdrop-filter;
  border: $glass-border;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  width: 100%;
  max-width: 600rpx;
}

// Hero Section
.hero-section {
  margin-top: 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
}

.avatar-container {
  position: relative;
  margin-bottom: $spacing-md;
}

.avatar-wrapper {
  width: 160rpx;
  height: 160rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  padding: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: $radius-full;
  background: $color-background;
}

.avatar-badge {
  position: absolute;
  bottom: -8rpx;
  right: -8rpx;
  width: 56rpx;
  height: 56rpx;
  border-radius: $radius-full;
  background: #38BDF8;
  border: 8rpx solid $color-background;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.hero-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  text-align: center;
}

.name {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.chinese-name {
  font-size: 36rpx;
  color: rgba(255, 255, 255, 0.6);
}

.title {
  font-size: $font-size-lg;
  color: #38BDF8;
  margin-top: 8rpx;
}

.tagline {
  font-size: $font-size-base;
  color: #FACC15;
  font-style: italic;
  margin-top: 8rpx;
}

.phone-info {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 16rpx;
  color: rgba(255, 255, 255, 0.6);
  font-size: $font-size-sm;
}

.hero-actions {
  display: flex;
  gap: $spacing-md;
  width: 100%;
  margin-top: $spacing-md;
}

.add-contact-btn {
  flex: 1;
  padding: 28rpx $spacing-md;
  background: #FACC15;
  color: $color-background;
  border: none;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  font-weight: $font-weight-medium;
}

.say-hello-btn {
  flex: 1;
  padding: 28rpx $spacing-md;
  background: rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.btn-icon {
  font-size: 32rpx;
}

.btn-text {
  font-size: $font-size-base;
}

// Meeting Note
.meeting-note {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.3);
  transform: rotate(-1deg);
}

.note-header {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
}

.note-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  flex-shrink: 0;
}

.note-content {
  flex: 1;
}

.note-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  flex-wrap: wrap;
  margin-bottom: 16rpx;
}

.note-label {
  color: $color-text-primary;
  font-size: $font-size-base;
}

.note-input {
  flex: 1;
  min-width: 200rpx;
  padding: 8rpx 24rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.3);
  border-radius: $radius-md;
  color: $color-text-primary;
  font-size: $font-size-base;
}

.note-details {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  color: rgba(255, 255, 255, 0.5);
  font-size: $font-size-sm;
}

.note-detail {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.detail-input {
  flex: 1;
  padding: 4rpx 16rpx;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
  font-size: $font-size-sm;
}

// Section Styles
.section {
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: $spacing-lg;
}

.section-icon {
  font-size: 40rpx;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.headline-text {
  font-size: $font-size-md;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  text-align: center;
}

// Businesses
.businesses-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.business-card {
  padding: $spacing-lg;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
  border-radius: 40rpx;
}

.business-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24rpx;
}

.business-info {
  flex: 1;
}

.business-name {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-right: 16rpx;
}

.business-chinese {
  font-size: $font-size-base;
  color: rgba(255, 255, 255, 0.6);
}

.business-role {
  font-size: $font-size-sm;
  color: #38BDF8;
  margin-top: 8rpx;
  display: block;
}

.business-website {
  width: 72rpx;
  height: 72rpx;
  border-radius: $radius-full;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.business-description {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24rpx;
  line-height: 1.6;
}

.business-services {
  margin-top: 16rpx;
}

.services-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16rpx;
  display: block;
}

.service-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  margin-bottom: 8rpx;
}

.service-dot {
  color: #FACC15;
  font-size: 24rpx;
  margin-top: 4rpx;
}

.service-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.8);
  flex: 1;
}

// Contact List
.contact-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  padding: $spacing-md;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 40rpx;
}

.contact-icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  border-radius: $radius-full;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.phone-icon {
  background: rgba(250, 204, 21, 0.2);
}

.address-icon,
.email-icon,
.website-icon {
  background: rgba(56, 189, 248, 0.2);
}

.contact-icon-emoji {
  font-size: 48rpx;
}

.contact-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.contact-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.contact-value {
  font-size: $font-size-base;
  color: $color-text-primary;
}

// Social Grid
.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.social-item {
  padding: $spacing-lg;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.metaic-item {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);
  border: 1px solid rgba(250, 204, 21, 0.3);
}

.social-icon {
  font-size: 56rpx;
}

.social-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

// Works Grid
.works-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.work-item {
  padding: $spacing-md;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40rpx;
}

.work-app {
  border: 1px solid rgba(250, 204, 21, 0.5);
}

.work-icon-wrapper {
  width: 112rpx;
  height: 112rpx;
  border-radius: $radius-md;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  margin-bottom: 24rpx;
}

.work-icon-img {
  width: 100%;
  height: 100%;
}

.work-icon-emoji {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56rpx;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8rpx;
}

.work-name {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  flex: 1;
}

.app-badge {
  width: 48rpx;
  height: 48rpx;
  border-radius: $radius-full;
  background: rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-english {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8rpx;
  display: block;
}

.work-description {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 16rpx;
}

.work-download {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: #FACC15;
  font-size: $font-size-sm;
}

// Tags
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag {
  padding: 20rpx 32rpx;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);
  border: 1px solid rgba(250, 204, 21, 0.3);
  border-radius: $radius-xl;
  color: $color-text-primary;
  font-size: $font-size-sm;
}

.hobby-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

// About
.about-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.about-paragraph {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
}

.toggle-btn {
  color: #FACC15;
  font-size: $font-size-sm;
  background: transparent;
  border: none;
  padding: 0;
  margin-top: $spacing-md;
}

// Bottom Dock
.bottom-dock {
  position: fixed;
  bottom: 40rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 $spacing-md;
  z-index: 100;
}

.dock-container {
  width: 100%;
  max-width: 600rpx;
  padding: 48rpx 64rpx;
  border-radius: 200rpx;
  display: flex;
  gap: 48rpx;
  align-items: center;
}

.whatsapp-btn {
  flex: 1;
  height: 176rpx;
  background: $color-action;
  border: none;
  border-radius: $radius-xl;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whatsapp-text {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: #000000;
}

.save-contact-btn {
  width: 176rpx;
  height: 176rpx;
  border-radius: $radius-full;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-icon {
  font-size: 72rpx;
}

// AI Assistant
.ai-assistant-btn {
  position: fixed;
  bottom: 240rpx;
  right: 80rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  box-shadow: 0 8rpx 32rpx rgba(250, 204, 21, 0.3);
}

.ai-icon {
  font-size: 56rpx;
}

.ai-assistant-panel {
  position: fixed;
  bottom: 240rpx;
  right: 80rpx;
  width: 768rpx;
  max-height: 1000rpx;
  z-index: 101;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.ai-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-lg;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ai-header-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.ai-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
}

.ai-title-group {
  display: flex;
  flex-direction: column;
}

.ai-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.ai-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.ai-close-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: $radius-full;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-content {
  flex: 1;
  padding: $spacing-lg;
  max-height: 600rpx;
}

.ai-message-bubble {
  display: flex;
  gap: 24rpx;
}

.ai-avatar-small {
  width: 64rpx;
  height: 64rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  flex-shrink: 0;
}

.ai-message-content {
  flex: 1;
  padding: $spacing-md;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.ai-message-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
}

.ai-message-summary {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.ai-input-container {
  padding: $spacing-md;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.ai-input {
  width: 100%;
  padding: 28rpx 32rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40rpx;
  color: $color-text-primary;
  font-size: $font-size-base;
}
</style>
