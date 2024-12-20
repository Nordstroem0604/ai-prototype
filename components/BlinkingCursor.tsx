import React from 'react';
import { LayoutPanelLeft } from 'lucide-react';

interface BlinkingCursorProps {
  isDark: boolean;
  size?: number;
  onClick?: () => void;
}

const BlinkingCursor: React.FC<BlinkingCursorProps> = ({ isDark, size = 24, onClick }) => {
  return (
    <div className="inline-block ml-1 translate-y-1 cursor-pointer" onClick={onClick}>
      <div className="animate-pulse">
        <LayoutPanelLeft 
          size={size}
          color={isDark ? "white" : "black"}
          className="transform transition-transform duration-700 hover:scale-125"
        />
      </div>
    </div>
  );
};

export default BlinkingCursor;
