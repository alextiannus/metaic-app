import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeSuccessProps {
  userName: string;
  onContinue: () => void;
}

export function WelcomeSuccess({ userName, onContinue }: WelcomeSuccessProps) {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] p-1 animate-pulse">
            <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-[#FACC15]" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute -right-2 -top-2">
            <Sparkles className="w-10 h-10 text-[#38BDF8] animate-bounce" strokeWidth={1.5} />
          </div>
        </div>

        {/* Welcome Message */}
        <h1 className="text-white text-3xl mb-3">Welcome to MetaIC!</h1>
        <p className="text-white/60 text-base mb-2">Hi {userName} 👋</p>
        <p className="text-white/60 text-sm mb-8 max-w-sm mx-auto">
          Your AI-powered business card has been created successfully. Start networking smarter!
        </p>

        {/* Feature Highlights */}
        <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl mb-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">AI-Powered Networking</h3>
                <p className="text-white/60 text-xs">Smart recommendations and auto-complete features</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Easy Sharing</h3>
                <p className="text-white/60 text-xs">Share your card via QR code, link, or NFC</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FACC15]/20 to-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Contact Management</h3>
                <p className="text-white/60 text-xs">Organize and track your professional connections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <span className="font-medium">Get Started</span>
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
