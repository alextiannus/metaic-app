<template>
  <view class="welcome-success-page">
    <view class="content-wrapper">
      <!-- Success Icon -->
      <view class="success-icon-wrapper">
        <view class="success-circle">
          <text class="check-icon">✓</text>
        </view>
        <text class="sparkle-icon">✨</text>
      </view>

      <!-- Welcome Message -->
      <text class="welcome-title">Welcome to MetaIC!</text>
      <text class="welcome-greeting">Hi {{ userName }} 👋</text>
      <text class="welcome-desc">Your AI-powered business card has been created successfully. Start networking smarter!</text>

      <!-- Feature Highlights -->
      <view class="features-card">
        <view class="feature-item">
          <view class="feature-icon-wrapper">
            <text class="feature-icon">✨</text>
          </view>
          <view class="feature-content">
            <text class="feature-title">AI-Powered Networking</text>
            <text class="feature-desc">Smart recommendations and auto-complete features</text>
          </view>
        </view>
        <view class="feature-item">
          <view class="feature-icon-wrapper">
            <text class="feature-icon">✓</text>
          </view>
          <view class="feature-content">
            <text class="feature-title">Easy Sharing</text>
            <text class="feature-desc">Share your card via QR code, link, or NFC</text>
          </view>
        </view>
        <view class="feature-item">
          <view class="feature-icon-wrapper">
            <text class="feature-icon">📱</text>
          </view>
          <view class="feature-content">
            <text class="feature-title">Contact Management</text>
            <text class="feature-desc">Organize and track your professional connections</text>
          </view>
        </view>
      </view>

      <!-- Continue Button -->
      <button class="continue-btn" @click="handleContinue">
        <text>Get Started</text>
        <text class="arrow-icon">→</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  continue: []
}>()

defineProps<{
  userName: string
}>()

const handleContinue = () => {
  emit('continue')
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.welcome-success-page {
  min-height: 100vh;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl $spacing-md;
}

.content-wrapper {
  width: 100%;
  max-width: 600rpx;
  text-align: center;
  margin: 0 auto;
  
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

.success-icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $spacing-xl;
}

.success-circle {
  width: 256rpx;
  height: 256rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  padding: 8rpx;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.check-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 128rpx;
  color: #FACC15;
  font-weight: $font-weight-bold;
}

.sparkle-icon {
  position: absolute;
  right: -32rpx;
  top: -32rpx;
  font-size: 80rpx;
  color: #38BDF8;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20rpx); }
}

.welcome-title {
  font-size: 60rpx;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
  display: block;
  margin-bottom: $spacing-md;
}

.welcome-greeting {
  font-size: $font-size-base;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-sm;
}

.welcome-desc {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-xl;
  max-width: 480rpx;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.features-card {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
  margin-bottom: $spacing-xl;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  text-align: left;
}

.feature-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  display: block;
  margin-bottom: 8rpx;
}

.feature-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

.continue-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(250, 204, 21, 0.4);
}

.continue-btn:active {
  transform: scale(0.98);
}

.arrow-icon {
  font-size: 40rpx;
}
</style>

