<template>
  <view class="edit-personal-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '编辑个人信息' : 'Edit Personal Information' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <view class="form-card">
        <!-- Avatar -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '头像' : 'Avatar' }}</text>
          <view class="avatar-section">
            <image class="avatar-preview" :src="formData.avatar || '/static/logo.png'" mode="aspectFill" />
            <button class="change-avatar-btn" @click="handleChangeAvatar">
              {{ language === 'zh' ? '更换头像' : 'Change Avatar' }}
            </button>
          </view>
        </view>

        <!-- Name -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '姓名' : 'Full Name' }} <text class="required">*</text></text>
          <input v-model="formData.fullName" type="text" :placeholder="language === 'zh' ? '请输入姓名' : 'Enter full name'" class="field-input" />
        </view>

        <!-- Chinese Name -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '中文名' : 'Chinese Name' }}</text>
          <input v-model="formData.chineseName" type="text" :placeholder="language === 'zh' ? '请输入中文名' : 'Enter Chinese name'" class="field-input" />
        </view>

        <!-- Title -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '职位' : 'Title' }} <text class="required">*</text></text>
          <input v-model="formData.title" type="text" :placeholder="language === 'zh' ? '请输入职位' : 'Enter title'" class="field-input" />
        </view>

        <!-- Tagline -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '标语' : 'Tagline' }}</text>
          <input v-model="formData.tagline" type="text" :placeholder="language === 'zh' ? '请输入个人标语' : 'Enter tagline'" class="field-input" />
        </view>
      </view>

      <!-- Save Button -->
      <button class="save-btn" @click="handleSave" :disabled="!formData.fullName || !formData.title">
        {{ language === 'zh' ? '保存更改' : 'Save Changes' }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../../composables/useLanguage'
import { alexTianYeCard } from '../../../data/alexTianYe'

const emit = defineEmits<{
  back: []
  save: [data: any]
}>()

const { language } = useLanguage()

const formData = ref({
  avatar: alexTianYeCard.personal?.avatar || '/static/logo.png',
  fullName: alexTianYeCard.personal?.fullName || '',
  chineseName: alexTianYeCard.personal?.chineseName || '',
  title: alexTianYeCard.personal?.title || '',
  tagline: alexTianYeCard.personal?.tagline || '',
})

const handleBack = () => {
  emit('back')
}

const handleChangeAvatar = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = Array.isArray(res.tempFilePaths) ? res.tempFilePaths[0] : res.tempFilePaths
      formData.value.avatar = tempFilePath
    },
  })
}

const handleSave = () => {
  if (!formData.value.fullName || !formData.value.title) {
    uni.showToast({
      title: language.value === 'zh' ? '请填写必填项' : 'Please fill required fields',
      icon: 'none',
    })
    return
  }

  emit('save', formData.value)
  uni.showToast({
    title: language.value === 'zh' ? '保存成功' : 'Saved successfully',
    icon: 'success',
  })
  handleBack()
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.edit-personal-page {
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

.form-card {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.section-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.required {
  color: #FACC15;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.avatar-preview {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
}

.change-avatar-btn {
  padding: $spacing-sm $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: $font-size-sm;
  transition: all 0.3s ease;
}

.change-avatar-btn:active {
  background: rgba(255, 255, 255, 0.1);
}

.field-input {
  width: 100%;
  padding: 18rpx 24rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-sm;
  min-height: 72rpx;
  box-sizing: border-box;
}

.field-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.save-btn {
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

.save-btn:disabled {
  opacity: 0.5;
}

.save-btn:active:not(:disabled) {
  transform: scale(0.98);
}
</style>

