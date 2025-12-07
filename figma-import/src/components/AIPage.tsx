import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingUp, Calendar, Upload, Image as ImageIcon, FileText, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIPageProps {
  onNavigateToNetworkInsights: () => void;
  onNavigateToCommunicationPlan: () => void;
}

export function AIPage({ onNavigateToNetworkInsights, onNavigateToCommunicationPlan }: AIPageProps) {
  const { language } = useLanguage();
  const { hasCreatedCard, userTokens, setUserTokens, setHasCreatedCard } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const greeting: Message = {
        id: '1',
        type: 'ai',
        content: hasCreatedCard
          ? language === 'zh'
            ? '你好！我是你的 AI 助手。我可以帮你：\n\n📊 分析人脉网络价值\n📅 制定智能沟通计划\n👥 添加新联系人并研究背景\n\n请问有什么可以帮到你？'
            : 'Hello! I\'m your AI assistant. I can help you:\n\n📊 Analyze network value\n📅 Create smart communication plans\n👥 Add new contacts & research backgrounds\n\nHow can I help you today?'
          : language === 'zh'
            ? '🎉 欢迎来到 MetaIC！\n\n让我帮你创建一张令人印象深刻的 AI 名片吧！\n\n你可以通过以下方式创建：\n\n📸 上传你的名片照片\n📄 上传你的简历文件（CV/Resume）\n💬 告诉我你想要的名片风格\n\n我会自动搜索你的公司官网、LinkedIn、Facebook 等在线信息，让你的名片更加闪耀！✨\n\n请选择你喜欢的创建方式，或者告诉我你想要什么样的名片设计。'
            : '🎉 Welcome to MetaIC!\n\nLet me help you create an impressive AI business card!\n\nYou can create your card by:\n\n📸 Uploading your business card image\n📄 Uploading your CV/Resume file\n💬 Describing your preferred card style\n\nI\'ll automatically search your company website, LinkedIn, Facebook and other online sources to make your card shine! ✨\n\nPlease choose your preferred method or tell me what card design you\'d like.',
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [hasCreatedCard, language, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Check token balance
    if (userTokens <= 0) {
      alert(language === 'zh' ? '代币余额不足，请购买更多代币。' : 'Insufficient tokens. Please purchase more tokens.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Deduct token
    setUserTokens(userTokens - 1);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: language === 'zh'
          ? '我理解了。让我为你处理这个请求...'
          : 'I understand. Let me help you with that...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check token balance
    if (userTokens < 5) {
      alert(language === 'zh' ? '代币余额不足（需要 5 代币），请购买更多代币。' : 'Insufficient tokens (5 tokens required). Please purchase more tokens.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: language === 'zh' ? `[已上传图片: ${file.name}]` : `[Uploaded image: ${file.name}]`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Deduct tokens for image processing
    setUserTokens(userTokens - 5);

    // Simulate AI processing
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: hasCreatedCard
          ? language === 'zh'
            ? '我正在分析这张名片图片。我会提取联系信息，在线搜索相关资料，并为你创建完整的联系人档案。请稍候...'
            : 'I\'m analyzing this business card image. I\'ll extract the contact information, search online for relevant details, and create a complete contact profile for you. Please wait...'
          : language === 'zh'
            ? '太好了！我正在分析你的名片。我会提取信息，搜索你的公司网站、LinkedIn、Facebook 等在线资料，为你创建一个完整的 AI 名片。你想要什么风格的设计？'
            : 'Great! I\'m analyzing your business card. I\'ll extract the information, search your company website, LinkedIn, Facebook and other online sources to create a comprehensive AI card for you. What style would you like?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check token balance
    if (userTokens < 5) {
      alert(language === 'zh' ? '代币余额不足（需要 5 代币），请购买更多代币。' : 'Insufficient tokens (5 tokens required). Please purchase more tokens.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: language === 'zh' ? `[已上传文件: ${file.name}]` : `[Uploaded file: ${file.name}]`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Deduct tokens for file processing
    setUserTokens(userTokens - 5);

    // Simulate AI processing
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: hasCreatedCard
          ? language === 'zh'
            ? '我正在分析这张名片图片。我会提取联系信息，在线搜索相关资料，并为你创建完整的联系人档案。请稍候...'
            : 'I\'m analyzing this business card image. I\'ll extract the contact information, search online for relevant details, and create a complete contact profile for you. Please wait...'
          : language === 'zh'
            ? '太好了！我正在分析你的简历文件。我会提取信息，搜索你的公司网站、LinkedIn、Facebook 等在线资料，为你创建一个完整的 AI 名片。你想要什么风格的设计？'
            : 'Great! I\'m analyzing your CV/Resume file. I\'ll extract the information, search your company website, LinkedIn, Facebook and other online sources to create a comprehensive AI card for you. What style would you like?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handleAddContact = () => {
    // Check token balance
    if (userTokens < 5) {
      alert(language === 'zh' ? '代币余额不足（需要 5 代币），请购买更多代币。' : 'Insufficient tokens (5 tokens required). Please purchase more tokens.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: language === 'zh' ? '添加新联系人' : 'Add new contact',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Deduct tokens for adding contact
    setUserTokens(userTokens - 5);

    // Simulate AI processing
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: language === 'zh'
          ? '请提供新联系人的信息，例如姓名、职位、公司等。'
          : 'Please provide the new contact\'s information, such as name, position, company, etc.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const features = [
    {
      icon: TrendingUp,
      title: language === 'zh' ? '网络洞察' : 'Network Insights',
      description: language === 'zh' ? '分析人脉价值和话题' : 'Analyze network value & topics',
      onClick: onNavigateToNetworkInsights,
      gradient: 'from-[#FACC15] to-[#F59E0B]',
    },
    {
      icon: Calendar,
      title: language === 'zh' ? '沟通计划' : 'Communication Plan',
      description: language === 'zh' ? 'AI 生成的跟进计划' : 'AI-generated follow-up plans',
      onClick: onNavigateToCommunicationPlan,
      gradient: 'from-[#38BDF8] to-[#0EA5E9]',
    },
    {
      icon: Upload,
      title: language === 'zh' ? '添加联系人' : 'Add Contact',
      description: language === 'zh' ? '上传名片自动创建' : 'Upload card to auto-create',
      onClick: () => fileInputRef.current?.click(),
      gradient: 'from-[#A78BFA] to-[#8B5CF6]',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#020617]">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[16px] bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#020617]" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-white text-2xl">AI Assistant</h1>
            <p className="text-white/60 text-sm">
              {language === 'zh' ? `剩余代币: ${userTokens}` : `Tokens: ${userTokens}`}
            </p>
          </div>
        </div>
      </div>

      {/* AI Features */}
      {hasCreatedCard && (
        <div className="flex-shrink-0 p-6 space-y-3">
          <p className="text-white/60 text-sm mb-3">
            {language === 'zh' ? 'AI 功能' : 'AI Features'}
          </p>
          <div className="grid grid-cols-1 gap-3">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={feature.onClick}
                className="p-4 rounded-[20px] bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center gap-4 group"
              >
                <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white">{feature.title}</p>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-[20px] ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617]'
                  : 'bg-white/5 border border-white/10 text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-[#020617]/60' : 'text-white/40'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-6 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleCVUpload}
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0"
          >
            <ImageIcon className="w-5 h-5 text-white/60" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => imageInputRef.current?.click()}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0"
          >
            <FileText className="w-5 h-5 text-white/60" strokeWidth={1.5} />
          </button>
          <button
            onClick={handleAddContact}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all flex-shrink-0"
          >
            <UserPlus className="w-5 h-5 text-white/60" strokeWidth={1.5} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={language === 'zh' ? '输入消息...' : 'Type a message...'}
            className="flex-1 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FACC15] transition-all"
          />
          <button
            onClick={handleSendMessage}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
          >
            <Send className="w-5 h-5 text-[#020617]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}