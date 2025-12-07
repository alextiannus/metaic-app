import { useState } from 'react';
import { MapPin, Mail, Phone, Download, MessageCircle, Linkedin, Twitter, Github, Globe, Sparkles, X, Menu, UserPlus, Calendar, Clock, Edit2, Check } from 'lucide-react';

export function PublicCard() {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [remarkText, setRemarkText] = useState('Tech Conference 2024 - AI Track');
  const [remarkLocation, setRemarkLocation] = useState('Moscone Center, San Francisco');
  
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
    // Create vCard format
    const remarkNote = `Nice meeting you at ${remarkText}. ${remarkLocation} | ${currentDateTime}`;
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Alex Rivera
TITLE:Product Designer & AI Innovator
EMAIL:alex.rivera@metaic.com
TEL:+14155550123
URL:alexrivera.design
ADR:;;San Francisco;CA;;USA
NOTE:${remarkNote}
END:VCARD`;

    // Create blob and download
    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Alex-Rivera.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSayHello = () => {
    // Open WhatsApp with pre-filled message
    const message = encodeURIComponent(`Hi Alex! Nice meeting you at ${remarkText}. Great to connect!`);
    const whatsappUrl = `https://wa.me/14155550123?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen px-3 sm:px-4 py-6 sm:py-12 max-w-4xl mx-auto">
      {/* Header Card */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <div className="flex flex-col items-center gap-5 sm:gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] p-1">
              <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-2xl sm:text-3xl">
                👨‍💼
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#38BDF8] border-4 border-[#0F172A] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-white mb-1 text-2xl sm:text-3xl">Alex Rivera</h1>
            <p className="text-[#38BDF8] mb-2 text-base sm:text-lg">Product Designer & AI Innovator</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/60">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Updated */}
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

      {/* Remark Section - New */}
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

      {/* Headline */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <p className="text-white/90 text-center leading-relaxed text-base sm:text-lg">
          "Building the future of digital identity through AI-powered connections. Let's create something amazing together."
        </p>
      </div>

      {/* Contact Info */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 flex items-center gap-2 text-lg sm:text-xl">
          Contact Information
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-sm">Email</p>
              <p className="text-white text-sm sm:text-base truncate">alex.rivera@metaic.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#FACC15]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-sm">Phone</p>
              <p className="text-white text-sm sm:text-base">+1 (415) 555-0123</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-4 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#38BDF8]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-sm">Website</p>
              <p className="text-white text-sm sm:text-base">alexrivera.design</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 text-lg sm:text-xl">Social Links</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <button className="p-4 sm:p-5 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 sm:gap-3 group">
            <Linkedin className="w-7 h-7 sm:w-6 sm:h-6 text-[#38BDF8] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-white/60 text-sm">LinkedIn</span>
          </button>
          <button className="p-4 sm:p-5 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 sm:gap-3 group">
            <Twitter className="w-7 h-7 sm:w-6 sm:h-6 text-[#38BDF8] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-white/60 text-sm">Twitter</span>
          </button>
          <button className="p-4 sm:p-5 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 sm:gap-3 group">
            <Github className="w-7 h-7 sm:w-6 sm:h-6 text-[#FACC15] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-white/60 text-sm">GitHub</span>
          </button>
          <button className="p-4 sm:p-5 rounded-[20px] bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 sm:gap-3 group">
            <Globe className="w-7 h-7 sm:w-6 sm:h-6 text-[#FACC15] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span className="text-white/60 text-sm">Portfolio</span>
          </button>
        </div>
      </div>

      {/* Looking For */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 mb-4 sm:mb-6 shadow-2xl">
        <h2 className="text-white mb-5 sm:mb-6 text-lg sm:text-xl">Looking For</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {['Product Collaborations', 'AI Projects', 'Speaking Opportunities', 'Design Partnerships', 'Mentorship', 'Investment'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-8 shadow-2xl mb-24">
        <h2 className="text-white mb-5 sm:mb-6 text-lg sm:text-xl">About</h2>
        <div className="text-white/70 leading-relaxed space-y-4 text-sm sm:text-base">
          <p>
            With over 10 years of experience in product design and a passion for artificial intelligence, I'm dedicated to creating innovative solutions that bridge the gap between humans and technology.
          </p>
          {isAboutExpanded && (
            <>
              <p>
                My journey started in traditional graphic design, but quickly evolved as I discovered the potential of AI to transform how we interact with digital products. I've led design teams at major tech companies and startups, always pushing the boundaries of what's possible.
              </p>
              <p>
                Currently, I'm focused on building MetaIC, a platform that reimagines professional networking through AI-powered business cards. I believe the future of connections is intelligent, personalized, and seamlessly integrated into our daily workflows.
              </p>
              <p>
                When I'm not designing, you'll find me speaking at conferences, mentoring aspiring designers, or exploring the latest developments in machine learning and generative AI.
              </p>
            </>
          )}
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

      {/* AI Assistant Panel - Mobile Optimized */}
      {showAIAssistant && (
        <div className="fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-8 sm:right-8 sm:w-96 sm:h-[500px] h-[calc(100vh-6rem)] rounded-[24px] sm:rounded-[28px] bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col z-50">
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-base sm:text-lg">AI Assistant</h3>
                <p className="text-white/60 text-xs sm:text-sm">Ask me anything about Alex</p>
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
                <p className="text-white/90 text-sm leading-relaxed">
                  Hi! I'm Alex's AI assistant. I can help you learn more about his work, schedule a meeting, or answer any questions you have. What would you like to know?
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
    </div>
  );
}