import { BusinessCard } from '../types/BusinessCard';
import alexAvatar from 'figma:asset/798506c1b0a59bc16c1ec53940823c36b757b844.png';

export const alexTianYeCard: BusinessCard = {
  id: 'alex-tian-ye-001',
  slug: 'alextianye',
  
  personal: {
    fullName: 'Alex Tian Ye',
    firstName: 'Alex',
    lastName: 'Tian Ye',
    chineseName: '田野',
    avatar: alexAvatar,
    title: 'Founder & AI Enabler',
    titleZh: '创始人兼AI赋能者',
    tagline: 'AI enabler for sustainable success',
    taglineZh: 'AI赋能，实现可持续成功',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      timezone: 'Asia/Singapore',
    },
  },

  businesses: [
    {
      id: 'eat12ai',
      name: '12EAT.ai',
      chineseName: '唐人街外卖',
      role: 'Founder',
      roleZh: '创始人',
      description: 'Local services platform for overseas Chinese community',
      descriptionZh: '海外华人本地服务平台',
      website: 'https://deliverychinatown.com/home',
      services: [
        'Food Delivery & Group Buying Platform',
        'Local Services for Chinese Community',
        'Corporate Meal Services',
        'Logistics Services',
        'Advertising & Promotion (Dianping & Xiaohongshu Agency)',
      ],
      servicesZh: [
        '外卖及团购平台',
        '华人社区本地服务',
        '企业餐饮服务',
        '物流配送服务',
        '广告推广（大众点评及小红书代理）',
      ],
      isActive: true,
    },
    {
      id: 'immedi-ai',
      name: 'Immedi.AI',
      role: 'Founder',
      roleZh: '创始人',
      description: 'AI Enabler and Consulting Services',
      descriptionZh: 'AI赋能与咨询服务',
      website: 'https://wormwood.com.sg',
      services: [
        'Cloud Hosting Service',
        'AI+ Consulting & Lark Reseller',
        'System Integration & Data Services',
        'AI POS Solutions',
      ],
      servicesZh: [
        '云主机服务',
        'AI+咨询及飞书经销',
        '系统集成与数据服务',
        'AI收银系统解决方案',
      ],
      isActive: true,
    },
  ],

  contact: {
    emails: [
      {
        type: 'primary',
        email: 'alextian@immedi.ai',
        label: 'Immedi.AI',
      },
      {
        type: 'business',
        email: 'tianye@deliverychinatown.com',
        label: '12EAT.ai',
      },
    ],
    phones: [
      {
        type: 'mobile',
        number: '+6598666100',
        countryCode: '+65',
        label: 'Mobile / WhatsApp',
      },
    ],
    addresses: [
      {
        type: 'office',
        street: '#03-04, m38 Jln Pemimpin',
        city: 'Singapore',
        postalCode: '577178',
        country: 'Singapore',
      },
    ],
  },

  links: {
    website: [
      'https://wormwood.com.sg',
      'https://deliverychinatown.com/home',
    ],
    linkedin: 'https://www.linkedin.com/in/alextianye',
    whatsapp: '+6598666100',
    metaicProfile: 'https://metaic.ai/u/alextianye',
  },

  professional: {
    headline: '"Empowering businesses with AI-driven solutions for the digital age. Building bridges between technology and sustainable growth."',
    bio: [
      'As a serial entrepreneur and AI enabler, I specialize in transforming traditional businesses through intelligent technology solutions. With deep expertise in both the F&B industry and enterprise AI implementation, I help companies achieve sustainable success in the digital era.',
      'Through 12EAT.ai (唐人街外卖), I\'ve built the leading food delivery and local services platform serving overseas Chinese communities, combining cultural understanding with cutting-edge technology to deliver exceptional user experiences.',
      'At Immedi.AI, I provide comprehensive AI consulting and cloud infrastructure services, helping businesses of all sizes harness the power of artificial intelligence. From AI POS systems to full-scale system integration, I enable organizations to operate smarter and more efficiently.',
      'My approach combines technical innovation with practical business acumen, ensuring that AI implementations deliver real value and measurable results. I believe in sustainable growth through technology that empowers people and creates lasting impact.',
    ],
    expertise: [
      'AI Strategy & Implementation',
      'Cloud Infrastructure',
      'F&B Technology Solutions',
      'System Integration',
      'Digital Marketing',
      'Platform Development',
      'Business Automation',
      'Data Analytics',
    ],
    worksAndServices: [
      {
        id: 'chinatown-delivery',
        name: '唐人街外卖 App',
        englishName: 'Chinatown Delivery',
        type: 'app' as const,
        description: 'Food delivery & local services platform for overseas Chinese',
        icon: 'https://images.unsplash.com/photo-1755003858507-408a1a683790?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwZm9vZCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0ODY4MzI4fDA&ixlib=rb-4.1.0&q=80&w=400',
        appStoreUrl: 'https://apps.apple.com/sg/app/deliverychinatown/id1234567890', // Singapore App Store - Replace with actual app ID
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.deliverychinatown&gl=SG', // Singapore Play Store - Replace with actual package ID
      },
      {
        id: 'lumicharge',
        name: 'Lumicharge App',
        type: 'app' as const,
        description: 'Smart charging solution with integrated features',
        icon: 'https://images.unsplash.com/photo-1614857439116-67b6791609a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNoYXJnaW5nJTIwc3RhdGlvbnxlbnwxfHx8fDE3NjQ4NjgzMjl8MA&ixlib=rb-4.1.0&q=80&w=400',
        appStoreUrl: 'https://apps.apple.com/sg/app/lumicharge/id1234567890', // Singapore App Store - Replace with actual app ID
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lumicharge&gl=SG', // Singapore Play Store - Replace with actual package ID
      },
      {
        id: 'lark',
        name: 'Lark',
        type: 'service' as const,
        description: 'Enterprise collaboration & productivity platform',
        icon: 'https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjQ3Njg5NTR8MA&ixlib=rb-4.1.0&q=80&w=400',
      },
      {
        id: 'ai-pos',
        name: 'AI POS',
        type: 'service' as const,
        description: 'Intelligent point-of-sale system',
        icon: 'https://images.unsplash.com/photo-1658282514119-65e9920d1e29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwcG9zJTIwY2FzaGllcnxlbnwxfHx8fDE3NjQ4NjgzMjl8MA&ixlib=rb-4.1.0&q=80&w=400',
      },
      {
        id: 'logistics',
        name: 'Logistics Services',
        type: 'service' as const,
        description: 'End-to-end delivery and logistics solutions',
        icon: 'https://images.unsplash.com/photo-1626253274763-bdabe2f097c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHBhY2thZ2UlMjBib3h8ZW58MXx8fHwxNzY0ODY4MzMwfDA&ixlib=rb-4.1.0&q=80&w=400',
      },
      {
        id: 'cloud-hosting',
        name: 'Cloud Hosting',
        type: 'service' as const,
        description: 'Scalable cloud infrastructure services',
        icon: 'https://images.unsplash.com/photo-1759683745502-e3149b844ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHNlcnZlciUyMGRhdGF8ZW58MXx8fHwxNzY0ODY4MzMxfDA&ixlib=rb-4.1.0&q=80&w=400',
      },
      {
        id: 'system-integration',
        name: 'System Integration',
        type: 'service' as const,
        description: 'Seamless integration of business systems',
        icon: 'https://images.unsplash.com/photo-1703113690885-8caf0c77a7cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW50ZWdyYXRpb24lMjBjb25uZWN0fGVufDF8fHx8MTc2NDg2ODMzMXww&ixlib=rb-4.1.0&q=80&w=400',
      },
      {
        id: 'digital-marketing',
        name: 'Digital Marketing',
        type: 'service' as const,
        description: 'Dianping & Xiaohongshu promotion services',
        icon: 'https://images.unsplash.com/photo-1690883793939-f8cca2f28ee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHBob25lfGVufDF8fHx8MTc2NDgxODAwMHww&ixlib=rb-4.1.0&q=80&w=400',
      },
    ],
    industries: [
      'Food & Beverage',
      'Artificial Intelligence',
      'Cloud Computing',
      'E-commerce',
      'Logistics',
      'Enterprise Software',
    ],
    languages: ['English', 'Chinese (Mandarin)', 'Chinese (Cantonese)'],
  },

  personal_interests: {
    hobbies: [
      'Marathon Running',
      'Swimming',
      'Snorkeling',
      'Badminton',
      'Traveling',
      'Cooking',
    ],
    activities: [
      'Endurance Sports',
      'Water Sports',
      'Culinary Arts',
      'Cultural Exploration',
    ],
    passions: [
      'Technology Innovation',
      'Community Building',
      'Sustainable Business',
      'Health & Wellness',
    ],
  },

  networking: {
    lookingFor: [
      'F&B Restaurant Owners',
      'Bakery & Cafe Owners',
      'Businesses Ready for AI Transformation',
      'Cloud Migration Partners',
      'Logistics Service Providers',
      'Technology Collaborators',
    ],
    lookingForZh: [
      '餐饮店老板',
      '烘焙和咖啡店老板',
      '准备进行AI转型的企业',
      '云迁移合作伙伴',
      '物服务提供商',
      '技术合作伙伴',
    ],
    canHelpWith: [
      'AI Implementation Strategy',
      'Cloud Hosting Solutions',
      'F&B Platform Development',
      'Digital Marketing (Dianping/Xiaohongshu)',
      'System Integration',
      'Business Process Automation',
    ],
    canHelpWithZh: [
      'AI实施策略',
      '云主机解决方案',
      '餐饮平台开发',
      '数字营销（大众点评/小红书）',
      '系统集成',
      '业务流程自动化',
    ],
    idealConnections: [
      'F&B Industry Leaders',
      'Technology Enthusiasts',
      'Cloud Service Seekers',
      'AI Adoption Pioneers',
      'Logistics Partners',
      'Marketing Agencies',
    ],
  },

  ai: {
    enabled: true,
    summary: 'Alex Tian Ye is a visionary entrepreneur bridging the gap between AI technology and practical business applications. As founder of both 12EAT.ai and Immedi.AI, he brings unique expertise in F&B technology and enterprise AI solutions, with a strong focus on serving the overseas Chinese community and enabling sustainable business growth.',
    conversationStarter: 'Ask me about AI implementation strategies, F&B technology solutions, or building platforms for multicultural communities!',
    insights: [
      'Pioneer in AI-powered F&B solutions for Chinese diaspora',
      'Expertise in multi-business ecosystem development',
      'Strong technical background combined with business acumen',
      'Focus on practical AI applications with measurable ROI',
    ],
  },

  settings: {
    isPublic: true,
    showEmail: true,
    showPhone: true,
    allowMessages: true,
    theme: 'dark',
  },

  analytics: {
    views: 1247,
    shares: 89,
    saves: 34,
  },

  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
};