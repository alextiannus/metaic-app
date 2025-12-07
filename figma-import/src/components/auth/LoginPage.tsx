import { Apple } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoginPageProps {
  onLogin: () => void;
  onSignUp: () => void;
  onOtherMethods?: () => void;
}

// Google Icon SVG Component
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.8055 10.2292C19.8055 9.55135 19.7498 8.86719 19.6303 8.19531H10.2002V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6026 15.0875V17.5867H16.8251C18.7175 15.8449 19.8055 13.2727 19.8055 10.2292Z" fill="#4285F4"/>
      <path d="M10.2002 20.0006C12.9508 20.0006 15.2706 19.1151 16.8293 17.5872L13.6068 15.088C12.7067 15.698 11.5469 16.0433 10.2044 16.0433C7.54337 16.0433 5.28164 14.283 4.48073 11.9097H1.16406V14.4926C2.75854 17.6563 6.30848 20.0006 10.2002 20.0006Z" fill="#34A853"/>
      <path d="M4.47647 11.9097C4.05468 10.6677 4.05468 9.33525 4.47647 8.09327V5.51035H1.16395C-0.382069 8.58826 -0.382069 12.4147 1.16395 15.4926L4.47647 11.9097Z" fill="#FBBC04"/>
      <path d="M10.2002 3.95821C11.6219 3.93598 13.0006 4.47235 14.0407 5.45722L16.8918 2.60589C15.1826 0.990916 12.9299 0.108415 10.2002 0.13065C6.30848 0.13065 2.75854 2.47492 1.16406 5.51041L4.47658 8.09333C5.27328 5.71579 7.53921 3.95821 10.2002 3.95821Z" fill="#EA4335"/>
    </svg>
  );
}

export function LoginPage({ onLogin, onSignUp, onOtherMethods }: LoginPageProps) {
  const { language, t } = useLanguage();

  const handleSocialLogin = (provider: 'apple' | 'google') => {
    // In a real app, this would trigger OAuth flow
    console.log(`Login with ${provider}`);
    onLogin();
  };

  const handleOtherMethods = () => {
    // Navigate to email/password login
    if (onOtherMethods) {
      onOtherMethods();
    } else {
      onSignUp();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] flex flex-col items-center justify-between px-4 py-8 safe-area-inset">
      {/* Logo & Welcome Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md pt-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          {/* MetaIC Logo - stylized gradient text */}
          <div className="mb-6">
            <div className="inline-flex items-baseline gap-0.5">
              <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                M
              </span>
              <span className="text-4xl sm:text-5xl font-bold text-white">eta</span>
              <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#FACC15] to-[#38BDF8] bg-clip-text text-transparent">
                IC
              </span>
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-white text-xl sm:text-2xl mb-2">
            {language === 'zh' ? '欢迎来到 MetaIC' : 'Welcome to MetaIC'}
          </h1>
          <p className="text-white/60 text-sm">
            {language === 'zh' ? 'AI 智能商务名片' : 'AI Business Cards'}
          </p>
        </div>
      </div>

      {/* Login Buttons */}
      <div className="w-full max-w-sm space-y-3 pb-6 px-4">
        {/* Google Login Button */}
        <button
          onClick={() => handleSocialLogin('google')}
          className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 text-white hover:bg-[#0F172A]/90 active:scale-[0.98] transition-all shadow-xl touch-manipulation"
        >
          <GoogleIcon />
          <span className="font-medium text-sm">
            {language === 'zh' ? '使用 Google 继续' : 'Continue with Google'}
          </span>
        </button>

        {/* Apple Login Button */}
        <button
          onClick={() => handleSocialLogin('apple')}
          className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 rounded-2xl bg-white text-[#020617] hover:bg-white/95 active:scale-[0.98] transition-all shadow-xl touch-manipulation"
        >
          <Apple className="w-5 h-5" fill="currentColor" strokeWidth={0} />
          <span className="font-medium text-sm">
            {language === 'zh' ? '使用 Apple 继续' : 'Continue with Apple'}
          </span>
        </button>

        {/* Other Methods Button */}
        <button
          onClick={handleOtherMethods}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#5b21b6] to-[#4c1d95] text-white hover:from-[#6d28d9] hover:to-[#5b21b6] active:scale-[0.98] transition-all shadow-xl font-medium touch-manipulation text-sm"
        >
          {language === 'zh' ? '使用其他方式继续' : 'Continue with Other Methods'}
        </button>
      </div>

      {/* Terms & Privacy */}
      <div className="text-center text-white/50 text-xs pb-4 px-4 max-w-md">
        <p className="mb-1">
          {language === 'zh' ? '登录即表示同意' : 'By signing in, you agree to our'}
        </p>
        <div className="space-x-1">
          <a href="#" className="underline hover:text-white/70 active:text-white/80 transition-colors">
            {language === 'zh' ? '《服务条款》' : 'Terms of Service'}
          </a>
          <span>{language === 'zh' ? '和' : 'and'}</span>
          <a href="#" className="underline hover:text-white/70 active:text-white/80 transition-colors">
            {language === 'zh' ? '《隐私政策》' : 'Privacy Policy'}
          </a>
        </div>
      </div>
    </div>
  );
}