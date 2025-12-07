<template>
  <view class="add-contact-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '添加联系人' : 'Add Contact' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Instruction -->
      <view class="instruction-card">
        <text class="instruction-text">
          {{ language === 'zh' ? '📸 拍照或上传名片照片，AI 将自动提取联系信息' : '📸 Take a photo or upload a card image, AI will extract contact info automatically' }}
        </text>
      </view>

      <!-- Upload Options -->
      <view v-if="!uploadedImage" class="upload-options">
        <button class="upload-option camera-option" @click="handleCameraCapture">
          <view class="option-icon-wrapper camera-icon">
            <text class="option-icon">📷</text>
          </view>
          <view class="option-content">
            <text class="option-title">{{ language === 'zh' ? '拍摄名片' : 'Take Photo' }}</text>
            <text class="option-desc">{{ language === 'zh' ? '使用相机扫描名片' : 'Use camera to scan card' }}</text>
          </view>
        </button>

        <button class="upload-option upload-icon-option" @click="handleFileSelect">
          <view class="option-icon-wrapper upload-icon">
            <text class="option-icon">📤</text>
          </view>
          <view class="option-content">
            <text class="option-title">{{ language === 'zh' ? '上传照片' : 'Upload Photo' }}</text>
            <text class="option-desc">{{ language === 'zh' ? '从相册选择名片照片' : 'Select card photo from gallery' }}</text>
          </view>
        </button>
      </view>

      <!-- Preview & AI Analysis -->
      <view v-if="uploadedImage" class="preview-section">
        <!-- Image Preview -->
        <view class="preview-card">
          <text class="preview-label">{{ language === 'zh' ? '名片预览' : 'Card Preview' }}</text>
          <image class="preview-image" :src="uploadedImage" mode="aspectFit" />
          <button class="reupload-btn" @click="uploadedImage = null">
            {{ language === 'zh' ? '重新上传' : 'Re-upload' }}
          </button>
        </view>

        <!-- AI Extracted Info -->
        <view class="ai-info-card">
          <view class="ai-header">
            <view class="ai-icon-wrapper">
              <text class="ai-icon">👤</text>
            </view>
            <text class="ai-title">{{ language === 'zh' ? 'AI 识别信息' : 'AI Extracted Info' }}</text>
          </view>

          <view class="info-list">
            <view class="info-item">
              <text class="info-icon">👤</text>
              <view class="info-content">
                <text class="info-label">{{ language === 'zh' ? '姓名' : 'Name' }}</text>
                <text class="info-value">John Smith</text>
              </view>
            </view>

            <view class="info-item">
              <text class="info-icon">🏢</text>
              <view class="info-content">
                <text class="info-label">{{ language === 'zh' ? '公司' : 'Company' }}</text>
                <text class="info-value">Tech Solutions Inc.</text>
              </view>
            </view>

            <view class="info-item">
              <text class="info-icon">📧</text>
              <view class="info-content">
                <text class="info-label">{{ language === 'zh' ? '邮箱' : 'Email' }}</text>
                <text class="info-value">john@techsolutions.com</text>
              </view>
            </view>

            <view class="info-item">
              <text class="info-icon">📱</text>
              <view class="info-content">
                <text class="info-label">{{ language === 'zh' ? '电话' : 'Phone' }}</text>
                <text class="info-value">+1 234 567 8900</text>
              </view>
            </view>

            <view class="info-item">
              <text class="info-icon">🏷️</text>
              <view class="info-content">
                <text class="info-label">{{ language === 'zh' ? '标签' : 'Tags' }}</text>
                <view class="tags-list">
                  <text class="tag business-tag">Business</text>
                  <text class="tag tech-tag">Tech</text>
                </view>
              </view>
            </view>
          </view>

          <view class="ai-footer">
            <text class="ai-footer-text">
              {{ language === 'zh' ? '✨ AI 已自动识别并填充信息，你可以在保存后编辑' : '✨ AI has auto-filled the information, you can edit after saving' }}
            </text>
          </view>
        </view>

        <!-- Save Button -->
        <button class="save-btn" @click="handleSaveContact">
          {{ language === 'zh' ? '保存联系人' : 'Save Contact' }}
        </button>
      </view>

      <!-- Manual Entry Option -->
      <view class="manual-entry-card">
        <button class="manual-entry-btn">
          {{ language === 'zh' ? '或手动输入联系信息' : 'Or enter contact info manually' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

const emit = defineEmits<{
  back: []
}>()

const { language } = useLanguage()
const uploadedImage = ref<string | null>(null)

const handleBack = () => {
  emit('back')
}

const handleCameraCapture = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = Array.isArray(res.tempFilePaths) ? res.tempFilePaths[0] : res.tempFilePaths
      uploadedImage.value = tempFilePath
    },
  })
}

const handleFileSelect = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = Array.isArray(res.tempFilePaths) ? res.tempFilePaths[0] : res.tempFilePaths
      uploadedImage.value = tempFilePath
    },
  })
}

const handleSaveContact = () => {
  uni.showToast({
    title: language.value === 'zh' ? 'AI 正在分析名片并创建联系人...' : 'AI is analyzing the card and creating contact...',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.add-contact-page {
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

.instruction-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
}

.instruction-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  text-align: center;
  display: block;
}

.upload-options {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.upload-option {
  width: 100%;
  padding: $spacing-lg;
  border-radius: 48rpx;
  border: 2px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
  transition: all 0.3s ease;
}

.camera-option {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
  border-color: rgba(250, 204, 21, 0.3);
}

.camera-option:active {
  transform: scale(0.98);
}

.upload-icon-option {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%);
  border-color: rgba(56, 189, 248, 0.3);
}

.upload-icon-option:active {
  transform: scale(0.98);
}

.option-icon-wrapper {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-icon {
  background: rgba(250, 204, 21, 0.3);
}

.upload-icon {
  background: rgba(56, 189, 248, 0.3);
}

.option-icon {
  font-size: 64rpx;
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.option-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  display: block;
  margin-bottom: 8rpx;
}

.option-desc {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.preview-card {
  padding: $spacing-md;
  border-radius: 48rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-md;
}

.preview-image {
  width: 100%;
  border-radius: 32rpx;
  max-height: 400rpx;
  margin-bottom: $spacing-md;
}

.reupload-btn {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  font-size: $font-size-sm;
  transition: all 0.3s ease;
}

.reupload-btn:active {
  background: rgba(255, 255, 255, 0.1);
}

.ai-info-card {
  padding: $spacing-lg;
  border-radius: 48rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.ai-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.ai-icon-wrapper {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-icon {
  font-size: 32rpx;
}

.ai-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.info-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
}

.info-icon {
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.6);
}

.info-content {
  flex: 1;
}

.info-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: 8rpx;
}

.info-value {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.tags-list {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;
}

.tag {
  padding: 8rpx 16rpx;
  border-radius: 50%;
  font-size: $font-size-xs;
}

.business-tag {
  background: rgba(250, 204, 21, 0.2);
  color: #FACC15;
}

.tech-tag {
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
}

.ai-footer {
  padding-top: $spacing-md;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.ai-footer-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  display: block;
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

.manual-entry-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.manual-entry-btn {
  width: 100%;
  font-size: $font-size-sm;
  color: #38BDF8;
  transition: color 0.3s ease;
}

.manual-entry-btn:active {
  color: rgba(56, 189, 248, 0.8);
}
</style>

