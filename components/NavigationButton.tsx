import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
  isDark: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, disabled, isDark }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-full transition-all duration-300 
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-500/20 cursor-pointer'}`}
    >
      <Icon 
        className={`w-6 h-6 ${isDark ? 'text-white' : 'text-gray-900'}`} 
        strokeWidth={1.5}
      />
    </button>
  );
};

export default NavigationButton;

