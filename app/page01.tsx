"use client";

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface BlinkingCursorProps {
  isDark: boolean;
}

const BlinkingCursor: React.FC<BlinkingCursorProps> = ({ isDark }) => (
  <svg 
    width="32" 
    height="48" 
    viewBox="0 0 32 48" 
    className="inline-block ml-1 translate-y-1"
  >
    <rect 
      width="32" 
      height="48" 
      fill={isDark ? "white" : "black"}
    >
      <animate 
        attributeName="opacity"
        values="1;1;0;0"
        dur="1.4s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);

const Page: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} flex flex-col justify-center items-center relative transition-colors duration-300`}>
      {/* Theme toggle button */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="absolute top-8 right-8 p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-white" />
        ) : (
          <Moon className="w-6 h-6 text-black" />
        )}
      </button>
      {/* Main content container */}
      <div className={`${isDark ? 'text-white' : 'text-black'} text-6xl font-sans flex items-center transition-colors duration-300`}>
        {/* Main text */}
        <span>freyai</span>
        {/* SVG Blinking cursor */}
        <BlinkingCursor isDark={isDark} />
      </div>
      {/* Bottom text container */}
      <div className="absolute bottom-8 w-full px-8">
        <div className={`flex justify-between ${isDark ? 'text-white' : 'text-black'} text-sm transition-colors duration-300`}>
          {/* Bottom left text with link */}
          <a href="/beta" className="hover:underline">try the beta</a>
          {/* Bottom right text */}
          <span>#VCFO</span>
        </div>
      </div>
    </div>
  );
};

export default Page;