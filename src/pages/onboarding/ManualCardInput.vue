<template>
  <view class="manual-card-input-page">
    <!-- Header -->
    <view class="header-section">
      <text class="header-title">Create Your Card</text>
      <text class="header-subtitle">Enter your information to generate your AI-powered business card</text>
    </view>

    <!-- Main Form -->
    <view class="form-section">
      <!-- Personal Information -->
      <view class="form-card">
        <view class="card-header">
          <text class="card-icon">👤</text>
          <text class="card-title">Personal Information</text>
        </view>
        <view class="form-fields">
          <view class="field">
            <text class="field-label">Full Name <text class="required">*</text></text>
            <input v-model="formData.fullName" type="text" placeholder="Kiki Zhu" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">Chinese Name (Optional)</text>
            <input v-model="formData.chineseName" type="text" placeholder="田野" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">Job Title <text class="required">*</text></text>
            <input v-model="formData.title" type="text" placeholder="Founder & CEO" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">Company <text class="required">*</text></text>
            <input v-model="formData.company" type="text" placeholder="Immedi.AI" class="field-input" />
          </view>
        </view>
      </view>

      <!-- Contact Information -->
      <view class="form-card">
        <view class="card-header">
          <text class="card-icon">📧</text>
          <text class="card-title">Contact Information</text>
        </view>
        <view class="form-fields">
          <view class="field">
            <text class="field-label">Email <text class="required">*</text></text>
            <input v-model="formData.email" type="email" placeholder="alex@immedi.ai" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">Phone <text class="required">*</text></text>
            <input v-model="formData.phone" type="tel" placeholder="+65 9876 5432" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">Website (Optional)</text>
            <input v-model="formData.website" type="url" placeholder="https://immedi.ai" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">Address (Optional)</text>
            <input v-model="formData.address" type="text" placeholder="Singapore" class="field-input" />
          </view>
          <view class="field">
            <text class="field-label">LinkedIn (Optional)</text>
            <input v-model="formData.linkedin" type="url" placeholder="linkedin.com/in/username" class="field-input" />
          </view>
        </view>
      </view>

      <!-- AI Enhancement -->
      <button class="ai-enhance-btn" :disabled="isAIEnhancing" @click="handleAIEnhance">
        <text class="sparkle-icon">✨</text>
        <text>{{ isAIEnhancing ? 'AI Enhancing...' : 'Enhance with AI Search' }}</text>
      </button>

      <!-- Submit Button -->
      <button class="submit-btn" @click="handleSubmit">
        <text>Continue to Customization</text>
        <text class="arrow-icon">→</text>
      </button>

      <!-- Back Button -->
      <button v-if="onBack" class="back-btn" @click="handleBack">
        <text>Back</text>
      </button>
    </view>

    <!-- Info -->
    <view class="info-card">
      <text class="info-icon">✨</text>
      <view class="info-content">
        <text class="info-title">AI Enhancement</text>
        <text class="info-text">Our AI will search for your professional information online to enrich your card with bio, expertise, and achievements.</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialData?: any
}>()

const emit = defineEmits<{
  complete: [cardData: any]
  back: []
}>()

const isAIEnhancing = ref(false)

const formData = ref({
  fullName: props.initialData?.fullName || '',
  chineseName: props.initialData?.chineseName || '',
  title: props.initialData?.title || '',
  company: props.initialData?.company || '',
  email: props.initialData?.email || '',
  phone: props.initialData?.phone || '',
  website: props.initialData?.website || '',
  address: props.initialData?.address || '',
  linkedin: props.initialData?.linkedin || '',
})

const handleAIEnhance = () => {
  isAIEnhancing.value = true
  setTimeout(() => {
    isAIEnhancing.value = false
    uni.showToast({
      title: 'AI enhancement complete',
      icon: 'success',
    })
  }, 2000)
}

const handleSubmit = () => {
  if (!formData.value.fullName || !formData.value.title || !formData.value.company || !formData.value.email || !formData.value.phone) {
    uni.showToast({
      title: 'Please fill in all required fields',
      icon: 'none',
    })
    return
  }
  emit('complete', formData.value)
}

const handleBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.manual-card-input-page {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-xl $spacing-md;
  padding-bottom: 192rpx;
}

.header-section {
  text-align: center;
  margin-bottom: $spacing-lg;
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

.form-section {
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

.form-card {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.card-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.card-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.field {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.field-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.required {
  color: #FACC15;
}

.field-input {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-sm;
}

.field-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.ai-enhance-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(250, 204, 21, 0.2) 100%);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: $color-text-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.ai-enhance-btn:disabled {
  opacity: 0.5;
}

.ai-enhance-btn:active {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(250, 204, 21, 0.3) 100%);
}

.sparkle-icon {
  font-size: 32rpx;
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

.info-card {
  max-width: 600rpx;
  margin: $spacing-lg auto 0;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(250, 204, 21, 0.1);
  border: 1px solid rgba(250, 204, 21, 0.2);
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
}

.info-icon {
  font-size: 32rpx;
  color: #FACC15;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: $font-size-xs;
  color: #FACC15;
  display: block;
  margin-bottom: 8rpx;
}

.info-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}
</style>

