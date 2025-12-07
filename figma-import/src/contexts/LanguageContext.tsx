import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.myCard': 'My Card',
    'nav.contacts': 'Contacts',
    'nav.ai': 'AI',
    'nav.settings': 'Settings',
    
    // Login Page
    'login.welcome': 'Welcome to MetaIC',
    'login.subtitle': 'AI Business Cards',
    'login.googleContinue': 'Continue with Google',
    'login.appleContinue': 'Continue with Apple',
    'login.otherMethods': 'Continue with Other Methods',
    'login.termsAgree': 'By signing in, you agree to our',
    'login.termsService': 'Terms of Service',
    'login.and': 'and',
    'login.privacyPolicy': 'Privacy Policy',
    
    // My Card Tab
    'myCard.title': 'My Digital Card',
    'myCard.shareCard': 'Share Card',
    'myCard.viewPublic': 'View Public Card',
    'myCard.founder': 'Founder',
    'myCard.coFounder': 'Co-Founder',
    'myCard.contact': 'Contact Information',
    'myCard.wechat': 'WeChat',
    'myCard.email': 'Email',
    'myCard.phone': 'Phone',
    'myCard.website': 'Website',
    'myCard.networking': 'Networking Preferences',
    'myCard.lookingFor': 'Looking For',
    'myCard.canHelp': 'Can Help With',
    'myCard.interests': 'Interests',
    
    // Contacts Tab
    'contacts.title': 'My Network',
    'contacts.search': 'Search contacts...',
    'contacts.all': 'All',
    'contacts.recent': 'Recent',
    'contacts.favorites': 'Favorites',
    'contacts.companies': 'Companies',
    'contacts.viewCard': 'View Card',
    'contacts.message': 'Message',
    'contacts.results': 'contacts',
    'contacts.noResults': 'No contacts found',
    'contacts.tryAdjusting': 'Try adjusting your search',
    
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
    
    // Settings
    'settings.title': 'Settings',
    'settings.account': 'Account',
    'settings.profile': 'Profile Settings',
    'settings.profileDesc': 'Update your personal information',
    'settings.privacy': 'Privacy & Security',
    'settings.privacyDesc': 'Manage your privacy settings',
    'settings.appearance': 'Appearance',
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose your preferred language',
    'settings.theme': 'Theme',
    'settings.themeDesc': 'Dark mode (default)',
    'settings.notifications': 'Notifications',
    'settings.pushNotifications': 'Push Notifications',
    'settings.pushDesc': 'Receive notifications for new connections',
    'settings.emailNotifications': 'Email Notifications',
    'settings.emailDesc': 'Weekly networking summary',
    'settings.other': 'Other',
    'settings.help': 'Help & Support',
    'settings.helpDesc': 'FAQs and customer support',
    'settings.about': 'About MetaIC',
    'settings.aboutDesc': 'Version 1.0.0',
    'settings.logout': 'Logout',
    'settings.viewSwitch': 'View Switcher',
    'settings.publicCard': 'Public Card View',
    'settings.mobileApp': 'Mobile App View',
    'settings.dashboard': 'Dashboard View',
    
    // Days
    'days.mon': 'Mon',
    'days.tue': 'Tue',
    'days.wed': 'Wed',
    'days.thu': 'Thu',
    'days.fri': 'Fri',
    'days.sat': 'Sat',
    'days.sun': 'Sun',
  },
  zh: {
    // Navigation
    'nav.myCard': '我的名片',
    'nav.contacts': '联系人',
    'nav.ai': 'AI助手',
    'nav.settings': '设置',
    
    // Login Page
    'login.welcome': '欢迎使用MetaIC',
    'login.subtitle': 'AI名片',
    'login.googleContinue': '使用Google继续',
    'login.appleContinue': '使用Apple继续',
    'login.otherMethods': '使用其他方法继续',
    'login.termsAgree': '登录即表示您同意我们的',
    'login.termsService': '服务条款',
    'login.and': '和',
    'login.privacyPolicy': '隐私政策',
    
    // My Card Tab
    'myCard.title': '我的数字名片',
    'myCard.shareCard': '分享名片',
    'myCard.viewPublic': '查看公开名片',
    'myCard.founder': '创始人',
    'myCard.coFounder': '联合创始人',
    'myCard.contact': '联系方式',
    'myCard.wechat': '微信',
    'myCard.email': '邮箱',
    'myCard.phone': '电话',
    'myCard.website': '网站',
    'myCard.networking': '社交偏好',
    'myCard.lookingFor': '正在寻找',
    'myCard.canHelp': '可以提供帮助',
    'myCard.interests': '兴趣爱好',
    
    // Contacts Tab
    'contacts.title': '我的人脉',
    'contacts.search': '搜索联系人...',
    'contacts.all': '全部',
    'contacts.recent': '最近',
    'contacts.favorites': '收藏',
    'contacts.companies': '公司',
    'contacts.viewCard': '查看名片',
    'contacts.message': '发消息',
    'contacts.results': '位联系人',
    'contacts.noResults': '未找到联系人',
    'contacts.tryAdjusting': '尝试调整搜索条件',
    
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
    
    // Settings
    'settings.title': '设置',
    'settings.account': '账户',
    'settings.profile': '个人资料设置',
    'settings.profileDesc': '更新您的个人信息',
    'settings.privacy': '隐私与安全',
    'settings.privacyDesc': '管理您的隐私设置',
    'settings.appearance': '外观',
    'settings.language': '语言',
    'settings.languageDesc': '选择您的首选语言',
    'settings.theme': '主题',
    'settings.themeDesc': '深色模式（默认）',
    'settings.notifications': '通知',
    'settings.pushNotifications': '推送通知',
    'settings.pushDesc': '接收新联系人通知',
    'settings.emailNotifications': '邮件通知',
    'settings.emailDesc': '每周社交摘要',
    'settings.other': '其他',
    'settings.help': '帮助与支持',
    'settings.helpDesc': '常见问题和客户支持',
    'settings.about': '关于MetaIC',
    'settings.aboutDesc': '版本 1.0.0',
    'settings.logout': '退出登录',
    'settings.viewSwitch': '视图切换',
    'settings.publicCard': '公开名片视图',
    'settings.mobileApp': '移动应用视图',
    'settings.dashboard': '控制台视图',
    
    // Days
    'days.mon': '周一',
    'days.tue': '周二',
    'days.wed': '周三',
    'days.thu': '周四',
    'days.fri': '周五',
    'days.sat': '周六',
    'days.sun': '周日',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}