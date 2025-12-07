import { useState } from 'react';
import { ChevronLeft, Check, Crown, Zap, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';

interface SubscriptionPageProps {
  onBack: () => void;
}

export function SubscriptionPage({ onBack }: SubscriptionPageProps) {
  const { language } = useLanguage();
  const { subscriptionPlan } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>(subscriptionPlan);

  const plans = [
    {
      id: 'free' as const,
      name: 'Free',
      chineseName: '免费版',
      price: 0,
      tokens: 200,
      icon: Zap,
      gradient: 'from-white/10 to-white/5',
      features: [
        language === 'zh' ? '200 AI 代币/月' : '200 AI tokens/month',
        language === 'zh' ? '基础名片功能' : 'Basic card features',
        language === 'zh' ? '最多 50 个联系人' : 'Up to 50 contacts',
        language === 'zh' ? '标准设计模板' : 'Standard templates',
      ],
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      chineseName: '专业版',
      price: 9.99,
      tokens: 1000,
      icon: Crown,
      gradient: 'from-[#FACC15] to-[#F59E0B]',
      popular: true,
      features: [
        language === 'zh' ? '1000 AI 代币/月' : '1000 AI tokens/month',
        language === 'zh' ? '高级名片功能' : 'Advanced card features',
        language === 'zh' ? '无限联系人' : 'Unlimited contacts',
        language === 'zh' ? '自定义设计模板' : 'Custom templates',
        language === 'zh' ? '网络洞察分析' : 'Network insights',
        language === 'zh' ? 'AI 沟通计划' : 'AI communication plans',
        language === 'zh' ? '优先客户支持' : 'Priority support',
      ],
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      chineseName: '企业版',
      price: 49.99,
      tokens: 10000,
      icon: Building2,
      gradient: 'from-[#38BDF8] to-[#0EA5E9]',
      features: [
        language === 'zh' ? '10000 AI 代币/月' : '10000 AI tokens/month',
        language === 'zh' ? '企业名片模板' : 'Corporate templates',
        language === 'zh' ? '团队管理功能' : 'Team management',
        language === 'zh' ? '多品牌支持' : 'Multi-brand support',
        language === 'zh' ? '高级分析报告' : 'Advanced analytics',
        language === 'zh' ? '专属客户支持' : 'Dedicated support',
        language === 'zh' ? 'API 访问' : 'API access',
        language === 'zh' ? '自定义集成' : 'Custom integrations',
      ],
    },
  ];

  const handleSubscribe = () => {
    if (selectedPlan === subscriptionPlan) {
      alert(language === 'zh' ? '你已经订阅了此计划' : 'You are already on this plan');
      return;
    }

    if (selectedPlan === 'free') {
      alert(language === 'zh' ? '你将降级到免费计划' : 'You will downgrade to the free plan');
    } else {
      alert(
        language === 'zh'
          ? `正在处理订阅 ${plans.find((p) => p.id === selectedPlan)?.chineseName}...`
          : `Processing subscription to ${selectedPlan}...`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-4 max-w-md mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.5} />
          </button>
          <h1 className="text-white text-xl">
            {language === 'zh' ? '订阅计划' : 'Subscription Plans'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
        <p className="text-white/60 text-sm mb-4">
          {language === 'zh'
            ? '选择最适合你的计划。随时可以升级或降级。'
            : 'Choose the plan that fits your needs. Upgrade or downgrade anytime.'}
        </p>

        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          const isCurrent = subscriptionPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative p-5 rounded-[24px] transition-all cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? 'bg-gradient-to-br ' + plan.gradient + ' border-2 border-white/30 scale-[1.01]'
                  : 'bg-white/5 border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#020617] text-xs">
                  {language === 'zh' ? '🔥 最受欢迎' : '🔥 Most Popular'}
                </div>
              )}

              {isCurrent && (
                <div className="absolute -top-2.5 right-4 px-3 py-1 rounded-full bg-[#38BDF8] text-[#020617] text-xs">
                  {language === 'zh' ? '当前计划' : 'Current'}
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : 'bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-white/60'}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className={`mb-1 ${isSelected ? 'text-white' : 'text-white'}`}>
                      {language === 'zh' ? plan.chineseName : plan.name}
                    </h3>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#020617]" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl ${isSelected ? 'text-white' : 'text-white'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                    {plan.price === 0
                      ? language === 'zh'
                        ? '永久免费'
                        : 'forever'
                      : language === 'zh'
                      ? '/月'
                      : '/month'}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                  {plan.tokens.toLocaleString()} {language === 'zh' ? '代币/月' : 'tokens/month'}
                </p>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isSelected ? 'text-white' : 'text-[#FACC15]'
                      }`}
                      strokeWidth={2}
                    />
                    <span
                      className={`text-xs ${isSelected ? 'text-white/90' : 'text-white/70'}`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          className="w-full p-4 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
        >
          {selectedPlan === subscriptionPlan
            ? language === 'zh'
              ? '当前计划'
              : 'Current Plan'
            : selectedPlan === 'free'
            ? language === 'zh'
              ? '降级到免费版'
              : 'Downgrade to Free'
            : language === 'zh'
            ? '立即订阅'
            : 'Subscribe Now'}
        </button>

        {/* Info */}
        <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
          <p className="text-white/60 text-xs text-center">
            {language === 'zh'
              ? '💳 所有计划均可随时取消。没有隐藏费用。'
              : '💳 All plans can be canceled anytime. No hidden fees.'}
          </p>
        </div>
      </div>
    </div>
  );
}