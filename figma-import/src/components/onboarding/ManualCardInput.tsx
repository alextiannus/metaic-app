import { useState } from 'react';
import { User, Mail, Phone, Building2, Briefcase, Globe, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface ManualCardInputProps {
  onComplete: (cardData: any) => void;
  onBack?: () => void;
  initialData?: any;
}

export function ManualCardInput({ onComplete, onBack, initialData }: ManualCardInputProps) {
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    chineseName: initialData?.chineseName || '',
    title: initialData?.title || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    address: initialData?.address || '',
    linkedin: initialData?.linkedin || '',
  });

  const handleAIEnhance = () => {
    setIsAIEnhancing(true);
    // Simulate AI enhancement
    setTimeout(() => {
      setIsAIEnhancing(false);
      // AI could suggest taglines, extract company info, etc.
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-white text-2xl mb-2">Create Your Card</h1>
          <p className="text-white/60 text-sm">
            Enter your information to generate your AI-powered business card
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <h2 className="text-white text-sm">Personal Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs mb-2">
                  Full Name <span className="text-[#FACC15]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Alex Tian Ye"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">Chinese Name (Optional)</label>
                <input
                  type="text"
                  value={formData.chineseName}
                  onChange={(e) => updateField('chineseName', e.target.value)}
                  placeholder="田野"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">
                  Job Title <span className="text-[#FACC15]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="Founder & CEO"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">
                  Company <span className="text-[#FACC15]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  placeholder="Immedi.AI"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#FACC15]/50 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              <h2 className="text-white text-sm">Contact Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs mb-2">
                  Email <span className="text-[#FACC15]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="alex@immedi.ai"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#38BDF8]/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">
                  Phone <span className="text-[#FACC15]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+65 9876 5432"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#38BDF8]/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">Website (Optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://immedi.ai"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#38BDF8]/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">Address (Optional)</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Singapore"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#38BDF8]/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs mb-2">LinkedIn (Optional)</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => updateField('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#38BDF8]/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* AI Enhancement */}
          <button
            type="button"
            onClick={handleAIEnhance}
            disabled={isAIEnhancing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#38BDF8]/20 to-[#FACC15]/20 border border-[#38BDF8]/30 text-white hover:bg-gradient-to-r hover:from-[#38BDF8]/30 hover:to-[#FACC15]/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className={`w-5 h-5 ${isAIEnhancing ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
            <span className="text-sm">
              {isAIEnhancing ? 'AI Enhancing...' : 'Enhance with AI Search'}
            </span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span className="font-medium">Continue to Customization</span>
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Back Button */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <span className="text-sm">Back</span>
            </button>
          )}
        </form>

        {/* Info */}
        <div className="mt-6 rounded-xl bg-[#FACC15]/10 border border-[#FACC15]/20 p-4">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#FACC15] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-[#FACC15] text-xs mb-1">AI Enhancement</p>
              <p className="text-white/60 text-xs">
                Our AI will search for your professional information online to enrich your card with bio, expertise, and achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
