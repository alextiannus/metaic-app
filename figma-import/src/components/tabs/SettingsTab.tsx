import { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Globe, Languages, Bell, Lock, Sparkles, Save, Layout, CreditCard, Smartphone, Settings as SettingsIcon, Edit, Coffee, Crown, Building2, HelpCircle, Coins } from 'lucide-react';
import { businessCardData } from '../../data/businessCardData';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';

interface SettingsTabProps {
  onViewChange?: (view: 'public' | 'mobile' | 'mobileapp') => void;
  onNavigate?: (page: 'editProfile' | 'subscription' | 'coffee') => void;
}

export function SettingsTab({ onViewChange, onNavigate }: SettingsTabProps) {
  const { language, setLanguage, t } = useLanguage();
  const { userTokens, subscriptionPlan } = useUser();
  const card = businessCardData;

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-2xl mb-2">Settings</h1>
          <p className="text-white/60 text-sm">Manage your profile and preferences</p>
        </div>

        <div className="space-y-4">
          {/* 1. User Profile Overview Section */}
          <div className="rounded-[24px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20 p-5 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FACC15]/50">
                <img 
                  src={card.personal.avatar} 
                  alt={card.personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg">{card.personal.fullName}</h3>
                <p className="text-white/60 text-sm">{card.personal.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Coins className="w-3 h-3 text-[#FACC15]" strokeWidth={1.5} />
                  <span className="text-[#FACC15] text-xs">{userTokens} tokens</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onNavigate?.('editProfile')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">
                {language === 'zh' ? '编辑与管理名片' : 'Edit & Manage Card'}
              </span>
            </button>
          </div>

          {/* 2. Preference Settings */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <span className="text-sm">
                {language === 'zh' ? '偏好设置' : 'Preferences'}
              </span>
            </h2>
            
            <div className="space-y-4">
              {/* Language */}
              <div>
                <label className="block text-white/60 text-xs mb-3">
                  {language === 'zh' ? '语言' : 'Language'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`py-3 px-4 rounded-xl border transition-all ${
                      language === 'en'
                        ? 'bg-[#FACC15] border-[#FACC15] text-[#020617]'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm">English</span>
                  </button>
                  <button
                    onClick={() => setLanguage('zh')}
                    className={`py-3 px-4 rounded-xl border transition-all ${
                      language === 'zh'
                        ? 'bg-[#FACC15] border-[#FACC15] text-[#020617]'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm">中文</span>
                  </button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <label className="block text-white/60 text-xs mb-3">
                  {language === 'zh' ? '隐私设置' : 'Privacy Settings'}
                </label>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                      <span className="text-white text-sm">
                        {language === 'zh' ? '私密模式' : 'Private Profile'}
                      </span>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-white/20 relative">
                      <div className="w-5 h-5 rounded-full bg-white/60 absolute left-0.5 top-0.5 transition-all"></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                      <span className="text-white text-sm">
                        {language === 'zh' ? '推送通知' : 'Push Notifications'}
                      </span>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-[#FACC15] relative">
                      <div className="w-5 h-5 rounded-full bg-[#020617] absolute right-0.5 top-0.5 transition-all"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Corporate Features */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              <span className="text-sm">
                {language === 'zh' ? '企业功能' : 'Corporate Features'}
              </span>
            </h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <span className="text-white text-sm">
                  {language === 'zh' ? '企业名片模板' : 'Corporate Templates'}
                </span>
                <span className="text-white/40">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <span className="text-white text-sm">
                  {language === 'zh' ? '客户支持' : 'Customer Support'}
                </span>
                <span className="text-white/40">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                <span className="text-white text-sm">
                  {language === 'zh' ? '团队管理' : 'Team Management'}
                </span>
                <span className="text-[#FACC15] text-xs">Pro</span>
              </button>

              {/* Quick Access to Subscription */}
              <button
                onClick={() => onNavigate?.('subscription')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#FACC15]/10 to-[#38BDF8]/10 hover:from-[#FACC15]/20 hover:to-[#38BDF8]/20 border border-[#FACC15]/20 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#FACC15]" strokeWidth={1.5} />
                  <span className="text-white text-sm">
                    {language === 'zh' ? '订阅计划' : 'Subscription Plan'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FACC15] text-xs capitalize">{subscriptionPlan}</span>
                  <Coins className="w-4 h-4 text-[#FACC15]" strokeWidth={1.5} />
                  <span className="text-[#FACC15] text-xs">{userTokens}</span>
                </div>
              </button>
            </div>
          </div>

          {/* 4. Buy Me a Coffee - Separate Section */}
          <div className="rounded-[24px] bg-gradient-to-br from-[#F59E0B]/20 to-[#FACC15]/20 border border-[#F59E0B]/30 p-5 shadow-2xl mb-24">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Coffee className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                  <h3 className="text-white">
                    {language === 'zh' ? '支持我们' : 'Support Us'}
                  </h3>
                </div>
                <p className="text-white/60 text-xs">
                  {language === 'zh' ? '请我们喝杯咖啡 ☕' : 'Buy us a coffee ☕'}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate?.('coffee')}
              className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FACC15] text-[#020617] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">
                {language === 'zh' ? '请我喝咖啡' : 'Buy Me a Coffee'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}