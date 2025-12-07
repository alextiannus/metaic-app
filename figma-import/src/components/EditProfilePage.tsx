import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, Plus, X, Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { businessCardData } from '../data/businessCardData';

interface EditProfilePageProps {
  onBack: () => void;
}

interface SectionVisibility {
  [key: string]: boolean;
}

export function EditProfilePage({ onBack }: EditProfilePageProps) {
  const { language } = useLanguage();
  const [visibility, setVisibility] = useState<SectionVisibility>({
    avatar: true,
    fullName: true,
    chineseName: true,
    title: true,
    tagline: true,
    phones: true,
    emails: true,
    socialMedia: true,
    businesses: true,
    about: true,
    skills: true,
    languages: true,
    interests: true,
    networking: true,
    photos: true,
  });

  const toggleVisibility = (section: string) => {
    setVisibility((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      id: 'avatar',
      title: language === 'zh' ? '头像' : 'Avatar',
      content: businessCardData.personal.avatar,
      type: 'image',
    },
    {
      id: 'fullName',
      title: language === 'zh' ? '姓名' : 'Full Name',
      content: businessCardData.personal.fullName,
      type: 'text',
    },
    {
      id: 'chineseName',
      title: language === 'zh' ? '中文名' : 'Chinese Name',
      content: businessCardData.personal.chineseName,
      type: 'text',
    },
    {
      id: 'title',
      title: language === 'zh' ? '职位' : 'Title',
      content: businessCardData.personal.title,
      type: 'text',
    },
    {
      id: 'tagline',
      title: language === 'zh' ? '标语' : 'Tagline',
      content: businessCardData.personal.tagline,
      type: 'text',
    },
    {
      id: 'phones',
      title: language === 'zh' ? '电话' : 'Phones',
      content: businessCardData.contact.phones.map((p) => p.number).join(', '),
      type: 'list',
    },
    {
      id: 'emails',
      title: language === 'zh' ? '邮箱' : 'Emails',
      content: businessCardData.contact.emails.map((e) => e.email).join(', '),
      type: 'list',
    },
    {
      id: 'socialMedia',
      title: language === 'zh' ? '社交媒体' : 'Social Media',
      content: (() => {
        const links = businessCardData.links;
        const socialAccounts = [
          links.linkedin,
          links.twitter,
          links.github,
          links.wechat,
          links.whatsapp,
          links.telegram,
        ].filter(Boolean);
        return `${socialAccounts.length} accounts`;
      })(),
      type: 'list',
    },
    {
      id: 'businesses',
      title: language === 'zh' ? '公司' : 'Businesses',
      content: businessCardData.businesses.map((b) => b.name).join(', '),
      type: 'list',
    },
    {
      id: 'about',
      title: language === 'zh' ? '关于我' : 'About',
      content: businessCardData.professional?.headline || '',
      type: 'textarea',
    },
    {
      id: 'skills',
      title: language === 'zh' ? '技能' : 'Skills',
      content: `${businessCardData.professional?.expertise?.length || 0} skills`,
      type: 'list',
    },
    {
      id: 'languages',
      title: language === 'zh' ? '语言' : 'Languages',
      content: businessCardData.professional?.languages?.join(', ') || (language === 'zh' ? '未设置' : 'Not set'),
      type: 'list',
    },
    {
      id: 'interests',
      title: language === 'zh' ? '兴趣爱好' : 'Interests',
      content: businessCardData.personal_interests?.hobbies?.join(', ') || (language === 'zh' ? '未设置' : 'Not set'),
      type: 'list',
    },
    {
      id: 'networking',
      title: language === 'zh' ? '社交偏好' : 'Networking Preferences',
      content: `${businessCardData.networking?.lookingFor?.length || 0} preferences`,
      type: 'list',
    },
    {
      id: 'photos',
      title: language === 'zh' ? '相册' : 'Photo Gallery',
      content: language === 'zh' ? '上传更多照片' : 'Upload more photos',
      type: 'gallery',
    },
  ];

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
            {language === 'zh' ? '编辑我的名片' : 'Edit My Card'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-3 max-w-md mx-auto">
        <p className="text-white/60 text-sm mb-4">
          {language === 'zh'
            ? '编辑每个部分的内容，并设置在名片中的可见性'
            : 'Edit each section and control its visibility on your card'}
        </p>

        {sections.map((section) => (
          <div
            key={section.id}
            className="p-4 rounded-[20px] bg-white/5 border border-white/10"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white text-sm">{section.title}</h3>
                  <button
                    onClick={() => toggleVisibility(section.id)}
                    className={`p-1.5 rounded-full transition-all active:scale-95 ${
                      visibility[section.id]
                        ? 'bg-[#FACC15]/20 text-[#FACC15]'
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    {visibility[section.id] ? (
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                    ) : (
                      <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                {section.type === 'image' ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={section.content}
                      alt="Avatar"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <button className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-white/80 text-xs transition-all">
                      {language === 'zh' ? '更换头像' : 'Change'}
                    </button>
                  </div>
                ) : section.type === 'gallery' ? (
                  <div className="flex items-center gap-3">
                    <button className="w-16 h-16 rounded-[12px] border-2 border-dashed border-white/20 hover:border-[#FACC15]/50 active:scale-95 flex items-center justify-center transition-all">
                      <Plus className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                    </button>
                    <p className="text-white/60 text-xs">{section.content}</p>
                  </div>
                ) : (
                  <p className="text-white/80 text-sm truncate">{section.content}</p>
                )}
              </div>
            </div>

            {section.id !== 'avatar' && section.id !== 'photos' && (
              <button className="w-full mt-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#38BDF8] text-sm transition-all">
                {language === 'zh' ? '编辑' : 'Edit'}
              </button>
            )}
          </div>
        ))}

        {/* Save Button */}
        <button className="w-full p-4 rounded-full bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:scale-[1.02] transition-all shadow-lg">
          {language === 'zh' ? '保存更改' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}