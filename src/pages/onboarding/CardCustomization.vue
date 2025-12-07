<template>
  <view class="card-customization-page">
    <!-- Header -->
    <view class="header-section">
      <view class="icon-wrapper">
        <text class="header-icon">🎨</text>
      </view>
      <text class="header-title">Customize Your Card</text>
      <text class="header-subtitle">Choose colors and style for your business card</text>
    </view>

    <view class="content-section">
      <!-- Preview Card -->
      <view class="preview-card">
        <view class="preview-header">
          <text class="sparkle-icon">✨</text>
          <text class="preview-title">Preview</text>
        </view>
        <view :class="['mini-card', getStyleClass()]">
          <view class="mini-card-content">
            <view :class="['mini-avatar', getGradientClass()]">
              <text class="avatar-emoji">👤</text>
            </view>
            <view class="mini-info">
              <text :class="['mini-name', customization.theme === 'classic' ? 'text-dark' : '']">Your Name</text>
              <text class="mini-title" :style="{ color: customization.primaryColor }">Your Title</text>
              <text class="mini-company" :style="{ color: customization.secondaryColor }">Your Company</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Theme Selection -->
      <view class="form-card">
        <text class="card-title">Theme</text>
        <view class="theme-grid">
          <button
            :class="['theme-btn', customization.theme === 'dark' ? 'active' : '']"
            @click="customization.theme = 'dark'"
          >
            <text>Dark Mode</text>
          </button>
          <button
            :class="['theme-btn', customization.theme === 'light' ? 'active' : '']"
            @click="customization.theme = 'light'"
          >
            <text>Light Mode</text>
          </button>
        </view>
      </view>

      <!-- Color Selection -->
      <view class="form-card">
        <text class="card-title">Color Theme</text>
        <view class="color-grid">
          <button
            v-for="theme in colorThemes"
            :key="theme.id"
            :class="['color-btn', selectedColorTheme.id === theme.id ? 'selected' : '']"
            @click="selectColorTheme(theme)"
          >
            <view :class="['color-circle', theme.gradient]"></view>
            <text v-if="selectedColorTheme.id === theme.id" class="check-icon">✓</text>
            <text class="color-name">{{ theme.name }}</text>
          </button>
        </view>
      </view>

      <!-- Style Selection -->
      <view class="form-card">
        <text class="card-title">Card Style</text>
        <view class="style-list">
          <button
            v-for="style in cardStyles"
            :key="style.id"
            :class="['style-btn', customization.style === style.id ? 'selected' : '']"
            @click="customization.style = style.id"
          >
            <view class="style-header">
              <text class="style-name">{{ style.name }}</text>
              <text v-if="customization.style === style.id" class="check-icon">✓</text>
            </view>
            <text class="style-desc">{{ style.description }}</text>
          </button>
        </view>
      </view>

      <!-- Action Buttons -->
      <button class="submit-btn" @click="handleSubmit">
        <text>Create My Card</text>
        <text class="arrow-icon">→</text>
      </button>

      <button v-if="onBack" class="back-btn" @click="handleBack">
        <text>Back</text>
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CardCustomization {
  theme: 'dark' | 'light'
  primaryColor: string
  secondaryColor: string
  style: 'modern' | 'classic' | 'minimal' | 'gradient'
}

const emit = defineEmits<{
  complete: [customization: CardCustomization]
  back: []
}>()

const props = defineProps<{
  onBack?: () => void
}>()

const colorThemes = [
  { id: 'yellow-blue', name: 'Yellow & Blue', primary: '#FACC15', secondary: '#38BDF8', gradient: 'gradient-yb' },
  { id: 'purple-pink', name: 'Purple & Pink', primary: '#A855F7', secondary: '#EC4899', gradient: 'gradient-pp' },
  { id: 'green-teal', name: 'Green & Teal', primary: '#10B981', secondary: '#14B8A6', gradient: 'gradient-gt' },
  { id: 'orange-red', name: 'Orange & Red', primary: '#F59E0B', secondary: '#EF4444', gradient: 'gradient-or' },
  { id: 'blue-indigo', name: 'Blue & Indigo', primary: '#3B82F6', secondary: '#6366F1', gradient: 'gradient-bi' },
  { id: 'cyan-blue', name: 'Cyan & Blue', primary: '#06B6D4', secondary: '#0EA5E9', gradient: 'gradient-cb' },
]

const cardStyles = [
  { id: 'modern', name: 'Modern', description: 'Glassmorphism with gradient accents' },
  { id: 'classic', name: 'Classic', description: 'Clean and professional' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  { id: 'gradient', name: 'Gradient', description: 'Bold gradient background' },
]

const customization = ref<CardCustomization>({
  theme: 'dark',
  primaryColor: '#FACC15',
  secondaryColor: '#38BDF8',
  style: 'modern',
})

const selectedColorTheme = computed(() => {
  return colorThemes.find((t) => t.primary === customization.value.primaryColor) || colorThemes[0]
})

const selectColorTheme = (theme: typeof colorThemes[0]) => {
  customization.value.primaryColor = theme.primary
  customization.value.secondaryColor = theme.secondary
}

const getStyleClass = () => {
  switch (customization.value.style) {
    case 'modern':
      return 'style-modern'
    case 'classic':
      return 'style-classic'
    case 'minimal':
      return 'style-minimal'
    case 'gradient':
      return `style-gradient ${selectedColorTheme.value.gradient}`
    default:
      return 'style-modern'
  }
}

const getGradientClass = () => {
  return `gradient-${selectedColorTheme.value.id}`
}

const handleSubmit = () => {
  emit('complete', customization.value)
}

const handleBack = () => {
  if (props.onBack) {
    props.onBack()
  } else {
    emit('back')
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.card-customization-page {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-xl $spacing-md;
  padding-bottom: 192rpx;
}

.header-section {
  text-align: center;
  margin-bottom: $spacing-lg;
}

.icon-wrapper {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto $spacing-md;
}

.header-icon {
  font-size: 64rpx;
}

.header-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
  display: block;
  margin-bottom: $spacing-sm;
}

.header-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.content-section {
  max-width: 600rpx;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  
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

.preview-card {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.preview-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.sparkle-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.preview-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.mini-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
}

.style-modern {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.style-classic {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.style-minimal {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.style-gradient {
  border: none;
}

.gradient-yb { background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%); }
.gradient-pp { background: linear-gradient(135deg, #A855F7 0%, #EC4899 100%); }
.gradient-gt { background: linear-gradient(135deg, #10B981 0%, #14B8A6 100%); }
.gradient-or { background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); }
.gradient-bi { background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%); }
.gradient-cb { background: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%); }

.mini-card-content {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
}

.mini-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  padding: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-avatar.gradient-yb { background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%); }
.mini-avatar.gradient-pp { background: linear-gradient(135deg, #A855F7 0%, #EC4899 100%); }
.mini-avatar.gradient-gt { background: linear-gradient(135deg, #10B981 0%, #14B8A6 100%); }
.mini-avatar.gradient-or { background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%); }
.mini-avatar.gradient-bi { background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%); }
.mini-avatar.gradient-cb { background: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%); }

.avatar-emoji {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
}

.mini-info {
  flex: 1;
}

.mini-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
  font-weight: $font-weight-semibold;
}

.mini-name.text-dark {
  color: #020617;
}

.mini-title {
  font-size: $font-size-sm;
  display: block;
  margin-bottom: 4rpx;
}

.mini-company {
  font-size: $font-size-xs;
}

.form-card {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.card-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  display: block;
  margin-bottom: $spacing-md;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.theme-btn {
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-sm;
  transition: all 0.3s ease;
}

.theme-btn.active {
  background: #FACC15;
  color: #020617;
  border-color: #FACC15;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.color-btn {
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: $spacing-sm;
  transition: all 0.3s ease;
}

.color-btn.selected {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.color-circle {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}

.color-name {
  font-size: $font-size-xs;
  color: $color-text-primary;
}

.check-icon {
  font-size: 40rpx;
  color: #FACC15;
  position: absolute;
  right: $spacing-sm;
  top: $spacing-sm;
}

.style-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.style-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: left;
  transition: all 0.3s ease;
}

.style-btn.selected {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #FACC15;
}

.style-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.style-name {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.style-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.submit-btn {
  width: 100%;
  padding: 18rpx 28rpx;
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
  min-height: 72rpx;
  box-sizing: border-box;
}

.submit-btn:active {
  transform: scale(0.98);
}

.arrow-icon {
  font-size: 40rpx;
}

.back-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  color: rgba(255, 255, 255, 0.6);
  font-size: $font-size-sm;
  transition: all 0.3s ease;
}

.back-btn:active {
  color: $color-text-primary;
  background: rgba(255, 255, 255, 0.05);
}
</style>

