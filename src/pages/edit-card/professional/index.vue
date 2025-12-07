<template>
  <view class="edit-professional-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '编辑专业信息' : 'Edit Professional Information' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <view class="form-card">
        <!-- About -->
        <view class="form-section">
          <text class="section-title">{{ language === 'zh' ? '关于我' : 'About' }}</text>
          <textarea v-model="formData.about" :placeholder="language === 'zh' ? '介绍一下你自己...' : 'Tell us about yourself...'" class="field-textarea" rows="6" />
        </view>

        <!-- Skills -->
        <view class="form-section">
          <view class="section-header">
            <text class="section-title">{{ language === 'zh' ? '技能' : 'Skills' }}</text>
            <button class="add-item-btn" @click="handleAddSkill">
              <text>+</text>
            </button>
          </view>
          <view v-for="(skill, index) in formData.skills" :key="index" class="item-row">
            <input v-model="formData.skills[index]" type="text" :placeholder="language === 'zh' ? '技能名称' : 'Skill name'" class="field-input" />
            <button class="remove-item-btn" @click="handleRemoveSkill(index)">✕</button>
          </view>
        </view>

        <!-- Languages -->
        <view class="form-section">
          <view class="section-header">
            <text class="section-title">{{ language === 'zh' ? '语言' : 'Languages' }}</text>
            <button class="add-item-btn" @click="handleAddLanguage">
              <text>+</text>
            </button>
          </view>
          <view v-for="(lang, index) in formData.languages" :key="index" class="item-row">
            <input v-model="formData.languages[index]" type="text" :placeholder="language === 'zh' ? '语言名称' : 'Language name'" class="field-input" />
            <button class="remove-item-btn" @click="handleRemoveLanguage(index)">✕</button>
          </view>
        </view>

        <!-- Interests -->
        <view class="form-section">
          <view class="section-header">
            <text class="section-title">{{ language === 'zh' ? '兴趣爱好' : 'Interests' }}</text>
            <button class="add-item-btn" @click="handleAddInterest">
              <text>+</text>
            </button>
          </view>
          <view v-for="(interest, index) in formData.interests" :key="index" class="item-row">
            <input v-model="formData.interests[index]" type="text" :placeholder="language === 'zh' ? '兴趣爱好' : 'Interest'" class="field-input" />
            <button class="remove-item-btn" @click="handleRemoveInterest(index)">✕</button>
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
  about: alexTianYeCard.professional?.headline || '',
  skills: alexTianYeCard.professional?.expertise ? [...alexTianYeCard.professional.expertise] : [''],
  languages: alexTianYeCard.professional?.languages ? [...alexTianYeCard.professional.languages] : [''],
  interests: alexTianYeCard.personal_interests?.hobbies ? [...alexTianYeCard.personal_interests.hobbies] : [''],
})

const handleBack = () => {
  emit('back')
}

const handleAddSkill = () => {
  formData.value.skills.push('')
}

const handleRemoveSkill = (index: number) => {
  if (formData.value.skills.length > 1) {
    formData.value.skills.splice(index, 1)
  }
}

const handleAddLanguage = () => {
  formData.value.languages.push('')
}

const handleRemoveLanguage = (index: number) => {
  if (formData.value.languages.length > 1) {
    formData.value.languages.splice(index, 1)
  }
}

const handleAddInterest = () => {
  formData.value.interests.push('')
}

const handleRemoveInterest = (index: number) => {
  if (formData.value.interests.length > 1) {
    formData.value.interests.splice(index, 1)
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

.edit-professional-page {
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

.field-textarea {
  width: 100%;
  padding: 18rpx 24rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-sm;
  min-height: 160rpx;
  box-sizing: border-box;
}

.field-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
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

