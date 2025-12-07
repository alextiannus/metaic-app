<template>
  <view class="subscription-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <button class="back-btn" @click="handleBack">
          <text class="back-icon">‹</text>
        </button>
        <text class="header-title">{{ language === 'zh' ? '订阅计划' : 'Subscription Plans' }}</text>
      </view>
    </view>

    <!-- Content -->
    <view class="page-content">
      <text class="page-description">
        {{ language === 'zh' ? '选择最适合你的计划。随时可以升级或降级。' : 'Choose the plan that fits your needs. Upgrade or downgrade anytime.' }}
      </text>

      <view
        v-for="plan in plans"
        :key="plan.id"
        :class="['plan-card', selectedPlan === plan.id ? 'plan-selected' : 'plan-unselected']"
        @click="selectedPlan = plan.id"
      >
        <view v-if="plan.popular" class="popular-badge">
          {{ language === 'zh' ? '🔥 最受欢迎' : '🔥 Most Popular' }}
        </view>

        <view v-if="isCurrent(plan.id)" class="current-badge">
          {{ language === 'zh' ? '当前计划' : 'Current' }}
        </view>

        <view class="plan-header">
          <view class="plan-icon-wrapper" :class="{ selected: selectedPlan === plan.id }">
            <text class="plan-icon">{{ plan.icon }}</text>
          </view>
          <view class="plan-name-wrapper">
            <text class="plan-name">{{ language === 'zh' ? plan.chineseName : plan.name }}</text>
          </view>
          <view v-if="selectedPlan === plan.id" class="check-mark">
            <text class="check-icon">✓</text>
          </view>
        </view>

        <view class="plan-pricing">
          <view class="price-row">
            <text class="price-amount">${{ plan.price }}</text>
            <text class="price-period">
              {{ plan.price === 0 ? (language === 'zh' ? '永久免费' : 'forever') : (language === 'zh' ? '/月' : '/month') }}
            </text>
          </view>
          <text class="tokens-info">
            {{ plan.tokens.toLocaleString() }} {{ language === 'zh' ? '代币/月' : 'tokens/month' }}
          </text>
        </view>

        <view class="plan-features">
          <view v-for="(feature, index) in plan.features" :key="index" class="feature-item">
            <text class="feature-check">✓</text>
            <text class="feature-text">{{ feature }}</text>
          </view>
        </view>
      </view>

      <!-- Subscribe Button -->
      <button class="subscribe-btn" @click="handleSubscribe">
        {{ getSubscribeButtonText() }}
      </button>

      <!-- Info -->
      <view class="info-card">
        <text class="info-text">
          {{ language === 'zh' ? '💳 所有计划均可随时取消。没有隐藏费用。' : '💳 All plans can be canceled anytime. No hidden fees.' }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import { useUser } from '../../composables/useUser'

const emit = defineEmits<{
  back: []
}>()

const { language } = useLanguage()
const { subscriptionPlan } = useUser()
const selectedPlan = ref(subscriptionPlan.value)

const plans = [
  {
    id: 'free' as const,
    name: 'Free',
    chineseName: '免费版',
    price: 0,
    tokens: 200,
    icon: '⚡',
    gradient: 'from-white/10 to-white/5',
    features: [
      language.value === 'zh' ? '200 AI 代币/月' : '200 AI tokens/month',
      language.value === 'zh' ? '基础名片功能' : 'Basic card features',
      language.value === 'zh' ? '最多 50 个联系人' : 'Up to 50 contacts',
      language.value === 'zh' ? '标准设计模板' : 'Standard templates',
    ],
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    chineseName: '专业版',
    price: 9.99,
    tokens: 1000,
    icon: '👑',
    gradient: 'from-[#FACC15] to-[#F59E0B]',
    popular: true,
    features: [
      language.value === 'zh' ? '1000 AI 代币/月' : '1000 AI tokens/month',
      language.value === 'zh' ? '高级名片功能' : 'Advanced card features',
      language.value === 'zh' ? '无限联系人' : 'Unlimited contacts',
      language.value === 'zh' ? '自定义设计模板' : 'Custom templates',
      language.value === 'zh' ? '网络洞察分析' : 'Network insights',
      language.value === 'zh' ? 'AI 沟通计划' : 'AI communication plans',
      language.value === 'zh' ? '优先客户支持' : 'Priority support',
    ],
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    chineseName: '企业版',
    price: 49.99,
    tokens: 10000,
    icon: '🏢',
    gradient: 'from-[#38BDF8] to-[#0EA5E9]',
    features: [
      language.value === 'zh' ? '10000 AI 代币/月' : '10000 AI tokens/month',
      language.value === 'zh' ? '企业名片模板' : 'Corporate templates',
      language.value === 'zh' ? '团队管理功能' : 'Team management',
      language.value === 'zh' ? '多品牌支持' : 'Multi-brand support',
      language.value === 'zh' ? '高级分析报告' : 'Advanced analytics',
      language.value === 'zh' ? '专属客户支持' : 'Dedicated support',
      language.value === 'zh' ? 'API 访问' : 'API access',
      language.value === 'zh' ? '自定义集成' : 'Custom integrations',
    ],
  },
]

const isCurrent = (planId: string) => {
  return subscriptionPlan.value === planId
}

const getSubscribeButtonText = () => {
  if (selectedPlan.value === subscriptionPlan.value) {
    return language.value === 'zh' ? '当前计划' : 'Current Plan'
  }
  if (selectedPlan.value === 'free') {
    return language.value === 'zh' ? '降级到免费版' : 'Downgrade to Free'
  }
  return language.value === 'zh' ? '立即订阅' : 'Subscribe Now'
}

const handleBack = () => {
  emit('back')
}

const handleSubscribe = () => {
  if (selectedPlan.value === subscriptionPlan.value) {
    uni.showToast({
      title: language.value === 'zh' ? '你已经订阅了此计划' : 'You are already on this plan',
      icon: 'none',
    })
    return
  }

  const plan = plans.find((p) => p.id === selectedPlan.value)
  uni.showToast({
    title:
      language.value === 'zh'
        ? `正在处理订阅 ${plan?.chineseName}...`
        : `Processing subscription to ${selectedPlan.value}...`,
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.subscription-page {
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
  gap: $spacing-md;
  
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

.plan-card {
  position: relative;
  padding: 40rpx; // p-5 = 20px = 40rpx
  border-radius: $radius-xl; // rounded-[24px] = 24px = 48rpx
  border: 1px solid;
  transition: all 0.3s ease;
  margin-bottom: $spacing-md;
}

.plan-selected {
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.01);
}

.plan-unselected {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.plan-unselected:active {
  transform: scale(0.98);
  border-color: rgba(255, 255, 255, 0.2);
}

.popular-badge {
  position: absolute;
  top: -20rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 8rpx 24rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #F59E0B 100%);
  color: #020617;
  font-size: $font-size-xs;
}

.current-badge {
  position: absolute;
  top: -20rpx;
  right: $spacing-md;
  padding: 8rpx 24rpx;
  border-radius: 50%;
  background: #38BDF8;
  color: #020617;
  font-size: $font-size-xs;
}

.plan-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32rpx; // mb-4 = 16px = 32rpx
}

.plan-icon-wrapper {
  width: 96rpx; // w-12 = 48px = 96rpx
  height: 96rpx; // h-12 = 48px = 96rpx
  border-radius: $radius-md; // rounded-[16px] = 16px = 32rpx
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  display: flex;
  align-items: center;
  justify-content: center;
}

.plan-icon-wrapper.selected {
  background: rgba(255, 255, 255, 0.2); // bg-white/20
}

.plan-icon {
  font-size: 48rpx;
}

.plan-name-wrapper {
  flex: 1;
  margin-left: 24rpx; // gap-3 = 12px = 24rpx (but using margin-left for exact match)
}

.plan-name {
  font-size: $font-size-lg;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.check-mark {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: $color-text-primary;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  font-size: 32rpx;
  color: #020617;
  font-weight: $font-weight-bold;
}

.plan-pricing {
  margin-bottom: $spacing-md;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 16rpx; // gap-2 = 8px = 16rpx
  margin-bottom: 8rpx;
}

.price-amount {
  font-size: 60rpx;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
}

.price-period {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.8);
}

.tokens-info {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.plan-features {
  display: flex;
  flex-direction: column;
  gap: 16rpx; // space-y-2 = 8px = 16rpx
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
}

.feature-check {
  font-size: 32rpx;
  color: #FACC15;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.feature-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.9);
}

.subscribe-btn {
  width: 100%;
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: 9999rpx; // rounded-full
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617; // text-[#020617]
  font-size: $font-size-base;
  font-weight: $font-weight-medium; // font-medium
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(250, 204, 21, 0.4); // shadow-lg
  box-sizing: border-box;
}

.subscribe-btn:active {
  transform: scale(0.98);
}

.info-card {
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: $radius-lg; // rounded-[20px] = 20px = 40rpx
  background: rgba(255, 255, 255, 0.05); // bg-white/5
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
}

.info-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  display: block;
}
</style>

