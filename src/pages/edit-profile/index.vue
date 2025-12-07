<template>
  <view class="edit-profile-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '编辑我的名片' : 'Edit My Card' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <text class="page-description">
        {{ language === 'zh' ? '编辑每个部分的内容，并设置在名片中的可见性' : 'Edit each section and control its visibility on your card' }}
      </text>

      <view v-for="section in sections" :key="section.id" class="section-card">
        <view class="section-header-row">
          <view class="section-content-wrapper">
            <view class="section-title-row">
              <text class="section-title">{{ section.title }}</text>
              <button
                :class="['visibility-btn', visibility[section.id] ? 'visible' : 'hidden']"
                @click="toggleVisibility(section.id)"
              >
                <text class="visibility-icon">{{ visibility[section.id] ? '👁️' : '🚫' }}</text>
              </button>
            </view>

            <view class="section-content-display">
              <view v-if="section.type === 'image'" class="image-content">
                <button class="avatar-wrapper-btn" @click="handleAvatarEdit">
                  <image
                    :src="section.content"
                    class="section-image"
                    mode="aspectFill"
                  />
                  <view class="avatar-edit-overlay">
                    <text class="avatar-edit-icon">📷</text>
                  </view>
                </button>
                <button class="change-btn" @click="handleAvatarEdit">
                  {{ language === 'zh' ? '更换头像' : 'Change' }}
                </button>
              </view>
              <view v-else-if="section.type === 'gallery'" class="gallery-content">
                <view class="gallery-placeholder">
                  <text class="gallery-icon">+</text>
                </view>
                <text class="gallery-text">{{ section.content }}</text>
              </view>
              <input
                v-else
                v-model="editableValues[section.id]"
                class="section-input"
                :placeholder="section.content || (language === 'zh' ? '未设置' : 'Not set')"
              />
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
import { ref, computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import { alexTianYeCard } from '../../data/alexTianYe'


const { language } = useLanguage()
const card = alexTianYeCard

const editableValues = ref<Record<string, string>>({
  fullName: card.personal.fullName,
  chineseName: card.personal.chineseName || '',
  title: card.personal.title,
  tagline: card.personal.tagline,
  phones: card.contact.phones.map((p) => p.number).join(', '),
  emails: card.contact.emails.map((e) => e.email).join(', '),
  socialMedia: `${Object.values(card.links).filter(Boolean).length} accounts`,
  businesses: card.businesses.map((b) => b.name).join(', '),
  about: card.professional?.headline || '',
  skills: `${card.professional?.expertise?.length || 0} skills`,
  languages: card.professional?.languages?.join(', ') || '',
  interests: card.personal_interests?.hobbies?.join(', ') || '',
  networking: `${card.networking?.lookingFor?.length || 0} preferences`,
})

const visibility = ref<Record<string, boolean>>({
  avatar: true,
  fullName: true,
  chineseName: true,
  title: true,
  tagline: true,
  phones: true,
  emails: true,
  socialMedia: true,
  businesses: true,
  about: true,
  skills: true,
  languages: true,
  interests: true,
  networking: true,
  photos: true,
})

const toggleVisibility = (section: string) => {
  visibility.value[section] = !visibility.value[section]
}

const sections = computed(() => [
  {
    id: 'avatar',
    title: language.value === 'zh' ? '头像' : 'Avatar',
    content: card.personal.avatar || '/static/logo.png',
    type: 'image',
  },
  {
    id: 'fullName',
    title: language.value === 'zh' ? '姓名' : 'Full Name',
    content: editableValues.value.fullName,
    type: 'text',
  },
  {
    id: 'chineseName',
    title: language.value === 'zh' ? '中文名' : 'Chinese Name',
    content: editableValues.value.chineseName,
    type: 'text',
  },
  {
    id: 'title',
    title: language.value === 'zh' ? '职位' : 'Title',
    content: editableValues.value.title,
    type: 'text',
  },
  {
    id: 'tagline',
    title: language.value === 'zh' ? '标语' : 'Tagline',
    content: editableValues.value.tagline,
    type: 'text',
  },
  {
    id: 'phones',
    title: language.value === 'zh' ? '电话' : 'Phones',
    content: editableValues.value.phones,
    type: 'text',
  },
  {
    id: 'emails',
    title: language.value === 'zh' ? '邮箱' : 'Emails',
    content: editableValues.value.emails,
    type: 'text',
  },
  {
    id: 'socialMedia',
    title: language.value === 'zh' ? '社交媒体' : 'Social Media',
    content: editableValues.value.socialMedia,
    type: 'text',
  },
  {
    id: 'businesses',
    title: language.value === 'zh' ? '公司' : 'Businesses',
    content: editableValues.value.businesses,
    type: 'text',
  },
  {
    id: 'about',
    title: language.value === 'zh' ? '关于我' : 'About',
    content: editableValues.value.about,
    type: 'textarea',
  },
  {
    id: 'skills',
    title: language.value === 'zh' ? '技能' : 'Skills',
    content: editableValues.value.skills,
    type: 'text',
  },
  {
    id: 'languages',
    title: language.value === 'zh' ? '语言' : 'Languages',
    content: editableValues.value.languages,
    type: 'text',
  },
  {
    id: 'interests',
    title: language.value === 'zh' ? '兴趣爱好' : 'Interests',
    content: editableValues.value.interests,
    type: 'text',
  },
  {
    id: 'networking',
    title: language.value === 'zh' ? '社交偏好' : 'Networking Preferences',
    content: editableValues.value.networking,
    type: 'text',
  },
  {
    id: 'photos',
    title: language.value === 'zh' ? '相册' : 'Photo Gallery',
    content: language.value === 'zh' ? '上传更多照片' : 'Upload more photos',
    type: 'gallery',
  },
])

const handleBack = () => {
  uni.navigateBack()
}

const handleAvatarEdit = () => {
  uni.showActionSheet({
    itemList: [
      language.value === 'zh' ? '拍照' : 'Take Photo',
      language.value === 'zh' ? '从相册选择' : 'Choose from Gallery',
      language.value === 'zh' ? '上传更多照片' : 'Upload More Photos'
    ],
    success: (res) => {
      if (res.tapIndex === 0) {
        // Take Photo
        uni.chooseImage({
          count: 1,
          sourceType: ['camera'],
          success: (imageRes) => {
            const tempFilePath = Array.isArray(imageRes.tempFilePaths) 
              ? imageRes.tempFilePaths[0] 
              : imageRes.tempFilePaths
            // Update avatar - in real app, this would upload to server
            uni.showToast({
              title: language.value === 'zh' ? '头像已更新' : 'Avatar updated',
              icon: 'success',
            })
          }
        })
      } else if (res.tapIndex === 1) {
        // Choose from Gallery
        uni.chooseImage({
          count: 1,
          sourceType: ['album'],
          success: (imageRes) => {
            const tempFilePath = Array.isArray(imageRes.tempFilePaths) 
              ? imageRes.tempFilePaths[0] 
              : imageRes.tempFilePaths
            // Update avatar - in real app, this would upload to server
            uni.showToast({
              title: language.value === 'zh' ? '头像已更新' : 'Avatar updated',
              icon: 'success',
            })
          }
        })
      } else if (res.tapIndex === 2) {
        // Upload More Photos
        uni.chooseImage({
          count: 9,
          sourceType: ['album', 'camera'],
          success: (imageRes) => {
            uni.showToast({
              title: language.value === 'zh' ? '照片已上传' : 'Photos uploaded',
              icon: 'success',
            })
          }
        })
      }
    }
  })
}

const handleEdit = (sectionId: string) => {
  const routeMap: Record<string, string> = {
    fullName: '/pages/edit-card/personal/index',
    chineseName: '/pages/edit-card/personal/index',
    title: '/pages/edit-card/personal/index',
    tagline: '/pages/edit-card/personal/index',
    phones: '/pages/edit-card/contact/index',
    emails: '/pages/edit-card/contact/index',
    socialMedia: '/pages/edit-card/contact/index',
    about: '/pages/edit-card/professional/index',
    skills: '/pages/edit-card/professional/index',
    languages: '/pages/edit-card/professional/index',
    interests: '/pages/edit-card/professional/index',
  }
  
  const route = routeMap[sectionId]
  if (route) {
    uni.navigateTo({ url: route })
  } else {
    uni.showToast({
      title: language.value === 'zh' ? '编辑功能即将推出' : 'Edit feature coming soon',
      icon: 'none',
    })
  }
}

const handleSave = () => {
  uni.showToast({
    title: language.value === 'zh' ? '保存成功' : 'Saved successfully',
    icon: 'success',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.edit-profile-page {
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
  gap: 24rpx; // gap-3 = 12px = 24rpx
  padding: 32rpx; // px-4 py-4 = 16px = 32rpx
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
  width: 80rpx; // w-10 = 40px = 80rpx
  height: 80rpx; // h-10 = 40px = 80rpx
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05); // bg-white/5
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
  padding: 48rpx 32rpx; // px-4 py-6 = 16px 24px = 32rpx 48rpx
  max-width: 600rpx;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24rpx; // space-y-3 = 12px = 24rpx
  
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

.page-description {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-lg;
}

.section-card {
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: $radius-lg; // rounded-[20px] = 20px = 40rpx
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
}

.section-header-row {
  display: flex;
  flex-direction: column;
  margin-bottom: $spacing-md;
}

.section-content-wrapper {
  flex: 1;
  min-width: 0;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 16rpx; // gap-2 = 8px = 16rpx
  margin-bottom: 16rpx; // mb-2 = 8px = 16rpx
}

.section-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  flex: 1;
}

.visibility-btn {
  padding: 12rpx; // p-1.5 = 6px = 12rpx
  border-radius: 50%; // rounded-full
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visibility-btn.visible {
  background: rgba(250, 204, 21, 0.2);
}

.visibility-btn.hidden {
  background: rgba(255, 255, 255, 0.05);
}

.visibility-icon {
  font-size: 32rpx;
}

.section-content-display {
  min-width: 0;
}

.image-content {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.avatar-wrapper-btn {
  position: relative;
  width: 112rpx;
  height: 112rpx;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.avatar-wrapper-btn:active {
  transform: scale(0.95);
}

.avatar-edit-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
}

.avatar-wrapper-btn:active .avatar-edit-overlay {
  opacity: 1;
}

.avatar-edit-icon {
  font-size: 40rpx;
  color: #fff;
}

.section-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: block;
}

.change-btn {
  padding: 16rpx 24rpx; // px-3 py-2 = 12px 8px = 24rpx 16rpx
  border-radius: 9999rpx; // rounded-full
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  color: rgba(255, 255, 255, 0.8); // text-white/80
  font-size: $font-size-xs;
  transition: all 0.3s ease;
  border: none;
  box-sizing: border-box;
}

.change-btn:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.95);
}

.section-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.section-input {
  width: 100%;
  padding: 18rpx 24rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: $font-size-sm;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.section-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(250, 204, 21, 0.3);
  outline: none;
}

.section-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.gallery-content {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.gallery-placeholder {
  width: 128rpx;
  height: 128rpx;
  border-radius: 24rpx;
  border: 4rpx dashed rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.gallery-placeholder:active {
  border-color: rgba(250, 204, 21, 0.5);
  transform: scale(0.95);
}

.gallery-icon {
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.4);
}

.gallery-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.edit-btn {
  width: 100%;
  margin-top: 24rpx; // mt-3 = 12px = 24rpx
  padding: 16rpx 32rpx; // px-4 py-2 = 16px 8px = 32rpx 16rpx
  border-radius: 9999rpx; // rounded-full
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  color: #38BDF8; // text-[#38BDF8]
  font-size: $font-size-sm; // text-sm
  transition: all 0.3s ease;
  border: none;
  box-sizing: border-box;
}

.edit-btn:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.95);
}

.save-btn {
  width: 100%;
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: 9999rpx; // rounded-full
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617; // text-[#020617]
  font-size: $font-size-base;
  font-weight: $font-weight-medium; // font-medium
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(250, 204, 21, 0.4); // shadow-lg
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.save-btn:active {
  transform: scale(0.98);
}
</style>

