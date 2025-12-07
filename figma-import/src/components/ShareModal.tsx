import { X, Share2, MessageCircle, Link as LinkIcon, Download, Phone, Mail, Building2, Sparkles } from 'lucide-react';
import { businessCardData } from '../data/businessCardData';
import { toPng } from 'html-to-image';
import { useLanguage } from '../contexts/LanguageContext';
import { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  remarkText?: string;
  remarkLocation?: string;
}

export function ShareModal({ isOpen, onClose, remarkText = '', remarkLocation = '' }: ShareModalProps) {
  const { language } = useLanguage();
  const card = businessCardData;
  const cardUrl = `https://metaic.ai/u/${card.slug}`;
  const cardPreviewRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Generate QR code when modal opens
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(cardUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#020617',
          light: '#FFFFFF',
        },
      }).then(setQrCodeUrl);
    }
  }, [isOpen, cardUrl]);

  const handleShareWhatsApp = async () => {
    // Get current date and time
    const currentDateTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Build meeting context
    const eventPart = remarkText ? ` ${remarkText}` : '';
    const locationPart = remarkLocation ? `, ${remarkLocation}` : '';
    const timePart = `, ${currentDateTime}`;
    
    const meetingContext = remarkText 
      ? `Nice meeting you at${eventPart}${locationPart}${timePart}.`
      : `Nice meeting you at ${currentDateTime}.`;

    // Simple message format
    const message = `Hi, This is ${card.personal.fullName}. ${meetingContext} Keep contact.`;

    // Try to capture and share the card image
    const cardElement = cardPreviewRef.current;
    
    if (cardElement) {
      try {
        // Generate card image using html-to-image
        const dataUrl = await toPng(cardElement, {
          pixelRatio: 2,
          backgroundColor: '#020617',
        });

        // Convert data URL to blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `${card.personal.firstName}-${card.personal.lastName}-card.png`, { type: 'image/png' });

        // Try to share using Web Share API (works on mobile)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            text: message,
          });
          onClose();
          return;
        }

        // Fallback for desktop or browsers without file sharing support
        // Download the image first, then open WhatsApp
        const downloadLink = document.createElement('a');
        downloadLink.download = `${card.personal.firstName}-${card.personal.lastName}-card.png`;
        downloadLink.href = dataUrl;
        downloadLink.click();

        // Wait a moment then open WhatsApp
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message + '\n\n[Please attach the downloaded name card image]')}`;
          window.open(whatsappUrl, '_blank');
        }, 500);
        
        onClose();
        return;
      } catch (error) {
        console.error('Error generating card image:', error);
      }
    }

    // Final fallback: Open WhatsApp with text message only
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cardUrl);
    alert(language === 'zh' ? '链接已复制到剪贴板！' : 'Link copied to clipboard!');
  };

  const handleDownloadCard = async () => {
    if (!cardPreviewRef.current) {
      alert(language === 'zh' ? '无法生成名片图片' : 'Unable to generate card image');
      return;
    }

    try {
      const dataUrl = await toPng(cardPreviewRef.current, {
        pixelRatio: 2,
        backgroundColor: '#020617',
      });

      const link = document.createElement('a');
      link.download = `${card.personal.firstName}-${card.personal.lastName}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating card image:', error);
      alert(language === 'zh' ? '生成图片时出错' : 'Error generating image');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[90vh] bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 rounded-[28px] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[#020617]" strokeWidth={2} />
            </div>
            <h2 className="text-white text-xl">
              {language === 'zh' ? '分享我的名片' : 'Share My Card'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-white/60" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Business Card Preview - Wallet Style */}
          <div ref={cardPreviewRef} className="p-5 bg-[#020617] rounded-[20px]">
            <div className="rounded-[28px] bg-gradient-to-br from-[#FACC15] via-[#38BDF8] to-[#0F172A] p-[2px] shadow-2xl shadow-[#FACC15]/20">
              <div className="rounded-[26px] bg-[#0F172A] p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-white text-xl mb-1">{card.personal.fullName}</h3>
                    {card.personal.chineseName && (
                      <p className="text-white/60 text-sm mb-1">({card.personal.chineseName})</p>
                    )}
                    <p className="text-[#38BDF8] text-sm">{card.personal.title}</p>
                    <p className="text-[#FACC15] text-xs italic mt-1">{card.personal.tagline}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img 
                      src={card.personal.avatar} 
                      alt={card.personal.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                    <span className="text-white/80 text-sm">{card.contact.phones[0].number}</span>
                  </div>
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

                {/* QR Code Section with MetaIC Branding */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-[#FACC15]" />
                        <span className="text-white/60 text-xs">METAIC</span>
                      </div>
                      <span className="text-white/60 text-xs">Scan to connect</span>
                    </div>
                    
                    {/* QR Code */}
                    {qrCodeUrl && (
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-white rounded-[12px]">
                          <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full p-4 rounded-[20px] bg-gradient-to-r from-[#25D366]/20 to-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/50 transition-all flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" strokeWidth={1.5} fill="currentColor" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white">
                  {language === 'zh' ? '通过 WhatsApp 分享' : 'Share via WhatsApp'}
                </p>
                <p className="text-white/60 text-sm">
                  {language === 'zh' ? '发送名片链接和问候语' : 'Send card link with greeting'}
                </p>
              </div>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full p-4 rounded-[20px] bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 hover:border-[#FACC15]/50 transition-all flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center group-hover:scale-110 transition-transform">
                <LinkIcon className="w-6 h-6 text-[#020617]" strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white">
                  {language === 'zh' ? '复制链接' : 'Copy Link'}
                </p>
                <p className="text-white/60 text-sm">
                  {language === 'zh' ? '复制名片网址' : 'Copy card URL'}
                </p>
              </div>
            </button>

            {/* Download Card */}
            <button
              onClick={handleDownloadCard}
              className="w-full p-4 rounded-[20px] bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white">
                  {language === 'zh' ? '下载名片图片' : 'Download Card Image'}
                </p>
                <p className="text-white/60 text-sm">
                  {language === 'zh' ? '保存为图片' : 'Save as image'}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}