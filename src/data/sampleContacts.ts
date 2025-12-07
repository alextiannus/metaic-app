export interface Contact {
  id: number
  name: string
  chineseName?: string
  title: string
  company: string
  avatar: string
  phone: string
  email: string
  address?: string
  linkedin?: string
  website?: string
  tagline: string
  headline: string
  networking?: string[]
  hobbies?: string[]
  bio: string
  metAt: string
  metLocation: string
}

export const sampleContacts: Contact[] = [
  {
    id: 1,
    name: 'James Chen',
    chineseName: '陈伟强',
    title: 'CEO & Founder',
    company: 'Dim Sum Dynasty',
    avatar: '👨‍💼',
    phone: '+65 9123 4567',
    email: 'james.chen@dimsumdynasty.sg',
    address: '123 Chinatown Street, Singapore 049555',
    linkedin: 'https://linkedin.com/in/jameschen',
    website: 'https://dimsumdynasty.sg',
    tagline: 'Bringing Traditional Flavors to Modern Dining',
    headline: "Leading Singapore's premium dim sum restaurant chain with 5 locations. Passionate about integrating AI technology to enhance customer dining experiences.",
    networking: ['Restaurant Owners', 'F&B Tech Partners', 'AI Solution Providers'],
    hobbies: ['Culinary Arts', 'Wine Tasting', 'Travel'],
    bio: 'Founded Dim Sum Dynasty in 2015 with a vision to modernize traditional Chinese cuisine. Now exploring AI-powered POS systems and customer analytics to scale operations.',
    metAt: 'Singapore Tech Conference 2024',
    metLocation: 'Marina Bay Sands, Singapore',
  },
  {
    id: 2,
    name: 'Sarah Lim',
    chineseName: '林美玲',
    title: 'VP of Engineering',
    company: 'CloudTech Solutions',
    avatar: '👩‍💻',
    phone: '+65 9234 5678',
    email: 'sarah.lim@cloudtech.com',
    address: '456 Tech Park Drive, Singapore 138588',
    linkedin: 'https://linkedin.com/in/sarahlim',
    website: 'https://cloudtech.com',
    tagline: 'Building Scalable Cloud Infrastructure',
    headline: 'Leading cloud infrastructure projects for Fortune 500 companies across APAC. Specializing in AI model deployment and enterprise cloud hosting solutions.',
    networking: ['AI Startups', 'Cloud Architects', 'Tech Leaders'],
    hobbies: ['Coding', 'Hiking', 'Photography'],
    bio: '15+ years in cloud engineering, now focused on helping AI companies scale their infrastructure. Looking for innovative AI solutions to partner with.',
    metAt: 'AI Summit Asia 2024',
    metLocation: 'Suntec Convention Centre',
  },
  {
    id: 3,
    name: 'David Tan',
    chineseName: '陈大伟',
    title: 'Operations Director',
    company: 'Golden Bakery Group',
    avatar: '🧑‍🍳',
    phone: '+65 9345 6789',
    email: 'david.tan@goldenbakery.sg',
    address: '789 Bakery Lane, Singapore 234567',
    linkedin: 'https://linkedin.com/in/davidtan',
    website: 'https://goldenbakery.sg',
    tagline: 'Crafting Excellence in Every Bite',
    headline: 'Managing operations for 8 bakery outlets across Singapore. Seeking technology partners to optimize supply chain and inventory management.',
    networking: ['F&B Tech Providers', 'Supply Chain Experts', 'Retail Tech'],
    hobbies: ['Baking', 'Coffee', 'Running'],
    bio: 'Started as a baker, now overseeing multi-location operations. Interested in AI-powered inventory forecasting and automated ordering systems.',
    metAt: 'F&B Innovation Forum 2024',
    metLocation: 'Raffles Hotel Singapore',
  },
  {
    id: 4,
    name: 'Emily Wong',
    chineseName: '黄晓明',
    title: 'Marketing Director',
    company: 'Lifestyle Brands Asia',
    avatar: '👩‍💼',
    phone: '+65 9456 7890',
    email: 'emily.wong@lifestylebrands.com',
    address: '321 Orchard Road, Singapore 238859',
    linkedin: 'https://linkedin.com/in/emilywong',
    website: 'https://lifestylebrands.com',
    tagline: 'Creating Meaningful Brand Experiences',
    headline: 'Driving digital transformation in lifestyle marketing across Asia. Expert in AI-powered customer engagement and personalized marketing campaigns.',
    networking: ['Marketing Tech', 'AI Marketers', 'Brand Strategists'],
    hobbies: ['Fashion', 'Art', 'Yoga'],
    bio: 'Passionate about leveraging AI to create personalized customer journeys. Always looking for innovative marketing technology partners.',
    metAt: 'Digital Marketing Summit 2024',
    metLocation: 'Shangri-La Hotel',
  },
  {
    id: 5,
    name: 'Michael Zhang',
    chineseName: '张明华',
    title: 'CTO',
    company: 'FinNext Solutions',
    avatar: '👨‍💼',
    phone: '+65 9567 8901',
    email: 'michael.zhang@finnext.sg',
    address: '100 Financial Centre, Singapore 018989',
    linkedin: 'https://linkedin.com/in/michaelzhang',
    website: 'https://finnext.sg',
    tagline: 'Innovating Financial Technology',
    headline: 'Building next-generation fintech solutions with AI and blockchain. Leading technical teams to deliver cutting-edge payment and lending platforms.',
    networking: ['Fintech Founders', 'AI Developers', 'Blockchain Experts'],
    hobbies: ['Chess', 'Golf', 'Reading'],
    bio: 'Serial tech entrepreneur with 3 successful exits. Now focused on democratizing financial services through AI-powered platforms.',
    metAt: 'Fintech Festival 2024',
    metLocation: 'Singapore Expo',
  },
]

