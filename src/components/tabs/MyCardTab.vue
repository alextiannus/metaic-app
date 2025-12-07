<template>
  <view class="my-card-tab">
    <!-- Welcome Screen for New Users -->
    <view v-if="!hasCreatedCard" class="welcome-screen">
      <view class="welcome-content">
        <!-- Logo & Welcome -->
        <view class="welcome-header">
          <view class="welcome-logo">✨</view>
          <text class="welcome-title">{{ language === 'zh' ? '欢迎来到 MetaIC！' : 'Welcome to MetaIC!' }}</text>
          <text class="welcome-subtitle">{{ language === 'zh' ? '用 AI 打造你的专业形象' : 'Create Your Professional Presence with AI' }}</text>
        </view>

        <!-- The Power of MetaIC -->
        <view class="features-card glass-card">
          <text class="features-title">{{ language === 'zh' ? '✨ MetaIC 的强大功能' : '✨ The Power of MetaIC' }}</text>
          <view class="features-list">
            <view class="feature-item">
              <view class="feature-icon">📸</view>
              <view class="feature-content">
                <text class="feature-name">{{ language === 'zh' ? 'AI 智能创建名片' : '📸 AI-Powered Card Creation' }}</text>
                <text class="feature-desc">{{ language === 'zh' ? '让 AI 为你创建名片，轻松分享，任意风格随心选' : 'Let AI create a name card for easy sharing with any style you like' }}</text>
              </view>
            </view>
            <view class="feature-item">
              <view class="feature-icon">🤖</view>
              <view class="feature-content">
                <text class="feature-name">{{ language === 'zh' ? '智能信息提取' : '🤖 Smart Information Extraction' }}</text>
                <text class="feature-desc">{{ language === 'zh' ? 'AI 从 LinkedIn、公司网站等自动提取你的职业信息' : 'AI automatically extracts your professional info from LinkedIn, websites, and more' }}</text>
              </view>
            </view>
            <view class="feature-item">
              <view class="feature-icon">🤝</view>
              <view class="feature-content">
                <text class="feature-name">{{ language === 'zh' ? '智能人脉分析' : '🤝 Smart Network Analytics' }}</text>
                <text class="feature-desc">{{ language === 'zh' ? 'AI 分析你的人脉关系并提供专业的联系建议' : 'AI analyzes your connections and provides personalized networking insights' }}</text>
              </view>
            </view>
            <view class="feature-item">
              <view class="feature-icon">⚡</view>
              <view class="feature-content">
                <text class="feature-name">{{ language === 'zh' ? '即时分享交换' : '⚡ Instant Share & Exchange' }}</text>
                <text class="feature-desc">{{ language === 'zh' ? '通过 QR 码、链接或面对面雷达快速交换名片' : 'Share via QR code, links, or face-to-face radar exchange' }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Get Started Button -->
        <button class="create-card-btn" @click="handleCreateCard">
          <text class="btn-icon">✨</text>
          <text>{{ language === 'zh' ? '开始创建我的名片' : 'Create My Card Now' }}</text>
        </button>

        <!-- Encouragement -->
        <text class="encouragement-text">{{ language === 'zh' ? '只需 30 秒，让 AI 为你打造专业形象 🚀' : 'Just 30 seconds to let AI build your professional presence 🚀' }}</text>
      </view>
    </view>

    <!-- Card Display for Existing Users -->
    <view v-else class="card-display">
      <view class="card-content">
        <!-- Card Header -->
        <view class="card-header glass-card">
          <button class="share-btn" @click="handleShare">
            <text class="share-icon">📤</text>
          </button>
          <view class="header-content">
            <view class="avatar-section">
              <view class="avatar-wrapper">
                <image class="avatar" :src="card.personal?.avatar || '/static/logo.png'" mode="aspectFill" />
              </view>
              <view class="avatar-badge">✨</view>
            </view>
            <view class="name-section">
              <view class="name-row">
                <text class="name">{{ card.personal?.fullName }}</text>
                <text v-if="card.personal?.chineseName" class="chinese-name">({{ card.personal.chineseName }})</text>
              </view>
              <text class="title">{{ language === 'zh' && card.personal?.titleZh ? card.personal.titleZh : card.personal?.title }}</text>
              <text class="tagline">{{ language === 'zh' && card.personal?.taglineZh ? card.personal.taglineZh : card.personal?.tagline }}</text>
              <view class="phone-display">
                <text class="phone-label">📱</text>
                <text class="phone-text">Mobile / WhatsApp: {{ card.contact?.phones?.[0]?.number }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Meeting Remark -->
        <view class="meeting-remark glass-card">
          <view class="remark-header">
            <view class="remark-icon">✨</view>
            <view class="remark-content">
              <view class="remark-row">
                <text class="remark-label">Nice meeting you at</text>
                <input v-model="remarkText" class="remark-input" placeholder="Event/Activity" type="text" />
              </view>
              <view class="remark-details">
                <view class="remark-detail">
                  <text class="detail-icon">📍</text>
                  <input v-model="remarkLocation" class="detail-input" placeholder="Location" type="text" />
                </view>
                <view class="remark-detail">
                  <text class="detail-icon">🕐</text>
                  <text class="detail-text">{{ currentDateTime }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Companies -->
        <view class="section glass-card">
          <view class="section-header">
            <text class="section-icon">🏢</text>
            <text class="section-title">Companies</text>
          </view>
          <view class="businesses-list">
            <view v-for="(business, index) in card.businesses" :key="business.id" class="business-item">
              <view class="business-header">
                <view class="business-info">
                  <text class="business-name">{{ business.name }}</text>
                  <text v-if="business.chineseName" class="business-chinese">({{ business.chineseName }})</text>
                  <text class="business-role">{{ language === 'zh' && business.roleZh ? business.roleZh : business.role }}</text>
                </view>
                <view v-if="business.website" class="business-website" @click="openWebsite(business.website)">
                  <text class="website-icon">🌐</text>
                </view>
              </view>
              <text class="business-description">{{ language === 'zh' && business.descriptionZh ? business.descriptionZh : business.description }}</text>
              <view v-if="showAllBusinesses || index === 0" class="business-services">
                <text class="services-label">Services:</text>
                <view v-for="(service, idx) in (language === 'zh' && business.servicesZh ? business.servicesZh : business.services)" :key="idx" class="service-item">
                  <text class="service-dot">•</text>
                  <text class="service-text">{{ service }}</text>
                </view>
              </view>
            </view>
          </view>
          <button v-if="card.businesses.length > 1" class="toggle-btn" @click="showAllBusinesses = !showAllBusinesses">
            <text>{{ showAllBusinesses ? 'Show Less' : 'Show All Services' }}</text>
          </button>
        </view>

        <!-- Headline -->
        <view class="section glass-card">
          <text class="headline-text">{{ card.professional?.headline }}</text>
        </view>

        <!-- Contact Information -->
        <view class="section glass-card">
          <text class="section-title">Contact Information</text>
          <view class="contact-list">
            <view v-for="(phone, index) in card.contact?.phones" :key="index" class="contact-item">
              <view class="contact-icon">📱</view>
              <view class="contact-details">
                <text class="contact-label">{{ phone.label }}</text>
                <text class="contact-value">{{ phone.number }}</text>
              </view>
            </view>
            <view v-for="(address, index) in card.contact?.addresses" :key="'addr-' + index" class="contact-item">
              <view class="contact-icon">📍</view>
              <view class="contact-details">
                <text class="contact-label">{{ address.type === 'office' ? 'Office Address' : 'Address' }}</text>
                <text class="contact-value">{{ address.street }}</text>
                <text class="contact-value">{{ address.city }} {{ address.postalCode }}</text>
              </view>
            </view>
            <view v-for="(email, index) in card.contact?.emails" :key="'email-' + index" class="contact-item" @click="handleEmailClick(email.email)">
              <view class="contact-icon">✉️</view>
              <view class="contact-details">
                <text class="contact-label">{{ email.label }}</text>
                <text class="contact-value">{{ email.email }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Connect -->
        <view class="section glass-card">
          <text class="section-title">Connect</text>
          <view class="social-grid">
            <view v-if="card.links?.linkedin" class="social-item" @click="openWebsite(card.links.linkedin)">
              <text class="social-icon">💼</text>
              <text class="social-label">LinkedIn</text>
            </view>
            <view v-if="card.links?.website?.[0]" class="social-item" @click="openWebsite(card.links.website[0])">
              <text class="social-icon">🌐</text>
              <text class="social-label">Website</text>
            </view>
          </view>
        </view>

        <!-- Works & Services -->
        <view v-if="card.professional?.worksAndServices && card.professional.worksAndServices.length > 0" class="section glass-card">
          <view class="section-header">
            <text class="section-icon">💼</text>
            <text class="section-title">Works & Services</text>
          </view>
          <view class="works-list">
            <view v-for="item in card.professional.worksAndServices" :key="item.id" class="work-item" @click="handleWorkClick(item)">
              <view class="work-icon-wrapper">
                <image v-if="item.icon && item.icon.startsWith('http')" class="work-icon-img" :src="item.icon" mode="aspectFill" />
                <text v-else class="work-icon-emoji">{{ item.icon || '📱' }}</text>
              </view>
              <view class="work-info">
                <text class="work-name">{{ item.name }}</text>
                <text class="work-description">{{ item.description }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- Looking to Connect With -->
        <view class="section glass-card">
          <view class="section-header">
            <text class="section-icon">👥</text>
            <text class="section-title">{{ t('myCard.lookingFor') }}</text>
          </view>
          <view class="tags-container">
            <view v-for="(item, index) in (language === 'zh' && card.networking?.lookingForZh ? card.networking.lookingForZh : card.networking?.lookingFor)" :key="index" class="tag">
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
            <view v-for="(hobby, index) in card.personal_interests?.hobbies" :key="index" class="tag hobby-tag">
              <text>{{ hobby }}</text>
            </view>
          </view>
        </view>

        <!-- About -->
        <view class="section glass-card">
          <text class="section-title">About</text>
          <view class="about-content">
            <text class="about-paragraph">{{ card.professional?.bio?.[0] }}</text>
            <template v-if="isAboutExpanded">
              <text v-for="(paragraph, index) in card.professional?.bio?.slice(1)" :key="index" class="about-paragraph">{{ paragraph }}</text>
            </template>
          </view>
          <button class="toggle-btn" @click="isAboutExpanded = !isAboutExpanded">
            <text>{{ isAboutExpanded ? 'Show Less' : 'Read More' }}</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { alexTianYeCard } from '../../data/alexTianYe'
import { useLanguage } from '../../composables/useLanguage'
import { useUser } from '../../composables/useUser'
import { useApi } from '../../composables/useApi'
import { apiClient } from '../../utils/api'

const emit = defineEmits<{
  shareClick: []
}>()

const { language, t } = useLanguage()
const { hasCreatedCard, setHasCreatedCard } = useUser()
const { execute } = useApi()

// Card data
const card = ref<typeof alexTianYeCard>({ ...alexTianYeCard })
const cardSlug = ref('alextianye')

// State
const remarkText = ref('Singapore Tech Conference 2024')
const remarkLocation = ref('Marina Bay Sands, Singapore')
const showAllBusinesses = ref(false)
const isAboutExpanded = ref(false)

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

// Load card from API
const loadCard = () => {
  execute(() => apiClient.getCardBySlug(cardSlug.value))
    .then((response: any) => {
      if (response && response.card) {
        card.value = response.card
      }
    })
    .catch((error: any) => {
      console.warn('API request failed, using default data:', error?.message || error)
    })
}

// Handlers
const handleCreateCard = () => {
  uni.showModal({
    title: language.value === 'zh' ? '创建名片' : 'Create Card',
    content: language.value === 'zh' ? '正在跳转到 AI 助手创建你的名片...' : 'Redirecting to AI Assistant to create your card...',
    showCancel: false
  })
  setHasCreatedCard(true)
}

const handleShare = () => {
  emit('shareClick')
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

// Load card on mount
import { onMounted } from 'vue'

onMounted(() => {
  if (!card.value || !card.value.personal) {
    card.value = { ...alexTianYeCard }
  }
  setTimeout(() => {
    loadCard()
  }, 500)
})
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.my-card-tab {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 200rpx;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    padding: 40px 24px;
    padding-bottom: 140px;
  }
  
  @media (min-width: 1024px) {
    padding: 50px 32px;
    padding-bottom: 160px;
  }
  // #endif
}

.glass-card {
  background: $color-glass-bg-80; // bg-[#0F172A]/80
  backdrop-filter: $glass-backdrop-filter; // backdrop-blur-xl
  border: $glass-border; // border-white/10
  border-radius: $radius-xl; // rounded-[24px] = 24px = 48rpx
  padding: 40rpx; // p-5 = 20px = 40rpx
  box-shadow: $glass-shadow; // shadow-2xl
  margin-bottom: $spacing-md;
}

// Welcome Screen
.welcome-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-content {
  max-width: 600rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  padding-top: 80rpx;
}

.welcome-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.welcome-logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80rpx;
  margin: 0 auto;
}

.welcome-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.welcome-subtitle {
  font-size: $font-size-base;
  color: rgba(255, 255, 255, 0.6);
}

.features-card {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.features-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  text-align: center;
  margin-bottom: $spacing-md;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.feature-item {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
}

.feature-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.feature-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
}

.feature-desc {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.create-card-btn {
  width: 100%;
  padding: 24rpx 48rpx; // py-4 px-6 = 16px 24px = 32rpx 48rpx
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  border: none;
  border-radius: $radius-xl; // rounded-2xl = 16px = 32rpx
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx; // gap-2 = 8px = 16rpx
  font-weight: $font-weight-medium; // font-medium = 500
  font-size: $font-size-base;
  box-shadow: 0 4px 24px rgba(250, 204, 21, 0.4); // shadow-xl
  transition: all 0.3s ease;
}

.btn-icon {
  font-size: 40rpx;
}

.encouragement-text {
  text-align: center;
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

// Card Display
.card-display {
  max-width: 600rpx;
  margin: 0 auto;
  width: 100%;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    max-width: 700px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
  }
  // #endif
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.card-header {
  position: relative;
}

.share-btn {
  position: absolute;
  top: 40rpx;
  right: 40rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.share-icon {
  font-size: 40rpx;
}

.header-content {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
}

.avatar-section {
  position: relative;
  flex-shrink: 0;
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
  background: #020617;
}

.avatar-badge {
  position: absolute;
  bottom: -8rpx;
  right: -8rpx;
  width: 56rpx;
  height: 56rpx;
  border-radius: $radius-full;
  background: #38BDF8;
  border: 8rpx solid #0F172A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.name-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.name-row {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
  flex-wrap: wrap;
}

.name {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.chinese-name {
  font-size: $font-size-base;
  color: rgba(255, 255, 255, 0.6);
}

.title {
  font-size: $font-size-base;
  color: #38BDF8;
}

.tagline {
  font-size: $font-size-sm;
  color: #FACC15;
  font-style: italic;
}

.phone-display {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: 16rpx;
  color: rgba(255, 255, 255, 0.6);
  font-size: $font-size-sm;
}

.phone-label {
  font-size: 32rpx;
}

.phone-text {
  font-size: $font-size-sm;
}

// Meeting Remark
.meeting-remark {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.3);
}

.remark-header {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;
}

.remark-icon {
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

.remark-content {
  flex: 1;
}

.remark-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  flex-wrap: wrap;
  margin-bottom: 16rpx;
}

.remark-label {
  color: $color-text-primary;
  font-size: $font-size-base;
}

.remark-input {
  flex: 1;
  min-width: 200rpx;
  padding: 8rpx 24rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.3);
  border-radius: $radius-md;
  color: $color-text-primary;
  font-size: $font-size-base;
}

.remark-details {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  color: rgba(255, 255, 255, 0.5);
  font-size: $font-size-sm;
}

.remark-detail {
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

.detail-text {
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
  margin-bottom: $spacing-md;
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
  font-size: $font-size-base;
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

.business-item {
  padding: $spacing-md;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
  border-radius: 40rpx;
}

.business-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.business-info {
  flex: 1;
}

.business-name {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-right: 16rpx;
}

.business-chinese {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.business-role {
  font-size: $font-size-sm;
  color: #38BDF8;
  margin-top: 8rpx;
  display: block;
}

.business-website {
  width: 64rpx;
  height: 64rpx;
  border-radius: $radius-full;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.website-icon {
  font-size: 32rpx;
}

.business-description {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16rpx;
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

.contact-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  flex-shrink: 0;
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
  padding: $spacing-md;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.social-icon {
  font-size: 48rpx;
}

.social-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

// Works List
.works-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.work-item {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-md;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 40rpx;
}

.work-icon-wrapper {
  width: 112rpx;
  height: 112rpx;
  border-radius: $radius-md;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  flex-shrink: 0;
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

.work-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.work-name {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.work-description {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
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
</style>

