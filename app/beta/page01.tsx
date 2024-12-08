"use client";

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const BetaPage: React.FC = () => {
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
      <div className="max-w-2xl px-6 text-center">
        <div className={`${isDark ? 'text-white' : 'text-black'} text-6xl font-sans mb-8 transition-colors duration-300`}>
          Welcome to the Beta
        </div>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-xl mb-12 transition-colors duration-300`}>
          Thank you for your interest in freyai. We're excited to have you join our beta testing community.
        </p>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg transition-colors duration-300`}>
          We'll be in touch soon with your access details.
        </p>
      </div>

      {/* Bottom text container */}
      <div className="absolute bottom-8 w-full px-8">
        <div className={`flex justify-between ${isDark ? 'text-white' : 'text-black'} text-sm transition-colors duration-300`}>
          {/* Bottom left text */}
          <a href="/" className="hover:underline">← back home</a>
          {/* Bottom right text */}
          <span>#VCFO</span>
        </div>
      </div>
    </div>
  );
};

export default BetaPage;