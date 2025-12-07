<template>
  <view class="communication-history-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <text class="header-icon">📜</text>
        <text class="header-title">{{ t('history.title') }}</text>
      </view>
      <text class="header-subtitle">{{ t('history.subtitle') }}</text>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Search Bar -->
      <view class="search-section">
        <view class="search-wrapper">
          <text class="search-icon">🔍</text>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('history.search')"
            class="search-input"
          />
        </view>
      </view>

      <!-- Filter Buttons -->
      <view class="filters-section">
        <text class="filter-label">{{ t('history.filterBy') }}</text>
        <scroll-view class="filter-scroll" scroll-x="true">
          <view class="filter-buttons">
            <button
              v-for="filter in filters"
              :key="filter"
              :class="['filter-btn', filterType === filter ? 'active' : '']"
              @click="filterType = filter"
            >
              <text>{{ getFilterLabel(filter) }}</text>
            </button>
          </view>
        </scroll-view>
      </view>

      <!-- Results Count -->
      <view class="results-header">
        <text class="results-count">
          {{ filteredEntries.length }} {{ filteredEntries.length !== 1 ? t('history.entriesFound') : t('history.entryFound') }}
        </text>
      </view>

      <!-- History Entries -->
      <view v-if="filteredEntries.length > 0" class="history-list">
        <view
          v-for="(group, groupDate) in groupedEntries"
          :key="groupDate"
          class="date-group"
        >
          <text class="date-label">{{ formatGroupDate(groupDate) }}</text>
          <view v-for="entry in group" :key="entry.id" class="history-entry">
            <view class="entry-icon-wrapper" :style="{ backgroundColor: getTypeColor(entry.type) + '20' }">
              <text class="entry-icon">{{ getTypeIcon(entry.type) }}</text>
            </view>
            <view class="entry-content">
              <view class="entry-header">
                <text class="entry-title">{{ entry.title }}</text>
                <text class="entry-time">{{ entry.time }}</text>
              </view>
              <view class="entry-contact">
                <text class="contact-avatar">{{ entry.contact.avatar }}</text>
                <view class="contact-info">
                  <text class="contact-name">{{ entry.contact.name }}</text>
                  <text class="contact-company">{{ entry.contact.company }}</text>
                </view>
              </view>
              <text class="entry-description">{{ entry.description }}</text>
              <view v-if="entry.location" class="entry-meta">
                <text class="meta-icon">📍</text>
                <text class="meta-text">{{ entry.location }}</text>
              </view>
              <view v-if="entry.duration" class="entry-meta">
                <text class="meta-icon">⏱️</text>
                <text class="meta-text">{{ entry.duration }}</text>
              </view>
              <view v-if="entry.tags && entry.tags.length > 0" class="entry-tags">
                <text v-for="tag in entry.tags" :key="tag" class="tag">{{ tag }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Empty State -->
      <view v-else class="empty-state">
        <text class="empty-icon">📭</text>
        <text class="empty-title">{{ t('history.noHistory') }}</text>
        <text class="empty-subtitle">{{ t('history.tryAdjusting') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../../composables/useLanguage'

interface HistoryEntry {
  id: string
  date: string
  time: string
  type: 'message' | 'call' | 'video' | 'email' | 'meeting' | 'card-share'
  contact: {
    name: string
    avatar: string
    company: string
  }
  title: string
  description: string
  location?: string
  duration?: string
  tags?: string[]
}

const { language, t } = useLanguage()

const searchQuery = ref('')
const filterType = ref<'all' | 'message' | 'call' | 'video' | 'email' | 'meeting' | 'card-share'>('all')

const historyEntries: HistoryEntry[] = [
  {
    id: '1',
    date: '2024-12-04',
    time: '10:30 AM',
    type: 'video',
    contact: {
      name: 'Sarah Chen',
      avatar: '👩‍💼',
      company: 'Tech Innovations',
    },
    title: 'Video Call - AI Partnership Discussion',
    description: 'Discussed AI integration opportunities for Q1 2025. Sarah interested in collaboration.',
    duration: '45 min',
    tags: ['AI', 'Partnership', 'Q1 2025'],
  },
  {
    id: '2',
    date: '2024-12-04',
    time: '09:15 AM',
    type: 'message',
    contact: {
      name: 'Michael Rodriguez',
      avatar: '👨‍💻',
      company: 'StartupHub',
    },
    title: 'Follow-up Message',
    description: 'Sent follow-up on investment discussion. Shared pitch deck and financial projections.',
    tags: ['Investment', 'Follow-up'],
  },
  {
    id: '3',
    date: '2024-12-03',
    time: '03:45 PM',
    type: 'meeting',
    contact: {
      name: 'Emily Watson',
      avatar: '👩‍🔬',
      company: 'BioTech Labs',
    },
    title: 'Coffee Meeting - Networking',
    description: 'Casual networking coffee. Discussed industry trends and potential collaborations.',
    location: 'Blue Bottle Coffee, Downtown',
    duration: '1 hr',
    tags: ['Networking', 'BioTech'],
  },
  {
    id: '4',
    date: '2024-12-03',
    time: '11:00 AM',
    type: 'email',
    contact: {
      name: 'David Kim',
      avatar: '👨‍💼',
      company: 'Global Ventures',
    },
    title: 'Email - Introduction Request',
    description: 'Requested introduction to VP of Product. David agreed to connect us.',
    tags: ['Introduction', 'Product'],
  },
  {
    id: '5',
    date: '2024-12-02',
    time: '06:30 PM',
    type: 'card-share',
    contact: {
      name: 'Lisa Park',
      avatar: '👩‍💼',
      company: 'Design Studio Co',
    },
    title: 'Business Card Exchange',
    description: 'Met at Tech Conference 2024. Exchanged digital business cards via MetaIC.',
    location: 'Convention Center',
    tags: ['Conference', 'New Contact'],
  },
]

const filters = ['all', 'message', 'call', 'video', 'email', 'meeting', 'card-share'] as const

const filteredEntries = computed(() => {
  return historyEntries.filter((entry) => {
    const matchesSearch =
      searchQuery.value === '' ||
      entry.contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      entry.contact.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      entry.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesFilter = filterType.value === 'all' || entry.type === filterType.value

    return matchesSearch && matchesFilter
  })
})

const groupedEntries = computed(() => {
  const groups: Record<string, HistoryEntry[]> = {}
  filteredEntries.value.forEach((entry) => {
    if (!groups[entry.date]) {
      groups[entry.date] = []
    }
    groups[entry.date].push(entry)
  })
  return groups
})

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'message':
      return '💬'
    case 'call':
      return '📞'
    case 'video':
      return '📹'
    case 'email':
      return '📧'
    case 'meeting':
      return '📅'
    case 'card-share':
      return '👤'
    default:
      return '💬'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'message':
      return '#38BDF8'
    case 'call':
      return '#10B981'
    case 'video':
      return '#8B5CF6'
    case 'email':
      return '#F59E0B'
    case 'meeting':
      return '#EF4444'
    case 'card-share':
      return '#FACC15'
    default:
      return '#38BDF8'
  }
}

const getFilterLabel = (filter: string) => {
  if (filter === 'all') return t('history.all')
  if (filter === 'card-share') return t('history.cardExchange')
  return t(`history.${filter}` as any)
}

const formatGroupDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return t('history.today')
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return t('history.yesterday')
  }
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.communication-history-page {
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
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
  // #endif
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
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    font-size: 24px;
  }
  // #endif
}

.header-title {
  font-size: $font-size-xl;
  color: $color-text-primary;
  font-weight: $font-weight-bold;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    font-size: 36px;
  }
  
  @media (min-width: 1024px) {
    font-size: 42px;
  }
  // #endif
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

.search-section {
  margin-bottom: $spacing-md;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: $spacing-md;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.4);
}

.search-input {
  width: 100%;
  padding-left: 96rpx;
  padding-right: $spacing-md;
  padding-top: 18rpx;
  padding-bottom: 18rpx;
  border-radius: 32rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-base;
  min-height: 72rpx;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.filters-section {
  margin-bottom: $spacing-md;
}

.filter-label {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-sm;
}

.filter-scroll {
  white-space: nowrap;
}

.filter-buttons {
  display: flex;
  gap: $spacing-sm;
}

.filter-btn {
  padding: $spacing-sm $spacing-md;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: $font-size-sm;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  border: none;
}

.results-header {
  margin-bottom: $spacing-md;
}

.results-count {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.date-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.date-label {
  font-size: $font-size-sm;
  color: #FACC15;
  font-weight: $font-weight-semibold;
  margin-bottom: $spacing-sm;
}

.history-entry {
  padding: 24rpx $spacing-md;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
  transition: all 0.3s ease;
}

.history-entry:active {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

.entry-icon-wrapper {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.entry-icon {
  font-size: 36rpx;
}

.entry-content {
  flex: 1;
  min-width: 0;
}

.entry-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $spacing-sm;
}

.entry-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  flex: 1;
}

.entry-time {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.entry-contact {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.contact-avatar {
  font-size: 40rpx;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name {
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: 4rpx;
}

.contact-company {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.entry-description {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: $spacing-sm;
  line-height: 1.5;
}

.entry-meta {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.meta-icon {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}

.meta-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.tag {
  padding: 8rpx 16rpx;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  color: #38BDF8;
  font-size: $font-size-xs;
}

.empty-state {
  padding: $spacing-xl $spacing-lg;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $spacing-md;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 48rpx;
  margin-top: $spacing-lg;
}

.empty-icon {
  font-size: 96rpx;
  margin-bottom: $spacing-sm;
  opacity: 0.6;
}

.empty-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
  margin-bottom: 8rpx;
}

.empty-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  max-width: 400rpx;
}
</style>

