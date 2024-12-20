"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Moon, Sun, LayoutPanelLeft, Send, Globe2 } from 'lucide-react';

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete, delay]);

  return <span className="transition-opacity duration-300">{displayText}</span>;
};

interface BlinkingCursorProps {
  isDark: boolean;
}

const BlinkingCursor: React.FC<BlinkingCursorProps> = ({ isDark }) => {
  return (
    <div className="inline-block ml-1 translate-y-2">
      <div className="animate-pulse">
        <LayoutPanelLeft
          size={36}
          color={isDark ? 'white' : 'black'}
          className="transform transition-transform duration-700 hover:scale-125"
        />
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState<'en' | 'da'>('en');
  const [conversationStep, setConversationStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const conversations: Record<
    'en' | 'da',
    { question: string; response: string }[]
  > = {
    en: [
      {
        question: 'Who are you?',
        response:
          "I'm Freyai, an advanced AI assistant specializing in financial analysis and machine learning insights. I'm here to help you interpret complex financial data, provide insights on company performance, and explain machine learning model outputs in clear, actionable terms. How can I assist you today?",
      },
      {
        question: "So you're just a chatbot?",
        response:
          "Not quite! Think of me more as your financial co-pilot with a PhD in ML. Unlike typical chatbots, I'm powered by specialized machine learning models trained on credit risk assessment, company performance metrics, and financial forecasting. I don't just chat – I analyze, predict, and explain complex financial patterns using real-time model outputs. Want to see what I can do with your data?",
      },
    ],
    da: [
      {
        question: 'Hvem er du?',
        response:
          'Jeg er Freyai, en avanceret AI-assistent specialiseret i finansiel analyse og machine learning-indsigt. Jeg er her for at hjælpe dig med at fortolke komplekse finansielle data, give indsigt i virksomheders præstation og forklare machine learning-modeloutput i klare, handlingsorienterede termer. Hvordan kan jeg hjælpe dig i dag?',
      },
      {
        question: 'Så du er bare en chatbot?',
        response:
          'Ikke helt! Tænk på mig mere som din økonomiske co-pilot med en PhD i ML. I modsætning til typiske chatbots er jeg drevet af specialiserede machine learning-modeller trænet i kreditrisikovurdering, virksomhedspræstationsmetrikker og økonomisk forecasting. Jeg chatter ikke bare – jeg analyserer, forudsiger og forklarer komplekse økonomiske mønstre ved hjælp af realtids-modeloutput. Vil du se, hvad jeg kan gøre med dine data?',
      },
    ],
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'da' : 'en';
    setLanguage(newLanguage);
    setConversationStep(0);
    setShowQuestion(false);
    setShowResponse(false);
    setIsQuestionComplete(false);
    setConversationComplete(false);

    setTimeout(() => {
      setShowQuestion(true);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(true);
      setTimeout(() => {
        setShowInterface(true);
      }, 2000);
    }, 500);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion(true);
    }, showInterface ? 500 : 3000);

    return () => clearTimeout(timer);
  }, [conversationStep, showInterface]);

  const handleQuestionComplete = () => {
    setIsQuestionComplete(true);
    setTimeout(() => {
      setShowResponse(true);
    }, 700);
  };

  const handleResponseComplete = () => {
    if (conversationStep < conversations[language].length - 1) {
      setTimeout(() => {
        setShowQuestion(false);
        setShowResponse(false);
        setIsQuestionComplete(false);
        setTimeout(() => {
          setConversationStep((prev) => prev + 1);
        }, 300);
      }, 1000);
    } else {
      setTimeout(() => {
        setConversationComplete(true);
      }, 1000);
    }
  };

  const placeholderText: Record<'en' | 'da', string> = {
    en: 'Ask me anything...',
    da: 'Spørg mig om hvad som helst...',
  };

  const bottomText: Record<'en' | 'da', { left: string; right: string }> = {
    en: { left: 'EARLY TEST VERSION', right: '#VCFO' },
    da: { left: 'TIDLIG TESTVERSION', right: '#VCFO' },
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} flex flex-col justify-center items-center relative transition-colors duration-300`}>
      {/* Theme and language toggle buttons */}
      <div className="absolute top-8 right-8 flex gap-4">
        <button 
          onClick={toggleLanguage}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 flex items-center gap-2"
        >
          <Globe2 className={`w-6 h-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`} />
          <span className="text-sm font-medium">{language.toUpperCase()}</span>
        </button>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-gray-100" />
          ) : (
            <Moon className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>
      
      {/* Main content container */}
      <div 
        className={`flex flex-col items-center space-y-8 transition-all duration-1000 ease-in-out transform ${
          showInterface ? 'translate-y-0' : 'translate-y-32'
        }`}
      >
        {/* Logo */}
        <div 
          className={`${isDark ? 'text-gray-100' : 'text-gray-900'} 
            text-6xl font-sans flex items-center transition-all duration-1000 ease-in-out
            ${showLogo ? 'opacity-100' : 'opacity-0'}`}
        >
          <span>freyai</span>
          <BlinkingCursor isDark={isDark} />
        </div>

        {/* Response area */}
        <div 
          className={`min-h-16 w-full max-w-2xl px-4 text-center 
            ${isDark ? 'text-gray-300' : 'text-gray-700'} 
            transition-all duration-1000 ease-in-out
            ${showInterface ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}
        >
          {showResponse && (
            <TypewriterText 
              text={conversations[language][conversationStep].response}
              delay={25}
              onComplete={handleResponseComplete}
            />
          )}
        </div>

        {/* Input form */}
        <div 
          className={`w-96 transition-all duration-1000 ease-in-out
            ${showInterface ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}
        >
          <div className="relative">
            <input
              type="text"
              readOnly
              className={`w-full px-4 py-3 rounded-lg ${
                isDark 
                  ? 'bg-gray-800 text-gray-100 border-gray-700' 
                  : 'bg-white text-gray-900 border-gray-200'
              } border focus:outline-none transition-colors duration-300`}
              placeholder=""
            />
            {/* Placeholder text or typing animation */}
            <div className="absolute inset-0 px-4 py-3 pointer-events-none">
              {(!showQuestion || conversationComplete) ? (
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'} transition-opacity duration-300`}>
                  {placeholderText[language]}
                </div>
              ) : (
                <TypewriterText 
                  text={conversations[language][conversationStep].question}
                  onComplete={handleQuestionComplete}
                  delay={100}
                />
              )}
            </div>
            {/* Send button */}
            <div
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                isQuestionComplete ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <Send className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom text container */}
      <div 
        className={`absolute bottom-8 w-full px-8 transition-all duration-1000 ease-in-out
          ${showInterface ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex justify-between text-sm transition-colors duration-300">
          {/* Bottom left text with Next.js Link */}
          <Link href="/alpha" className="hover:underline">
            {bottomText[language].left}
          </Link>
          {/* Bottom right text */}
          <span>{bottomText[language].right}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
