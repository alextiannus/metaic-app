import { ref } from 'vue'

type Language = 'en' | 'zh'

const language = ref<Language>('en')

const translations = {
  en: {
    // Navigation
    'nav.myCard': 'My Card',
    'nav.contacts': 'Contacts',
    'nav.ai': 'AI',
    'nav.settings': 'Settings',
    
    // My Card Tab
    'myCard.title': 'My Digital Card',
    'myCard.shareCard': 'Share Card',
    'myCard.viewPublic': 'View Public Card',
    'myCard.lookingFor': 'Looking to Connect With',
    
    // Contacts Tab
    'contacts.title': 'My Network',
    'contacts.search': 'Search contacts...',
    
    // AI Tab
    'ai.title': 'AI Features',
    'ai.subtitle': 'Powered by MetaIC Intelligence',
    'ai.chat': 'MetaIC Agent',
    'ai.chatDesc': 'Chat with AI to update cards & contacts',
    'ai.communicationPlan': 'Communication Plan',
    'ai.communicationPlanDesc': 'AI-powered follow-up scheduling',
    'ai.insights': 'Network Insights',
    'ai.insightsDesc': 'Analytics and growth tracking',
    
    // Communication Plan
    'commPlan.title': 'Communication Plan',
    'commPlan.subtitle': 'AI-powered follow-up scheduling',
    'commPlan.generateSchedule': 'Generate AI Schedule',
    'commPlan.generating': 'Generating...',
    'commPlan.nextFollowUp': 'Next Follow-up',
    'commPlan.lastContact': 'Last Contact',
    'commPlan.priority': 'Priority',
    'commPlan.context': 'Context',
    'commPlan.generateGreeting': 'Generate Greeting',
    'commPlan.high': 'High',
    'commPlan.medium': 'Medium',
    'commPlan.low': 'Low',
    'commPlan.greetingTitle': 'AI Greeting Message',
    'commPlan.editing': 'Edit your message before sending',
    'commPlan.sendMessage': 'Send Message',
    'commPlan.regenerate': 'Regenerate',
    
    // Network Insights
    'insights.title': 'Network Insights',
    'insights.subtitle': 'Your networking analytics and growth',
    'insights.week': 'Week',
    'insights.month': 'Month',
    'insights.year': 'Year',
    'insights.totalConnections': 'Total Connections',
    'insights.engagementRate': 'Engagement Rate',
    'insights.activeDays': 'Active Days',
    'insights.networkScore': 'Network Score',
    'insights.thisMonth': 'this month',
    'insights.vsLastMonth': 'vs last month',
    'insights.daysLess': 'days less',
    'insights.excellent': 'Excellent',
    'insights.weeklyActivity': 'Weekly Activity',
    'insights.topConnections': 'Top Connections',
    'insights.interactions': 'interactions',
    'insights.recentActivity': 'Recent Activity',
    'insights.aiRecommendations': 'AI Recommendations',
    'insights.networkHealth': 'Network Health',
    'insights.overallScore': 'Overall performance score',
    'insights.currentScore': 'Current Score',
    'insights.responseRate': 'Response Rate',
    'insights.followUpRate': 'Follow-up Rate',
    'insights.engagement': 'Engagement',
    
    // Communication History
    'history.title': 'Communication History',
    'history.subtitle': 'All your networking activities tracked by MetaIC',
    'history.search': 'Search contacts, companies, or activities...',
    'history.filterBy': 'Filter by type',
    'history.all': 'All',
    'history.message': 'Message',
    'history.call': 'Call',
    'history.video': 'Video',
    'history.email': 'Email',
    'history.meeting': 'Meeting',
    'history.cardExchange': 'Card Exchange',
    'history.entriesFound': 'entries found',
    'history.entryFound': 'entry found',
    'history.today': 'Today',
    'history.yesterday': 'Yesterday',
    'history.noHistory': 'No communication history found',
    'history.tryAdjusting': 'Try adjusting your search or filters',
  },
  zh: {
    // Navigation
    'nav.myCard': '我的名片',
    'nav.contacts': '联系人',
    'nav.ai': 'AI助手',
    'nav.settings': '设置',
    
    // My Card Tab
    'myCard.title': '我的数字名片',
    'myCard.shareCard': '分享名片',
    'myCard.viewPublic': '查看公开名片',
    'myCard.lookingFor': '正在寻找',
    
    // Contacts Tab
    'contacts.title': '我的人脉',
    'contacts.search': '搜索联系人...',
    
    // AI Tab
    'ai.title': 'AI功能',
    'ai.subtitle': '由MetaIC智能驱动',
    'ai.chat': 'MetaIC助手',
    'ai.chatDesc': '与AI对话更新名片和联系人',
    'ai.communicationPlan': '沟通计划',
    'ai.communicationPlanDesc': 'AI智能跟进排程',
    'ai.insights': '人脉洞察',
    'ai.insightsDesc': '分析和增长追踪',
    
    // Communication Plan
    'commPlan.title': '沟通计划',
    'commPlan.subtitle': 'AI智能跟进排程',
    'commPlan.generateSchedule': '生成AI排程',
    'commPlan.generating': '生成中...',
    'commPlan.nextFollowUp': '下次跟进',
    'commPlan.lastContact': '上次联系',
    'commPlan.priority': '优先级',
    'commPlan.context': '背景',
    'commPlan.generateGreeting': '生成问候语',
    'commPlan.high': '高',
    'commPlan.medium': '中',
    'commPlan.low': '低',
    'commPlan.greetingTitle': 'AI问候消息',
    'commPlan.editing': '发送前编辑您的消息',
    'commPlan.sendMessage': '发送消息',
    'commPlan.regenerate': '重新生成',
    
    // Network Insights
    'insights.title': '人脉洞察',
    'insights.subtitle': '您的社交分析和增长',
    'insights.week': '周',
    'insights.month': '月',
    'insights.year': '年',
    'insights.totalConnections': '总联系人',
    'insights.engagementRate': '互动率',
    'insights.activeDays': '活跃天数',
    'insights.networkScore': '人脉评分',
    'insights.thisMonth': '本月',
    'insights.vsLastMonth': '相比上月',
    'insights.daysLess': '天更少',
    'insights.excellent': '优秀',
    'insights.weeklyActivity': '每周活动',
    'insights.topConnections': '高频联系人',
    'insights.interactions': '次互动',
    'insights.recentActivity': '最近活动',
    'insights.aiRecommendations': 'AI推荐',
    'insights.networkHealth': '人脉健康度',
    'insights.overallScore': '综合表现评分',
    'insights.currentScore': '当前评分',
    'insights.responseRate': '回复率',
    'insights.followUpRate': '跟进率',
    'insights.engagement': '互动度',
    
    // Communication History
    'history.title': '沟通记录',
    'history.subtitle': 'MetaIC记录的所有社交活动',
    'history.search': '搜索联系人、公司或活动...',
    'history.filterBy': '按类型筛选',
    'history.all': '全部',
    'history.message': '消息',
    'history.call': '电话',
    'history.video': '视频',
    'history.email': '邮件',
    'history.meeting': '会议',
    'history.cardExchange': '名片交换',
    'history.entriesFound': '条记录',
    'history.entryFound': '条记录',
    'history.today': '今天',
    'history.yesterday': '昨天',
    'history.noHistory': '未找到沟通记录',
    'history.tryAdjusting': '尝试调整搜索或筛选条件',
  },
}

export function useLanguage() {
  const setLanguage = (lang: Language) => {
    language.value = lang
  }

  const t = (key: string): string => {
    return translations[language.value][key as keyof typeof translations['en']] || key
  }

  return {
    language,
    setLanguage,
    t,
  }
}

