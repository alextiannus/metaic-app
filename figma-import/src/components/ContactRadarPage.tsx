import { useState } from 'react';
import { ChevronLeft, Radio, MapPin, Users, Zap, RefreshCw, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactRadarPageProps {
  onBack: () => void;
}

interface NearbyContact {
  id: string;
  name: string;
  title: string;
  company: string;
  distance: string;
  matchScore: number;
  avatar: string;
  commonInterests: string[];
}

export function ContactRadarPage({ onBack }: ContactRadarPageProps) {
  const { language } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const nearbyContacts: NearbyContact[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Product Manager',
      company: 'Tech Innovations',
      distance: '5m',
      matchScore: 95,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      commonInterests: ['AI', 'Product Design', 'Startups'],
    },
    {
      id: '2',
      name: 'Michael Park',
      title: 'Senior Developer',
      company: 'Cloud Systems',
      distance: '12m',
      matchScore: 88,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      commonInterests: ['Tech', 'Cloud Computing'],
    },
    {
      id: '3',
      name: 'Lisa Wang',
      title: 'Marketing Director',
      company: 'Digital Solutions',
      distance: '18m',
      matchScore: 82,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      commonInterests: ['Marketing', 'AI'],
    },
  ];

  const handleStartScanning = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 3000);
  };

  const handleRefresh = () => {
    setShowResults(false);
    handleStartScanning();
  };

  const handleConnect = (contactId: string) => {
    alert(
      language === 'zh'
        ? '正在发送连接请求...'
        : 'Sending connection request...'
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-4 max-w-md mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-xl">
              {language === 'zh' ? '联系人雷达' : 'Contact Radar'}
            </h1>
            <p className="text-white/60 text-xs">
              {language === 'zh' ? '发现附近的专业人士' : 'Discover nearby professionals'}
            </p>
          </div>
          {showResults && (
            <button
              onClick={handleRefresh}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all"
            >
              <RefreshCw className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Instruction */}
        {!showResults && !isScanning && (
          <>
            <div className="p-4 rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20">
              <p className="text-white text-sm text-center">
                {language === 'zh'
                  ? '🔍 使用雷达功能发现附近使用 MetaIC 的专业人士'
                  : '🔍 Use radar to discover nearby professionals using MetaIC'}
              </p>
            </div>

            {/* Radar Illustration */}
            <div className="relative p-12 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Radar circles */}
                <div className="absolute inset-0 rounded-full border-2 border-[#FACC15]/20"></div>
                <div className="absolute inset-8 rounded-full border-2 border-[#FACC15]/30"></div>
                <div className="absolute inset-16 rounded-full border-2 border-[#FACC15]/40"></div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
                    <Radio className="w-8 h-8 text-[#020617]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartScanning}
              className="w-full p-4 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              {language === 'zh' ? '开始扫描' : 'Start Scanning'}
            </button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-[16px] bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-[#FACC15]/20 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                </div>
                <p className="text-white text-xs mb-1">
                  {language === 'zh' ? '附近' : 'Nearby'}
                </p>
                <p className="text-white/60 text-xs">50m</p>
              </div>
              <div className="p-3 rounded-[16px] bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <p className="text-white text-xs mb-1">
                  {language === 'zh' ? '在线' : 'Online'}
                </p>
                <p className="text-white/60 text-xs">
                  {language === 'zh' ? '实时' : 'Live'}
                </p>
              </div>
              <div className="p-3 rounded-[16px] bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
                </div>
                <p className="text-white text-xs mb-1">
                  {language === 'zh' ? '智能' : 'Smart'}
                </p>
                <p className="text-white/60 text-xs">AI</p>
              </div>
            </div>
          </>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <div className="space-y-6">
            <div className="relative p-12 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Animated radar circles */}
                <div className="absolute inset-0 rounded-full border-2 border-[#FACC15]/40 animate-ping"></div>
                <div className="absolute inset-8 rounded-full border-2 border-[#FACC15]/50 animate-ping [animation-delay:0.3s]"></div>
                <div className="absolute inset-16 rounded-full border-2 border-[#FACC15]/60 animate-ping [animation-delay:0.6s]"></div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center animate-pulse">
                    <Radio className="w-8 h-8 text-[#020617]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Scanning dots */}
                <div className="absolute top-4 right-12 w-3 h-3 rounded-full bg-[#FACC15] animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-[#38BDF8] animate-pulse [animation-delay:0.2s]"></div>
                <div className="absolute top-1/2 right-4 w-3 h-3 rounded-full bg-[#10B981] animate-pulse [animation-delay:0.4s]"></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white mb-2">
                {language === 'zh' ? '正在扫描附近的人...' : 'Scanning for nearby people...'}
              </p>
              <p className="text-white/60 text-sm">
                {language === 'zh' ? '这可能需要几秒钟' : 'This may take a few seconds'}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="space-y-4">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white">
                  {language === 'zh' ? '发现附近的人' : 'People Nearby'}
                </h2>
                <p className="text-white/60 text-sm">
                  {nearbyContacts.length} {language === 'zh' ? '位专业人士' : 'professionals found'}
                </p>
              </div>
            </div>

            {/* Contacts List */}
            {nearbyContacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 rounded-[20px] bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white truncate">{contact.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs flex-shrink-0">
                        {contact.matchScore}% {language === 'zh' ? '匹配' : 'match'}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm truncate">{contact.title}</p>
                    <p className="text-white/40 text-xs truncate">{contact.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[#FACC15] text-xs">
                      <MapPin className="w-3 h-3" strokeWidth={1.5} />
                      <span>{contact.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Common Interests */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {contact.commonInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                {/* Connect Button */}
                <button
                  onClick={() => handleConnect(contact.id)}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" strokeWidth={1.5} />
                  {language === 'zh' ? '连接' : 'Connect'}
                </button>
              </div>
            ))}

            {/* Info */}
            <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs text-center">
                {language === 'zh'
                  ? '🔒 你的位置信息是私密的，只在你主动扫描时共享'
                  : '🔒 Your location is private and only shared when you actively scan'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
