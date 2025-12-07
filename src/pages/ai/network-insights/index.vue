<template>
  <view class="network-insights-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <text class="header-icon">📊</text>
        <text class="header-title">{{ t('insights.title') }}</text>
      </view>
      <text class="header-subtitle">{{ t('insights.subtitle') }}</text>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Timeframe Selector -->
      <view class="timeframe-selector">
        <button
          v-for="tf in timeframes"
          :key="tf"
          :class="['timeframe-btn', timeframe === tf ? 'active' : '']"
          @click="timeframe = tf"
        >
          <text>{{ tf.charAt(0).toUpperCase() + tf.slice(1) }}</text>
        </button>
      </view>

      <!-- Stats Grid -->
      <view class="stats-grid">
        <view v-for="(stat, index) in stats" :key="index" class="stat-card">
          <view class="stat-icon-wrapper" :style="{ backgroundColor: stat.color + '20' }">
            <text class="stat-icon">{{ stat.icon }}</text>
          </view>
          <text class="stat-value">{{ stat.value }}</text>
          <text class="stat-label">{{ stat.title }}</text>
          <view class="stat-change">
            <text :class="['change-text', stat.change > 0 ? 'positive' : stat.change < 0 ? 'negative' : '']">
              {{ stat.change > 0 ? '↑' : stat.change < 0 ? '↓' : '' }} {{ stat.changeLabel }}
            </text>
          </view>
        </view>
      </view>

      <!-- Weekly Activity Chart -->
      <view class="chart-card">
        <view class="chart-header">
          <text class="chart-title">Weekly Activity</text>
          <view class="chart-trend">
            <text class="trend-icon">↑</text>
            <text class="trend-text">+18%</text>
          </view>
        </view>
        <view class="chart-bars">
          <view v-for="(day, index) in weeklyData" :key="index" class="chart-bar-wrapper">
            <view class="bar-container">
              <view
                :class="['bar', index === 3 ? 'bar-today' : '']"
                :style="{ height: (day.value / maxValue) * 100 + '%' }"
              >
                <text v-if="index === 3" class="bar-value">{{ day.value }}</text>
              </view>
            </view>
            <text class="bar-label">{{ day.day }}</text>
          </view>
        </view>
      </view>

      <!-- Top Connections -->
      <view class="section">
        <text class="section-title">Top Connections</text>
        <view v-for="(contact, index) in topContacts" :key="index" class="contact-item">
          <text class="contact-avatar">{{ contact.avatar }}</text>
          <view class="contact-details">
            <text class="contact-name">{{ contact.name }}</text>
            <text class="contact-info">{{ contact.interactions }} interactions • {{ contact.lastContact }}</text>
          </view>
          <view class="trend-indicator" :class="contact.trend">
            <text class="trend-arrow">{{ contact.trend === 'up' ? '↑' : contact.trend === 'down' ? '↓' : '—' }}</text>
          </view>
        </view>
      </view>

      <!-- Recent Activity -->
      <view class="section">
        <text class="section-title">Recent Activity</text>
        <view class="activity-card">
          <view v-for="(activity, index) in activities" :key="index" class="activity-item">
            <text class="activity-icon">{{ getActivityIcon(activity.type) }}</text>
            <view class="activity-content">
              <text class="activity-desc">{{ activity.description }}</text>
              <text class="activity-date">{{ activity.date }}</text>
            </view>
            <view class="activity-count">{{ activity.count }}</view>
          </view>
        </view>
      </view>

      <!-- AI Recommendations -->
      <view class="section">
        <view class="section-header">
          <text class="sparkle-icon">✨</text>
          <text class="section-title">AI Recommendations</text>
        </view>
        <view v-for="(rec, index) in aiRecommendations" :key="index" class="recommendation-card">
          <view class="rec-header">
            <text class="rec-title">{{ rec.title }}</text>
            <view class="priority-badge" :style="{ backgroundColor: getPriorityColor(rec.priority) + '20', color: getPriorityColor(rec.priority) }">
              <text>{{ rec.priority }}</text>
            </view>
          </view>
          <text class="rec-desc">{{ rec.description }}</text>
          <button class="rec-action-btn">{{ rec.action }}</button>
        </view>
      </view>

      <!-- Network Health Score -->
      <view class="health-card">
        <view class="health-header">
          <view class="health-icon-wrapper">
            <text class="health-icon">🎯</text>
          </view>
          <view>
            <text class="health-title">Network Health</text>
            <text class="health-subtitle">Overall performance score</text>
          </view>
        </view>
        <view class="progress-section">
          <view class="progress-header">
            <text class="progress-label">Current Score</text>
            <text class="progress-value">87/100</text>
          </view>
          <view class="progress-bar">
            <view class="progress-fill" style="width: 87%"></view>
          </view>
        </view>
        <view class="health-stats">
          <view class="health-stat">
            <text class="health-stat-value">92%</text>
            <text class="health-stat-label">Response Rate</text>
          </view>
          <view class="health-stat">
            <text class="health-stat-value">78%</text>
            <text class="health-stat-label">Follow-up Rate</text>
          </view>
          <view class="health-stat">
            <text class="health-stat-value">85%</text>
            <text class="health-stat-label">Engagement</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../../composables/useLanguage'

const { language, t } = useLanguage()

const timeframe = ref<'week' | 'month' | 'year'>('month')
const timeframes = ['week', 'month', 'year'] as const

const stats = [
  {
    icon: '👥',
    title: 'Total Connections',
    value: '247',
    change: 12.5,
    changeLabel: '+31 this month',
    color: '#FACC15',
  },
  {
    icon: '⚡',
    title: 'Engagement Rate',
    value: '68%',
    change: 5.2,
    changeLabel: '+3.5% vs last month',
    color: '#38BDF8',
  },
  {
    icon: '📅',
    title: 'Active Days',
    value: '22/30',
    change: -2.1,
    changeLabel: '2 days less',
    color: '#EF4444',
  },
  {
    icon: '🏆',
    title: 'Network Score',
    value: '8.7',
    change: 8.7,
    changeLabel: 'Excellent',
    color: '#10B981',
  },
]

const topContacts = [
  {
    name: 'Sarah Chen',
    avatar: '👩‍💼',
    interactions: 47,
    lastContact: '2 days ago',
    trend: 'up' as const,
  },
  {
    name: 'Michael Rodriguez',
    avatar: '👨‍💻',
    interactions: 38,
    lastContact: '5 days ago',
    trend: 'up' as const,
  },
  {
    name: 'Emily Watson',
    avatar: '👩‍🔬',
    interactions: 29,
    lastContact: '1 week ago',
    trend: 'stable' as const,
  },
  {
    name: 'David Kim',
    avatar: '👨‍💼',
    interactions: 24,
    lastContact: '3 days ago',
    trend: 'down' as const,
  },
]

const weeklyData = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 19 },
  { day: 'Wed', value: 15 },
  { day: 'Thu', value: 25 },
  { day: 'Fri', value: 22 },
  { day: 'Sat', value: 8 },
  { day: 'Sun', value: 5 },
]

const activities = [
  {
    date: 'Today',
    type: 'connection',
    description: 'Connected with 3 new people',
    count: 3,
  },
  {
    date: 'Yesterday',
    type: 'meeting',
    description: 'Attended 2 networking events',
    count: 2,
  },
  {
    date: '2 days ago',
    type: 'message',
    description: 'Sent 15 follow-up messages',
    count: 15,
  },
  {
    date: '3 days ago',
    type: 'event',
    description: 'Shared business card 8 times',
    count: 8,
  },
]

const aiRecommendations = [
  {
    title: 'Reconnect with dormant contacts',
    description: 'You have 12 contacts you haven\'t spoken to in over 3 months',
    action: 'View List',
    priority: 'medium',
  },
  {
    title: 'Optimize your networking schedule',
    description: 'Your engagement is 40% higher on Thursdays. Schedule more meetings then.',
    action: 'Apply',
    priority: 'high',
  },
  {
    title: 'Expand industry connections',
    description: 'Only 15% of your network is in the tech industry. Consider joining tech events.',
    action: 'Find Events',
    priority: 'low',
  },
]

const maxValue = computed(() => Math.max(...weeklyData.map((d) => d.value)))

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'connection':
      return '👥'
    case 'meeting':
      return '📅'
    case 'message':
      return '💬'
    case 'event':
      return '🎯'
    default:
      return '📊'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#EF4444'
    case 'medium':
      return '#FACC15'
    case 'low':
      return '#38BDF8'
    default:
      return '#38BDF8'
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.network-insights-page {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 192rpx;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    padding: 40px 24px;
    padding-bottom: 120px;
  }
  
  @media (min-width: 1024px) {
    padding: 50px 32px;
    padding-bottom: 140px;
  }
  // #endif
}

.page-header {
  margin-bottom: $spacing-lg;
}

.header-content {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.header-icon {
  font-size: 48rpx;
  color: #FACC15;
}

.header-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
}

.header-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.page-content {
  max-width: 600rpx;
  margin: 0 auto;
  width: 100%;
  
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

.timeframe-selector {
  display: flex;
  gap: $spacing-sm;
  padding: 8rpx;
  border-radius: 24rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: $spacing-lg;
}

.timeframe-btn {
  flex: 1;
  padding: 18rpx 24rpx;
  border-radius: 18rpx;
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.timeframe-btn.active {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.stat-card {
  padding: 24rpx $spacing-md;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.stat-card:active {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

.stat-icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $spacing-sm;
}

.stat-icon {
  font-size: 40rpx;
}

.stat-value {
  font-size: 48rpx;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-sm;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.change-text {
  font-size: $font-size-xs;
}

.change-text.positive {
  color: #10B981;
}

.change-text.negative {
  color: #EF4444;
}

.chart-card {
  padding: $spacing-lg;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: $spacing-lg;
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-md;
}

.chart-title {
  font-size: $font-size-base;
  color: $color-text-primary;
}

.chart-trend {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: #10B981;
  font-size: $font-size-sm;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $spacing-sm;
  height: 256rpx;
  margin-bottom: $spacing-sm;
}

.chart-bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
}

.bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.bar {
  width: 100%;
  border-radius: 8rpx 8rpx 0 0;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.bar-today {
  background: linear-gradient(to top, #FACC15 0%, #38BDF8 100%);
}

.bar-value {
  position: absolute;
  top: -40rpx;
  left: 50%;
  transform: translateX(-50%);
  font-size: $font-size-xs;
  color: $color-text-primary;
  white-space: nowrap;
}

.bar-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.section {
  margin-bottom: $spacing-lg;
}

.section-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.section-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.sparkle-icon {
  font-size: 32rpx;
  color: #FACC15;
}

.contact-item {
  padding: 24rpx $spacing-md;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
  transition: all 0.3s ease;
}

.contact-item:active {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

.contact-avatar {
  font-size: 60rpx;
}

.contact-details {
  flex: 1;
}

.contact-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.contact-info {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.trend-indicator {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.trend-indicator.up {
  background: rgba(16, 185, 129, 0.2);
}

.trend-indicator.down {
  background: rgba(239, 68, 68, 0.2);
}

.trend-indicator.stable {
  background: rgba(255, 255, 255, 0.1);
}

.trend-arrow {
  font-size: 32rpx;
  color: $color-text-primary;
}

.activity-card {
  padding: $spacing-lg;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
}

.activity-icon {
  font-size: 48rpx;
}

.activity-content {
  flex: 1;
}

.activity-desc {
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.activity-date {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.activity-count {
  padding: 8rpx 16rpx;
  border-radius: 18rpx;
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: $font-size-xs;
}

.recommendation-card {
  padding: $spacing-lg;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: $spacing-md;
}

.rec-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $spacing-md;
}

.rec-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  flex: 1;
}

.priority-badge {
  padding: 8rpx 16rpx;
  border-radius: 18rpx;
  font-size: $font-size-xs;
}

.rec-desc {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-md;
}

.rec-action-btn {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-sm;
}

.health-card {
  padding: $spacing-lg;
  border-radius: 40rpx;
  background: linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%);
  border: 1px solid rgba(250, 204, 21, 0.2);
  backdrop-filter: blur(20px);
}

.health-header {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.health-icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.health-icon {
  font-size: 48rpx;
}

.health-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  display: block;
  margin-bottom: 4rpx;
}

.health-subtitle {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.progress-section {
  margin-bottom: $spacing-md;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-sm;
}

.progress-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.progress-value {
  font-size: $font-size-sm;
  color: #10B981;
}

.progress-bar {
  height: 24rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  transition: width 0.3s ease;
}

.health-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  text-align: center;
}

.health-stat-value {
  font-size: 40rpx;
  color: #FACC15;
  display: block;
  margin-bottom: 8rpx;
}

.health-stat-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}
</style>

