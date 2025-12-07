import { useState } from 'react';
import { MyCardTab } from './tabs/MyCardTab';
import { ContactsTab } from './tabs/ContactsTab';
import { AITab } from './tabs/AITab';
import { SettingsTab } from './tabs/SettingsTab';
import { CommunicationPlanPage } from './ai/CommunicationPlanPage';
import { NetworkInsightsPage } from './ai/NetworkInsightsPage';
import { CommunicationHistoryPage } from './ai/CommunicationHistoryPage';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { CreditCard, Users, Sparkles, Settings, ArrowLeft } from 'lucide-react';

interface MobileAppHomeProps {
  onShareClick: () => void;
  onViewChange?: (view: 'public' | 'mobile' | 'mobileapp') => void;
  onNavigateToPage?: (page: 'editProfile' | 'subscription' | 'coffee') => void;
}

export function MobileAppHome({ onShareClick, onViewChange, onNavigateToPage }: MobileAppHomeProps) {
  const { hasCreatedCard } = useUser();
  
  // Always start with 'mycard' tab - let MyCardTab handle new user state
  const [activeTab, setActiveTab] = useState<'mycard' | 'contacts' | 'ai' | 'settings'>('mycard');
  const [aiSubPage, setAiSubPage] = useState<string | null>(null);
  const { t } = useLanguage();

  // Always show all 4 tabs including My Card
  const tabs = [
    { id: 'mycard' as const, label: t('nav.myCard'), icon: CreditCard },
    { id: 'contacts' as const, label: t('nav.contacts'), icon: Users },
    { id: 'ai' as const, label: t('nav.ai'), icon: Sparkles },
    { id: 'settings' as const, label: t('nav.settings'), icon: Settings },
  ];

  const handleAINavigation = (page: string) => {
    setAiSubPage(page);
  };

  const handleBackToAI = () => {
    setAiSubPage(null);
  };

  const handleNavigateToHistory = () => {
    setAiSubPage('communication-history');
  };

  const handleBackToInsights = () => {
    setAiSubPage('communication-plan');
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Show sub-page if in AI section with navigation */}
        {activeTab === 'ai' && aiSubPage === 'communication-plan' ? (
          <div className="relative">
            <button
              onClick={handleBackToAI}
              className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-[#0F172A]/90 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
            <CommunicationPlanPage onNavigateToHistory={handleNavigateToHistory} />
          </div>
        ) : activeTab === 'ai' && aiSubPage === 'network-insights' ? (
          <div className="relative">
            <button
              onClick={handleBackToAI}
              className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-[#0F172A]/90 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
            <NetworkInsightsPage />
          </div>
        ) : activeTab === 'ai' && aiSubPage === 'communication-history' ? (
          <div className="relative">
            <button
              onClick={handleBackToInsights}
              className="fixed top-4 left-4 z-40 w-10 h-10 rounded-full bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-[#0F172A]/90 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
            <CommunicationHistoryPage />
          </div>
        ) : (
          <>
            {activeTab === 'mycard' && <MyCardTab onShareClick={onShareClick} />}
            {activeTab === 'contacts' && <ContactsTab />}
            {activeTab === 'ai' && <AITab onNavigate={handleAINavigation} onNavigateToPage={onNavigateToPage} />}
            {activeTab === 'settings' && <SettingsTab onViewChange={onViewChange} onNavigate={onNavigateToPage} />}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom z-50">
        <div className="max-w-md mx-auto flex items-center justify-around px-4 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAiSubPage(null); // Reset sub-page when changing tabs
                }}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? 'text-[#FACC15]' : 'text-white/60'
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}