<template>
  <view class="face-to-face-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '面对面交换' : 'Face to Face Exchange' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Mode Toggle -->
      <view class="mode-toggle">
        <button
          :class="['mode-btn', mode === 'show' ? 'active' : '']"
          @click="mode = 'show'"
        >
          <text class="mode-icon">📱</text>
          <text>{{ language === 'zh' ? '展示我的' : 'Show Mine' }}</text>
        </button>
        <button
          :class="['mode-btn', mode === 'scan' ? 'active' : '']"
          @click="mode = 'scan'"
        >
          <text class="mode-icon">📷</text>
          <text>{{ language === 'zh' ? '扫描对方' : 'Scan Theirs' }}</text>
        </button>
      </view>

      <!-- Show QR Code Mode -->
      <view v-if="mode === 'show'" class="show-mode">
        <view class="instruction-card">
          <text class="instruction-text">
            {{ language === 'zh' ? '👋 让对方扫描你的二维码以交换名片' : '👋 Let others scan your QR code to exchange cards' }}
          </text>
        </view>

        <view class="qr-display">
          <view class="qr-container">
            <view class="qr-code">
              <text class="qr-placeholder">QR CODE</text>
            </view>
          </view>
          <text class="qr-name">Alex Tian Ye</text>
          <text class="qr-url">metaic.ai/u/alextianye</text>
        </view>

        <view class="features-grid">
          <view class="feature-card">
            <view class="feature-icon-wrapper">
              <text class="feature-icon">✨</text>
            </view>
            <text class="feature-title">{{ language === 'zh' ? '即时交换' : 'Instant' }}</text>
            <text class="feature-desc">{{ language === 'zh' ? '快速分享' : 'Quick share' }}</text>
          </view>
          <view class="feature-card">
            <view class="feature-icon-wrapper">
              <text class="feature-icon">👤</text>
            </view>
            <text class="feature-title">{{ language === 'zh' ? '自动保存' : 'Auto-save' }}</text>
            <text class="feature-desc">{{ language === 'zh' ? '双向同步' : 'Both ways' }}</text>
          </view>
        </view>

        <view class="tip-card">
          <text class="tip-text">
            {{ language === 'zh' ? '💡 提示：调高屏幕亮度可以更容易扫描' : '💡 Tip: Increase screen brightness for easier scanning' }}
          </text>
        </view>
      </view>

      <!-- Scan QR Code Mode -->
      <view v-if="mode === 'scan'" class="scan-mode">
        <view class="instruction-card">
          <text class="instruction-text">
            {{ language === 'zh' ? '📸 将对方的二维码放在扫描框内' : '📸 Place their QR code within the scanning frame' }}
          </text>
        </view>

        <view class="scanner-container">
          <view v-if="!isScanning && !scanSuccess" class="scanner-frame">
            <text class="scanner-icon">📷</text>
            <view class="scanning-line"></view>
          </view>

          <view v-if="isScanning" class="scanner-active">
            <view class="scanner-overlay"></view>
            <text class="scanner-icon-active">📷</text>
            <view class="scanning-line-active"></view>
          </view>

          <view v-if="scanSuccess" class="scanner-success">
            <text class="success-icon">✓</text>
            <text class="success-title">{{ language === 'zh' ? '扫描成功！' : 'Scan Successful!' }}</text>
            <text class="success-name">John Smith</text>
          </view>
        </view>

        <button v-if="!isScanning && !scanSuccess" class="scan-btn" @click="handleStartScan">
          {{ language === 'zh' ? '开始扫描' : 'Start Scanning' }}
        </button>

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
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

const emit = defineEmits<{
  back: []
}>()

const { language } = useLanguage()
const mode = ref<'show' | 'scan'>('show')
const isScanning = ref(false)
const scanSuccess = ref(false)

const handleBack = () => {
  emit('back')
}

const handleStartScan = () => {
  isScanning.value = true
  setTimeout(() => {
    isScanning.value = false
    scanSuccess.value = true
    setTimeout(() => {
      scanSuccess.value = false
    }, 3000)
  }, 2000)
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.face-to-face-page {
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

.mode-toggle {
  display: flex;
  padding: 8rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  gap: 8rpx;
}

.mode-btn {
  flex: 1;
  padding: 18rpx 24rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.mode-btn.active {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
}

.mode-icon {
  font-size: 32rpx;
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

.qr-display {
  padding: $spacing-xl;
  border-radius: 56rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-container {
  width: 512rpx;
  height: 512rpx;
  border-radius: 48rpx;
  background: $color-text-primary;
  padding: $spacing-md;
  margin-bottom: $spacing-md;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-code {
  width: 100%;
  height: 100%;
  border-radius: 32rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-placeholder {
  font-size: $font-size-lg;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
}

.qr-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  margin-bottom: 8rpx;
}

.qr-url {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.feature-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
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
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.feature-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.tip-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tip-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  display: block;
}

.scanner-container {
  padding: $spacing-xl;
  border-radius: 56rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: $spacing-lg;
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
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
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
  margin-bottom: $spacing-lg;
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
  0%, 100% {
    top: 0;
  }
  50% {
    top: calc(100% - 4rpx);
  }
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
  margin-bottom: $spacing-lg;
}

.success-icon {
  font-size: 192rpx;
  color: #10B981;
  margin-bottom: $spacing-md;
}

.success-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  margin-bottom: 8rpx;
}

.success-name {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.scan-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 9999rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(250, 204, 21, 0.4);
  min-height: 72rpx;
  box-sizing: border-box;
}

.scan-btn:active {
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

