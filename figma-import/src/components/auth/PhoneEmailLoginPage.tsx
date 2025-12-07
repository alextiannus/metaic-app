import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface PhoneEmailLoginPageProps {
  onBack: () => void;
  onLogin: () => void;
  isRegister?: boolean;
}

export function PhoneEmailLoginPage({ onBack, onLogin, isRegister = false }: PhoneEmailLoginPageProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(isRegister);

  const handleSendCode = () => {
    // In a real app, this would send a verification code
    setCodeSent(true);
    console.log('Sending verification code to:', email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would verify the code and log in/register
    onLogin();
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setPassword('');
    setVerificationCode('');
    setInvitationCode('');
    setCodeSent(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] flex flex-col px-4 py-8">
      {/* Logo & Welcome Section */}
      <div className="flex-1 flex flex-col items-center pt-16 pb-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-baseline gap-0.5">
              <span className="text-5xl font-bold bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
                M
              </span>
              <span className="text-4xl font-bold text-white">eta</span>
              <span className="text-5xl font-bold bg-gradient-to-r from-[#FACC15] to-[#38BDF8] bg-clip-text text-transparent">
                IC
              </span>
            </div>
          </div>

          <h1 className="text-white text-xl mb-2">
            {language === 'zh' ? '欢迎来到 MetaIC' : 'Welcome to MetaIC'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 px-4">
          {/* Email Input */}
          {isRegisterMode ? (
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'zh' ? '邮箱地址' : 'Email address'}
                className="flex-1 px-4 py-3.5 rounded-xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#6366f1]/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!email || codeSent}
                className="px-4 py-3.5 rounded-xl bg-transparent border border-white/20 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm whitespace-nowrap"
              >
                {language === 'zh' ? '发送' : 'Send'}
              </button>
            </div>
          ) : (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'zh' ? '邮箱地址' : 'Email address'}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#6366f1]/50 transition-all"
              required
            />
          )}

          {/* Password (Login) or Verification Code (Register) */}
          {isRegisterMode ? (
            <>
              {/* Verification Code */}
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={language === 'zh' ? '验证码' : 'Verification code'}
                className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#6366f1]/50 transition-all"
                required
              />

              {/* Invitation Code (Optional) */}
              <div className="relative">
                <input
                  type="text"
                  value={invitationCode}
                  onChange={(e) => setInvitationCode(e.target.value)}
                  placeholder={language === 'zh' ? '邀请码' : 'Invitation code'}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#6366f1]/50 transition-all pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                  ({language === 'zh' ? '选填' : 'Optional'})
                </span>
              </div>
            </>
          ) : (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'zh' ? '密码' : 'Password'}
              className="w-full px-4 py-3.5 rounded-xl bg-[#0F172A]/60 backdrop-blur-xl border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#6366f1]/50 transition-all"
              required
            />
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3.5 rounded-xl bg-transparent border border-white/20 text-white hover:bg-white/5 active:scale-[0.98] transition-all touch-manipulation"
            >
              {language === 'zh' ? '返回' : 'Back'}
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#7c3aed] hover:to-[#a855f7] active:scale-[0.98] transition-all shadow-xl touch-manipulation"
            >
              {isRegisterMode 
                ? (language === 'zh' ? '注册' : 'Register')
                : (language === 'zh' ? '登录' : 'Login')
              }
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center space-y-4 pb-4">
        {/* Toggle Login/Register */}
        <button
          onClick={toggleMode}
          className="text-white/50 text-sm hover:text-white/70 transition-colors"
        >
          {isRegisterMode 
            ? (language === 'zh' ? '已有账户？' : 'Already have an account? ')
            : (language === 'zh' ? '没有账户？' : "Don't have an account? ")
          }
          <span className="text-white underline ml-1">
            {isRegisterMode 
              ? (language === 'zh' ? '登录' : 'Login')
              : (language === 'zh' ? '注册' : 'Register')
            }
          </span>
        </button>

        {/* Terms */}
        <div className="text-white/40 text-xs">
          <p className="mb-1">
            {language === 'zh' ? '登录即表示同意' : 'By signing in, you agree to'}
          </p>
          <div className="space-x-1">
            <a href="#" className="underline hover:text-white/60 transition-colors">
              {language === 'zh' ? '《服务条款》' : 'Terms of Service'}
            </a>
            <span>{language === 'zh' ? '和' : 'and'}</span>
            <a href="#" className="underline hover:text-white/60 transition-colors">
              {language === 'zh' ? '《隐私政策》' : 'Privacy Policy'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}