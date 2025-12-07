import { useState, useRef } from 'react';
import { Sparkles, TrendingUp, Calendar, Paperclip, Image, X, FileText, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';

interface AITabProps {
  onNavigate?: (page: string) => void;
  onNavigateToPage?: (page: 'editProfile' | 'subscription' | 'coffee') => void;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  preview?: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AITab({ onNavigate, onNavigateToPage }: AITabProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showChat, setShowChat] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const { userTokens, setUserTokens, hasCreatedCard, setHasCreatedCard } = useUser();

  const features = [
    {
      icon: TrendingUp,
      title: t('ai.insights'),
      description: t('ai.insightsDesc'),
      color: '#FACC15',
      id: 'insights',
    },
    {
      icon: Calendar,
      title: t('ai.communicationPlan'),
      description: t('ai.communicationPlanDesc'),
      color: '#38BDF8',
      id: 'communication-plan',
    },
  ];

  const handleFeatureClick = (featureId: string) => {
    if (featureId === 'communication-plan' && onNavigate) {
      onNavigate('communication-plan');
    }
    if (featureId === 'insights' && onNavigate) {
      onNavigate('network-insights');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.type,
      size: file.size,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0) return;
    if (userTokens <= 0) {
      alert(language === 'zh' ? '代币不足！请购买更多代币。' : 'Not enough tokens! Please purchase more tokens.');
      return;
    }

    // Start chat if not already shown
    if (!showChat) {
      setShowChat(true);
    }

    // Calculate token cost
    const textTokens = inputMessage.trim() ? 1 : 0;
    const fileTokens = uploadedFiles.length * 5;
    const totalCost = textTokens + fileTokens;

    if (userTokens < totalCost) {
      alert(language === 'zh' ? '代币不足！请购买更多代币。' : 'Not enough tokens! Please purchase more tokens.');
      return;
    }

    setIsProcessing(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim() || `Uploaded ${uploadedFiles.length} file(s)`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Deduct tokens
    setUserTokens(userTokens - totalCost);

    // Clear input
    setInputMessage('');
    const filesForProcessing = [...uploadedFiles];
    setUploadedFiles([]);

    // Simulate AI response based on context
    setTimeout(() => {
      let aiResponse = '';
      
      // Check if this is a card creation request
      const isCardCreationRequest = 
        filesForProcessing.some(f => f.type.startsWith('image/')) ||
        filesForProcessing.some(f => f.name.toLowerCase().includes('cv') || f.name.toLowerCase().includes('resume')) ||
        inputMessage.toLowerCase().includes('card') ||
        inputMessage.toLowerCase().includes('create') ||
        inputMessage.toLowerCase().includes('name card') ||
        inputMessage.toLowerCase().includes('business card');

      // Check if this is a contact addition request
      const isContactAddition =
        inputMessage.toLowerCase().includes('add contact') ||
        inputMessage.toLowerCase().includes('new contact') ||
        inputMessage.toLowerCase().includes('contact information');

      if (!hasCreatedCard && isCardCreationRequest) {
        // Card creation flow
        if (filesForProcessing.some(f => f.type.startsWith('image/'))) {
          aiResponse = language === 'zh'
            ? '📸 太好了！我正在分析你的名片照片...\n\n我已识别到以下信息：\n• 姓名\n• 职位\n• 公司名称\n• 联系方式\n\n现在让我搜索你的在线信息以完善资料...\n\n✅ 已搜索 LinkedIn\n✅ 已搜索公司官网\n✅ 已搜索社交媒体\n\n你的 AI 名片已创建！请问你想要什么样的设计风格？（专业/创意/简约）'
            : '📸 Great! I\'m analyzing your business card image...\n\nI\'ve identified:\n• Name\n• Title\n• Company\n• Contact info\n\nNow searching for your online presence...\n\n✅ LinkedIn searched\n✅ Company website searched\n✅ Social media searched\n\nYour AI card is ready! What design style would you prefer? (Professional/Creative/Minimal)';
        } else if (filesForProcessing.some(f => f.name.toLowerCase().includes('cv') || f.name.toLowerCase().includes('resume'))) {
          aiResponse = language === 'zh'
            ? '📄 完美！我正在处理你的简历...\n\n我已提取到：\n• 工作经验\n• 技能专长\n• 教育背景\n• 项目经历\n\n正在搜索补充信息...\n\n✅ 已完成在线背景调查\n✅ 已优化个人简介\n\n你的专业名片已生成！需要我调整布局或配色方案吗？'
            : '📄 Perfect! Processing your CV...\n\nExtracted:\n• Work experience\n• Skills\n• Education\n• Projects\n\nSearching for additional info...\n\n✅ Online background check complete\n✅ Profile optimized\n\nYour professional card is generated! Would you like me to adjust the layout or color scheme?';
        } else {
          aiResponse = language === 'zh'
            ? '✨ 我明白了！让我帮你创建一张令人印象深刻的名片。\n\n请告诉我：\n1. 你的全名\n2. 职位\n3. 公司名称\n4. 你希望突出展示的专长\n\n或者你可以直接上传：\n📸 名片照片\n📄 简历文件\n\n我会自动搜索你的在线信息让名片更加完善！'
            : '✨ I understand! Let me help you create an impressive business card.\n\nPlease tell me:\n1. Your full name\n2. Job title\n3. Company name\n4. Key expertise to highlight\n\nOr you can upload:\n📸 Business card photo\n📄 CV/Resume file\n\nI\'ll automatically search for your online presence to enrich it!';
        }

        // Set user as having created card after this interaction
        setTimeout(() => {
          setHasCreatedCard(true);
        }, 3000);
      } else if (isContactAddition) {
        // Contact addition flow
        aiResponse = language === 'zh'
          ? '👥 好的！让我帮你添加新联系人。\n\n你可以：\n1. 上传他们的名片照片\n2. 提供他们的基本信息\n3. 分享他们的 LinkedIn 链接\n\n我会自动研究他们的背景，包括：\n✓ 职业经历\n✓ 教育背景\n✓ 行业影响力\n✓ 共同联系人\n✓ 最新动态\n\n这样你就能全面了解这个人，制定更有效的沟通策略！'
          : '👥 Great! Let me help you add a new contact.\n\nYou can:\n1. Upload their business card photo\n2. Provide their basic info\n3. Share their LinkedIn profile\n\nI\'ll automatically research their background:\n✓ Career history\n✓ Education\n✓ Industry influence\n✓ Mutual connections\n✓ Recent updates\n\nThis gives you comprehensive understanding for effective communication!';
      } else if (inputMessage.toLowerCase().includes('style') || inputMessage.toLowerCase().includes('design')) {
        // Card style customization
        aiResponse = language === 'zh'
          ? '🎨 我可以为你创建不同风格的名片！\n\n可选风格：\n\n1. 💼 **专业商务**\n   深色背景，简约布局，突出职位\n\n2. 🎨 **创意设计**\n   渐变色彩，动态元素，展现个性\n\n3. 📱 **现代简约**\n   留白设计，清晰字体，易于阅读\n\n4. 🌟 **科技感**\n   玻璃态效果，霓虹配色，未来风格\n\n请告诉我你喜欢哪种，或描述你想要的风格！'
          : '🎨 I can create different card styles for you!\n\nAvailable styles:\n\n1. 💼 **Professional**\n   Dark background, clean layout, position focused\n\n2. 🎨 **Creative**\n   Gradients, dynamic elements, show personality\n\n3. 📱 **Modern Minimal**\n   White space, clear fonts, easy to read\n\n4. 🌟 **Tech-Forward**\n   Glassmorphism, neon colors, futuristic\n\nTell me which you prefer, or describe your ideal style!';
      } else {
        // General AI assistance
        aiResponse = language === 'zh'
          ? `我收到了你的消息！我可以帮你：\n\n📊 **分析人脉网络**\n分析你的联系人价值和网络质量\n\n📅 **制定沟通计划**\n智能安排跟进时间和沟通策略\n\n👥 **管理联系人**\n添加新联系人并研究背景信息\n\n${!hasCreatedCard ? '✨ **创建名片**\n上传照片或简历，AI 帮你生成专业名片\n\n' : ''}请告诉我你需要什么帮助！`
          : `I received your message! I can help you:\n\n📊 **Analyze Network**\nAnalyze contact value and network quality\n\n📅 **Communication Plans**\nSmart follow-up scheduling and strategies\n\n👥 **Manage Contacts**\nAdd new contacts and research backgrounds\n\n${!hasCreatedCard ? '✨ **Create Card**\nUpload photo or CV, AI generates professional card\n\n' : ''}What would you like help with?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  // Auto-scroll to bottom when new messages arrive
  useState(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-white text-xl">AI Assistant</h1>
                <p className="text-white/60 text-xs">AI-powered networking tools</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToPage?.('subscription')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A]/80 border border-[#FACC15]/30 hover:border-[#FACC15]/50 hover:scale-105 active:scale-95 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#FACC15]"></div>
              <span className="text-[#FACC15] text-sm">{userTokens}</span>
            </button>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="mb-6 rounded-[28px] bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
          {/* MetaIC AI Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#020617]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-white">MetaIC AI</h3>
              <p className="text-white/50 text-xs">
                {language === 'zh' ? '你的人脉助手' : 'Your networking assistant'}
              </p>
            </div>
          </div>

          {/* Welcome Message Bubble */}
          <div className="mb-4 p-4 rounded-2xl bg-[#1E293B]/80 border border-white/5">
            <p className="text-white text-sm mb-3">
              {language === 'zh'
                ? '👋 你好！我是你的 AI 人脉助手。我可以帮你：'
                : '👋 Hi! I\'m your AI networking assistant. I can help you:'}
            </p>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">•</span>
                <span>{language === 'zh' ? '撰写更好的自我介绍' : 'Write better introductions'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">•</span>
                <span>{language === 'zh' ? '建议人脉连接' : 'Suggest connections'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">•</span>
                <span>{language === 'zh' ? '优化你的名片' : 'Optimize your card'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">•</span>
                <span>{language === 'zh' ? '分析人脉趋势' : 'Analyze networking trends'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/60 mt-0.5">•</span>
                <span>{language === 'zh' ? '从照片和文件更新名片' : 'Update cards from photos & files'}</span>
              </li>
            </ul>
          </div>

          {/* Chat Messages */}
          {messages.length > 0 && (
            <div className="space-y-3 max-h-[35vh] overflow-y-auto mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617]'
                        : 'bg-[#1E293B]/80 border border-white/5 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-[#020617]/60' : 'text-white/40'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-[#1E293B]/80 border border-white/5 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1E293B]/60 border border-white/10"
                >
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className="w-8 h-8 rounded object-cover" />
                  ) : (
                    <FileText className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                  )}
                  <span className="text-white text-xs max-w-[100px] truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-1 text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="rounded-xl bg-[#1E293B]/60 border border-white/10 p-3">
            <div className="flex items-center gap-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  language === 'zh'
                    ? '问我任何问题或上传文件'
                    : 'Ask me anything or upload'
                }
                className="flex-1 bg-transparent text-white placeholder-white/40 resize-none outline-none max-h-20 text-sm"
                rows={1}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all flex-shrink-0"
              >
                <Paperclip className="w-4 h-4 text-white/60" strokeWidth={1.5} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx"
                multiple
                className="hidden"
              />
              <button
                onClick={handleSendMessage}
                disabled={isProcessing || (!inputMessage.trim() && uploadedFiles.length === 0)}
                className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4 text-[#020617]" strokeWidth={1.5} />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-2">
              {language === 'zh'
                ? '📎 上传名片、照片或联系人文件'
                : '📎 Upload business cards, photos, or contact files'}
            </p>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="space-y-4">
          <h2 className="text-white text-sm">
            {language === 'zh' ? 'AI 功能' : 'AI Features'}
          </h2>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className="w-full rounded-[24px] bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 p-5 shadow-2xl hover:scale-[1.02] transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}