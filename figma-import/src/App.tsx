import { useState, useEffect } from 'react';
import { AlexTianYeCard } from './components/AlexTianYeCard';
import { MobileApp } from './components/MobileApp';
import { MobileAppHome } from './components/MobileAppHome';
import { LoginPage } from './components/auth/LoginPage';
import { PhoneEmailLoginPage } from './components/auth/PhoneEmailLoginPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { EditProfilePage } from './components/EditProfilePage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { BuyMeCoffeePage } from './components/BuyMeCoffeePage';
import { DemoToggle } from './components/DemoToggle';
import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
import { ArrowLeft } from 'lucide-react';

type AppView = 'login' | 'phoneEmailLogin' | 'onboarding' | 'public' | 'mobile' | 'mobileapp' | 'editProfile' | 'subscription' | 'coffee';

export default function App() {
  // Demo mode toggle - set to 'demo' to skip login, 'auth' to show login flow
  const [demoMode, setDemoMode] = useState<'demo' | 'auth'>('demo');
  const [currentView, setCurrentView] = useState<AppView>(demoMode === 'demo' ? 'mobileapp' : 'login');
  const [navigationHistory, setNavigationHistory] = useState<AppView[]>([demoMode === 'demo' ? 'mobileapp' : 'login']);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Update view when demo mode changes
  useEffect(() => {
    if (demoMode === 'demo') {
      setCurrentView('mobileapp');
      setNavigationHistory(['mobileapp']);
    } else {
      setCurrentView('login');
      setNavigationHistory(['login']);
    }
  }, [demoMode]);

  // Listen for share button click event
  useEffect(() => {
    const handleShareClick = () => {
      navigateToView('mobile');
    };

    window.addEventListener('openSharingPage', handleShareClick);
    return () => window.removeEventListener('openSharingPage', handleShareClick);
  }, []);

  const navigateToView = (view: AppView) => {
    setNavigationHistory(prev => [...prev, view]);
    setCurrentView(view);
  };

  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousView = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentView(previousView);
    }
  };

  const handleLogin = () => {
    // Simulate checking if user is new (in real app, this would be from backend)
    const isNew = false; // Change to true to test onboarding flow
    setIsNewUser(isNew);
    
    if (isNew) {
      navigateToView('onboarding');
    } else {
      navigateToView('mobileapp');
    }
  };

  const handleSignUp = () => {
    setIsNewUser(true);
    navigateToView('onboarding');
  };

  const handleOtherMethods = () => {
    navigateToView('phoneEmailLogin');
  };

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    console.log('User data:', data);
    navigateToView('mobileapp');
  };

  const canGoBack = navigationHistory.length > 1 && currentView !== 'login';

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen bg-[#020617]">
          {/* Demo Toggle */}
          <DemoToggle 
            currentMode={demoMode}
            onToggle={() => setDemoMode(prev => prev === 'demo' ? 'auth' : 'demo')}
          />

          {/* Render Current View */}
          <div>
            {currentView === 'login' && (
              <LoginPage 
                onLogin={handleLogin} 
                onSignUp={handleSignUp} 
                onOtherMethods={handleOtherMethods}
              />
            )}
            {currentView === 'phoneEmailLogin' && (
              <PhoneEmailLoginPage 
                onBack={navigateBack}
                onLogin={handleLogin} 
                onSignUp={handleSignUp} 
              />
            )}
            {currentView === 'onboarding' && (
              <OnboardingFlow onComplete={handleOnboardingComplete} />
            )}
            {currentView === 'public' && <AlexTianYeCard />}
            {currentView === 'mobile' && <MobileApp />}
            {currentView === 'mobileapp' && (
              <MobileAppHome 
                onShareClick={() => navigateToView('mobile')}
                onViewChange={(view) => navigateToView(view as AppView)}
                onNavigateToPage={(page) => navigateToView(page)}
              />
            )}
            {currentView === 'editProfile' && <EditProfilePage onBack={navigateBack} />}
            {currentView === 'subscription' && <SubscriptionPage onBack={navigateBack} />}
            {currentView === 'coffee' && <BuyMeCoffeePage onBack={navigateBack} />}
          </div>

          {/* Back Button */}
          {canGoBack && (
            <button
              onClick={navigateBack}
              className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-[#0F172A]/90 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}