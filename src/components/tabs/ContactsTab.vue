<template>
  <view class="contacts-tab">
    <view class="tab-content">
      <!-- Header with Add Button -->
      <view class="header-section">
        <view class="header-text">
          <text class="tab-title">{{ t('contacts.title') }}</text>
          <text class="tab-subtitle">{{ language === 'zh' ? '管理你的人脉网络' : 'Manage your network connections' }}</text>
        </view>

        <!-- Add Button in Upper Right -->
        <button class="add-btn" @click="showAddMenu = !showAddMenu">
          <text class="add-icon">{{ showAddMenu ? '✕' : '+' }}</text>
        </button>

        <!-- Add Contact Dropdown Menu -->
        <view v-if="showAddMenu" class="add-menu">
          <button class="menu-item" @click="handleAddContact">
            <text class="menu-icon">👤</text>
            <text class="menu-text">{{ language === 'zh' ? '添加联系人' : 'Add Contact' }}</text>
          </button>
          
          <button class="menu-item" @click="handleFaceToFace">
            <text class="menu-icon">📷</text>
            <text class="menu-text">{{ language === 'zh' ? '面对面交换' : 'Face to Face Exchange' }}</text>
          </button>
          
          <button class="menu-item" @click="handleRadar">
            <text class="menu-icon">📡</text>
            <text class="menu-text">{{ language === 'zh' ? '联系人雷达' : 'Contact Radar' }}</text>
          </button>
        </view>
      </view>

      <!-- Search Bar -->
      <view class="search-section">
        <view class="search-wrapper">
          <text class="search-icon">🔍</text>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('contacts.search')"
            class="search-input"
          />
        </view>
      </view>

      <!-- Contacts List -->
      <view v-if="filteredContacts.length > 0" class="contacts-list">
        <view class="contacts-header">
          <text class="contacts-count">
            {{ filteredContacts.length }} {{ filteredContacts.length !== 1 ? 'Contacts' : 'Contact' }}
          </text>
        </view>
        <view v-for="contact in filteredContacts" :key="contact.id" class="contact-item" @click="handleContactClick(contact.id)">
          <view class="contact-avatar-wrapper">
            <view class="contact-avatar">
              <text class="avatar-emoji">{{ contact.avatar }}</text>
            </view>
          </view>
          <view class="contact-info">
            <view class="contact-name-row">
              <text class="contact-name">{{ contact.name }}</text>
              <text v-if="contact.chineseName" class="contact-chinese-name">({{ contact.chineseName }})</text>
            </view>
            <text class="contact-title">{{ contact.title }}</text>
            <text class="contact-company">{{ contact.company }}</text>
          </view>
          <text class="contact-arrow">›</text>
        </view>
      </view>

      <!-- Empty State -->
      <view v-else class="empty-state glass-card">
        <view class="empty-icon-wrapper">
          <text class="empty-icon">👥</text>
        </view>
        <text class="empty-title">No Contacts Found</text>
        <text class="empty-subtitle">
          {{ searchQuery ? 'Try a different search term.' : 'Start building your network by scanning business cards or adding contacts manually.' }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import { sampleContacts, type Contact } from '../../data/sampleContacts'

const emit = defineEmits<{
  contactClick: [contactId: number]
  addContact: []
  faceToFace: []
  radar: []
}>()

const { language, t } = useLanguage()
const searchQuery = ref('')
const showAddMenu = ref(false)

// Filter contacts based on search
const filteredContacts = computed(() => {
  if (!searchQuery.value) return sampleContacts
  
  const query = searchQuery.value.toLowerCase()
  return sampleContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query) ||
      contact.company.toLowerCase().includes(query) ||
      contact.title.toLowerCase().includes(query)
  )
})

const handleContactClick = (contactId: number) => {
  emit('contactClick', contactId)
}

const handleAddContact = () => {
  showAddMenu.value = false
  emit('addContact')
}

const handleFaceToFace = () => {
  showAddMenu.value = false
  emit('faceToFace')
}

const handleRadar = () => {
  showAddMenu.value = false
  emit('radar')
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.contacts-tab {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 192rpx;
}

.tab-content {
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

.header-section {
  position: relative;
  margin-bottom: $spacing-lg;
}

.header-text {
  margin-bottom: $spacing-sm;
}

.tab-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.tab-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.add-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(250, 204, 21, 0.4);
  transition: transform 0.3s ease;
}

.add-btn:active {
  transform: scale(0.95);
}

.add-icon {
  font-size: 48rpx;
  color: #020617;
  font-weight: $font-weight-bold;
}

.add-menu {
  position: absolute;
  top: 112rpx;
  right: 0;
  width: 512rpx;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32rpx;
  padding: $spacing-md;
  z-index: 100;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.4);
}

.menu-item {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-sm;
  transition: background 0.3s ease;
}

.menu-item:active {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item:last-child {
  margin-bottom: 0;
}

.menu-icon {
  font-size: 40rpx;
}

.menu-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
}

.search-section {
  margin-bottom: $spacing-lg;
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
  padding-left: 96rpx; // pl-12 = 48px = 96rpx
  padding-right: $spacing-md; // pr-4 = 16px = 32rpx
  padding-top: 24rpx; // py-3 = 12px = 24rpx
  padding-bottom: 24rpx;
  border-radius: $radius-xl; // rounded-2xl = 16px = 32rpx
  background: $color-glass-bg-80; // bg-[#0F172A]/80
  backdrop-filter: $glass-backdrop-filter; // backdrop-blur-xl
  border: $glass-border; // border-white/10
  color: $color-text-primary;
  font-size: $font-size-base;
  min-height: 72rpx;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.contacts-header {
  margin-bottom: $spacing-md;
}

.contacts-count {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.contact-item {
  width: 100%;
  border-radius: $radius-lg; // rounded-[20px] = 20px = 40rpx
  background: $color-glass-bg-80; // bg-[#0F172A]/80
  backdrop-filter: $glass-backdrop-filter; // backdrop-blur-xl
  border: $glass-border; // border-white/10
  padding: 32rpx; // p-4 = 16px = 32rpx
  box-shadow: $glass-shadow; // shadow-xl
  display: flex;
  align-items: center;
  gap: $spacing-md;
  transition: all 0.3s ease;
}

.contact-item:active {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(250, 204, 21, 0.3);
}

.contact-avatar-wrapper {
  flex-shrink: 0;
}

.contact-avatar {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  padding: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-emoji {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name-row {
  display: flex;
  align-items: baseline;
  gap: $spacing-sm;
  margin-bottom: 8rpx;
}

.contact-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
}

.contact-chinese-name {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.contact-title {
  font-size: $font-size-xs;
  color: #38BDF8;
  display: block;
  margin-bottom: 8rpx;
}

.contact-company {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.contact-arrow {
  font-size: 40rpx;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.glass-card {
  background: $glass-bg;
  backdrop-filter: $glass-backdrop-filter;
  border: $glass-border;
  border-radius: $radius-lg;
  padding: $spacing-xl;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $spacing-md;
  padding: $spacing-xl $spacing-lg;
}

.empty-icon-wrapper {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $spacing-sm;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.empty-icon {
  font-size: 56rpx;
  opacity: 0.8;
}

.empty-title {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: 8rpx;
}

.empty-subtitle {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  max-width: 400rpx;
}
</style>
