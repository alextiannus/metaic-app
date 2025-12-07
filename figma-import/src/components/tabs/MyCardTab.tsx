import { useState } from 'react';
import { Share2, Building2, Phone, MapPin, Mail, Globe, Briefcase, Target, Users, Heart, Sparkles, Calendar, Clock, UserPlus, MessageCircle, Linkedin, ExternalLink, Camera, Zap } from 'lucide-react';
import { businessCardData } from '../../data/businessCardData';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';
import { ShareModal } from '../ShareModal';

export function MyCardTab({ onShareClick }: { onShareClick: () => void }) {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [remarkText, setRemarkText] = useState('Singapore Tech Conference 2024');
  const [remarkLocation, setRemarkLocation] = useState('Marina Bay Sands, Singapore');
  const [showAllBusinesses, setShowAllBusinesses] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const card = businessCardData;
  const { language, t } = useLanguage();
  const { hasCreatedCard, setHasCreatedCard } = useUser();

  // Get current date and time
  const currentDateTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleAddContact = () => {
    const remarkNote = `Nice meeting you at ${remarkText}. ${remarkLocation} | ${currentDateTime}`;
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${card.personal.fullName}
N:${card.personal.lastName};${card.personal.firstName};;;
TITLE:${card.personal.title}
EMAIL;TYPE=INTERNET:${card.contact.emails[0].email}
EMAIL;TYPE=INTERNET:${card.contact.emails[1].email}
TEL;TYPE=CELL:${card.contact.phones[0].number}
URL:${card.links.website?.[0] || ''}
URL:${card.links.metaicProfile || ''}
ADR:;;${card.personal.location.city};;;${card.personal.location.country}
NOTE:${remarkNote}
ORG:${card.businesses[0].name};${card.businesses[1].name}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.personal.firstName}-${card.personal.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSayHello = () => {
    const message = encodeURIComponent(`Hi Alex! Nice meeting you at ${remarkText}. I'd love to learn more about your AI solutions!`);
    const whatsappUrl = `https://wa.me/${card.contact.phones[0].number.replace(/\+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCreateCard = () => {
    // Simulate card creation with AI
    alert(
      language === 'zh'
        ? '正在跳转到 AI 助手创建你的名片...'
        : 'Redirecting to AI Assistant to create your card...'
    );
    // In real app, this would navigate to AI tab or open camera
    setHasCreatedCard(true);
  };

  // Show welcome screen for new users
  if (!hasCreatedCard) {
    return (
      <div className="min-h-screen bg-[#020617] px-4 py-6 pb-24">
        <div className="max-w-md mx-auto space-y-6 pt-8">
          {/* Logo & Welcome */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] mx-auto flex items-center justify-center shadow-2xl">
              <Sparkles className="w-10 h-10 text-[#020617]" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-white text-2xl mb-2">
                {language === 'zh' ? '欢迎来到 MetaIC！' : 'Welcome to MetaIC!'}
              </h1>
              <p className="text-white/60 text-sm">
                {language === 'zh'
                  ? '用 AI 打造你的专业形象'
                  : 'Create Your Professional Presence with AI'}
              </p>
            </div>
          </div>

          {/* The Power of MetaIC */}
          <div className="p-6 rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h2 className="text-white text-center mb-6">
              {language === 'zh' ? '✨ MetaIC 的强大功能' : '✨ The Power of MetaIC'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white text-sm mb-1">
                    {language === 'zh' ? '📸 AI 智能创建名片' : '📸 AI-Powered Card Creation'}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {language === 'zh'
                      ? '让 AI 为你创建名片，轻松分享，任意风格随心选'
                      : 'Let AI create a name card for easy sharing with any style you like'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white text-sm mb-1">
                    {language === 'zh' ? '🤖 智能信息提取' : '🤖 Smart Information Extraction'}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {language === 'zh'
                      ? 'AI 从 LinkedIn、公司网站等自动提取你的职业信息'
                      : 'AI automatically extracts your professional info from LinkedIn, websites, and more'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white text-sm mb-1">
                    {language === 'zh' ? '🤝 智能人脉分析' : '🤝 Smart Network Analytics'}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {language === 'zh'
                      ? 'AI 分析你的人脉关系并提供专业的联系建议'
                      : 'AI analyzes your connections and provides personalized networking insights'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white text-sm mb-1">
                    {language === 'zh' ? '⚡ 即时分享交换' : '⚡ Instant Share & Exchange'}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {language === 'zh'
                      ? '通过 QR 码、链接或面对面雷达快速交换名片'
                      : 'Share via QR code, links, or face-to-face radar exchange'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleCreateCard}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2 font-medium touch-manipulation"
          >
            <Sparkles className="w-5 h-5" strokeWidth={1.5} />
            <span>
              {language === 'zh' ? '开始创建我的名片' : 'Create My Card Now'}
            </span>
          </button>

          {/* Encouragement */}
          <p className="text-white/50 text-xs text-center leading-relaxed">
            {language === 'zh'
              ? '只需 30 秒，让 AI 为你打造专业形象 🚀'
              : 'Just 30 seconds to let AI build your professional presence 🚀'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6 relative">
      <div className="max-w-md mx-auto space-y-4">
        {/* Card Header */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl business-card-container relative">
          {/* Share Button - Top Right Corner of Header */}
          <button
            onClick={() => setShowShareModal(true)}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Share2 className="w-4 h-4 text-[#020617]" strokeWidth={2} />
          </button>

          <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] p-1">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden">
                  <img 
                    src={card.personal.avatar} 
                    alt={card.personal.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#38BDF8] border-4 border-[#0F172A] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <h1 className="text-white text-xl">{card.personal.fullName}</h1>
                {card.personal.chineseName && (
                  <span className="text-white/60 text-base">({card.personal.chineseName})</span>
                )}
              </div>
              <p className="text-[#38BDF8] text-sm mb-1">
                {language === 'zh' && (card.personal as any).titleZh ? (card.personal as any).titleZh : card.personal.title}
              </p>
              <p className="text-[#FACC15] text-xs italic">
                {language === 'zh' && (card.personal as any).taglineZh ? (card.personal as any).taglineZh : card.personal.tagline}
              </p>
              <div className="flex items-center gap-2 text-white/60 mt-2">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs">Mobile / WhatsApp: {card.contact.phones[0].number}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Hidden in My Card */}
          {/* Only shown in ContactCardView */}
        </div>

        {/* Meeting Remark */}
        <div className="rounded-[24px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 backdrop-blur-xl border border-[#FACC15]/30 p-5 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                <span className="text-white text-sm">Nice meeting you at</span>
                <input
                  type="text"
                  value={remarkText}
                  onChange={(e) => setRemarkText(e.target.value)}
                  placeholder="Event/Activity"
                  className="flex-1 min-w-[180px] px-3 py-1 rounded-lg bg-white/10 border border-[#FACC15]/30 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all"
                />
              </div>
              <div className="text-white/50 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={remarkLocation}
                    onChange={(e) => setRemarkLocation(e.target.value)}
                    placeholder="Location"
                    className="flex-1 px-2 py-0.5 rounded bg-transparent border-b border-white/20 text-white/50 text-xs placeholder-white/30 focus:outline-none focus:border-[#FACC15]/30 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" strokeWidth={1.5} />
                  <span className="text-xs">{currentDateTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <span className="text-sm">Companies</span>
            </h2>
          </div>

          <div className="space-y-3">
            {card.businesses.map((business, index) => (
              <div
                key={business.id}
                className="rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white text-sm mb-1">
                      {business.name}
                      {business.chineseName && (
                        <span className="text-white/60 text-xs ml-2">({business.chineseName})</span>
                      )}
                    </h3>
                    <p className="text-[#38BDF8] text-xs">
                      {language === 'zh' && (business as any).roleZh ? (business as any).roleZh : business.role}
                    </p>
                  </div>
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                    >
                      <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </a>
                  )}
                </div>

                <p className="text-white/70 text-xs mb-2">
                  {language === 'zh' && (business as any).descriptionZh ? (business as any).descriptionZh : business.description}
                </p>

                {(showAllBusinesses || index === 0) && (
                  <div className="space-y-1">
                    <p className="text-white/60 text-xs mb-1">Services:</p>
                    {(language === 'zh' && (business as any).servicesZh ? (business as any).servicesZh : business.services).map((service: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#FACC15] mt-1.5 flex-shrink-0" />
                        <p className="text-white/80 text-xs">{service}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {card.businesses.length > 1 && (
            <button
              onClick={() => setShowAllBusinesses(!showAllBusinesses)}
              className="mt-3 text-[#FACC15] hover:text-[#FACC15]/80 transition-all text-xs"
            >
              {showAllBusinesses ? 'Show Less' : 'Show All Services'}
            </button>
          )}
        </div>

        {/* Headline */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <p className="text-white/90 text-center leading-relaxed text-sm">
            {card.professional.headline}
          </p>
        </div>

        {/* Contact Information */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <h3 className="text-white mb-4 text-sm">Contact Information</h3>
          <div className="space-y-3">
            {card.contact.phones.map((phone, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-[16px] bg-white/5">
                <div className="w-10 h-10 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">{phone.label}</p>
                  <p className="text-white text-sm">{phone.number}</p>
                </div>
              </div>
            ))}

            {card.contact.addresses && card.contact.addresses.length > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-[16px] bg-white/5">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">{card.contact.addresses[0].label}</p>
                  <p className="text-white text-sm">{card.contact.addresses[0].street}</p>
                  <p className="text-white text-sm">
                    {card.contact.addresses[0].city} {card.contact.addresses[0].postalCode}
                  </p>
                </div>
              </div>
            )}

            {card.contact.emails.map((email, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-[16px] bg-white/5">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">{email.label}</p>
                  <p className="text-white text-sm truncate">{email.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <h2 className="text-white mb-4 text-sm">Connect</h2>
          <div className="grid grid-cols-2 gap-3">
            {card.links.linkedin && (
              <a
                href={card.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-[16px] bg-[#0077B5]/10 border border-[#0077B5]/30 hover:bg-[#0077B5]/20 transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5]" strokeWidth={1.5} />
                <span className="text-white text-xs">LinkedIn</span>
              </a>
            )}

            {card.links.website && card.links.website[0] && (
              <a
                href={card.links.website[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-[16px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <Globe className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                <span className="text-white text-xs">Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Works & Services */}
        {card.professional.worksAndServices && (
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              <span className="text-sm">Works & Services</span>
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {card.professional.worksAndServices.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-[16px] bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                    {typeof item.icon === 'string' && item.icon.startsWith('http') ? (
                      <img 
                        src={item.icon} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FACC15] to-[#38BDF8]">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-white/60 text-xs">{item.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Looking to Connect With */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <h2 className="text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
            <span className="text-sm">{t('myCard.lookingFor')}</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {(language === 'zh' && (card.networking as any).lookingForZh ? (card.networking as any).lookingForZh : card.networking.lookingFor).map((item: string, index: number) => (
              <span
                key={index}
                className="px-3 py-2 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <h2 className="text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
            <span className="text-sm">Hobbies & Interests</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {card.personal_interests.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="px-3 py-2 rounded-full bg-white/5 text-white/80 text-xs"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl mb-24">
          <h2 className="text-white mb-4 text-sm">About</h2>
          <div className="text-white/70 leading-relaxed space-y-3 text-sm">
            <p>{card.professional.bio[0]}</p>
            {isAboutExpanded && card.professional.bio.slice(1).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <button
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="mt-3 text-[#FACC15] hover:text-[#FACC15]/80 transition-all text-xs"
          >
            {isAboutExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        remarkText={remarkText}
        remarkLocation={remarkLocation}
      />
    </div>
  );
}