<template>
  <view class="phone-email-login-page">
    <!-- Logo & Welcome Section -->
    <view class="welcome-section">
      <view class="logo-container">
        <view class="logo-text">
          <text class="logo-m">M</text>
          <text class="logo-eta">eta</text>
          <text class="logo-ic">IC</text>
        </view>
      </view>
      <text class="welcome-title">{{ language === 'zh' ? '欢迎来到 MetaIC' : 'Welcome to MetaIC' }}</text>
    </view>

    <!-- Form -->
    <view class="form-section">
      <!-- Email Input -->
      <view v-if="isRegisterMode" class="email-row">
        <input
          v-model="email"
          type="email"
          :placeholder="language === 'zh' ? '邮箱地址' : 'Email address'"
          class="email-input"
        />
        <button
          class="send-code-btn"
          :disabled="!email || codeSent"
          @click="handleSendCode"
        >
          {{ language === 'zh' ? '发送' : 'Send' }}
        </button>
      </view>
      <input
        v-else
        v-model="email"
        type="email"
        :placeholder="language === 'zh' ? '邮箱地址' : 'Email address'"
        class="form-input"
      />

      <!-- Password (Login) or Verification Code (Register) -->
      <input
        v-if="!isRegisterMode"
        v-model="password"
        type="password"
        :placeholder="language === 'zh' ? '密码' : 'Password'"
        class="form-input"
      />

      <template v-else>
        <input
          v-model="verificationCode"
          type="text"
          :placeholder="language === 'zh' ? '验证码' : 'Verification code'"
          class="form-input"
        />
        <view class="invitation-code-wrapper">
          <input
            v-model="invitationCode"
            type="text"
            :placeholder="language === 'zh' ? '邀请码' : 'Invitation code'"
            class="form-input invitation-input"
          />
          <text class="optional-label">({{ language === 'zh' ? '选填' : 'Optional' }})</text>
        </view>
      </template>

      <!-- Action Buttons -->
      <view class="action-buttons">
        <button class="back-btn" @click="handleBack">
          {{ language === 'zh' ? '返回' : 'Back' }}
        </button>
        <button class="submit-btn" @click="handleSubmit">
          {{ isRegisterMode ? (language === 'zh' ? '注册' : 'Register') : (language === 'zh' ? '登录' : 'Login') }}
        </button>
      </view>

      <!-- Toggle Mode -->
      <view class="toggle-mode">
        <text class="toggle-text">
          {{ isRegisterMode ? (language === 'zh' ? '已有账号？' : 'Already have an account?') : (language === 'zh' ? '还没有账号？' : "Don't have an account?") }}
        </text>
        <button class="toggle-link" @click="toggleMode">
          {{ isRegisterMode ? (language === 'zh' ? '登录' : 'Login') : (language === 'zh' ? '注册' : 'Register') }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../../composables/useLanguage'

const emit = defineEmits<{
  back: []
  login: []
}>()

const props = defineProps<{
  isRegister?: boolean
}>()

const { language } = useLanguage()
const email = ref('')
const password = ref('')
const verificationCode = ref('')
const invitationCode = ref('')
const codeSent = ref(false)
const isRegisterMode = ref(props.isRegister || false)

const handleSendCode = () => {
  codeSent.value = true
  uni.showToast({
    title: language.value === 'zh' ? '验证码已发送' : 'Verification code sent',
    icon: 'success',
  })
}

const handleSubmit = () => {
  emit('login')
}

const handleBack = () => {
  emit('back')
}

const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value
  password.value = ''
  verificationCode.value = ''
  invitationCode.value = ''
  codeSent.value = false
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.phone-email-login-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #1e293b 0%, #0f172a 50%, #020617 100%);
  display: flex;
  flex-direction: column;
  padding: $spacing-xl $spacing-md;
}

.welcome-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: $spacing-xl;
  padding-bottom: $spacing-lg;
}

.logo-container {
  margin-bottom: $spacing-xl;
  text-align: center;
}

.logo-text {
  display: inline-flex;
  align-items: baseline;
  gap: 4rpx;
}

.logo-m {
  font-size: 100rpx;
  font-weight: $font-weight-bold;
  background: linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-eta {
  font-size: 80rpx;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.logo-ic {
  font-size: 100rpx;
  font-weight: $font-weight-bold;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  text-align: center;
}

.form-section {
  width: 100%;
  max-width: 600rpx;
  margin: 0 auto;
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

.email-row {
  display: flex;
  gap: $spacing-sm;
}

.email-input {
  flex: 1;
  padding: 18rpx 24rpx;
  border-radius: 24rpx;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-base;
  min-height: 72rpx;
  box-sizing: border-box;
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.send-code-btn {
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  font-size: $font-size-sm;
  white-space: nowrap;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.send-code-btn:disabled {
  opacity: 0.5;
}

.send-code-btn:active {
  color: $color-text-primary;
  border-color: rgba(255, 255, 255, 0.4);
}

.form-input {
  width: 100%;
  padding: 18rpx 24rpx;
  border-radius: 24rpx;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-base;
  min-height: 72rpx;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.invitation-code-wrapper {
  position: relative;
}

.invitation-input {
  padding-right: 120rpx;
}

.optional-label {
  position: absolute;
  right: $spacing-md;
  top: 50%;
  transform: translateY(-50%);
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.action-buttons {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-md;
}

.back-btn {
  flex: 1;
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: $color-text-primary;
  font-size: $font-size-base;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.back-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.05);
}

.submit-btn {
  flex: 1;
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: $color-text-primary;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 12rpx rgba(99, 102, 241, 0.4);
  min-height: 72rpx;
  box-sizing: border-box;
}

.submit-btn:active {
  transform: scale(0.98);
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
}

.toggle-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  margin-top: $spacing-lg;
}

.toggle-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.toggle-link {
  font-size: $font-size-sm;
  color: #6366f1;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.toggle-link:active {
  color: #8b5cf6;
}
</style>

