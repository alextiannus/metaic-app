<template>
  <view class="app-container">
    <!-- Content Area -->
    <scroll-view class="content-area" scroll-y="true">
      <!-- My Card Tab -->
      <MyCardTab v-if="activeTab === 'mycard'" @share-click="handleShareClick" />
      
      <!-- Contacts Tab -->
      <ContactsTab
        v-if="activeTab === 'contacts'"
        @contact-click="handleContactClick"
        @add-contact="handleAddContact"
        @face-to-face="handleFaceToFace"
        @radar="handleRadar"
      />
      
      <!-- AI Tab -->
      <AITab
        v-if="activeTab === 'ai'"
        @navigate="handleAINavigation"
        @subscription="handleSubscription"
      />
      
      <!-- Settings Tab -->
      <SettingsTab
        v-if="activeTab === 'settings'"
        @edit-profile="handleEditProfile"
        @subscription="handleSubscription"
        @coffee="handleBuyCoffee"
        @corporate-templates="handleCorporateTemplates"
        @customer-support="handleCustomerSupport"
        @team-management="handleTeamManagement"
      />
    </scroll-view>

    <!-- Bottom Navigation -->
    <view class="bottom-nav">
      <view
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-item"
        :class="{ active: activeTab === tab.id }"
        @click="handleTabChange(tab.id)"
      >
        <text class="nav-icon">{{ tab.icon }}</text>
        <text class="nav-label">{{ t(tab.labelKey) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import MyCardTab from '../../components/tabs/MyCardTab.vue'
import ContactsTab from '../../components/tabs/ContactsTab.vue'
import AITab from '../../components/tabs/AITab.vue'
import SettingsTab from '../../components/tabs/SettingsTab.vue'

type TabId = 'mycard' | 'contacts' | 'ai' | 'settings'

const activeTab = ref<TabId>('mycard')
const { t } = useLanguage()

const tabs = [
  { id: 'mycard' as TabId, labelKey: 'nav.myCard', icon: '💳' },
  { id: 'contacts' as TabId, labelKey: 'nav.contacts', icon: '👥' },
  { id: 'ai' as TabId, labelKey: 'nav.ai', icon: '✨' },
  { id: 'settings' as TabId, labelKey: 'nav.settings', icon: '⚙️' }
]

const handleTabChange = (tabId: TabId) => {
  activeTab.value = tabId
}

const handleShareClick = () => {
  uni.navigateTo({
    url: '/pages/share-card/index'
  })
}

const handleAINavigation = (page: string) => {
  const routes: Record<string, string> = {
    'communication-plan': '/pages/ai/communication-plan/index',
    'network-insights': '/pages/ai/network-insights/index',
    'communication-history': '/pages/ai/communication-history/index',
  }
  
  const route = routes[page]
  if (route) {
    uni.navigateTo({ url: route })
  } else {
    console.warn('Unknown AI page:', page)
  }
}

const handleContactClick = (contactId: number) => {
  // Navigate to contact detail view
  console.log('Contact clicked:', contactId)
  // TODO: Navigate to contact detail page when created
}

const handleAddContact = () => {
  uni.navigateTo({
    url: '/pages/add-contact/photo/index'
  })
}

const handleFaceToFace = () => {
  uni.navigateTo({
    url: '/pages/face-to-face/index'
  })
}

const handleRadar = () => {
  uni.navigateTo({
    url: '/pages/contact-radar/index'
  })
}

const handleSubscription = () => {
  uni.navigateTo({
    url: '/pages/subscription/index'
  })
}

const handleEditProfile = () => {
  uni.navigateTo({
    url: '/pages/edit-profile/index'
  })
}

const handleBuyCoffee = () => {
  uni.navigateTo({
    url: '/pages/buy-coffee/index'
  })
}

const handleCorporateTemplates = () => {
  uni.showToast({
    title: 'Corporate templates coming soon',
    icon: 'none',
  })
}

const handleCustomerSupport = () => {
  uni.showToast({
    title: 'Customer support coming soon',
    icon: 'none',
  })
}

const handleTeamManagement = () => {
  uni.showToast({
    title: 'Team management coming soon',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.app-container {
  min-height: 100vh;
  background: #020617;
  display: flex;
  flex-direction: column;
  padding-bottom: 120rpx;
}

.content-area {
  flex: 1;
  overflow-y: auto;
}

// Bottom Navigation
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  padding: $spacing-sm $spacing-md;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + $spacing-sm);
  z-index: 1000;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  padding: $spacing-sm;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.nav-item.active {
  opacity: 1;
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}

.nav-item.active .nav-label {
  color: #FACC15;
}

.nav-icon {
  font-size: 48rpx;
  transition: transform 0.3s ease;
}

.nav-label {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
}
</style>
