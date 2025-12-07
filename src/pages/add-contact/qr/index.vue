<template>
  <view class="add-contact-qr-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '扫描二维码添加' : 'Add Contact via QR Code' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Instruction -->
      <view class="instruction-card">
        <text class="instruction-text">
          {{ language === 'zh' ? '📷 扫描对方的 MetaIC 名片二维码以添加联系人' : '📷 Scan their MetaIC card QR code to add contact' }}
        </text>
      </view>

      <!-- Scanner Area -->
      <view class="scanner-section">
        <view v-if="!isScanning && !scanResult" class="scanner-frame">
          <text class="scanner-icon">📷</text>
          <view class="scanning-line"></view>
        </view>

        <view v-if="isScanning" class="scanner-active">
          <view class="scanner-overlay"></view>
          <text class="scanner-icon-active">📷</text>
          <view class="scanning-line-active"></view>
        </view>

        <view v-if="scanResult" class="scanner-success">
          <text class="success-icon">✓</text>
          <text class="success-title">{{ language === 'zh' ? '扫描成功！' : 'Scan Successful!' }}</text>
        </view>
      </view>

      <!-- Start Button -->
      <button v-if="!isScanning && !scanResult" class="scan-btn" @click="handleStartScan">
        {{ language === 'zh' ? '开始扫描' : 'Start Scanning' }}
      </button>

      <!-- Contact Preview -->
      <view v-if="scanResult" class="contact-preview">
        <view class="preview-header">
          <image class="preview-avatar" :src="scanResult.avatar || '/static/logo.png'" mode="aspectFill" />
          <view class="preview-info">
            <text class="preview-name">{{ scanResult.name }}</text>
            <text class="preview-title">{{ scanResult.title }}</text>
            <text class="preview-company">{{ scanResult.company }}</text>
          </view>
        </view>

        <button class="add-btn" @click="handleAddContact">
          {{ language === 'zh' ? '添加联系人' : 'Add Contact' }}
        </button>
      </view>

      <!-- Tips -->
      <view class="tips-section">
        <view class="tip-item">
          <view class="tip-number">1</view>
          <view class="tip-content">
            <text class="tip-title">{{ language === 'zh' ? '对准二维码' : 'Align QR code' }}</text>
            <text class="tip-desc">{{ language === 'zh' ? '确保二维码完全在扫描框内' : 'Make sure QR code is fully in frame' }}</text>
          </view>
        </view>
        <view class="tip-item">
          <view class="tip-number">2</view>
          <view class="tip-content">
            <text class="tip-title">{{ language === 'zh' ? '保持稳定' : 'Hold steady' }}</text>
            <text class="tip-desc">{{ language === 'zh' ? '保持手机稳定以获得最佳扫描效果' : 'Keep phone steady for best scanning results' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../../composables/useLanguage'

const emit = defineEmits<{
  back: []
  complete: [contactData: any]
}>()

const { language } = useLanguage()
const isScanning = ref(false)
const scanResult = ref<any>(null)

const handleBack = () => {
  emit('back')
}

const handleStartScan = () => {
  isScanning.value = true
  // Simulate QR code scanning
  setTimeout(() => {
    isScanning.value = false
    scanResult.value = {
      name: 'John Smith',
      title: 'Product Manager',
      company: 'Tech Solutions Inc.',
      avatar: '/static/logo.png',
      email: 'john@techsolutions.com',
      phone: '+1 234 567 8900',
    }
  }, 2000)
}

const handleAddContact = () => {
  emit('complete', scanResult.value)
  uni.showToast({
    title: language.value === 'zh' ? '联系人已添加' : 'Contact added',
    icon: 'success',
  })
  handleBack()
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.add-contact-qr-page {
  min-height: 100vh;
  background: #020617;
  padding-bottom: 192rpx;
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

.header-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
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

.scanner-section {
  padding: $spacing-xl;
  border-radius: 56rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 512rpx;
  justify-content: center;
}

.scanner-frame {
  width: 512rpx;
  height: 512rpx;
  border-radius: 48rpx;
  border: 8rpx dashed rgba(250, 204, 21, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.scanner-icon {
  font-size: 192rpx;
  color: rgba(250, 204, 21, 0.6);
}

.scanning-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background: linear-gradient(90deg, transparent 0%, #FACC15 50%, transparent 100%);
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.scanner-active {
  width: 512rpx;
  height: 512rpx;
  border-radius: 48rpx;
  border: 8rpx solid #FACC15;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.scanner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(250, 204, 21, 0.2) 0%, transparent 100%);
  animation: pulse 2s ease-in-out infinite;
}

.scanner-icon-active {
  font-size: 192rpx;
  color: #FACC15;
  animation: pulse 2s ease-in-out infinite;
}

.scanning-line-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background: #FACC15;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { top: 0; }
  50% { top: calc(100% - 4rpx); }
}

.scanner-success {
  width: 512rpx;
  height: 512rpx;
  border-radius: 48rpx;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
  border: 8rpx solid #10B981;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.success-icon {
  font-size: 192rpx;
  color: #10B981;
  margin-bottom: $spacing-md;
}

.success-title {
  font-size: $font-size-base;
  color: $color-text-primary;
}

.scan-btn {
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

.scan-btn:active {
  transform: scale(0.98);
}

.contact-preview {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.preview-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
}

.preview-info {
  flex: 1;
}

.preview-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  display: block;
  margin-bottom: 8rpx;
}

.preview-title {
  font-size: $font-size-sm;
  color: #38BDF8;
  display: block;
  margin-bottom: 4rpx;
}

.preview-company {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.add-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  transition: all 0.3s ease;
}

.add-btn:active {
  transform: scale(0.98);
}

.tips-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.tip-item {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
}

.tip-number {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.2);
  color: #FACC15;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.tip-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}
</style>

