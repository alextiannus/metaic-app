<template>
  <view class="buy-coffee-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '请我喝咖啡' : 'Buy Me a Coffee' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Coffee Illustration -->
      <view class="coffee-illustration">
        <view class="coffee-icon-wrapper">
          <text class="coffee-icon">☕</text>
        </view>
        <text class="coffee-title">{{ language === 'zh' ? '支持 MetaIC' : 'Support MetaIC' }}</text>
        <text class="coffee-subtitle">
          {{ language === 'zh' ? '你的支持帮助我们继续改进和维护这个应用' : 'Your support helps us keep improving and maintaining this app' }}
        </text>
      </view>

      <!-- Coffee Counter -->
      <view class="coffee-counter">
        <text class="counter-label">{{ language === 'zh' ? '选择咖啡数量' : 'Select number of coffees' }}</text>
        
        <view class="counter-controls">
          <button
            class="counter-btn"
            :disabled="coffeeCount <= 1"
            @click="handleDecrement"
          >
            <text class="counter-icon">−</text>
          </button>

          <view class="counter-display">
            <text class="counter-number">{{ coffeeCount }}</text>
            <text class="counter-unit">
              {{ coffeeCount === 1 ? (language === 'zh' ? '杯咖啡' : 'coffee') : (language === 'zh' ? '杯咖啡' : 'coffees') }}
            </text>
          </view>

          <button class="counter-btn" @click="handleIncrement">
            <text class="counter-icon">+</text>
          </button>
        </view>

        <view class="price-summary">
          <view class="price-row">
            <text class="price-label">{{ language === 'zh' ? '每杯价格' : 'Price per coffee' }}</text>
            <text class="price-value">${{ pricePerCoffee.toFixed(2) }}</text>
          </view>
          <view class="price-row total-row">
            <text class="price-label">{{ language === 'zh' ? '总计' : 'Total' }}</text>
            <text class="price-value total-value">${{ totalAmount.toFixed(2) }}</text>
          </view>
        </view>
      </view>

      <!-- Payment Methods -->
      <view class="payment-methods">
        <text class="payment-label">{{ language === 'zh' ? '支付方式' : 'Payment Methods' }}</text>

        <button class="payment-btn primary" @click="handleProceedPayment">
          <view class="payment-icon-wrapper">
            <text class="payment-icon">💳</text>
          </view>
          <view class="payment-info">
            <text class="payment-name">{{ language === 'zh' ? '信用卡 / 借记卡' : 'Credit / Debit Card' }}</text>
            <text class="payment-desc">Visa, Mastercard, Amex</text>
          </view>
        </button>

        <button class="payment-btn">
          <view class="payment-icon-wrapper">
            <text class="payment-icon">🍎</text>
          </view>
          <view class="payment-info">
            <text class="payment-name">Apple Pay</text>
            <text class="payment-desc">{{ language === 'zh' ? '快速安全支付' : 'Fast & secure' }}</text>
          </view>
        </button>

        <button class="payment-btn">
          <view class="payment-icon-wrapper">
            <text class="payment-icon">G</text>
          </view>
          <view class="payment-info">
            <text class="payment-name">Google Pay</text>
            <text class="payment-desc">{{ language === 'zh' ? '快速安全支付' : 'Fast & secure' }}</text>
          </view>
        </button>
      </view>

      <!-- Info -->
      <view class="info-card">
        <text class="info-text">
          {{ language === 'zh' ? '💝 感谢你的支持！你的捐赠将帮助我们继续开发更多功能。' : '💝 Thank you for your support! Your donation helps us continue developing new features.' }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

const emit = defineEmits<{
  back: []
}>()

const { language } = useLanguage()
const coffeeCount = ref(1)
const pricePerCoffee = 6.5

const totalAmount = computed(() => coffeeCount.value * pricePerCoffee)

const handleBack = () => {
  emit('back')
}

const handleIncrement = () => {
  coffeeCount.value++
}

const handleDecrement = () => {
  if (coffeeCount.value > 1) {
    coffeeCount.value--
  }
}

const handleProceedPayment = () => {
  uni.showToast({
    title: language.value === 'zh' ? `正在处理 $${totalAmount.value.toFixed(2)} USD 的支付...` : `Processing payment of $${totalAmount.value.toFixed(2)} USD...`,
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.buy-coffee-page {
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

.coffee-illustration {
  padding: 48rpx; // p-6 = 24px = 48rpx
  border-radius: $radius-xl; // rounded-[24px] = 24px = 48rpx
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%);
  border: 1px solid rgba(250, 204, 21, 0.3); // border-[#FACC15]/30
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coffee-icon-wrapper {
  width: 160rpx; // w-20 = 80px = 160rpx
  height: 160rpx; // h-20 = 80px = 160rpx
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #F59E0B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx; // mb-4 = 16px = 32rpx
}

.coffee-icon {
  font-size: 80rpx;
}

.coffee-title {
  font-size: $font-size-lg;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  margin-bottom: $spacing-sm;
  text-align: center;
}

.coffee-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.coffee-counter {
  padding: 40rpx; // p-5 = 20px = 40rpx
  border-radius: $radius-xl; // rounded-[24px] = 24px = 48rpx
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
}

.counter-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-md;
}

.counter-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32rpx; // gap-4 = 16px = 32rpx
  margin-bottom: 48rpx; // mb-6 = 24px = 48rpx
}

.counter-btn {
  width: 96rpx; // w-12 = 48px = 96rpx
  height: 96rpx; // h-12 = 48px = 96rpx
  border-radius: 50%; // rounded-full
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.counter-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.1);
}

.counter-btn:disabled {
  opacity: 0.3;
}

.counter-icon {
  font-size: 36rpx;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
}

.counter-display {
  text-align: center;
  min-width: 160rpx;
}

.counter-number {
  font-size: 60rpx;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
  display: block;
  margin-bottom: 8rpx;
}

.counter-unit {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.price-summary {
  padding-top: $spacing-md;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-sm;
}

.total-row {
  margin-bottom: 0;
}

.price-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.price-value {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.total-value {
  font-size: 48rpx;
  font-weight: $font-weight-bold;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 24rpx; // space-y-3 = 12px = 24rpx
}

.payment-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-sm;
}

.payment-btn {
  width: 100%;
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: $radius-lg; // rounded-[20px] = 20px = 40rpx
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  display: flex;
  align-items: center;
  justify-content: space-between; // justify-between
  gap: 24rpx; // gap-3 = 12px = 24rpx
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.payment-btn:active {
  transform: scale(0.98);
  background: rgba(255, 255, 255, 0.1);
}

.payment-btn.primary {
  background: linear-gradient(135deg, #FACC15 0%, #F59E0B 100%);
  border: none;
}

.payment-icon-wrapper {
  width: 80rpx; // w-10 = 40px = 80rpx
  height: 80rpx; // h-10 = 40px = 80rpx
  border-radius: 50%; // rounded-full
  background: rgba(255, 255, 255, 0.2); // bg-white/20
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-btn.primary .payment-icon-wrapper {
  background: rgba(2, 6, 23, 0.2);
}

.payment-icon {
  font-size: 40rpx;
}

.payment-info {
  flex: 1;
  text-align: left;
}

.payment-name {
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: 4rpx;
}

.payment-btn.primary .payment-name {
  color: #020617;
}

.payment-desc {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.payment-btn.primary .payment-desc {
  color: rgba(2, 6, 23, 0.6);
}

.info-card {
  padding: $spacing-md;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  display: block;
}
</style>

