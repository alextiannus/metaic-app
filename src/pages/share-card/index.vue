<template>
  <view class="share-card-page">
    <view class="share-modal-content" @click.stop>
      <!-- Header -->
      <view class="modal-header">
        <view class="header-left">
          <view class="header-icon-wrapper">
            <text class="header-icon">📤</text>
          </view>
          <text class="header-title">{{ language === 'zh' ? '分享我的名片' : 'Share My Card' }}</text>
        </view>
        <button class="close-btn" @click="handleBack">
          <text class="close-icon">✕</text>
        </button>
      </view>

      <!-- Content -->
      <scroll-view class="modal-body" scroll-y="true">
        <!-- Business Card Preview -->
        <view ref="cardPreviewRef" class="card-preview">
          <view class="card-wrapper">
            <view class="card-inner">
              <view class="card-header-row">
                <view class="card-info">
                  <text class="card-name">{{ card.personal?.fullName || '' }}</text>
                  <text v-if="card.personal?.chineseName" class="card-chinese-name">({{ card.personal.chineseName }})</text>
                  <text class="card-title">{{ card.personal?.title || '' }}</text>
                  <text class="card-tagline">{{ card.personal?.tagline || '' }}</text>
                </view>
                <view class="card-avatar-wrapper">
                  <image class="card-avatar" :src="card.personal?.avatar || '/static/logo.png'" mode="aspectFill" />
                </view>
              </view>

              <view class="card-contact-info">
                <view v-if="card.contact?.phones && card.contact.phones.length > 0" class="contact-item">
                  <text class="contact-icon">📞</text>
                  <text class="contact-text">{{ card.contact.phones[0]?.number || '' }}</text>
                </view>
                <view v-if="card.contact?.emails && card.contact.emails.length > 0" class="contact-item">
                  <text class="contact-icon">📧</text>
                  <text class="contact-text">{{ card.contact.emails[0]?.email || '' }}</text>
                </view>
              </view>

              <!-- Companies -->
              <view v-if="card.businesses && card.businesses.length > 0" class="card-companies">
                <view v-for="business in card.businesses" :key="business.id" class="company-item">
                  <text class="company-icon">🏢</text>
                  <text class="company-text">
                    {{ business.name }} {{ business.chineseName ? `(${business.chineseName})` : '' }}
                  </text>
                </view>
              </view>

              <!-- QR Code Section -->
              <view class="card-qr-section">
                <view class="qr-info">
                  <view class="qr-brand">
                    <view class="qr-dot"></view>
                    <text class="qr-brand-text">METAIC</text>
                  </view>
                  <text class="qr-hint">Scan to connect</text>
                </view>
                <view v-if="qrCodeUrl" class="qr-code-wrapper">
                  <view class="qr-code-bg">
                    <image class="qr-code-image" :src="qrCodeUrl" mode="aspectFit" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Share Options -->
        <view class="share-options">
          <!-- WhatsApp -->
          <button class="share-option-btn whatsapp-btn" @click="handleShareWhatsApp">
            <view class="option-icon-wrapper whatsapp-icon">
              <text class="option-icon">💬</text>
            </view>
            <view class="option-content">
              <text class="option-title">{{ language === 'zh' ? '通过 WhatsApp 分享' : 'Share via WhatsApp' }}</text>
              <text class="option-desc">{{ language === 'zh' ? '发送名片链接和问候语' : 'Send card link with greeting' }}</text>
            </view>
          </button>

          <!-- Copy Link -->
          <button class="share-option-btn link-btn" @click="handleCopyLink">
            <view class="option-icon-wrapper link-icon">
              <text class="option-icon">🔗</text>
            </view>
            <view class="option-content">
              <text class="option-title">{{ language === 'zh' ? '复制链接' : 'Copy Link' }}</text>
              <text class="option-desc">{{ language === 'zh' ? '复制名片网址' : 'Copy card URL' }}</text>
            </view>
          </button>

          <!-- Download Card -->
          <button class="share-option-btn download-btn" @click="handleDownloadCard">
            <view class="option-icon-wrapper download-icon">
              <text class="option-icon">⬇️</text>
            </view>
            <view class="option-content">
              <text class="option-title">{{ language === 'zh' ? '下载名片图片' : 'Download Card Image' }}</text>
              <text class="option-desc">{{ language === 'zh' ? '保存为图片' : 'Save as image' }}</text>
            </view>
          </button>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import { alexTianYeCard } from '../../data/alexTianYe'

const props = defineProps<{
  remarkText?: string
  remarkLocation?: string
}>()

const { language } = useLanguage()
const cardPreviewRef = ref<HTMLElement | null>(null)
const qrCodeUrl = ref<string>('')

const card = computed(() => alexTianYeCard)
const cardUrl = computed(() => `https://metaic.ai/u/${card.value.slug || 'alextianye'}`)

// Generate QR code on mount
onMounted(() => {
  generateQRCode()
})

const generateQRCode = () => {
  // In Uni-app, we can use uni-app's QR code generation or a library
  // For now, we'll use a placeholder or generate via API
  // This is a simplified version - in production, use a proper QR code library
  qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl.value)}`
}

const handleBack = () => {
  uni.navigateBack()
}

const handleShareWhatsApp = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const eventPart = props.remarkText ? ` ${props.remarkText}` : ''
  const locationPart = props.remarkLocation ? `, ${props.remarkLocation}` : ''
  const timePart = `, ${currentDateTime}`
  
  const meetingContext = props.remarkText 
    ? `Nice meeting you at${eventPart}${locationPart}${timePart}.`
    : `Nice meeting you at ${currentDateTime}.`

  const message = `Hi, This is ${card.value.personal?.fullName || 'Alex'}. ${meetingContext} Keep contact. ${cardUrl.value}`

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
  
  // #ifdef H5
  window.open(whatsappUrl, '_blank')
  // #endif
  // #ifndef H5
  plus.runtime.openURL(whatsappUrl)
  // #endif

  uni.showToast({
    title: language.value === 'zh' ? '正在打开 WhatsApp...' : 'Opening WhatsApp...',
    icon: 'none',
  })
  
  setTimeout(() => {
    handleBack()
  }, 1000)
}

const handleCopyLink = () => {
  // #ifdef H5
  if (navigator.clipboard) {
    navigator.clipboard.writeText(cardUrl.value).then(() => {
      uni.showToast({
        title: language.value === 'zh' ? '链接已复制到剪贴板！' : 'Link copied to clipboard!',
        icon: 'success',
      })
    })
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = cardUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    uni.showToast({
      title: language.value === 'zh' ? '链接已复制到剪贴板！' : 'Link copied to clipboard!',
      icon: 'success',
    })
  }
  // #endif
  // #ifndef H5
  uni.setClipboardData({
    data: cardUrl.value,
    success: () => {
      uni.showToast({
        title: language.value === 'zh' ? '链接已复制到剪贴板！' : 'Link copied to clipboard!',
        icon: 'success',
      })
    }
  })
  // #endif
}

const handleDownloadCard = () => {
  uni.showToast({
    title: language.value === 'zh' ? '下载功能开发中...' : 'Download feature coming soon...',
    icon: 'none',
  })
  // In production, implement canvas-based image generation
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.share-card-page {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 192rpx;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    padding: 40px 24px;
    padding-bottom: 120px;
  }
  
  @media (min-width: 1024px) {
    padding: 50px 32px;
    padding-bottom: 140px;
  }
  // #endif
}

.share-modal-content {
  width: 100%;
  max-width: 600rpx;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.95); // bg-[#0F172A]/95
  backdrop-filter: blur(24px); // backdrop-blur-xl
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
  border-radius: $radius-2xl; // rounded-[28px] = 28px = 56rpx
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: $glass-shadow; // shadow-2xl
  margin-top: $spacing-lg;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    max-width: 700px;
    margin-top: 40px;
    border-radius: 28px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
    margin-top: 50px;
  }
  // #endif
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48rpx; // p-6 = 24px = 48rpx
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24rpx; // gap-3 = 12px = 24rpx
}

.header-icon-wrapper {
  width: 80rpx; // w-10 = 40px = 80rpx
  height: 80rpx; // h-10 = 40px = 80rpx
  border-radius: 50%; // rounded-full
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon {
  font-size: 40rpx;
  color: #020617;
}

.header-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.close-btn {
  width: 64rpx; // w-8 = 32px = 64rpx
  height: 64rpx; // h-8 = 32px = 64rpx
  border-radius: 50%; // rounded-full
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:active {
  background: rgba(255, 255, 255, 0.1);
}

.close-icon {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.6);
}

.modal-body {
  flex: 1;
  padding: 48rpx; // p-6 = 24px = 48rpx
  display: flex;
  flex-direction: column;
  gap: 32rpx; // space-y-4 = 16px = 32rpx
  overflow-y: auto;
}

.card-preview {
  padding: 40rpx; // p-5 = 20px = 40rpx
  background: #020617; // bg-[#020617]
  border-radius: $radius-lg; // rounded-[20px] = 20px = 40rpx
}

.card-wrapper {
  border-radius: $radius-2xl; // rounded-[28px] = 28px = 56rpx
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 50%, #0F172A 100%);
  padding: 4rpx; // p-[2px] = 2px = 4rpx
  box-shadow: 0 8px 32px rgba(250, 204, 21, 0.2), 0 0 0 rgba(250, 204, 21, 0.2); // shadow-2xl shadow-[#FACC15]/20
}

.card-inner {
  border-radius: 52rpx; // rounded-[26px] = 26px = 52rpx
  background: #0F172A; // bg-[#0F172A]
  padding: 48rpx; // p-6 = 24px = 48rpx
}

.card-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $spacing-lg;
}

.card-info {
  flex: 1;
}

.card-name {
  font-size: $font-size-xl;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.card-chinese-name {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: 8rpx;
}

.card-title {
  font-size: $font-size-sm;
  color: #38BDF8;
  display: block;
  margin-bottom: 8rpx;
}

.card-tagline {
  font-size: $font-size-xs;
  color: #FACC15;
  font-style: italic;
  display: block;
  margin-top: 8rpx;
}

.card-avatar-wrapper {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  padding: 4rpx;
  flex-shrink: 0;
}

.card-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.card-contact-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.contact-icon {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.6);
}

.contact-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.8);
}

.card-companies {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
  padding-top: $spacing-md;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.company-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.company-icon {
  font-size: 24rpx;
  color: #FACC15;
}

.company-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.7);
}

.card-qr-section {
  padding-top: $spacing-md;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
}

.qr-info {
  flex: 1;
}

.qr-brand {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: 8rpx;
}

.qr-dot {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #FACC15;
}

.qr-brand-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.qr-hint {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.qr-code-wrapper {
  flex-shrink: 0;
}

.qr-code-bg {
  padding: 16rpx;
  background: $color-text-primary;
  border-radius: 24rpx;
}

.qr-code-image {
  width: 128rpx;
  height: 128rpx;
}

.share-options {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.share-option-btn {
  width: 100%;
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: $radius-lg; // rounded-[20px] = 20px = 40rpx
  display: flex;
  align-items: center;
  gap: 24rpx; // gap-3 = 12px = 24rpx
  transition: all 0.3s ease;
  margin-bottom: 24rpx; // space-y-3 = 12px = 24rpx
}

.whatsapp-btn {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.2) 0%, rgba(37, 211, 102, 0.1) 100%);
  border: 1px solid rgba(37, 211, 102, 0.3);
}

.whatsapp-btn:active {
  border-color: rgba(37, 211, 102, 0.5);
}

.link-btn {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);
  border: 1px solid rgba(250, 204, 21, 0.3);
}

.link-btn:active {
  border-color: rgba(250, 204, 21, 0.5);
}

.download-btn {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.download-btn:active {
  border-color: rgba(255, 255, 255, 0.2);
}

.option-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.whatsapp-icon {
  background: #25D366;
}

.link-icon {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
}

.download-icon {
  background: rgba(255, 255, 255, 0.1);
}

.option-icon {
  font-size: 40rpx;
}

.option-content {
  flex: 1;
  text-align: left;
}

.option-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.option-desc {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}
</style>

