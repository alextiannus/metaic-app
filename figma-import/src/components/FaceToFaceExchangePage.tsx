import { useState } from 'react';
import { ChevronLeft, QrCode, Scan, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FaceToFaceExchangePageProps {
  onBack: () => void;
}

export function FaceToFaceExchangePage({ onBack }: FaceToFaceExchangePageProps) {
  const { language } = useLanguage();
  const [mode, setMode] = useState<'show' | 'scan'>('show');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 3000);
    }, 2000);
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
            {language === 'zh' ? '面对面交换' : 'Face to Face Exchange'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Mode Toggle */}
        <div className="p-1 rounded-full bg-white/5 border border-white/10 flex">
          <button
            onClick={() => setMode('show')}
            className={`flex-1 py-3 rounded-full transition-all ${
              mode === 'show'
                ? 'bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">{language === 'zh' ? '展示我的' : 'Show Mine'}</span>
            </div>
          </button>
          <button
            onClick={() => setMode('scan')}
            className={`flex-1 py-3 rounded-full transition-all ${
              mode === 'scan'
                ? 'bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Scan className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">{language === 'zh' ? '扫描对方' : 'Scan Theirs'}</span>
            </div>
          </button>
        </div>

        {/* Show QR Code Mode */}
        {mode === 'show' && (
          <div className="space-y-6">
            {/* Instruction */}
            <div className="p-4 rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20">
              <p className="text-white text-sm text-center">
                {language === 'zh'
                  ? '👋 让对方扫描你的二维码以交换名片'
                  : '👋 Let others scan your QR code to exchange cards'}
              </p>
            </div>

            {/* QR Code Display */}
            <div className="p-8 rounded-[28px] bg-white/5 border border-white/10 flex flex-col items-center">
              <div className="w-64 h-64 rounded-[24px] bg-white p-4 mb-4 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] rounded-[16px] flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-white" strokeWidth={1} />
                </div>
              </div>
              <p className="text-white mb-1">Alex Tian Ye</p>
              <p className="text-white/60 text-sm">metaic.ai/u/alextianye</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-[20px] bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-[#FACC15]/20 flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                </div>
                <p className="text-white text-sm mb-1">
                  {language === 'zh' ? '即时交换' : 'Instant'}
                </p>
                <p className="text-white/60 text-xs">
                  {language === 'zh' ? '快速分享' : 'Quick share'}
                </p>
              </div>
              <div className="p-4 rounded-[20px] bg-white/5 border border-white/10 text-center">
                <div className="w-10 h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center mx-auto mb-2">
                  <UserPlus className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <p className="text-white text-sm mb-1">
                  {language === 'zh' ? '自动保存' : 'Auto-save'}
                </p>
                <p className="text-white/60 text-xs">
                  {language === 'zh' ? '双向同步' : 'Both ways'}
                </p>
              </div>
            </div>

            {/* Brightness Tip */}
            <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs text-center">
                {language === 'zh'
                  ? '💡 提示：调高屏幕亮度可以更容易扫描'
                  : '💡 Tip: Increase screen brightness for easier scanning'}
              </p>
            </div>
          </div>
        )}

        {/* Scan QR Code Mode */}
        {mode === 'scan' && (
          <div className="space-y-6">
            {/* Instruction */}
            <div className="p-4 rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20">
              <p className="text-white text-sm text-center">
                {language === 'zh'
                  ? '📸 将对方的二维码放在扫描框内'
                  : '📸 Place their QR code within the scanning frame'}
              </p>
            </div>

            {/* Scanner */}
            <div className="relative p-8 rounded-[28px] bg-white/5 border border-white/10 flex flex-col items-center">
              {!isScanning && !scanSuccess && (
                <>
                  <div className="w-64 h-64 rounded-[24px] border-4 border-dashed border-[#FACC15]/40 flex items-center justify-center mb-6 relative overflow-hidden">
                    <Scan className="w-24 h-24 text-[#FACC15]/60" strokeWidth={1.5} />
                    {/* Scanning line animation */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FACC15] to-transparent animate-pulse"></div>
                  </div>
                  <button
                    onClick={handleStartScan}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.05] active:scale-95 transition-all shadow-lg"
                  >
                    {language === 'zh' ? '开始扫描' : 'Start Scanning'}
                  </button>
                </>
              )}

              {isScanning && (
                <div className="w-64 h-64 rounded-[24px] border-4 border-[#FACC15] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FACC15]/20 to-transparent animate-pulse"></div>
                  <Scan className="w-24 h-24 text-[#FACC15] animate-pulse" strokeWidth={1.5} />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#FACC15] animate-bounce"></div>
                </div>
              )}

              {scanSuccess && (
                <div className="w-64 h-64 rounded-[24px] bg-gradient-to-br from-[#10B981]/20 to-[#059669]/20 border-4 border-[#10B981] flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-24 h-24 text-[#10B981] mb-4" strokeWidth={1.5} />
                  <p className="text-white mb-1">
                    {language === 'zh' ? '扫描成功！' : 'Scan Successful!'}
                  </p>
                  <p className="text-white/60 text-sm">John Smith</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="space-y-3">
              <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FACC15]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FACC15]">1</span>
                  </div>
                  <div>
                    <p className="text-white text-sm mb-1">
                      {language === 'zh' ? '对准二维码' : 'Align QR code'}
                    </p>
                    <p className="text-white/60 text-xs">
                      {language === 'zh'
                        ? '确保二维码完全在扫描框内'
                        : 'Make sure QR code is fully in frame'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#38BDF8]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#38BDF8]">2</span>
                  </div>
                  <div>
                    <p className="text-white text-sm mb-1">
                      {language === 'zh' ? '保持稳定' : 'Hold steady'}
                    </p>
                    <p className="text-white/60 text-xs">
                      {language === 'zh'
                        ? '保持手机稳定以获得最佳扫描效果'
                        : 'Keep phone steady for best scanning results'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
