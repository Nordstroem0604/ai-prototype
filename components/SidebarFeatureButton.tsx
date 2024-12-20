import React from 'react';

interface Feature {
  title: string;
  description: string;
}

interface SidebarFeatureButtonProps {
  feature: Feature;
  isActive: boolean;
  isDark: boolean;
  onClick: () => void;
}

const SidebarFeatureButton: React.FC<SidebarFeatureButtonProps> = ({ feature, isActive, isDark, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all duration-300
      ${isActive 
        ? (isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black')
        : (isDark ? 'text-slate-300 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100')}
      `}
    >
      <h4 className="font-medium">{feature.title}</h4>
      <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {feature.description.substring(0, 60)}...
      </p>
    </button>
  );
};

export default SidebarFeatureButton;
