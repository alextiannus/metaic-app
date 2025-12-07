import { useState } from 'react';
import { MapPin, Mail, Phone, Download, MessageCircle, Linkedin, Globe, Sparkles, X, UserPlus, Calendar, Clock, Building2, Briefcase, Heart, Users, TrendingUp, ExternalLink, Smartphone, Share2 } from 'lucide-react';
import { alexTianYeCard } from '../data/alexTianYe';
import { ShareModal } from './ShareModal';

// Detect user device
function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'ios';
  }
  
  return 'desktop';
}

export function AlexTianYeCard() {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [remarkText, setRemarkText] = useState('Singapore Tech Conference 2024');
  const [remarkLocation, setRemarkLocation] = useState('Marina Bay Sands, Singapore');
  const [showAllBusinesses, setShowAllBusinesses] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const card = alexTianYeCard;
  
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

  return (
    <div className="min-h-screen px-3 sm:px-4 py-6 sm:py-12 max-w-4xl mx-auto relative">
      {/* Header Card */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl business-card-container relative">
        {/* Share Button - Top Right Corner of Header */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#020617]" strokeWidth={2} />
        </button>

        <div className="flex flex-col items-center gap-5 sm:gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] p-1">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center overflow-hidden">
                {card.personal.avatar ? (
                  <img 
                    src={card.personal.avatar} 
                    alt={card.personal.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl sm:text-4xl">🚀</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#38BDF8] border-4 border-[#0F172A] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-1">
              <h1 className="text-white text-2xl sm:text-3xl">{card.personal.fullName}</h1>
              {card.personal.chineseName && (
                <span className="text-white/60 text-lg sm:text-xl">({card.personal.chineseName})</span>
              )}
            </div>
            <p className="text-[#38BDF8] mb-1 text-base sm:text-lg">{card.personal.title}</p>
            <p className="text-[#FACC15] mb-2 text-sm sm:text-base italic">{card.personal.tagline}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/60">
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Mobile / WhatsApp: {card.contact.phones[0].number}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5 sm:mt-6">
          <button 
            onClick={handleAddContact}
            className="flex-1 px-5 sm:px-6 py-3.5 sm:py-3 rounded-[20px] bg-[#FACC15] text-[#020617] hover:bg-[#FACC15]/90 transition-all shadow-lg shadow-[#FACC15]/20 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            <span className="text-sm sm:text-base">Add Contact</span>
          </button>
          <button 
            onClick={handleSayHello}
            className="flex-1 px-5 sm:px-6 py-3.5 sm:py-3 rounded-[20px] bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4" strokeWidth={1.5} />
            <span className="text-sm sm:text-base">Say Hello</span>
          </button>
        </div>
      </div>

      {/* Meeting Note */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 backdrop-blur-xl border border-[#FACC15]/30 p-5 sm:p-6 mb-4 sm:mb-6 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-2 flex-wrap">
              <span className="text-white text-sm sm:text-base">Nice meeting you at</span>
              <input
                type="text"
                value={remarkText}
                onChange={(e) => setRemarkText(e.target.value)}
                placeholder="Event/Activity"
                className="flex-1 min-w-[200px] px-3 py-1 rounded-lg bg-white/10 border border-[#FACC15]/30 text-white placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all text-sm sm:text-base"
              />
            </div>
            <div className="text-white/50 text-xs sm:text-sm space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" strokeWidth={1.5} />
                <input
                  type="text"
                  value={remarkLocation}
                  onChange={(e) => setRemarkLocation(e.target.value)}
                  placeholder="Location"
                  className="flex-1 px-2 py-0.5 rounded bg-transparent border-b border-white/20 text-white/50 placeholder-white/30 focus:outline-none focus:border-[#FACC15]/30 transition-all text-xs sm:text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" strokeWidth={1.5} />
                <span>{currentDateTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Businesses Section */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-white flex items-center gap-2 text-lg sm:text-xl">
            <Building2 className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
            Companies
          </h2>
        </div>

        <div className="space-y-4">
          {card.businesses.map((business, index) => (
            <div 
              key={business.id}
              className="rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20 p-5 hover:border-[#FACC15]/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white text-lg mb-1">
                    {business.name}
                    {business.chineseName && (
                      <span className="text-white/60 text-base ml-2">({business.chineseName})</span>
                    )}
                  </h3>
                  <p className="text-[#38BDF8] text-sm">{business.role}</p>
                </div>
                {business.website && (
                  <a 
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  >
                    <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </a>
                )}
              </div>
              
              <p className="text-white/70 text-sm mb-3">{business.description}</p>
              
              {(showAllBusinesses || index === 0) && (
                <div className="space-y-2">
                  <p className="text-white/60 text-xs mb-2">Services:</p>
                  {business.services.map((service, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-1.5 flex-shrink-0" />
                      <p className="text-white/80 text-sm">{service}</p>
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
            className="mt-4 text-[#FACC15] hover:text-[#FACC15]/80 transition-all text-sm"
          >
            {showAllBusinesses ? 'Show Less' : 'Show All Services'}
          </button>
        )}
      </div>

      {/* Headline */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <p className="text-white/90 text-center leading-relaxed text-base sm:text-lg">
          {card.professional.headline}
        </p>
      </div>

      {/* Contact Information */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl">
          Contact Information
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {card.contact.phones.map((phone, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#FACC15]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-sm">{phone.label || 'Phone'}</p>
                <p className="text-white text-sm sm:text-base">{phone.number}</p>
              </div>
            </div>
          ))}

          {card.contact.addresses && card.contact.addresses.map((address, index) => (
            <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-sm">{address.type === 'office' ? 'Office Address' : 'Address'}</p>
                <p className="text-white text-sm sm:text-base">{address.street}</p>
                <p className="text-white text-sm sm:text-base">{address.city} {address.postalCode}</p>
              </div>
            </div>
          ))}
          
          {card.contact.emails.map((email, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-sm">{email.label || 'Email'}</p>
                <p className="text-white text-sm sm:text-base truncate">{email.email}</p>
              </div>
            </div>
          ))}

          {card.links.website && card.links.website.map((website, index) => (
            <a 
              key={index}
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-sm">Website {index + 1}</p>
                <p className="text-white text-sm sm:text-base truncate">{website}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 text-lg sm:text-xl">Connect</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {card.links.linkedin && (
            <a
              href={card.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 sm:gap-3 group"
            >
              <Linkedin className="w-7 h-7 sm:w-6 sm:h-6 text-[#38BDF8] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-white/60 text-sm">LinkedIn</span>
            </a>
          )}
          
          {card.links.whatsapp && (
            <a
              href={`https://wa.me/${card.links.whatsapp.replace(/\+/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 sm:gap-3 group"
            >
              <MessageCircle className="w-7 h-7 sm:w-6 sm:h-6 text-[#FACC15] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-white/60 text-sm">WhatsApp</span>
            </a>
          )}

          {card.links.metaicProfile && (
            <a
              href={card.links.metaicProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-[20px] bg-gradient-to-br from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 hover:border-[#FACC15]/50 transition-all flex flex-col items-center gap-2 sm:gap-3 group col-span-2"
            >
              <Sparkles className="w-7 h-7 sm:w-6 sm:h-6 text-[#FACC15] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-white text-sm">MetaIC Profile</span>
            </a>
          )}
        </div>
      </div>

      {/* Works & Services */}
      {card.professional.worksAndServices && (
        <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
          <h2 className="text-white mb-5 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl">
            <Briefcase className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
            Works & Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {card.professional.worksAndServices.map((item) => {
              const isApp = item.type === 'app';
              const device = detectDevice();
              
              const handleClick = () => {
                if (isApp) {
                  if (device === 'ios' && item.appStoreUrl) {
                    window.open(item.appStoreUrl, '_blank');
                  } else if (device === 'android' && item.playStoreUrl) {
                    window.open(item.playStoreUrl, '_blank');
                  } else {
                    // Default to App Store for desktop
                    window.open(item.appStoreUrl || item.playStoreUrl, '_blank');
                  }
                }
              };

              return (
                <div
                  key={item.id}
                  onClick={isApp ? handleClick : undefined}
                  className={`p-4 sm:p-5 rounded-[20px] bg-gradient-to-br from-white/5 to-white/10 border border-white/10 transition-all ${
                    isApp 
                      ? 'cursor-pointer hover:border-[#FACC15]/50 hover:shadow-lg hover:shadow-[#FACC15]/10 hover:scale-105' 
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                      {typeof item.icon === 'string' && item.icon.startsWith('http') ? (
                        <img 
                          src={item.icon} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl">
                          {item.icon}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-white text-sm sm:text-base">
                          {item.name}
                        </h3>
                        {isApp && (
                          <div className="flex-shrink-0">
                            <div className="w-6 h-6 rounded-full bg-[#FACC15]/20 flex items-center justify-center">
                              <Smartphone className="w-3 h-3 text-[#FACC15]" strokeWidth={1.5} />
                            </div>
                          </div>
                        )}
                      </div>
                      {item.englishName && (
                        <p className="text-white/60 text-xs mb-1">{item.englishName}</p>
                      )}
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                      {isApp && (
                        <div className="mt-2 flex items-center gap-1 text-[#FACC15] text-xs">
                          <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                          <span>Download App</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Looking For */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl">
          <Users className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
          Looking to Connect With
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {card.networking.lookingFor.map((item) => (
            <span
              key={item}
              className="px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hobbies */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl">
          <Heart className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
          Hobbies & Interests
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {card.personal_interests.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm"
            >
              {hobby}
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 shadow-2xl mb-24">
        <h2 className="text-white mb-5 sm:mb-6 text-lg sm:text-xl">About</h2>
        <div className="text-white/70 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>{card.professional.bio[0]}</p>
          {isAboutExpanded && card.professional.bio.slice(1).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <button
          onClick={() => setIsAboutExpanded(!isAboutExpanded)}
          className="mt-4 text-[#FACC15] hover:text-[#FACC15]/80 transition-all text-sm sm:text-base"
        >
          {isAboutExpanded ? 'Show Less' : 'Read More'}
        </button>
      </div>

      {/* AI Assistant Widget */}
      {!showAIAssistant && (
        <button
          onClick={() => setShowAIAssistant(true)}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] shadow-2xl shadow-[#FACC15]/30 flex items-center justify-center hover:scale-110 transition-all group z-40"
        >
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#020617] group-hover:rotate-12 transition-transform" strokeWidth={1.5} />
        </button>
      )}

      {/* AI Assistant Panel */}
      {showAIAssistant && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-8 sm:right-8 sm:w-96 sm:h-[500px] h-[calc(100vh-6rem)] rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col z-50">
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-base sm:text-lg">AI Assistant</h3>
                <p className="text-white/60 text-xs sm:text-sm">Ask me about Alex</p>
              </div>
            </div>
            <button
              onClick={() => setShowAIAssistant(false)}
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#020617]" strokeWidth={1.5} />
              </div>
              <div className="rounded-[20px] bg-white/5 p-4 flex-1">
                <p className="text-white/90 text-sm leading-relaxed mb-3">
                  {card.ai.conversationStarter}
                </p>
                <p className="text-white/70 text-xs leading-relaxed">
                  {card.ai.summary}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full px-4 py-3.5 sm:py-3 rounded-[20px] bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all text-sm sm:text-base"
            />
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        remarkText={remarkText}
        remarkLocation={remarkLocation}
      />
    </div>
  );
}