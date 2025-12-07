<template>
  <view class="settings-tab">
    <view class="tab-content">
      <view class="settings-list">
        <!-- 1. User Profile Overview Section -->
        <view class="profile-section glass-card gradient-card">
          <view class="profile-header">
            <view class="profile-avatar-wrapper">
              <image class="profile-avatar" :src="card.personal?.avatar || '/static/logo.png'" mode="aspectFill" />
            </view>
            <view class="profile-info">
              <text class="profile-name">{{ card.personal?.fullName }}</text>
              <text class="profile-title">{{ card.personal?.title }}</text>
              <view class="profile-tokens">
                <text class="token-icon">🪙</text>
                <text class="token-text">{{ userTokens }} tokens</text>
              </view>
            </view>
          </view>
          
          <button class="edit-card-btn" @click="handleEditProfile">
            <text class="edit-icon">✏️</text>
            <text>{{ language === 'zh' ? '编辑与管理名片' : 'Edit & Manage Card' }}</text>
          </button>
        </view>

        <!-- 2. Preference Settings -->
        <view class="settings-section glass-card">
          <view class="section-header">
            <text class="section-icon">🌐</text>
            <text class="section-title">{{ language === 'zh' ? '偏好设置' : 'Preferences' }}</text>
          </view>
          
          <view class="section-content">
            <!-- Language -->
            <view class="setting-group">
              <text class="setting-label">{{ language === 'zh' ? '语言' : 'Language' }}</text>
              <view class="language-buttons">
                <button
                  :class="['lang-btn', language === 'en' ? 'lang-btn-active' : 'lang-btn-inactive']"
                  @click="setLanguage('en')"
                >
                  <text>English</text>
                </button>
                <button
                  :class="['lang-btn', language === 'zh' ? 'lang-btn-active' : 'lang-btn-inactive']"
                  @click="setLanguage('zh')"
                >
                  <text>中文</text>
                </button>
              </view>
            </view>

            <!-- Privacy Settings -->
            <view class="setting-group">
              <text class="setting-label">{{ language === 'zh' ? '隐私设置' : 'Privacy Settings' }}</text>
              
              <view class="toggle-list">
                <view class="toggle-item">
                  <view class="toggle-left">
                    <text class="toggle-icon">🔒</text>
                    <text class="toggle-label">{{ language === 'zh' ? '私密模式' : 'Private Profile' }}</text>
                  </view>
                  <view class="toggle-switch">
                    <view class="toggle-slider"></view>
                  </view>
                </view>

                <view class="toggle-item">
                  <view class="toggle-left">
                    <text class="toggle-icon">🔔</text>
                    <text class="toggle-label">{{ language === 'zh' ? '推送通知' : 'Push Notifications' }}</text>
                  </view>
                  <view class="toggle-switch toggle-switch-active">
                    <view class="toggle-slider toggle-slider-active"></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 3. Corporate Features -->
        <view class="settings-section glass-card">
          <view class="section-header">
            <text class="section-icon">🏢</text>
            <text class="section-title">{{ language === 'zh' ? '企业功能' : 'Corporate Features' }}</text>
          </view>
          
          <view class="section-content">
            <button class="feature-item" @click="handleCorporateTemplates">
              <text class="feature-text">{{ language === 'zh' ? '企业名片模板' : 'Corporate Templates' }}</text>
              <text class="feature-arrow">→</text>
            </button>
            
            <button class="feature-item" @click="handleCustomerSupport">
              <text class="feature-text">{{ language === 'zh' ? '客户支持' : 'Customer Support' }}</text>
              <text class="feature-arrow">→</text>
            </button>
            
            <button class="feature-item" @click="handleTeamManagement">
              <text class="feature-text">{{ language === 'zh' ? '团队管理' : 'Team Management' }}</text>
              <text class="feature-badge">Pro</text>
            </button>

            <!-- Quick Access to Subscription -->
            <button class="feature-item subscription-item" @click="handleSubscription">
              <view class="subscription-left">
                <text class="subscription-icon">👑</text>
                <text class="feature-text">{{ language === 'zh' ? '订阅计划' : 'Subscription Plan' }}</text>
              </view>
              <view class="subscription-right">
                <text class="subscription-plan">{{ subscriptionPlan }}</text>
                <text class="subscription-token-icon">🪙</text>
                <text class="subscription-tokens">{{ userTokens }}</text>
              </view>
            </button>
          </view>
        </view>

        <!-- 4. Buy Me a Coffee - Separate Section -->
        <view class="coffee-section glass-card gradient-coffee">
          <view class="coffee-header">
            <view class="coffee-title-row">
              <text class="coffee-icon">☕</text>
              <text class="coffee-title">{{ language === 'zh' ? '支持我们' : 'Support Us' }}</text>
            </view>
            <text class="coffee-subtitle">{{ language === 'zh' ? '请我们喝杯咖啡 ☕' : 'Buy us a coffee ☕' }}</text>
          </view>
          <button class="coffee-btn" @click="handleBuyCoffee">
            <text class="coffee-btn-icon">☕</text>
            <text>{{ language === 'zh' ? '请我喝咖啡' : 'Buy Me a Coffee' }}</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import { useUser } from '../../composables/useUser'
import { alexTianYeCard } from '../../data/alexTianYe'

const emit = defineEmits<{
  editProfile: []
  subscription: []
  coffee: []
  corporateTemplates: []
  customerSupport: []
  teamManagement: []
}>()

const { language, setLanguage, t } = useLanguage()
const { userTokens, subscriptionPlan } = useUser()

const card = ref(alexTianYeCard)

const handleEditProfile = () => {
  emit('editProfile')
}

const handleSubscription = () => {
  emit('subscription')
}

const handleBuyCoffee = () => {
  emit('coffee')
}

const handleCorporateTemplates = () => {
  emit('corporateTemplates')
}

const handleCustomerSupport = () => {
  emit('customerSupport')
}

const handleTeamManagement = () => {
  emit('teamManagement')
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.settings-tab {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 200rpx;
}

.tab-content {
  max-width: 600rpx;
  margin: 0 auto;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.glass-card {
  background: $color-glass-bg-80; // bg-[#0F172A]/80
  backdrop-filter: $glass-backdrop-filter; // backdrop-blur-xl
  border: $glass-border; // border-white/10
  border-radius: $radius-xl; // rounded-[24px] = 24px = 48rpx
  padding: 40rpx; // p-5 = 20px = 40rpx
  box-shadow: $glass-shadow; // shadow-2xl
}

.gradient-card {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
}

.profile-section {
  margin-bottom: $spacing-md;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.profile-avatar-wrapper {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(250, 204, 21, 0.5);
}

.profile-avatar {
  width: 100%;
  height: 100%;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.profile-title {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: 8rpx;
}

.profile-tokens {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.token-icon {
  font-size: 24rpx;
  color: #FACC15;
}

.token-text {
  font-size: $font-size-xs;
  color: #FACC15;
}

.edit-card-btn {
  width: 100%;
  padding: 24rpx 32rpx; // py-3 px-4 = 12px 16px = 24rpx 32rpx
  border-radius: $radius-md; // rounded-xl = 12px = 24rpx
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx; // gap-2 = 8px = 16rpx
  transition: transform 0.3s ease;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium; // font-medium
  box-sizing: border-box;
}

.edit-card-btn:active {
  transform: scale(1.02);
}

.edit-icon {
  font-size: 32rpx;
}

.settings-section {
  margin-bottom: $spacing-md;
}

.section-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.section-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.section-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.setting-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-md;
}

.language-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}

.lang-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  border: 1px solid;
  transition: all 0.3s ease;
  font-size: $font-size-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 72rpx;
  box-sizing: border-box;
}

.lang-btn-active {
  background: #FACC15;
  border-color: #FACC15;
  color: #020617;
}

.lang-btn-inactive {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
}

.toggle-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
}

.toggle-left {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.toggle-icon {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.6);
}

.toggle-label {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.toggle-switch {
  width: 96rpx;
  height: 48rpx;
  border-radius: 48rpx;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  transition: background 0.3s ease;
}

.toggle-switch-active {
  background: #FACC15;
}

.toggle-slider {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  left: 4rpx;
  top: 4rpx;
  transition: transform 0.3s ease;
}

.toggle-slider-active {
  transform: translateX(48rpx);
  background: #020617;
}

.feature-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-item:active {
  background: rgba(255, 255, 255, 0.1);
}

.feature-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.feature-arrow {
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.4);
}

.feature-badge {
  font-size: $font-size-xs;
  color: #FACC15;
}

.subscription-item {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
}

.subscription-left {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.subscription-icon {
  font-size: 32rpx;
  color: #FACC15;
}

.subscription-right {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.subscription-plan {
  font-size: $font-size-xs;
  color: #FACC15;
  text-transform: capitalize;
}

.subscription-token-icon {
  font-size: 24rpx;
  color: #FACC15;
}

.subscription-tokens {
  font-size: $font-size-xs;
  color: #FACC15;
}

.gradient-coffee {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(250, 204, 21, 0.2) 100%);
  border: 1px solid rgba(245, 158, 11, 0.3);
  margin-bottom: 192rpx;
}

.coffee-section {
  margin-top: $spacing-md;
}

.coffee-header {
  margin-bottom: $spacing-md;
}

.coffee-title-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: 8rpx;
}

.coffee-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.coffee-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.coffee-subtitle {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.coffee-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #F59E0B 0%, #FACC15 100%);
  color: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  transition: transform 0.3s ease;
  font-size: $font-size-sm;
  min-height: 72rpx;
  box-sizing: border-box;
}

.coffee-btn:active {
  transform: scale(1.02);
}

.coffee-btn-icon {
  font-size: 32rpx;
}
</style>
