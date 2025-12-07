<template>
  <view class="login-page">
    <!-- Logo & Welcome Section -->
    <view class="welcome-section">
      <view class="logo-container">
        <view class="logo-text">
          <text class="logo-m">M</text>
          <text class="logo-eta">eta</text>
          <text class="logo-ic">IC</text>
        </view>
      </view>
      <text class="welcome-title">{{ language === 'zh' ? '欢迎来到 MetaIC' : 'Welcome to MetaIC' }}</text>
      <text class="welcome-subtitle">{{ language === 'zh' ? 'AI 智能商务名片' : 'AI Business Cards' }}</text>
    </view>

    <!-- Login Buttons -->
    <view class="login-buttons">
      <!-- Google Login Button -->
      <button class="login-btn google-btn" @click="handleGoogleLogin">
        <text class="google-icon">G</text>
        <text>{{ language === 'zh' ? '使用 Google 继续' : 'Continue with Google' }}</text>
      </button>

      <!-- Apple Login Button -->
      <button class="login-btn apple-btn" @click="handleAppleLogin">
        <text class="apple-icon">🍎</text>
        <text>{{ language === 'zh' ? '使用 Apple 继续' : 'Continue with Apple' }}</text>
      </button>

      <!-- Other Methods Button -->
      <button class="login-btn other-btn" @click="handleOtherMethods">
        <text>{{ language === 'zh' ? '使用其他方式继续' : 'Continue with Other Methods' }}</text>
      </button>
    </view>

    <!-- Terms & Privacy -->
    <view class="terms-section">
      <text class="terms-text">
        {{ language === 'zh' ? '登录即表示同意' : 'By signing in, you agree to our' }}
      </text>
      <view class="terms-links">
        <text class="terms-link">{{ language === 'zh' ? '《服务条款》' : 'Terms of Service' }}</text>
        <text class="terms-and">{{ language === 'zh' ? '和' : 'and' }}</text>
        <text class="terms-link">{{ language === 'zh' ? '《隐私政策》' : 'Privacy Policy' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useLanguage } from '../../composables/useLanguage'

const emit = defineEmits<{
  login: []
  signUp: []
  otherMethods: []
}>()

const { language } = useLanguage()

const handleGoogleLogin = () => {
  emit('login')
}

const handleAppleLogin = () => {
  emit('login')
}

const handleOtherMethods = () => {
  emit('otherMethods')
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.login-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #1e293b 0%, #0f172a 50%, #020617 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-xl $spacing-md;
  padding-bottom: $spacing-lg;
}

.welcome-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600rpx;
  padding-top: $spacing-xl;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    max-width: 700px;
    padding-top: 60px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
    padding-top: 80px;
  }
  // #endif
}

.logo-container {
  margin-bottom: $spacing-xl;
  text-align: center;
}

.logo-text {
  display: inline-flex;
  align-items: baseline;
  gap: 4rpx;
}

.logo-m {
  font-size: 120rpx;
  font-weight: $font-weight-bold;
  background: linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-eta {
  font-size: 96rpx;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.logo-ic {
  font-size: 120rpx;
  font-weight: $font-weight-bold;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
  text-align: center;
}

.welcome-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.login-buttons {
  width: 100%;
  max-width: 600rpx;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding-bottom: $spacing-lg;
  
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

.login-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.google-btn {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.google-btn:active {
  transform: scale(0.98);
  background: rgba(15, 23, 42, 0.9);
}

.google-icon {
  font-size: 40rpx;
  font-weight: $font-weight-bold;
  color: #4285F4;
}

.apple-btn {
  background: $color-text-primary;
  color: #020617;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.apple-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.95);
}

.apple-icon {
  font-size: 40rpx;
}

.other-btn {
  background: linear-gradient(135deg, #5b21b6 0%, #4c1d95 100%);
  color: $color-text-primary;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.other-btn:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
}

.terms-section {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: $font-size-xs;
  padding: 0 $spacing-md;
  max-width: 600rpx;
}

.terms-text {
  display: block;
  margin-bottom: 8rpx;
}

.terms-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  flex-wrap: wrap;
}

.terms-link {
  text-decoration: underline;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.terms-link:active {
  color: rgba(255, 255, 255, 0.8);
}

.terms-and {
  color: rgba(255, 255, 255, 0.5);
}
</style>

