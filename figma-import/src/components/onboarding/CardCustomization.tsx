import { useState } from 'react';
import { Palette, Check, Sparkles, ArrowRight } from 'lucide-react';

interface CardCustomizationProps {
  onComplete: (customization: CardCustomization) => void;
  onBack?: () => void;
}

interface CardCustomization {
  theme: 'dark' | 'light';
  primaryColor: string;
  secondaryColor: string;
  style: 'modern' | 'classic' | 'minimal' | 'gradient';
}

const colorThemes = [
  {
    id: 'yellow-blue',
    name: 'Yellow & Blue',
    primary: '#FACC15',
    secondary: '#38BDF8',
    gradient: 'from-[#FACC15] to-[#38BDF8]',
  },
  {
    id: 'purple-pink',
    name: 'Purple & Pink',
    primary: '#A855F7',
    secondary: '#EC4899',
    gradient: 'from-[#A855F7] to-[#EC4899]',
  },
  {
    id: 'green-teal',
    name: 'Green & Teal',
    primary: '#10B981',
    secondary: '#14B8A6',
    gradient: 'from-[#10B981] to-[#14B8A6]',
  },
  {
    id: 'orange-red',
    name: 'Orange & Red',
    primary: '#F59E0B',
    secondary: '#EF4444',
    gradient: 'from-[#F59E0B] to-[#EF4444]',
  },
  {
    id: 'blue-indigo',
    name: 'Blue & Indigo',
    primary: '#3B82F6',
    secondary: '#6366F1',
    gradient: 'from-[#3B82F6] to-[#6366F1]',
  },
  {
    id: 'cyan-blue',
    name: 'Cyan & Blue',
    primary: '#06B6D4',
    secondary: '#0EA5E9',
    gradient: 'from-[#06B6D4] to-[#0EA5E9]',
  },
];

const cardStyles = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Glassmorphism with gradient accents',
    preview: 'rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Clean and professional',
    preview: 'rounded-xl bg-white/95 border border-gray-200',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant',
    preview: 'rounded-lg bg-[#0F172A]/60 border border-white/5',
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Bold gradient background',
    preview: 'rounded-[24px] bg-gradient-to-br border-none',
  },
];

export function CardCustomization({ onComplete, onBack }: CardCustomizationProps) {
  const [customization, setCustomization] = useState<CardCustomization>({
    theme: 'dark',
    primaryColor: '#FACC15',
    secondaryColor: '#38BDF8',
    style: 'modern',
  });

  const selectedColorTheme = colorThemes.find(
    (t) => t.primary === customization.primaryColor
  ) || colorThemes[0];

  const handleSubmit = () => {
    onComplete(customization);
  };

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FACC15] to-[#38BDF8] mb-4">
            <Palette className="w-8 h-8 text-[#020617]" strokeWidth={1.5} />
          </div>
          <h1 className="text-white text-2xl mb-2">Customize Your Card</h1>
          <p className="text-white/60 text-sm">Choose colors and style for your business card</p>
        </div>

        <div className="space-y-4">
          {/* Preview Card */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
              <h2 className="text-white text-sm">Preview</h2>
            </div>

            {/* Mini Card Preview */}
            <div
              className={`${
                customization.style === 'modern'
                  ? 'rounded-[20px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10'
                  : customization.style === 'classic'
                  ? 'rounded-xl bg-white/95'
                  : customization.style === 'minimal'
                  ? 'rounded-lg bg-[#0F172A]/60 border border-white/5'
                  : `rounded-[20px] bg-gradient-to-br ${selectedColorTheme.gradient}`
              } p-6 shadow-lg`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedColorTheme.gradient} p-1`}
                >
                  <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-2xl">
                    👤
                  </div>
                </div>
                <div className="flex-1">
                  <h3
                    className={`${
                      customization.style === 'classic' ? 'text-gray-900' : 'text-white'
                    } mb-1`}
                  >
                    Your Name
                  </h3>
                  <p
                    className="text-sm mb-1"
                    style={{ color: customization.primaryColor }}
                  >
                    Your Title
                  </p>
                  <p className="text-xs" style={{ color: customization.secondaryColor }}>
                    Your Company
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 text-sm">Theme</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCustomization({ ...customization, theme: 'dark' })}
                className={`py-3 px-4 rounded-xl transition-all ${
                  customization.theme === 'dark'
                    ? 'bg-[#FACC15] text-[#020617] border border-[#FACC15]'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-sm">Dark Mode</span>
              </button>
              <button
                onClick={() => setCustomization({ ...customization, theme: 'light' })}
                className={`py-3 px-4 rounded-xl transition-all ${
                  customization.theme === 'light'
                    ? 'bg-[#FACC15] text-[#020617] border border-[#FACC15]'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="text-sm">Light Mode</span>
              </button>
            </div>
          </div>

          {/* Color Selection */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 text-sm">Color Theme</h2>
            <div className="grid grid-cols-2 gap-3">
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() =>
                    setCustomization({
                      ...customization,
                      primaryColor: theme.primary,
                      secondaryColor: theme.secondary,
                    })
                  }
                  className={`p-4 rounded-xl transition-all ${
                    selectedColorTheme.id === theme.id
                      ? 'bg-white/10 border-2 border-white/30'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.gradient}`}
                    ></div>
                    {selectedColorTheme.id === theme.id && (
                      <Check className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="text-white text-xs text-left">{theme.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Style Selection */}
          <div className="rounded-[24px] bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-2xl">
            <h2 className="text-white mb-4 text-sm">Card Style</h2>
            <div className="space-y-3">
              {cardStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() =>
                    setCustomization({
                      ...customization,
                      style: style.id as CardCustomization['style'],
                    })
                  }
                  className={`w-full p-4 rounded-xl transition-all text-left ${
                    customization.style === style.id
                      ? 'bg-white/10 border-2 border-[#FACC15]'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white text-sm">{style.name}</h3>
                    {customization.style === style.id && (
                      <Check className="w-5 h-5 text-[#FACC15]" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="text-white/60 text-xs">{style.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#38BDF8] text-[#020617] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span className="font-medium">Create My Card</span>
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {onBack && (
            <button
              onClick={onBack}
              className="w-full py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <span className="text-sm">Back</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
