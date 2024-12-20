"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Globe2, Send, LayoutPanelLeft, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

// Types and Interfaces
interface Message {
  content: string;
  isUser: boolean;
}

interface MessagePair {
  userMessage: Message;
  botMessage: Message;
}

interface Languages {
  en: string[];
  da: string[];
}

interface Responses {
  en: Record<string, string>;
  da: Record<string, string>;
}

interface BlinkingCursorProps {
  isDark: boolean;
  size?: number;
}

interface QuickReplyButtonProps {
  text: string;
  onClick: () => void;
  isVisible?: boolean;
}

interface ChatMessageProps {
  message: Message;
  isDark: boolean;
}

interface NavigationButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  disabled: boolean;
  isDark: boolean;
}

const BlinkingCursor: React.FC<BlinkingCursorProps> = ({ isDark, size = 24 }) => {
  return (
    <div className="inline-block ml-1 translate-y-1">
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

const QuickReplyButton: React.FC<QuickReplyButtonProps> = ({ text, onClick, isVisible = true }) => {
  if (!isVisible) return null;
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-sm text-white bg-black hover:bg-black/80 transition-colors duration-300"
    >
      {text}
    </button>
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDark }) => (
  <div className={`max-w-xl ${message.isUser ? 'ml-auto' : ''}`}>
    <div className={`rounded-lg px-4 py-2 ${
      message.isUser
        ? 'ml-auto bg-black text-white w-fit'
        : isDark ? 'text-white w-full' : 'text-gray-900 w-full'
    } ${!message.isUser ? 'whitespace-pre-line' : ''}`}>
      {message.content}
    </div>
  </div>
);

const NavigationButton: React.FC<NavigationButtonProps> = ({ icon: Icon, onClick, disabled, isDark }) => (
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

const ChatInterface: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [language, setLanguage] = useState<'en' | 'da'>('en');
  const [messageHistory, setMessageHistory] = useState<MessagePair[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [welcomeMessage, setWelcomeMessage] = useState<Message>({
    content: language === 'en' 
      ? "Welcome to freyai. What companies do you want to explore today?"
      : "Velkommen til freyai. Hvilke virksomheder vil du udforske i dag?",
    isUser: false
  });
  const [usedReplies, setUsedReplies] = useState<Set<string>>(new Set());
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies: Languages = {
    en: [
      "Who are you?",
      "How can you help me (features)",
      "What data do you have access to?"
    ],
    da: [
      "Hvem er du?",
      "Hvordan kan du hjælpe mig (funktioner)",
      "Hvilke data har du adgang til?"
    ]
  };

  const responses: Responses = {
    en: {
      "Who are you?": "I'm Freyai, an advanced AI assistant specializing in financial analysis and machine learning insights. I'm here to help you interpret complex financial data, provide insights on company performance, and explain machine learning model outputs in clear, actionable terms. How can I assist you today?",
      "How can you help me (features)": "I can help you with:\n\n📊 Financial data analysis and visualization\n🔍 Credit risk assessment and modeling\n📈 Market trend analysis and forecasting\n🤖 ML model interpretation and insights\n💡 Strategic business recommendations",
      "What data do you have access to?": "I have access to comprehensive financial and business data, including:\n\n📈 Historical market data\n📊 Company financials and metrics\n📑 Industry reports and trends\n🔍 Credit risk assessments\n📋 Regulatory filings"
    },
    da: {
      "Hvem er du?": "Jeg er Freyai, en avanceret AI-assistent specialiseret i finansiel analyse og machine learning-indsigt. Jeg er her for at hjælpe dig med at fortolke komplekse finansielle data, give indsigt i virksomheders præstation og forklare machine learning-modeloutput i klare, handlingsorienterede termer. Hvordan kan jeg hjælpe dig i dag?",
      "Hvordan kan du hjælpe mig (funktioner)": "Jeg kan hjælpe dig med:\n\n📊 Finansiel dataanalyse og visualisering\n🔍 Kreditrisikovurdering og modellering\n📈 Markedstrendanalyse og forecasting\n🤖 ML-model fortolkning og indsigt\n💡 Strategiske forretningsanbefalinger",
      "Hvilke data har du adgang til?": "Jeg har adgang til omfattende finansielle og forretningsmæssige data, herunder:\n\n📈 Historiske markedsdata\n📊 Virksomhedsøkonomi og metrikker\n📑 Brancherapporter og trends\n🔍 Kreditrisikovurderinger\n📋 Regulatoriske indberetninger"
    }
  };

  useEffect(() => {
    setWelcomeMessage({
      content: language === 'en' 
        ? "Welcome to freyai. What companies do you want to explore today?"
        : "Velkommen til freyai. Hvilke virksomheder vil du udforske i dag?",
      isUser: false
    });
  }, [language]);

  const handleSubmit = (content: string): void => {
    if (!content.trim()) return;

    if (quickReplies[language].includes(content)) {
      setUsedReplies(prev => new Set([...prev, content]));
    }

    const response = responses[language][content] || (
      language === 'en'
        ? "I understand you're interested in exploring this topic. Could you tell me more about your specific needs?"
        : "Jeg forstår, at du er interesseret i dette emne. Kan du fortælle mig mere om dine specifikke behov?"
    );
    
    const newMessagePair: MessagePair = {
      userMessage: { content, isUser: true },
      botMessage: { content: response, isUser: false }
    };

    setMessageHistory(prev => [...prev, newMessagePair]);
    setCurrentIndex(prev => prev + 1);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(inputValue);
    }
  };

  const navigateHistory = (direction: number): void => {
    const newIndex = currentIndex + direction;
    if (newIndex >= -1 && newIndex < messageHistory.length) {
      setCurrentIndex(newIndex);
    }
  };

  const currentMessages = currentIndex >= 0 ? messageHistory[currentIndex] : null;

  const bgColor = isDark ? 'bg-slate-800' : 'bg-slate-100';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const inputBgColor = isDark ? 'bg-slate-700/50' : 'bg-white';

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col transition-colors duration-300`}>
      {/* Header */}
      <div className="py-3 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className={`text-2xl font-sans flex items-center ${textColor}`}>
            <span>freyai</span>
            <BlinkingCursor isDark={isDark} size={28} />
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
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 pt-12">
          {/* Chat messages */}
          <div className="space-y-6 mb-6">
            <ChatMessage message={welcomeMessage} isDark={isDark} />
            {currentMessages && (
              <>
                <ChatMessage message={currentMessages.userMessage} isDark={isDark} />
                <ChatMessage message={currentMessages.botMessage} isDark={isDark} />
              </>
            )}
          </div>

          {/* Input and quick replies container */}
          <div className="space-y-4">
            {/* Input box */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={language === 'en' ? 'Message here' : 'Skriv din besked her'}
                className={`w-full px-4 py-3 pr-12 rounded-lg ${inputBgColor} ${textColor} 
                  placeholder-gray-400 border-none focus:outline-none focus:ring-1 
                  ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-300'}
                  transition-all duration-300`}
              />
              <button
                onClick={() => handleSubmit(inputValue)}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full 
                  transition-all duration-300 hover:bg-slate-600/50
                  ${inputValue.trim() ? 'opacity-100' : 'opacity-30'}`}
              >
                <Send className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Quick reply buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
              {quickReplies[language].map((reply) => (
                <QuickReplyButton
                  key={reply}
                  text={reply}
                  onClick={() => handleSubmit(reply)}
                  isVisible={!usedReplies.has(reply)}
                />
              ))}
            </div>

            {/* Navigation controls */}
            {messageHistory.length > 1 && (
              <div className="flex justify-center gap-4 mt-8 mb-4">
                <NavigationButton
                  icon={ChevronLeft}
                  onClick={() => navigateHistory(-1)}
                  disabled={currentIndex <= -1}
                  isDark={isDark}
                />
                <NavigationButton
                  icon={ChevronRight}
                  onClick={() => navigateHistory(1)}
                  disabled={currentIndex >= messageHistory.length - 1}
                  isDark={isDark}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;