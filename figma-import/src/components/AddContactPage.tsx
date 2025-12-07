import { useState, useRef } from 'react';
import { ChevronLeft, Camera, Upload, User, Mail, Phone, Building2, Tag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AddContactPageProps {
  onBack: () => void;
}

export function AddContactPage({ onBack }: AddContactPageProps) {
  const { language } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setScanMode(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    setScanMode('camera');
    // In a real app, this would trigger camera access
    alert(language === 'zh' ? '打开相机扫描名片...' : 'Opening camera to scan card...');
  };

  const handleSaveContact = () => {
    alert(
      language === 'zh'
        ? 'AI 正在分析名片并创建联系人...'
        : 'AI is analyzing the card and creating contact...'
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
            {language === 'zh' ? '添加联系人' : 'Add Contact'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Instruction */}
        <div className="p-4 rounded-[20px] bg-gradient-to-br from-[#FACC15]/10 to-[#38BDF8]/10 border border-[#FACC15]/20">
          <p className="text-white text-sm text-center">
            {language === 'zh'
              ? '📸 拍照或上传名片照片，AI 将自动提取联系信息'
              : '📸 Take a photo or upload a card image, AI will extract contact info automatically'}
          </p>
        </div>

        {/* Upload Options */}
        {!uploadedImage && (
          <div className="space-y-3">
            <button
              onClick={handleCameraCapture}
              className="w-full p-6 rounded-[24px] bg-gradient-to-br from-[#FACC15]/20 to-[#F59E0B]/20 border-2 border-[#FACC15]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#FACC15]/30 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-[#FACC15]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white mb-1">
                    {language === 'zh' ? '拍摄名片' : 'Take Photo'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {language === 'zh' ? '使用相机扫描名片' : 'Use camera to scan card'}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 rounded-[24px] bg-gradient-to-br from-[#38BDF8]/20 to-[#0EA5E9]/20 border-2 border-[#38BDF8]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#38BDF8]/30 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-[#38BDF8]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white mb-1">
                    {language === 'zh' ? '上传照片' : 'Upload Photo'}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {language === 'zh' ? '从相册选择名片照片' : 'Select card photo from gallery'}
                  </p>
                </div>
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* Preview & AI Analysis */}
        {uploadedImage && (
          <div className="space-y-4">
            {/* Image Preview */}
            <div className="p-4 rounded-[24px] bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm mb-3">
                {language === 'zh' ? '名片预览' : 'Card Preview'}
              </p>
              <img
                src={uploadedImage}
                alt="Business card"
                className="w-full rounded-[16px] object-contain max-h-[200px]"
              />
              <button
                onClick={() => setUploadedImage(null)}
                className="w-full mt-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/80 text-sm transition-all"
              >
                {language === 'zh' ? '重新上传' : 'Re-upload'}
              </button>
            </div>

            {/* AI Extracted Info */}
            <div className="p-5 rounded-[24px] bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] flex items-center justify-center">
                  <User className="w-4 h-4 text-[#020617]" strokeWidth={1.5} />
                </div>
                <h3 className="text-white">
                  {language === 'zh' ? 'AI 识别信息' : 'AI Extracted Info'}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-white/5">
                  <User className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-1">
                      {language === 'zh' ? '姓名' : 'Name'}
                    </p>
                    <p className="text-white text-sm">John Smith</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-white/5">
                  <Building2 className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-1">
                      {language === 'zh' ? '公司' : 'Company'}
                    </p>
                    <p className="text-white text-sm">Tech Solutions Inc.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-white/5">
                  <Mail className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-1">
                      {language === 'zh' ? '邮箱' : 'Email'}
                    </p>
                    <p className="text-white text-sm">john@techsolutions.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-white/5">
                  <Phone className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-1">
                      {language === 'zh' ? '电话' : 'Phone'}
                    </p>
                    <p className="text-white text-sm">+1 234 567 8900</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-[12px] bg-white/5">
                  <Tag className="w-5 h-5 text-white/60" strokeWidth={1.5} />
                  <div className="flex-1">
                    <p className="text-white/60 text-xs mb-1">
                      {language === 'zh' ? '标签' : 'Tags'}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 rounded-full bg-[#FACC15]/20 text-[#FACC15] text-xs">
                        Business
                      </span>
                      <span className="px-2 py-1 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-xs">
                        Tech
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-white/40 text-xs text-center">
                  {language === 'zh'
                    ? '✨ AI 已自动识别并填充信息，你可以在保存后编辑'
                    : '✨ AI has auto-filled the information, you can edit after saving'}
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveContact}
              className="w-full p-4 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              {language === 'zh' ? '保存联系人' : 'Save Contact'}
            </button>
          </div>
        )}

        {/* Manual Entry Option */}
        <div className="p-4 rounded-[20px] bg-white/5 border border-white/10">
          <button className="w-full text-[#38BDF8] text-sm hover:text-[#38BDF8]/80 transition-all">
            {language === 'zh' ? '或手动输入联系信息' : 'Or enter contact info manually'}
          </button>
        </div>
      </div>
    </div>
  );
}
