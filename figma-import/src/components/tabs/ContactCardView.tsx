import { useState } from 'react';
import { ArrowLeft, Share2, Building2, Phone, MapPin, Mail, Globe, Users, Heart, Sparkles, Clock, UserPlus, MessageCircle, Linkedin } from 'lucide-react';
import { sampleContacts } from '../../data/sampleContacts';

interface ContactCardViewProps {
  contactId: number;
  onBack: () => void;
}

export function ContactCardView({ contactId, onBack }: ContactCardViewProps) {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  
  const contact = sampleContacts.find(c => c.id === contactId);
  
  if (!contact) {
    return null;
  }

  // Get current date and time for vCard
  const currentDateTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Format meeting time for display (shorter format)
  const meetingTime = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleAddContact = () => {
    const remarkNote = `Nice meeting you at ${contact.metAt}. ${contact.metLocation} | ${currentDateTime}`;
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TITLE:${contact.title}
ORG:${contact.company}
EMAIL;TYPE=INTERNET:${contact.email}
TEL;TYPE=CELL:${contact.phone}
${contact.linkedin ? `URL:${contact.linkedin}` : ''}
${contact.website ? `URL:${contact.website}` : ''}
NOTE:${remarkNote}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contact.name.replace(' ', '-')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleSayHello = () => {
    const message = encodeURIComponent(`Hi ${contact.name.split(' ')[0]}! Nice meeting you at ${contact.metAt}. Let's stay connected!`);
    const whatsappUrl = `https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6">
      <div className="max-w-md mx-auto space-y-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-all mb-4"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-sm">Back to Contacts</span>
        </button>

        {/* Card Header */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] p-1">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-4xl">
                  {contact.avatar}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#38BDF8] border-4 border-[#0F172A] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <h1 className="text-white text-xl">{contact.name}</h1>
                {contact.chineseName && (
                  <span className="text-white/60 text-base">({contact.chineseName})</span>
                )}
              </div>
              <p className="text-[#38BDF8] text-sm mb-1">{contact.title}</p>
              <p className="text-[#FACC15] text-xs italic">{contact.tagline}</p>
              <div className="flex items-center gap-2 text-white/60 mt-2">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs">Mobile / WhatsApp: {contact.phone}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddContact}
              className="flex-1 px-4 py-3 rounded-2xl bg-[#FACC15] text-[#020617] hover:bg-[#FACC15]/90 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Add Contact</span>
            </button>
            <button
              onClick={handleSayHello}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">Say Hello</span>
            </button>
          </div>
        </div>

        {/* Meeting Remark */}
        <div className="rounded-[24px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 backdrop-blur-xl border border-[#FACC15]/30 p-5 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm mb-3">
                Met at <span className="text-[#FACC15]">{contact.metAt}</span>
              </p>
              <div className="text-white/60 text-xs space-y-1.5">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>{contact.metLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>{meetingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <span className="text-sm">Company</span>
            </h2>
          </div>

          <div className="rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white text-sm mb-1">{contact.company}</h3>
                <p className="text-[#38BDF8] text-xs">{contact.title}</p>
              </div>
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  <Globe className="w-4 h-4 text-white" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <p className="text-white/90 text-center leading-relaxed text-sm">
            {contact.headline}
          </p>
        </div>

        {/* Contact Information */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <h3 className="text-white mb-4 text-sm">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-xs">Phone</p>
                <p className="text-white text-sm">{contact.phone}</p>
              </div>
            </div>

            {contact.address && (
              <div className="flex items-start gap-3 p-3 rounded-[16px] bg-white/5">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs">Address</p>
                  <p className="text-white text-sm">{contact.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-[16px] bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-xs">Email</p>
                <p className="text-white text-sm truncate">{contact.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connect */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
          <h2 className="text-white mb-4 text-sm">Connect</h2>
          <div className="grid grid-cols-2 gap-3">
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-[16px] bg-[#0077B5]/10 border border-[#0077B5]/30 hover:bg-[#0077B5]/20 transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5]" strokeWidth={1.5} />
                <span className="text-white text-xs">LinkedIn</span>
              </a>
            )}

            {contact.website && (
              <a
                href={contact.website}
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

        {/* Looking to Connect With */}
        {contact.networking && contact.networking.length > 0 && (
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <span className="text-sm">Looking to Connect With</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {contact.networking.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-2 rounded-full bg-gradient-to-r from-[#FACC15]/20 to-[#38BDF8]/20 border border-[#FACC15]/30 text-white text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies & Interests */}
        {contact.hobbies && contact.hobbies.length > 0 && (
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <span className="text-sm">Hobbies & Interests</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {contact.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3 py-2 rounded-full bg-white/5 text-white/80 text-xs"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl mb-24">
          <h2 className="text-white mb-4 text-sm">About</h2>
          <div className="text-white/70 leading-relaxed text-sm">
            <p>{contact.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}