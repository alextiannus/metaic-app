import { Settings } from 'lucide-react';

interface DemoToggleProps {
  currentMode: 'demo' | 'auth';
  onToggle: () => void;
}

export function DemoToggle({ currentMode, onToggle }: DemoToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-[#0F172A]/90 transition-all flex items-center gap-2"
    >
      <Settings className="w-4 h-4 text-white" strokeWidth={1.5} />
      <span className="text-white text-xs">
        {currentMode === 'demo' ? 'View Login Flow' : 'Skip to Demo'}
      </span>
    </button>
  );
}
