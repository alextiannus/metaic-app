<template>
  <view class="edit-contact-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '编辑联系方式' : 'Edit Contact Information' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <view class="form-card">
        <!-- Phones -->
        <view class="form-section">
          <view class="section-header">
            <text class="section-title">{{ language === 'zh' ? '电话' : 'Phones' }}</text>
            <button class="add-item-btn" @click="handleAddPhone">
              <text>+</text>
            </button>
          </view>
          <view v-for="(phone, index) in formData.phones" :key="index" class="item-row">
            <input v-model="phone.number" type="tel" :placeholder="language === 'zh' ? '电话号码' : 'Phone number'" class="field-input" />
            <button class="remove-item-btn" @click="handleRemovePhone(index)">✕</button>
          </view>
        </view>

        <!-- Emails -->
        <view class="form-section">
          <view class="section-header">
            <text class="section-title">{{ language === 'zh' ? '邮箱' : 'Emails' }}</text>
            <button class="add-item-btn" @click="handleAddEmail">
              <text>+</text>
            </button>
          </view>
          <view v-for="(email, index) in formData.emails" :key="index" class="item-row">
            <input v-model="email.email" type="email" :placeholder="language === 'zh' ? '邮箱地址' : 'Email address'" class="field-input" />
            <button class="remove-item-btn" @click="handleRemoveEmail(index)">✕</button>
          </view>
        </view>

        <!-- Social Media -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '社交媒体' : 'Social Media' }}</text>
          <view class="social-fields">
            <view class="social-field">
              <text class="social-label">LinkedIn</text>
              <input v-model="formData.linkedin" type="url" placeholder="linkedin.com/in/username" class="field-input" />
            </view>
            <view class="social-field">
              <text class="social-label">Twitter</text>
              <input v-model="formData.twitter" type="url" placeholder="twitter.com/username" class="field-input" />
            </view>
            <view class="social-field">
              <text class="social-label">GitHub</text>
              <input v-model="formData.github" type="url" placeholder="github.com/username" class="field-input" />
            </view>
            <view class="social-field">
              <text class="social-label">WeChat</text>
              <input v-model="formData.wechat" type="text" :placeholder="language === 'zh' ? '微信号' : 'WeChat ID'" class="field-input" />
            </view>
          </view>
        </view>
      </view>

      <!-- Save Button -->
      <button class="save-btn" @click="handleSave">
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
  phones: alexTianYeCard.contact?.phones?.map(p => ({ number: p.number })) || [{ number: '' }],
  emails: alexTianYeCard.contact?.emails?.map(e => ({ email: e.email })) || [{ email: '' }],
  linkedin: alexTianYeCard.links?.linkedin || '',
  twitter: (alexTianYeCard.links as any)?.twitter || '',
  github: (alexTianYeCard.links as any)?.github || '',
  wechat: (alexTianYeCard.links as any)?.wechat || '',
})

const handleBack = () => {
  emit('back')
}

const handleAddPhone = () => {
  formData.value.phones.push({ number: '' })
}

const handleRemovePhone = (index: number) => {
  if (formData.value.phones.length > 1) {
    formData.value.phones.splice(index, 1)
  }
}

const handleAddEmail = () => {
  formData.value.emails.push({ email: '' })
}

const handleRemoveEmail = (index: number) => {
  if (formData.value.emails.length > 1) {
    formData.value.emails.splice(index, 1)
  }
}

const handleSave = () => {
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

.edit-contact-page {
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

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.add-item-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.add-item-btn:active {
  background: rgba(56, 189, 248, 0.3);
}

.item-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.field-input {
  flex: 1;
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

.remove-item-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-item-btn:active {
  background: rgba(239, 68, 68, 0.3);
}

.social-fields {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.social-field {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.social-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
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

.save-btn:active {
  transform: scale(0.98);
}
</style>

