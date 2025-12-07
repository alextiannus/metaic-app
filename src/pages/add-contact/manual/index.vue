<template>
  <view class="add-contact-manual-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '手动添加联系人' : 'Add Contact Manually' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <view class="form-card">
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '基本信息' : 'Basic Information' }}</text>
          
          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '姓名' : 'Name' }} <text class="required">*</text></text>
            <input v-model="formData.name" type="text" :placeholder="language === 'zh' ? '请输入姓名' : 'Enter name'" class="field-input" />
          </view>

          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '职位' : 'Title' }}</text>
            <input v-model="formData.title" type="text" :placeholder="language === 'zh' ? '请输入职位' : 'Enter title'" class="field-input" />
          </view>

          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '公司' : 'Company' }}</text>
            <input v-model="formData.company" type="text" :placeholder="language === 'zh' ? '请输入公司名称' : 'Enter company name'" class="field-input" />
          </view>
        </view>

        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '联系方式' : 'Contact Information' }}</text>
          
          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '邮箱' : 'Email' }}</text>
            <input v-model="formData.email" type="email" :placeholder="language === 'zh' ? '请输入邮箱地址' : 'Enter email address'" class="field-input" />
          </view>

          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '电话' : 'Phone' }}</text>
            <input v-model="formData.phone" type="tel" :placeholder="language === 'zh' ? '请输入电话号码' : 'Enter phone number'" class="field-input" />
          </view>

          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '地址' : 'Address' }}</text>
            <input v-model="formData.address" type="text" :placeholder="language === 'zh' ? '请输入地址' : 'Enter address'" class="field-input" />
          </view>
        </view>

        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '其他信息' : 'Additional Information' }}</text>
          
          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '备注' : 'Notes' }}</text>
            <textarea v-model="formData.notes" :placeholder="language === 'zh' ? '添加备注信息...' : 'Add notes...'" class="field-textarea" rows="4" />
          </view>

          <view class="form-field">
            <text class="field-label">{{ language === 'zh' ? '标签' : 'Tags' }}</text>
            <view class="tags-input-wrapper">
              <input v-model="tagInput" type="text" :placeholder="language === 'zh' ? '输入标签后按回车' : 'Enter tag and press Enter'" class="field-input tag-input" @confirm="addTag" />
              <view v-if="formData.tags && formData.tags.length > 0" class="tags-display">
                <view v-for="(tag, index) in formData.tags" :key="index" class="tag-item">
                  <text class="tag-text">{{ tag }}</text>
                  <button class="tag-remove" @click="removeTag(index)">✕</button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Save Button -->
      <button class="save-btn" @click="handleSave" :disabled="!formData.name">
        {{ language === 'zh' ? '保存联系人' : 'Save Contact' }}
      </button>
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
const tagInput = ref('')

const formData = ref({
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
  tags: [] as string[],
})

const handleBack = () => {
  emit('back')
}

const addTag = () => {
  if (tagInput.value.trim()) {
    formData.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const handleSave = () => {
  if (!formData.value.name) {
    uni.showToast({
      title: language.value === 'zh' ? '请输入姓名' : 'Please enter name',
      icon: 'none',
    })
    return
  }

  emit('complete', formData.value)
  uni.showToast({
    title: language.value === 'zh' ? '联系人已保存' : 'Contact saved',
    icon: 'success',
  })
  handleBack()
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.add-contact-manual-page {
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
  margin-bottom: $spacing-sm;
}

.form-field {
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

.field-input,
.field-textarea {
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

.field-input::placeholder,
.field-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.field-textarea {
  min-height: 160rpx;
}

.tags-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.tag-input {
  margin-bottom: $spacing-sm;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.tag-item {
  padding: 8rpx 16rpx;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: $font-size-xs;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.tag-text {
  flex: 1;
}

.tag-remove {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24rpx;
}

.save-btn {
  width: 100%;
  padding: 24rpx 32rpx;
  border-radius: 9999rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(250, 204, 21, 0.4);
  min-height: 88rpx;
  box-sizing: border-box;
}

.save-btn:disabled {
  opacity: 0.5;
}

.save-btn:active:not(:disabled) {
  transform: scale(0.98);
}
</style>

