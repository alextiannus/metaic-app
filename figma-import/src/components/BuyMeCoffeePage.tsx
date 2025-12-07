import { useState } from 'react';
import { ChevronLeft, Coffee, Minus, Plus, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BuyMeCoffeePageProps {
  onBack: () => void;
}

export function BuyMeCoffeePage({ onBack }: BuyMeCoffeePageProps) {
  const { language } = useLanguage();
  const [coffeeCount, setCoffeeCount] = useState(1);
  const pricePerCoffee = 6.5;
  const totalAmount = coffeeCount * pricePerCoffee;

  const handleIncrement = () => {
    setCoffeeCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (coffeeCount > 1) {
      setCoffeeCount((prev) => prev - 1);
    }
  };

  const handleProceedPayment = () => {
    alert(
      language === 'zh'
        ? `正在处理 $${totalAmount.toFixed(2)} USD 的支付...`
        : `Processing payment of $${totalAmount.toFixed(2)} USD...`
    );
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
            {language === 'zh' ? '请我喝咖啡' : 'Buy Me a Coffee'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Coffee Illustration */}
        <div className="p-6 rounded-[24px] bg-gradient-to-br from-[#FACC15]/20 to-[#F59E0B]/20 border border-[#FACC15]/30 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B] flex items-center justify-center mb-4">
            <Coffee className="w-10 h-10 text-[#020617]" strokeWidth={1.5} />
          </div>
          <h2 className="text-white mb-2 text-center">
            {language === 'zh' ? '支持 MetaIC' : 'Support MetaIC'}
          </h2>
          <p className="text-white/60 text-sm text-center">
            {language === 'zh'
              ? '你的支持帮助我们继续改进和维护这个应用'
              : 'Your support helps us keep improving and maintaining this app'}
          </p>
        </div>

        {/* Coffee Counter */}
        <div className="p-5 rounded-[24px] bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm mb-4">
            {language === 'zh' ? '选择咖啡数量' : 'Select number of coffees'}
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleDecrement}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={coffeeCount <= 1}
            >
              <Minus className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>

            <div className="text-center min-w-[80px]">
              <div className="text-white text-3xl mb-1">{coffeeCount}</div>
              <p className="text-white/60 text-xs">
                {coffeeCount === 1
                  ? language === 'zh'
                    ? '杯咖啡'
                    : 'coffee'
                  : language === 'zh'
                  ? '杯咖啡'
                  : 'coffees'}
              </p>
            </div>

            <button
              onClick={handleIncrement}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center transition-all"
            >
              <Plus className="w-5 h-5 text-white" strokeWidth={1.5} />
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-sm">
                {language === 'zh' ? '每杯价格' : 'Price per coffee'}
              </span>
              <span className="text-white text-sm">${pricePerCoffee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">{language === 'zh' ? '总计' : 'Total'}</span>
              <span className="text-white text-2xl">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <p className="text-white/60 text-sm">
            {language === 'zh' ? '支付方式' : 'Payment Methods'}
          </p>

          <button
            onClick={handleProceedPayment}
            className="w-full p-4 rounded-[20px] bg-gradient-to-r from-[#FACC15] to-[#F59E0B] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#020617]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <p className="text-[#020617] text-sm">
                  {language === 'zh' ? '信用卡 / 借记卡' : 'Credit / Debit Card'}
                </p>
                <p className="text-[#020617]/60 text-xs">Visa, Mastercard, Amex</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 rounded-[20px] bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-lg">🍎</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm">Apple Pay</p>
                <p className="text-white/60 text-xs">
                  {language === 'zh' ? '快速安全支付' : 'Fast & secure'}
                </p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 rounded-[20px] bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <span className="text-lg">G</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm">Google Pay</p>
                <p className="text-white/60 text-xs">
                  {language === 'zh' ? '快速安全支付' : 'Fast & secure'}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
          <p className="text-white/60 text-xs text-center">
            {language === 'zh'
              ? '💝 感谢你的支持！你的捐赠将帮助我们继续开发更多功能。'
              : '💝 Thank you for your support! Your donation helps us continue developing new features.'}
          </p>
        </div>
      </div>
    </div>
  );
}