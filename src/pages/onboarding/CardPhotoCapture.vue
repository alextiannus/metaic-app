<template>
  <view class="card-photo-capture-page">
    <!-- Header -->
    <view class="header-section">
      <view class="icon-wrapper">
        <text class="header-icon">📷</text>
      </view>
      <text class="header-title">Capture Business Card</text>
      <text class="header-subtitle">Take a photo of your business card or upload from gallery</text>
    </view>

    <!-- Main Card -->
    <view class="main-card">
      <view v-if="!capturedImage" class="upload-section">
        <!-- Upload Area -->
        <view class="upload-area" @click="handleFileSelect">
          <text class="upload-icon">📤</text>
          <text class="upload-text">Click to upload photo</text>
          <text class="upload-hint">or drag and drop</text>
        </view>

        <!-- Camera Button -->
        <button class="action-btn primary" @click="handleFileSelect">
          <text class="btn-icon">📷</text>
          <text>Take Photo</text>
        </button>

        <!-- Upload Button -->
        <button class="action-btn secondary" @click="handleFileSelect">
          <text class="btn-icon">📤</text>
          <text>Upload from Gallery</text>
        </button>

        <!-- Tips -->
        <view class="tips-card">
          <text class="tips-title">📸 Tips for best results:</text>
          <view class="tips-list">
            <text class="tip-item">• Ensure good lighting</text>
            <text class="tip-item">• Keep the card flat and in focus</text>
            <text class="tip-item">• Capture all text clearly</text>
            <text class="tip-item">• Avoid shadows and glare</text>
          </view>
        </view>

        <!-- Skip Button -->
        <button class="skip-btn" @click="handleSkip">
          <text>Skip - Enter Manually</text>
        </button>
      </view>

      <view v-else class="preview-section">
        <!-- Preview -->
        <view class="preview-container">
          <image class="preview-image" :src="capturedImage" mode="aspectFit" />
          <view v-if="isProcessing" class="processing-overlay">
            <view class="spinner"></view>
            <view class="processing-content">
              <text class="sparkle-icon">✨</text>
              <text class="processing-text">AI Processing...</text>
            </view>
            <text class="processing-desc">Extracting information from card</text>
          </view>
        </view>

        <view v-if="!isProcessing" class="preview-actions">
          <button class="action-btn secondary" @click="handleRetake">
            <text class="btn-icon">🔄</text>
            <text>Retake</text>
          </button>
          <button class="action-btn primary" @click="handleConfirm">
            <text class="btn-icon">✓</text>
            <text>Confirm & Process</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  photoCapture: [imageData: string]
  skip: []
}>()

const capturedImage = ref<string | null>(null)
const isProcessing = ref(false)

const handleFileSelect = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePath = Array.isArray(res.tempFilePaths) ? res.tempFilePaths[0] : res.tempFilePaths
      capturedImage.value = tempFilePath
    },
  })
}

const handleConfirm = () => {
  if (capturedImage.value) {
    isProcessing.value = true
    setTimeout(() => {
      emit('photoCapture', capturedImage.value!)
    }, 2000)
  }
}

const handleRetake = () => {
  capturedImage.value = null
  isProcessing.value = false
}

const handleSkip = () => {
  emit('skip')
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.card-photo-capture-page {
  min-height: 100vh;
  background: #020617;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl $spacing-md;
}

.header-section {
  text-align: center;
  margin-bottom: $spacing-xl;
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

.main-card {
  width: 100%;
  max-width: 600rpx;
  border-radius: 48rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: $spacing-lg;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    max-width: 700px;
    border-radius: 24px;
    padding: 40px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
    padding: 50px;
  }
  // #endif
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.upload-area {
  aspect-ratio: 1.6 / 1;
  border-radius: 32rpx;
  border: 4rpx dashed rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  transition: all 0.3s ease;
}

.upload-area:active {
  border-color: rgba(250, 204, 21, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

.upload-icon {
  font-size: 96rpx;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: $spacing-md;
}

.upload-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8rpx;
}

.upload-hint {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.action-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  box-shadow: 0 4rpx 12rpx rgba(250, 204, 21, 0.4);
}

.action-btn.primary:active {
  transform: scale(0.98);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
}

.action-btn.secondary:active {
  background: rgba(255, 255, 255, 0.1);
}

.btn-icon {
  font-size: 40rpx;
}

.tips-card {
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  margin-bottom: $spacing-md;
}

.tips-title {
  font-size: $font-size-xs;
  color: #38BDF8;
  display: block;
  margin-bottom: $spacing-sm;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.tip-item {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.skip-btn {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  color: rgba(255, 255, 255, 0.6);
  font-size: $font-size-sm;
  transition: all 0.3s ease;
}

.skip-btn:active {
  color: $color-text-primary;
  background: rgba(255, 255, 255, 0.05);
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.preview-container {
  position: relative;
  aspect-ratio: 1.6 / 1;
  border-radius: 32rpx;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  margin-bottom: $spacing-lg;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.processing-overlay {
  position: absolute;
  inset: 0;
  background: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
}

.spinner {
  width: 128rpx;
  height: 128rpx;
  border: 8rpx solid rgba(250, 204, 21, 0.3);
  border-top-color: #FACC15;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.processing-content {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: #FACC15;
}

.sparkle-icon {
  font-size: 40rpx;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.processing-text {
  font-size: $font-size-sm;
  color: #FACC15;
}

.processing-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.preview-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}
</style>

