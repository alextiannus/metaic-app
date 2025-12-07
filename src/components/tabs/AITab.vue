<template>
  <view class="ai-tab">
    <view class="tab-content">
      <!-- Header -->
      <view class="tab-header">
        <view class="header-left">
          <view class="ai-logo">✨</view>
          <view>
            <text class="tab-title">MetaIC AI</text>
            <text class="tab-subtitle">{{ language === 'zh' ? '你的人脉助手' : 'Your networking assist' }}</text>
          </view>
        </view>
      </view>

      <!-- AI Chat Section -->
      <view class="chat-section glass-card">
        <!-- Welcome Message Bubble -->
        <view class="welcome-bubble">
          <text class="welcome-text">
            {{ language === 'zh' ? '👋 你好！我是你的 AI 人脉助手。我可以帮你：' : '👋 Hi! I\'m your AI networking assistant. I can help you:' }}
          </text>
          <view class="welcome-list">
            <view class="welcome-item">
              <text class="list-dot">•</text>
              <text>{{ language === 'zh' ? '撰写更好的自我介绍' : 'Write better introductions' }}</text>
            </view>
            <view class="welcome-item">
              <text class="list-dot">•</text>
              <text>{{ language === 'zh' ? '建议人脉连接' : 'Suggest connections' }}</text>
            </view>
            <view class="welcome-item">
              <text class="list-dot">•</text>
              <text>{{ language === 'zh' ? '优化你的名片' : 'Optimize your card' }}</text>
            </view>
            <view class="welcome-item">
              <text class="list-dot">•</text>
              <text>{{ language === 'zh' ? '分析人脉趋势' : 'Analyze networking trends' }}</text>
            </view>
            <view class="welcome-item">
              <text class="list-dot">•</text>
              <text>{{ language === 'zh' ? '从照片和文件更新名片' : 'Update cards from photos & files' }}</text>
            </view>
          </view>
        </view>

        <!-- Chat Messages -->
        <scroll-view v-if="messages.length > 0" class="messages-container" scroll-y="true">
          <view v-for="message in messages" :key="message.id" :class="['message-wrapper', message.type === 'user' ? 'message-user' : 'message-ai']">
            <view :class="['message-bubble', message.type === 'user' ? 'bubble-user' : 'bubble-ai']">
              <text class="message-content">{{ message.content }}</text>
              <text :class="['message-time', message.type === 'user' ? 'time-user' : 'time-ai']">
                {{ formatTime(message.timestamp) }}
              </text>
            </view>
          </view>
          <view v-if="isProcessing" class="message-wrapper message-ai">
            <view class="message-bubble bubble-ai">
              <view class="typing-indicator">
                <view class="typing-dot"></view>
                <view class="typing-dot" style="animation-delay: 0.2s"></view>
                <view class="typing-dot" style="animation-delay: 0.4s"></view>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- Uploaded Files Preview -->
        <view v-if="uploadedFiles.length > 0" class="files-preview">
          <view v-for="file in uploadedFiles" :key="file.id" class="file-item">
            <text class="file-icon">📄</text>
            <text class="file-name">{{ file.name }}</text>
            <button class="file-remove" @click="removeFile(file.id)">✕</button>
          </view>
        </view>

        <!-- Input Box -->
        <view class="input-box">
          <view class="input-wrapper">
            <textarea
              v-model="inputMessage"
              :placeholder="language === 'zh' ? '问我任何问题或上传文件' : 'Ask me anything or upload'"
              class="input-textarea"
              @confirm="handleSendMessage"
            />
            <button class="input-btn attach-btn" @click="handleFileSelect">
              <text class="btn-icon">📎</text>
            </button>
            <button
              class="input-btn send-btn"
              :disabled="isProcessing || (!inputMessage.trim() && uploadedFiles.length === 0)"
              @click="handleSendMessage"
            >
              <text class="btn-icon">✈️</text>
            </button>
          </view>
          <view class="input-hint-wrapper">
            <text class="input-hint-icon">🖼️</text>
            <text class="input-hint">
              {{ language === 'zh' ? '上传名片、照片或联系人文件' : 'Upload business cards, photos, or contact files' }}
            </text>
          </view>
        </view>
      </view>

      <!-- AI Features Section -->
      <view class="features-section">
        <text class="features-title">{{ language === 'zh' ? 'AI 功能' : 'AI Features' }}</text>
        <view class="features-list">
          <button
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
            @click="handleFeatureClick(feature.id)"
          >
            <view class="feature-icon-wrapper" :style="{ background: feature.bgColor, borderColor: feature.borderColor }">
              <text class="feature-icon">{{ feature.icon }}</text>
            </view>
            <view class="feature-content">
              <text class="feature-title">{{ feature.title }}</text>
              <text class="feature-desc">{{ feature.description }}</text>
            </view>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import { useUser } from '../../composables/useUser'

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

const emit = defineEmits<{
  navigate: [page: string]
  subscription: []
}>()

const { language, t } = useLanguage()
const { userTokens, setUserTokens, hasCreatedCard, setHasCreatedCard } = useUser()

const inputMessage = ref('')
const isProcessing = ref(false)
const messages = ref<Message[]>([])
const uploadedFiles = ref<UploadedFile[]>([])

const features = [
  {
    icon: '📈',
    title: t('ai.insights'),
    description: t('ai.insightsDesc'),
    bgColor: 'rgba(250, 204, 21, 0.2)',
    borderColor: 'rgba(250, 204, 21, 0.3)',
    id: 'insights',
  },
  {
    icon: '📅',
    title: t('ai.communicationPlan'),
    description: t('ai.communicationPlanDesc'),
    bgColor: 'rgba(56, 189, 248, 0.2)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    id: 'communication-plan',
  },
]

const handleFeatureClick = (featureId: string) => {
  if (featureId === 'communication-plan') {
    emit('navigate', 'communication-plan')
  } else if (featureId === 'insights') {
    emit('navigate', 'network-insights')
  } else if (featureId === 'communication-history') {
    emit('navigate', 'communication-history')
  }
}

const handleSubscription = () => {
  emit('subscription')
}

const handleFileSelect = () => {
  // File selection will be handled by uni.chooseImage or similar
  uni.chooseImage({
    count: 5,
    success: (res) => {
      const paths = Array.isArray(res.tempFilePaths) ? res.tempFilePaths : [res.tempFilePaths]
      paths.forEach((path: string) => {
        const file: UploadedFile = {
          id: Math.random().toString(36).substring(7),
          name: path.split('/').pop() || 'image.jpg',
          type: 'image',
          size: 0,
        }
        uploadedFiles.value.push(file)
      })
    },
  })
}

const removeFile = (id: string) => {
  uploadedFiles.value = uploadedFiles.value.filter((file) => file.id !== id)
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const handleSendMessage = async () => {
  if (!inputMessage.value.trim() && uploadedFiles.value.length === 0) return
  if (userTokens.value <= 0) {
    uni.showToast({
      title: language.value === 'zh' ? '代币不足！请购买更多代币。' : 'Not enough tokens! Please purchase more tokens.',
      icon: 'none',
    })
    return
  }

  // Calculate token cost
  const textTokens = inputMessage.value.trim() ? 1 : 0
  const fileTokens = uploadedFiles.value.length * 5
  const totalCost = textTokens + fileTokens

  if (userTokens.value < totalCost) {
    uni.showToast({
      title: language.value === 'zh' ? '代币不足！请购买更多代币。' : 'Not enough tokens! Please purchase more tokens.',
      icon: 'none',
    })
    return
  }

  isProcessing.value = true

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: inputMessage.value.trim() || `Uploaded ${uploadedFiles.value.length} file(s)`,
    timestamp: new Date(),
  }
  messages.value.push(userMessage)

  // Deduct tokens
  setUserTokens(userTokens.value - totalCost)

  // Clear input
  const messageText = inputMessage.value
  inputMessage.value = ''
  const filesForProcessing = [...uploadedFiles.value]
  uploadedFiles.value = []

  // Simulate AI response
  setTimeout(() => {
    let aiResponse = ''

    // Check if this is a card creation request
    const isCardCreationRequest =
      filesForProcessing.some((f) => f.type.startsWith('image')) ||
      filesForProcessing.some((f) => f.name.toLowerCase().includes('cv') || f.name.toLowerCase().includes('resume')) ||
      messageText.toLowerCase().includes('card') ||
      messageText.toLowerCase().includes('create') ||
      messageText.toLowerCase().includes('name card') ||
      messageText.toLowerCase().includes('business card')

    // Check if this is a contact addition request
    const isContactAddition =
      messageText.toLowerCase().includes('add contact') ||
      messageText.toLowerCase().includes('new contact') ||
      messageText.toLowerCase().includes('contact information')

    if (!hasCreatedCard.value && isCardCreationRequest) {
      if (filesForProcessing.some((f) => f.type.startsWith('image'))) {
        aiResponse =
          language.value === 'zh'
            ? '📸 太好了！我正在分析你的名片照片...\n\n我已识别到以下信息：\n• 姓名\n• 职位\n• 公司名称\n• 联系方式\n\n现在让我搜索你的在线信息以完善资料...\n\n✅ 已搜索 LinkedIn\n✅ 已搜索公司官网\n✅ 已搜索社交媒体\n\n你的 AI 名片已创建！请问你想要什么样的设计风格？（专业/创意/简约）'
            : '📸 Great! I\'m analyzing your business card image...\n\nI\'ve identified:\n• Name\n• Title\n• Company\n• Contact info\n\nNow searching for your online presence...\n\n✅ LinkedIn searched\n✅ Company website searched\n✅ Social media searched\n\nYour AI card is ready! What design style would you prefer? (Professional/Creative/Minimal)'
      } else if (filesForProcessing.some((f) => f.name.toLowerCase().includes('cv') || f.name.toLowerCase().includes('resume'))) {
        aiResponse =
          language.value === 'zh'
            ? '📄 完美！我正在处理你的简历...\n\n我已提取到：\n• 工作经验\n• 技能专长\n• 教育背景\n• 项目经历\n\n正在搜索补充信息...\n\n✅ 已完成在线背景调查\n✅ 已优化个人简介\n\n你的专业名片已生成！需要我调整布局或配色方案吗？'
            : '📄 Perfect! Processing your CV...\n\nExtracted:\n• Work experience\n• Skills\n• Education\n• Projects\n\nSearching for additional info...\n\n✅ Online background check complete\n✅ Profile optimized\n\nYour professional card is generated! Would you like me to adjust the layout or color scheme?'
      } else {
        aiResponse =
          language.value === 'zh'
            ? '✨ 我明白了！让我帮你创建一张令人印象深刻的名片。\n\n请告诉我：\n1. 你的全名\n2. 职位\n3. 公司名称\n4. 你希望突出展示的专长\n\n或者你可以直接上传：\n📸 名片照片\n📄 简历文件\n\n我会自动搜索你的在线信息让名片更加完善！'
            : '✨ I understand! Let me help you create an impressive business card.\n\nPlease tell me:\n1. Your full name\n2. Job title\n3. Company name\n4. Key expertise to highlight\n\nOr you can upload:\n📸 Business card photo\n📄 CV/Resume file\n\nI\'ll automatically search for your online presence to enrich it!'
      }

      // Set user as having created card after this interaction
      setTimeout(() => {
        setHasCreatedCard(true)
      }, 3000)
    } else if (isContactAddition) {
      aiResponse =
        language.value === 'zh'
          ? '👥 好的！让我帮你添加新联系人。\n\n你可以：\n1. 上传他们的名片照片\n2. 提供他们的基本信息\n3. 分享他们的 LinkedIn 链接\n\n我会自动研究他们的背景，包括：\n✓ 职业经历\n✓ 教育背景\n✓ 行业影响力\n✓ 共同联系人\n✓ 最新动态\n\n这样你就能全面了解这个人，制定更有效的沟通策略！'
          : '👥 Great! Let me help you add a new contact.\n\nYou can:\n1. Upload their business card photo\n2. Provide their basic info\n3. Share their LinkedIn profile\n\nI\'ll automatically research their background:\n✓ Career history\n✓ Education\n✓ Industry influence\n✓ Mutual connections\n✓ Recent updates\n\nThis gives you comprehensive understanding for effective communication!'
    } else {
      aiResponse =
        language.value === 'zh'
          ? `我收到了你的消息！我可以帮你：\n\n📊 **分析人脉网络**\n分析你的联系人价值和网络质量\n\n📅 **制定沟通计划**\n智能安排跟进时间和沟通策略\n\n👥 **管理联系人**\n添加新联系人并研究背景信息\n\n${!hasCreatedCard.value ? '✨ **创建名片**\n上传照片或简历，AI 帮你生成专业名片\n\n' : ''}请告诉我你需要什么帮助！`
          : `I received your message! I can help you:\n\n📊 **Analyze Network**\nAnalyze contact value and network quality\n\n📅 **Communication Plans**\nSmart follow-up scheduling and strategies\n\n👥 **Manage Contacts**\nAdd new contacts and research backgrounds\n\n${!hasCreatedCard.value ? '✨ **Create Card**\nUpload photo or CV, AI generates professional card\n\n' : ''}What would you like help with?`
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date(),
    }

    messages.value.push(aiMessage)
    isProcessing.value = false
  }, 1500)
}
</script>

<style lang="scss" scoped>
@import '../../styles/designTokens.scss';

.ai-tab {
  min-height: 100vh;
  background: #020617;
  padding: $spacing-lg $spacing-md;
  padding-bottom: 200rpx;
  
  // Desktop/Laptop styles
  // #ifdef H5
  @media (min-width: 768px) {
    padding: 40px 24px;
    padding-bottom: 140px;
  }
  
  @media (min-width: 1024px) {
    padding: 50px 32px;
    padding-bottom: 160px;
  }
  // #endif
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

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $spacing-lg;
}

.header-left {
  display: flex;
  gap: $spacing-md;
  align-items: center;
}

.ai-logo {
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  position: relative;
  overflow: hidden;
}

.ai-logo::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.tab-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  display: block;
  margin-bottom: 8rpx;
}

.tab-subtitle {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.6);
}


.glass-card {
  background: $color-glass-bg-60;
  backdrop-filter: $glass-backdrop-filter;
  border: $glass-border;
  border-radius: $radius-2xl; // 28px = 56rpx
  padding: 48rpx; // p-6 = 24px = 48rpx
  box-shadow: $glass-shadow;
  margin-bottom: $spacing-lg;
}

.chat-section {
  margin-bottom: $spacing-lg;
}


.welcome-bubble {
  padding: 32rpx; // p-4 = 16px = 32rpx
  border-radius: $radius-xl; // rounded-2xl = 16px = 32rpx
  background: rgba(30, 41, 59, 0.8); // bg-[#1E293B]/80
  border: 1px solid rgba(255, 255, 255, 0.05); // border-white/5
  margin-bottom: $spacing-md;
}

.welcome-text {
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: $spacing-md;
}

.welcome-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.welcome-item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.8);
}

.list-dot {
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4rpx;
}

.messages-container {
  max-height: 70vh;
  margin-bottom: $spacing-md;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.message-wrapper {
  display: flex;
}

.message-user {
  justify-content: flex-end;
}

.message-ai {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 85%;
  padding: 16rpx 32rpx; // px-4 py-3 = 12px 16px = 24rpx 32rpx, but using 16rpx 32rpx for better match
  border-radius: $radius-xl; // rounded-2xl = 16px = 32rpx
}

.bubble-user {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  color: #020617;
}

.bubble-ai {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: $color-text-primary;
}

.message-content {
  font-size: $font-size-sm;
  white-space: pre-line;
  display: block;
}

.message-time {
  font-size: $font-size-xs;
  margin-top: 8rpx;
  display: block;
}

.time-user {
  color: rgba(2, 6, 23, 0.6);
}

.time-ai {
  color: rgba(255, 255, 255, 0.4);
}

.typing-indicator {
  display: flex;
  gap: 8rpx;
  align-items: center;
}

.typing-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: bounce 1.4s infinite;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.files-preview {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.file-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  border-radius: 24rpx;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.file-icon {
  font-size: 32rpx;
}

.file-name {
  font-size: $font-size-xs;
  color: $color-text-primary;
  max-width: 200rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-remove {
  color: rgba(255, 255, 255, 0.6);
  font-size: 32rpx;
  padding: 0;
  background: none;
  border: none;
}

.input-box {
  border-radius: $radius-md; // rounded-xl = 12px = 24rpx
  background: rgba(30, 41, 59, 0.6); // bg-[#1E293B]/60
  border: 1px solid rgba(255, 255, 255, 0.1); // border-white/10
  padding: 24rpx; // p-3 = 12px = 24rpx
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.input-textarea {
  flex: 1;
  background: transparent;
  color: $color-text-primary;
  font-size: $font-size-sm;
  min-height: 48rpx;
  max-height: 200rpx;
  resize: none;
  outline: none;
  padding: 8rpx 12rpx;
  box-sizing: border-box;
  line-height: 1.4;
}

.input-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input-btn {
  width: 72rpx; // w-9 = 36px = 72rpx
  height: 72rpx; // h-9 = 36px = 72rpx
  border-radius: $radius-md; // rounded-lg = 8px = 16rpx
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.attach-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.attach-btn:active {
  background: rgba(255, 255, 255, 0.1);
}

.send-btn {
  background: linear-gradient(135deg, #FACC15 0%, #38BDF8 100%);
  border: none;
}

.send-btn:active {
  transform: scale(0.95);
}

.send-btn:disabled {
  opacity: 0.5;
}

.btn-icon {
  font-size: 32rpx;
  color: #020617;
}

.attach-btn .btn-icon {
  color: rgba(255, 255, 255, 0.6);
}

.input-hint-wrapper {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-top: $spacing-sm;
}

.input-hint-icon {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.4);
}

.input-hint {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.4);
}

.features-section {
  margin-top: $spacing-lg;
}

.features-title {
  font-size: $font-size-sm;
  color: $color-text-primary;
  display: block;
  margin-bottom: $spacing-md;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.feature-card {
  width: 100%;
  border-radius: $radius-xl; // rounded-[24px] = 24px = 48rpx
  background: $color-glass-bg-60; // bg-[#0F172A]/60
  backdrop-filter: $glass-backdrop-filter; // backdrop-blur-xl
  border: $glass-border; // border-white/10
  padding: 40rpx; // p-5 = 20px = 40rpx
  box-shadow: $glass-shadow; // shadow-2xl
  display: flex;
  align-items: flex-start;
  gap: 32rpx; // gap-4 = 16px = 32rpx
  transition: all 0.3s ease;
}

.feature-card:active {
  transform: scale(1.02);
}

.feature-icon-wrapper {
  width: 96rpx; // w-12 = 48px = 96rpx
  height: 96rpx; // h-12 = 48px = 96rpx
  border-radius: $radius-xl; // rounded-2xl = 16px = 32rpx
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid;
}

.feature-icon {
  font-size: 48rpx; // w-6 h-6 = 24px = 48rpx
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: $font-size-base; // text-base = 14px = 28rpx
  color: $color-text-primary;
  margin-bottom: 8rpx; // mb-1 = 4px = 8rpx
  display: block;
}

.feature-desc {
  font-size: $font-size-sm; // text-sm = 14px = 28rpx
  color: $color-text-secondary; // text-white/60
  line-height: 1.5;
}
</style>

