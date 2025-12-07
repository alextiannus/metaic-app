<template>
  <view class="contact-radar-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <view class="header-text">
          <text class="header-title">{{ language === 'zh' ? '联系人雷达' : 'Contact Radar' }}</text>
          <text class="header-subtitle">{{ language === 'zh' ? '发现附近的专业人士' : 'Discover nearby professionals' }}</text>
        </view>
        <button v-if="showResults" class="refresh-btn" @click="handleRefresh">
          <text class="refresh-icon">🔄</text>
        </button>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Instruction -->
      <view v-if="!showResults && !isScanning" class="instruction-card">
        <text class="instruction-text">
          {{ language === 'zh' ? '🔍 使用雷达功能发现附近使用 MetaIC 的专业人士' : '🔍 Use radar to discover nearby professionals using MetaIC' }}
        </text>
      </view>

      <!-- Radar Illustration -->
      <view v-if="!showResults && !isScanning" class="radar-illustration">
        <view class="radar-container">
          <view class="radar-circle circle-1"></view>
          <view class="radar-circle circle-2"></view>
          <view class="radar-circle circle-3"></view>
          <view class="radar-center">
            <text class="radar-icon">📡</text>
          </view>
        </view>
      </view>

      <!-- Start Button -->
      <button v-if="!showResults && !isScanning" class="start-btn" @click="handleStartScanning">
        {{ language === 'zh' ? '开始扫描' : 'Start Scanning' }}
      </button>

      <!-- Features -->
      <view v-if="!showResults && !isScanning" class="features-grid">
        <view class="feature-item">
          <view class="feature-icon-wrapper">
            <text class="feature-icon">📍</text>
          </view>
          <text class="feature-title">{{ language === 'zh' ? '附近' : 'Nearby' }}</text>
          <text class="feature-desc">50m</text>
        </view>
        <view class="feature-item">
          <view class="feature-icon-wrapper">
            <text class="feature-icon">👥</text>
          </view>
          <text class="feature-title">{{ language === 'zh' ? '在线' : 'Online' }}</text>
          <text class="feature-desc">{{ language === 'zh' ? '实时' : 'Live' }}</text>
        </view>
        <view class="feature-item">
          <view class="feature-icon-wrapper">
            <text class="feature-icon">⚡</text>
          </view>
          <text class="feature-title">{{ language === 'zh' ? '智能' : 'Smart' }}</text>
          <text class="feature-desc">AI</text>
        </view>
      </view>

      <!-- Scanning Animation -->
      <view v-if="isScanning" class="scanning-section">
        <view class="scanning-radar">
          <view class="radar-circle circle-1 scanning"></view>
          <view class="radar-circle circle-2 scanning"></view>
          <view class="radar-circle circle-3 scanning"></view>
          <view class="radar-center scanning-center">
            <text class="radar-icon">📡</text>
          </view>
          <view class="scan-dot dot-1"></view>
          <view class="scan-dot dot-2"></view>
          <view class="scan-dot dot-3"></view>
        </view>
        <view class="scanning-text">
          <text class="scanning-title">{{ language === 'zh' ? '正在扫描附近的人...' : 'Scanning for nearby people...' }}</text>
          <text class="scanning-desc">{{ language === 'zh' ? '这可能需要几秒钟' : 'This may take a few seconds' }}</text>
        </view>
      </view>

      <!-- Results -->
      <view v-if="showResults" class="results-section">
        <view class="results-header">
          <text class="results-title">{{ language === 'zh' ? '发现附近的人' : 'People Nearby' }}</text>
          <text class="results-count">{{ nearbyContacts.length }} {{ language === 'zh' ? '位专业人士' : 'professionals found' }}</text>
        </view>

        <view v-for="contact in nearbyContacts" :key="contact.id" class="contact-card">
          <view class="contact-header">
            <image class="contact-avatar-img" :src="contact.avatar" mode="aspectFill" />
            <view class="contact-info">
              <view class="contact-name-row">
                <text class="contact-name">{{ contact.name }}</text>
                <view class="match-badge">
                  <text>{{ contact.matchScore }}% {{ language === 'zh' ? '匹配' : 'match' }}</text>
                </view>
              </view>
              <text class="contact-title">{{ contact.title }}</text>
              <text class="contact-company">{{ contact.company }}</text>
            </view>
            <view class="distance-info">
              <text class="distance-icon">📍</text>
              <text class="distance-text">{{ contact.distance }}</text>
            </view>
          </view>

          <view class="common-interests">
            <text v-for="(interest, index) in contact.commonInterests" :key="index" class="interest-tag">
              {{ interest }}
            </text>
          </view>

          <button class="connect-btn" @click="handleConnect(contact.id)">
            <text class="connect-icon">👤</text>
            <text>{{ language === 'zh' ? '连接' : 'Connect' }}</text>
          </button>
        </view>

        <view class="privacy-info">
          <text class="privacy-text">
            {{ language === 'zh' ? '🔒 你的位置信息是私密的，只在你主动扫描时共享' : '🔒 Your location is private and only shared when you actively scan' }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface NearbyContact {
  id: string
  name: string
  title: string
  company: string
  distance: string
  matchScore: number
  avatar: string
  commonInterests: string[]
}

const emit = defineEmits<{
  back: []
}>()

const { language } = useLanguage()
const isScanning = ref(false)
const showResults = ref(false)

const nearbyContacts: NearbyContact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Product Manager',
    company: 'Tech Innovations',
    distance: '5m',
    matchScore: 95,
    avatar: '/static/logo.png',
    commonInterests: ['AI', 'Product Design', 'Startups'],
  },
  {
    id: '2',
    name: 'Michael Park',
    title: 'Senior Developer',
    company: 'Cloud Systems',
    distance: '12m',
    matchScore: 88,
    avatar: '/static/logo.png',
    commonInterests: ['Tech', 'Cloud Computing'],
  },
  {
    id: '3',
    name: 'Lisa Wang',
    title: 'Marketing Director',
    company: 'Digital Solutions',
    distance: '18m',
    matchScore: 82,
    avatar: '/static/logo.png',
    commonInterests: ['Marketing', 'AI'],
  },
]

const handleBack = () => {
  emit('back')
}

const handleStartScanning = () => {
  isScanning.value = true
  setTimeout(() => {
    isScanning.value = false
    showResults.value = true
  }, 3000)
}

const handleRefresh = () => {
  showResults.value = false
  handleStartScanning()
}

const handleConnect = (contactId: string) => {
  uni.showToast({
    title: language.value === 'zh' ? '正在发送连接请求...' : 'Sending connection request...',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.contact-radar-page {
  min-height: 100vh;
  background: #020617;
  padding-bottom: 192rpx;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    padding-bottom: 120px;
  }
  
  @media (min-width: 1024px) {
    padding-bottom: 140px;
  }
  // #endif
}

.page-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  max-width: 600rpx;
  margin: 0 auto;
  width: 100%;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    max-width: 700px;
    padding: 24px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
    padding: 32px;
  }
  // #endif
}

.back-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.back-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.1);
}

.back-icon {
  font-size: 48rpx;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
}

.header-text {
  flex: 1;
}

.header-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  display: block;
}

.header-subtitle {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.refresh-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-icon {
  font-size: 40rpx;
  color: $color-text-primary;
}

.page-content {
  padding: $spacing-lg $spacing-md;
  max-width: 600rpx;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    max-width: 700px;
    padding: 40px 24px;
    gap: 24px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
    padding: 50px 32px;
    gap: 30px;
  }
  // #endif
}

.instruction-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
}

.instruction-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  text-align: center;
  display: block;
}

.radar-illustration {
  padding: $spacing-xl;
  border-radius: 56rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-container {
  position: relative;
  width: 384rpx;
  height: 384rpx;
}

.radar-circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid;
}

.circle-1 {
  inset: 0;
  border-color: rgba(250, 204, 21, 0.2);
}

.circle-2 {
  inset: 64rpx;
  border-color: rgba(250, 204, 21, 0.3);
}

.circle-3 {
  inset: 128rpx;
  border-color: rgba(250, 204, 21, 0.4);
}

.radar-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radar-icon {
  font-size: 128rpx;
}

.start-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(250, 204, 21, 0.4);
}

.start-btn:active {
  transform: scale(0.98);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
}

.feature-item {
  padding: 24rpx $spacing-md;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-item:active {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

.feature-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto $spacing-sm;
}

.feature-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.feature-title {
  font-size: $font-size-xs;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.feature-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.scanning-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-lg;
}

.scanning-radar {
  position: relative;
  width: 384rpx;
  height: 384rpx;
}

.scanning {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.scanning-center {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.scan-dot {
  position: absolute;
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #FACC15;
}

.dot-1 {
  top: 32rpx;
  right: 96rpx;
  animation: pulse 1s ease-in-out infinite;
}

.dot-2 {
  bottom: 64rpx;
  left: 64rpx;
  animation: pulse 1s ease-in-out infinite 0.2s;
}

.dot-3 {
  top: 50%;
  right: 32rpx;
  animation: pulse 1s ease-in-out infinite 0.4s;
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.scanning-text {
  text-align: center;
}

.scanning-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  display: block;
  margin-bottom: $spacing-sm;
}

.scanning-desc {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.results-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.results-header {
  margin-bottom: $spacing-sm;
}

.results-title {
  font-size: $font-size-lg;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.results-count {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.contact-card {
  padding: 24rpx $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  margin-bottom: $spacing-md;
}

.contact-card:active {
  border-color: rgba(255, 255, 255, 0.2);
}

.contact-header {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.contact-avatar-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: 8rpx;
}

.contact-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.match-badge {
  padding: 8rpx 16rpx;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  color: #10B981;
  font-size: $font-size-xs;
  flex-shrink: 0;
}

.contact-title {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4rpx;
}

.contact-company {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.distance-info {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: #FACC15;
  font-size: $font-size-xs;
}

.distance-icon {
  font-size: 24rpx;
}

.common-interests {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.interest-tag {
  padding: 8rpx 16rpx;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: $font-size-xs;
}

.connect-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 9999rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.connect-btn:active {
  transform: scale(0.98);
}

.connect-icon {
  font-size: 32rpx;
}

.privacy-info {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.privacy-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  display: block;
}
</style>

