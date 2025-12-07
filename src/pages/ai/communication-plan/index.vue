<template>
  <view class="communication-plan-page">
    <!-- Header -->
    <view class="page-header">
      <view class="header-content">
        <text class="header-icon">📅</text>
        <text class="header-title">{{ t('commPlan.title') }}</text>
        <button class="history-btn" @click="handleHistory">
          <text class="history-icon">📜</text>
        </button>
      </view>
      <text class="header-subtitle">{{ t('commPlan.subtitle') }}</text>
    </view>

    <!-- Content -->
    <view class="page-content">
      <!-- Generate Plan Button -->
      <button class="generate-btn" :disabled="isGenerating" @click="handleGeneratePlan">
        <text v-if="isGenerating" class="loading-spinner">⏳</text>
        <text v-else class="sparkle-icon">✨</text>
        <text>{{ isGenerating ? t('commPlan.generating') : t('commPlan.generateSchedule') }}</text>
      </button>

      <!-- Stats -->
      <view class="stats-grid">
        <view class="stat-card">
          <text class="stat-value">{{ contacts.length }}</text>
          <text class="stat-label">Contacts</text>
        </view>
        <view class="stat-card">
          <text class="stat-value">{{ thisWeekCount }}</text>
          <text class="stat-label">This Week</text>
        </view>
        <view class="stat-card">
          <text class="stat-value">{{ highPriorityCount }}</text>
          <text class="stat-label">High Priority</text>
        </view>
      </view>

      <!-- Contact List -->
      <view class="contacts-section">
        <text class="section-title">Upcoming Follow-ups</text>
        <view v-for="contact in sortedContacts" :key="contact.id" class="contact-card">
          <view class="contact-header">
            <text class="contact-avatar">{{ contact.avatar }}</text>
            <view class="contact-info">
              <view class="contact-name-row">
                <text class="contact-name">{{ contact.name }}</text>
                <view class="priority-badge" :style="{ backgroundColor: getPriorityColor(contact.priority) + '20', color: getPriorityColor(contact.priority) }">
                  <text>{{ contact.priority }}</text>
                </view>
              </view>
              <text class="contact-company">{{ contact.company }}</text>
            </view>
          </view>

          <view v-if="editingId !== contact.id" class="contact-details">
            <view class="followup-date">
              <text class="date-icon">🕐</text>
              <text class="date-text">{{ formatDate(contact.nextFollowUp) }}</text>
              <text class="days-text">{{ getDaysText(contact.nextFollowUp) }}</text>
            </view>
            <text class="context-text">{{ contact.context }}</text>
            <view class="action-buttons">
              <button class="action-btn primary" @click="handleGenerateGreeting(contact)">
                <text class="btn-icon">💬</text>
                <text>{{ t('commPlan.generateGreeting') }}</text>
              </button>
              <button class="action-btn secondary" @click="handleEditContact(contact)">
                <text class="btn-icon">✏️</text>
              </button>
            </view>
          </view>

          <!-- Edit Mode -->
          <view v-else class="edit-mode">
            <view class="edit-field">
              <text class="field-label">Follow-up Date</text>
              <input v-model="editDate" type="date" class="date-input" />
            </view>
            <view class="edit-field">
              <text class="field-label">Context</text>
              <textarea v-model="editContext" class="context-input" rows="2" />
            </view>
            <view class="edit-actions">
              <button class="save-btn" @click="handleSaveEdit(contact.id)">
                <text>✓</text>
                <text>Save</text>
              </button>
              <button class="cancel-btn" @click="handleCancelEdit">
                <text>✕</text>
                <text>Cancel</text>
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Greeting Modal -->
    <view v-if="greetingModal.isOpen" class="modal-overlay" @click="closeModal">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <view class="modal-title-row">
            <text class="modal-icon">💬</text>
            <text class="modal-title">{{ t('commPlan.greetingTitle') }}</text>
          </view>
          <button class="close-btn" @click="closeModal">
            <text>✕</text>
          </button>
        </view>
        <text class="modal-to">To: {{ greetingModal.contact?.name }}</text>

        <view v-if="!greetingModal.message" class="modal-loading">
          <view class="spinner"></view>
          <text class="loading-text">✨ AI is writing your message...</text>
        </view>

        <view v-else class="modal-body">
          <textarea v-model="greetingModal.message" class="message-textarea" rows="10" />
          <view class="modal-actions">
            <button class="regenerate-btn" @click="handleRegenerate">
              <text>🔄</text>
              <text>{{ t('commPlan.regenerate') }}</text>
            </button>
            <button class="send-btn" @click="handleSendMessage">
              <text>➤</text>
              <text>{{ t('commPlan.sendMessage') }}</text>
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../../composables/useLanguage'

interface Contact {
  id: string
  name: string
  avatar: string
  company: string
  lastContact: string
  nextFollowUp: string
  priority: 'high' | 'medium' | 'low'
  context: string
}

interface GreetingModal {
  isOpen: boolean
  contact: Contact | null
  message: string
}

const { language, t } = useLanguage()

const isGenerating = ref(false)
const editingId = ref<string | null>(null)
const editDate = ref('')
const editContext = ref('')

const greetingModal = ref<GreetingModal>({
  isOpen: false,
  contact: null,
  message: '',
})

const contacts = ref<Contact[]>([
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '👩‍💼',
    company: 'Tech Innovations',
    lastContact: '2024-11-20',
    nextFollowUp: '2024-12-08',
    priority: 'high',
    context: 'Follow up on AI partnership discussion',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: '👨‍💻',
    company: 'StartupHub',
    lastContact: '2024-11-15',
    nextFollowUp: '2024-12-10',
    priority: 'medium',
    context: 'Check in on investment progress',
  },
  {
    id: '3',
    name: 'Emily Watson',
    avatar: '👩‍🔬',
    company: 'BioTech Labs',
    lastContact: '2024-11-25',
    nextFollowUp: '2024-12-15',
    priority: 'low',
    context: 'Quarterly networking catch-up',
  },
])

const sortedContacts = computed(() => {
  return [...contacts.value].sort(
    (a, b) => new Date(a.nextFollowUp).getTime() - new Date(b.nextFollowUp).getTime()
  )
})

const thisWeekCount = computed(() => {
  return contacts.value.filter((c) => getDaysUntil(c.nextFollowUp) <= 7).length
})

const highPriorityCount = computed(() => {
  return contacts.value.filter((c) => c.priority === 'high').length
})

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

const getDaysUntil = (date: string) => {
  const today = new Date()
  const followUp = new Date(date)
  const diffTime = followUp.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const getDaysText = (date: string) => {
  const days = getDaysUntil(date)
  if (days === 0) return 'Today'
  if (days === 1) return 'Tomorrow'
  if (days > 0) return `in ${days} days`
  return `${Math.abs(days)} days ago`
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const handleGeneratePlan = () => {
  isGenerating.value = true
  setTimeout(() => {
    contacts.value = contacts.value.map((contact) => ({
      ...contact,
      nextFollowUp: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
    }))
    isGenerating.value = false
  }, 2000)
}

const handleGenerateGreeting = (contact: Contact) => {
  greetingModal.value = { isOpen: true, contact, message: '' }
  
  setTimeout(() => {
    const greetings = [
      `Hi ${contact.name.split(' ')[0]}! 👋\n\nI hope this message finds you well. I wanted to follow up on our recent discussion about ${contact.context.toLowerCase()}.\n\nWould you be available for a quick call this week to discuss next steps?\n\nBest regards,\nAlex`,
      `Hello ${contact.name.split(' ')[0]},\n\nIt's been great connecting with you at ${contact.company}. I've been thinking about ${contact.context.toLowerCase()} and would love to continue our conversation.\n\nLet me know when you're free!\n\nCheers,\nAlex`,
    ]
    greetingModal.value.message = greetings[Math.floor(Math.random() * greetings.length)]
  }, 1500)
}

const handleEditContact = (contact: Contact) => {
  editingId.value = contact.id
  editDate.value = contact.nextFollowUp
  editContext.value = contact.context
}

const handleSaveEdit = (id: string) => {
  contacts.value = contacts.value.map((contact) =>
    contact.id === id
      ? { ...contact, nextFollowUp: editDate.value, context: editContext.value }
      : contact
  )
  editingId.value = null
}

const handleCancelEdit = () => {
  editingId.value = null
  editDate.value = ''
  editContext.value = ''
}

const handleRegenerate = () => {
  if (greetingModal.value.contact) {
    handleGenerateGreeting(greetingModal.value.contact)
  }
}

const handleSendMessage = () => {
  uni.showToast({
    title: 'Message sent!',
    icon: 'success',
  })
  closeModal()
}

const closeModal = () => {
  greetingModal.value = { isOpen: false, contact: null, message: '' }
}

const handleHistory = () => {
  uni.showToast({
    title: 'History page coming soon',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../../styles/designTokens.scss';

.communication-plan-page {
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
  flex: 1;
}

.history-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-icon {
  font-size: 40rpx;
  color: #FACC15;
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

.generate-btn {
  width: 100%;
  padding: 18rpx 28rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  transition: all 0.3s ease;
  min-height: 72rpx;
  box-sizing: border-box;
}

.generate-btn:disabled {
  opacity: 0.5;
}

.sparkle-icon,
.loading-spinner {
  font-size: 40rpx;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.stat-card {
  padding: 24rpx $spacing-md;
  border-radius: 24rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:active {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

.stat-value {
  font-size: 48rpx;
  color: #FACC15;
  display: block;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.contacts-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.section-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}

.contact-card {
  padding: 24rpx $spacing-lg;
  border-radius: 40rpx;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: $spacing-md;
}

.contact-header {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
}

.contact-avatar {
  font-size: 60rpx;
}

.contact-info {
  flex: 1;
}

.contact-name-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8rpx;
}

.contact-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.priority-badge {
  padding: 8rpx 16rpx;
  border-radius: 18rpx;
  font-size: $font-size-xs;
}

.contact-company {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.followup-date {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
}

.date-icon {
  font-size: 32rpx;
  color: #38BDF8;
}

.date-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  flex: 1;
}

.days-text {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.context-text {
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.action-buttons {
  display: flex;
  gap: $spacing-sm;
}

.action-btn {
  flex: 1;
  padding: 18rpx 24rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  min-height: 72rpx;
  box-sizing: border-box;
}

.action-btn.primary {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
}

.btn-icon {
  font-size: 32rpx;
}

.edit-mode {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.field-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}

.date-input,
.context-input {
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-sm;
}

.edit-actions {
  display: flex;
  gap: $spacing-sm;
}

.save-btn,
.cancel-btn {
  flex: 1;
  padding: 18rpx 24rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  min-height: 72rpx;
  box-sizing: border-box;
}

.save-btn {
  background: #10B981;
  color: $color-text-primary;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(2, 6, 23, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: $spacing-md;
}

.modal-content {
  width: 100%;
  max-width: 600rpx;
  background: rgba(15, 23, 42, 1);
  border-radius: 48rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: $spacing-lg;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.modal-icon {
  font-size: 40rpx;
  color: #FACC15;
}

.modal-title {
  font-size: $font-size-lg;
  color: $color-text-primary;
  font-weight: $font-weight-semibold;
}

.close-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
}

.modal-to {
  padding: 0 $spacing-lg $spacing-md;
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.6);
}

.modal-loading {
  padding: $spacing-xl;
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

.loading-text {
  font-size: $font-size-sm;
  color: #FACC15;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.modal-body {
  padding: $spacing-lg;
}

.message-textarea {
  width: 100%;
  padding: $spacing-md;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
  font-size: $font-size-sm;
  margin-bottom: $spacing-md;
  min-height: 400rpx;
}

.modal-actions {
  display: flex;
  gap: $spacing-md;
}

.regenerate-btn,
.send-btn {
  flex: 1;
  padding: $spacing-sm $spacing-md;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-size: $font-size-sm;
}

.regenerate-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: $color-text-primary;
}

.send-btn {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
}
</style>

