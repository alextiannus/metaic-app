import { useState, useEffect, useRef } from 'react';
import { CreditCard, Users, Sparkles, Settings, Share2, QrCode, Mail, Phone, MapPin, Send, Building2, Globe, Download, MessageCircle, Copy, Check } from 'lucide-react';
import { alexTianYeCard } from '../data/alexTianYe';
import QRCode from 'qrcode';
import { toPng } from 'html-to-image';

type MobileTab = 'card' | 'contacts' | 'assistant' | 'settings';

export function MobileApp() {
  const [activeTab, setActiveTab] = useState<MobileTab>('card');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  
  const card = alexTianYeCard;

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
      {/* Mobile Frame */}
      <div className="w-full max-w-[390px] h-[844px] max-h-[90vh] rounded-[48px] sm:rounded-[60px] bg-[#000000] p-2 sm:p-3 shadow-2xl relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-7 sm:h-8 bg-[#000000] rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="w-full h-full rounded-[36px] sm:rounded-[48px] bg-[#020617] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="h-12 flex items-center justify-between px-6 sm:px-8 pt-2">
            <span className="text-white text-xs sm:text-sm">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-3 border border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-white rounded-sm" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <MyCardTab />
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCardTab() {
  const card = alexTianYeCard;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Generate QR code on mount
  useEffect(() => {
    const publicCardUrl = `${window.location.origin}/u/${card.slug}`;
    QRCode.toDataURL(publicCardUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#020617',
        light: '#FFFFFF',
      },
    }).then(setQrCodeUrl);
  }, []);

  const publicCardUrl = `${window.location.origin}/u/${card.slug}`;

  const captureCard = async (): Promise<string | null> => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, {
          quality: 1,
          pixelRatio: 2,
          cacheBust: true,
        });
        return dataUrl;
      } catch (error) {
        console.error('Error capturing card:', error);
        // Fallback without high pixel ratio
        try {
          const dataUrl = await toPng(cardRef.current, {
            quality: 0.95,
            cacheBust: true,
          });
          return dataUrl;
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          return null;
        }
      }
    }
    return null;
  };

  const handleDownloadCard = async () => {
    const imageData = await captureCard();
    if (imageData) {
      const link = document.createElement('a');
      link.download = `${card.slug}-business-card.png`;
      link.href = imageData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Failed to capture card image. Please try again.');
    }
  };

  const handleShareWhatsApp = async () => {
    // For WhatsApp, we'll share the URL since images require different approach
    const message = `Check out my AI Business Card: ${publicCardUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShareWeChat = async () => {
    // For WeChat, show instruction without clipboard API
    const tempInput = document.createElement('input');
    tempInput.value = publicCardUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    
    try {
      document.execCommand('copy');
      alert('Link copied! Open WeChat and paste the link to share.');
    } catch (err) {
      alert(`Copy this link to share: ${publicCardUrl}`);
    } finally {
      document.body.removeChild(tempInput);
    }
  };

  const handleCopyUrl = () => {
    // Use fallback copy method that works in all browsers
    const tempInput = document.createElement('input');
    tempInput.value = publicCardUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      document.body.removeChild(tempInput);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white">My AI Card</h2>
      </div>

      {/* Card - Wallet Style with QR Code */}
      <div ref={cardRef} className="relative">
        <div className="rounded-[28px] bg-gradient-to-br from-[#FACC15] via-[#38BDF8] to-[#0F172A] p-[2px] shadow-2xl shadow-[#FACC15]/20">
          <div className="rounded-[26px] bg-[#0F172A] p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#FACC15]" />
                  <span className="text-white/60 text-xs">METAIC</span>
                </div>
                <h3 className="text-white text-xl mb-1">{card.personal.fullName}</h3>
                {card.personal.chineseName && (
                  <p className="text-white/60 text-sm mb-1">({card.personal.chineseName})</p>
                )}
                <p className="text-[#38BDF8] text-sm">{card.personal.title}</p>
                <p className="text-[#FACC15] text-xs italic mt-1">{card.personal.tagline}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center overflow-hidden flex-shrink-0">
                {card.personal.avatar ? (
                  <img 
                    src={card.personal.avatar} 
                    alt={card.personal.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🚀</span>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                <span className="text-white/80 text-sm">{card.contact.phones[0].number}</span>
              </div>
              {card.contact.addresses && card.contact.addresses.length > 0 && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-white/60 mt-0.5" strokeWidth={1.5} />
                  <div className="flex-1">
                    <span className="text-white/80 text-sm">{card.contact.addresses[0].street}</span>
                    <br />
                    <span className="text-white/80 text-sm">{card.contact.addresses[0].city} {card.contact.addresses[0].postalCode}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                <span className="text-white/80 text-sm truncate">{card.contact.emails[0].email}</span>
              </div>
            </div>

            {/* Companies */}
            <div className="space-y-2 mb-4 pt-4 border-t border-white/10">
              {card.businesses.map((business) => (
                <div key={business.id} className="flex items-center gap-2">
                  <Building2 className="w-3 h-3 text-[#FACC15]" strokeWidth={1.5} />
                  <span className="text-white/70 text-xs">
                    {business.name} {business.chineseName && `(${business.chineseName})`}
                  </span>
                </div>
              ))}
            </div>

            {/* QR Code Section - Integrated into card */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#FACC15]" strokeWidth={1.5} />
                    <span className="text-white/60 text-xs">AI-Powered</span>
                  </div>
                  <span className="text-white/60 text-xs">/u/{card.slug}</span>
                </div>
                
                {/* QR Code */}
                {qrCodeUrl && (
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-white rounded-[12px]">
                      <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Actions */}
      <div className="rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
          Share Your Card
        </h3>
        
        <div className="space-y-2">
          <button 
            onClick={handleDownloadCard}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-[16px] bg-[#FACC15] text-[#020617] shadow-lg shadow-[#FACC15]/20"
          >
            <Download className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm">Save Card Image</span>
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={handleShareWhatsApp}
              className="flex flex-col items-center gap-2 p-3 rounded-[16px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" strokeWidth={1.5} />
              <span className="text-white/70 text-xs">WhatsApp</span>
            </button>
            
            <button 
              onClick={handleShareWeChat}
              className="flex flex-col items-center gap-2 p-3 rounded-[16px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-[#07C160]" strokeWidth={1.5} />
              <span className="text-white/70 text-xs">WeChat</span>
            </button>
            
            <button 
              onClick={handleCopyUrl}
              className="flex flex-col items-center gap-2 p-3 rounded-[16px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                  <span className="text-white/70 text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-white" strokeWidth={1.5} />
                  <span className="text-white/70 text-xs">Copy URL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactsTab({
  selectedContact,
  onSelectContact,
}: {
  selectedContact: number | null;
  onSelectContact: (id: number | null) => void;
}) {
  const contacts = [
    { id: 1, name: 'James Wong', title: 'Restaurant Owner', company: 'Wong\'s Dim Sum' },
    { id: 2, name: 'Sarah Chen', title: 'Cloud Infrastructure Lead', company: 'TechVentures SG' },
    { id: 3, name: 'David Lim', title: 'Bakery Chain Founder', company: 'Golden Loaf' },
  ];

  if (selectedContact !== null) {
    const contact = contacts.find((c) => c.id === selectedContact);
    if (contact) {
      return (
        <div className="p-6 space-y-6">
          <button
            onClick={() => onSelectContact(null)}
            className="text-[#38BDF8] text-sm"
          >
            ← Back
          </button>

          {/* Contact Header */}
          <div className="rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#FACC15] flex items-center justify-center text-xl">
                {contact.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">{contact.name}</h3>
                <p className="text-[#38BDF8] text-sm">{contact.title}</p>
                <p className="text-white/60 text-sm">{contact.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center gap-1 p-3 rounded-[16px] bg-white/5">
                <Mail className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                <span className="text-white/60 text-xs">Email</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-3 rounded-[16px] bg-white/5">
                <Phone className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                <span className="text-white/60 text-xs">Call</span>
              </button>
              <button className="flex flex-col items-center gap-1 p-3 rounded-[16px] bg-white/5">
                <Share2 className="w-5 h-5 text-white" strokeWidth={1.5} />
                <span className="text-white/60 text-xs">Share</span>
              </button>
            </div>
          </div>

          {/* AI Summary */}
          <div className="rounded-[28px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/30 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#FACC15]" strokeWidth={1.5} />
              <h3 className="text-white text-sm">AI Summary</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {contact.id === 1 && "James owns a popular dim sum restaurant chain. Perfect for 12EAT.ai partnership and AI POS implementation."}
              {contact.id === 2 && "Sarah leads cloud infrastructure projects. Great fit for Immedi.AI cloud hosting services."}
              {contact.id === 3 && "David operates 8 bakery locations. Ideal for 12EAT.ai platform integration."}
            </p>
          </div>

          {/* Common Interests */}
          <div className="rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="text-white mb-3 text-sm">Common Interests</h3>
            <div className="flex flex-wrap gap-2">
              {contact.id === 1 && ['F&B', 'AI Automation'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-xs"
                >
                  {interest}
                </span>
              ))}
              {contact.id === 2 && ['Cloud Hosting', 'Enterprise AI'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-xs"
                >
                  {interest}
                </span>
              ))}
              {contact.id === 3 && ['F&B Tech', 'Logistics'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-white">Contacts</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search contacts..."
        className="w-full px-4 py-3 rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50"
      />

      {/* Contacts List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact.id)}
            className="w-full rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-4 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#FACC15] flex items-center justify-center">
              {contact.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-white text-sm mb-0.5">{contact.name}</h3>
              <p className="text-white/60 text-xs">{contact.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AssistantTab() {
  const card = alexTianYeCard;
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#020617]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-white">AI Assistant</h2>
            <p className="text-white/60 text-sm">Your personal networking AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-[#020617]" strokeWidth={1.5} />
          </div>
          <div className="rounded-[20px] bg-white/5 p-4 flex-1">
            <p className="text-white/90 text-sm leading-relaxed">
              {card.ai.conversationStarter}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="rounded-[20px] bg-[#FACC15]/20 border border-[#FACC15]/30 p-4 max-w-[80%]">
            <p className="text-white text-sm">
              Tell me about your AI solutions for restaurants
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-[#020617]" strokeWidth={1.5} />
          </div>
          <div className="rounded-[20px] bg-white/5 p-4 flex-1">
            <p className="text-white/90 text-sm leading-relaxed">
              Through 12EAT.ai and Immedi.AI, I offer comprehensive solutions including AI POS systems, order management automation, and cloud-based infrastructure. I also provide Dianping and Xiaohongshu marketing services to help F&B businesses grow their digital presence. Would you like to know more about any specific service?
            </p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-[20px] bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50"
          />
          <button className="w-12 h-12 rounded-full bg-[#FACC15] flex items-center justify-center">
            <Send className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-white">Settings</h2>

      {/* Profile Settings */}
      <div className="rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-white mb-4">Profile</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-[16px] bg-white/5">
            <span className="text-white text-sm">Edit Card</span>
            <span className="text-white/40">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-[16px] bg-white/5">
            <span className="text-white text-sm">Privacy Settings</span>
            <span className="text-white/40">→</span>
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-white mb-4">Preferences</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-[16px] bg-white/5">
            <span className="text-white text-sm">Notifications</span>
            <span className="text-white/40">→</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-[16px] bg-white/5">
            <span className="text-white text-sm">AI Settings</span>
            <span className="text-white/40">→</span>
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6">
        <h3 className="text-white mb-4">Account</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-[16px] bg-white/5">
            <span className="text-white text-sm">Subscription</span>
            <span className="text-[#FACC15] text-sm">Pro</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-[16px] bg-white/5">
            <span className="text-white text-sm">Help & Support</span>
            <span className="text-white/40">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}