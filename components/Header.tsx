import React from 'react';
import { Sun, Moon, Globe2 } from 'lucide-react';
import BlinkingCursor from '@/components/BlinkingCursor';

interface HeaderProps {
  isDark: boolean;
  language: string;
  setLanguage: (lang: 'en' | 'da') => void; // Updated here
  setIsDark: (val: boolean) => void;
  isFeatureBoxVisible: boolean;
  setIsFeatureBoxVisible: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  language,
  setLanguage,
  setIsDark,
  isFeatureBoxVisible,
  setIsFeatureBoxVisible
}) => {
  const bgColor = isDark ? 'bg-slate-800' : 'bg-slate-100';
  const textColor = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div className={`py-3 px-6 ${bgColor}`}>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className={`text-2xl font-sans flex items-center ${textColor}`}>
          <span>freyai</span>
          <BlinkingCursor 
            isDark={isDark} 
            size={28} 
            onClick={() => setIsFeatureBoxVisible(!isFeatureBoxVisible)}
          />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'da' : 'en')}
            className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 flex items-center gap-2 ${textColor} opacity-80 hover:opacity-100`}
          >
            <Globe2 className="w-5 h-5" />
            <span className="text-sm font-medium">{language.toUpperCase()}</span>
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 ${textColor} opacity-80 hover:opacity-100`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

