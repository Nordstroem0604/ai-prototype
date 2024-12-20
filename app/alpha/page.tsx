"use client";

import React, { useState, KeyboardEvent } from 'react';
import Header from '@/components/Header';
import FeatureSection from '@/components/FeatureSection2';
import ChatSection from '@/components/ChatSection';
import { quickReplies, responses, getWelcomeMessage, Message } from '@/data/data';

interface MessagePair {
  userMessage: Message;
  botMessage: Message;
}

const Page: React.FC = () => {
  const [isFeatureBoxVisible, setIsFeatureBoxVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState<'en' | 'da'>('en');
  const [messageHistory, setMessageHistory] = useState<MessagePair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [usedReplies, setUsedReplies] = useState<Set<string>>(new Set());
  const [inputValue, setInputValue] = useState('');
  
  // Maintain feature selection in state
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const welcomeMessage = getWelcomeMessage(language);

  const handleSubmit = (content: string) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(inputValue);
    }
  };

  const navigateHistory = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= -1 && newIndex < messageHistory.length) {
      setCurrentIndex(newIndex);
    }
  };

  const bgColor = isDark ? 'bg-slate-800' : 'bg-slate-100';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      <Header
        isDark={isDark}
        language={language}
        setLanguage={setLanguage}
        setIsDark={setIsDark}
        isFeatureBoxVisible={isFeatureBoxVisible}
        setIsFeatureBoxVisible={setIsFeatureBoxVisible}
      />

      <div className="max-w-screen-2xl mx-auto px-6 py-8 flex gap-8">
      <FeatureSection
        isFeatureBoxVisible={isFeatureBoxVisible}
        isDark={isDark}
        selectedFeatureIndex={selectedFeatureIndex}
        setSelectedFeatureIndex={setSelectedFeatureIndex}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        experimentalEnabled={false}
        setExperimentalEnabled={() => {}}
        />

        <ChatSection
          isDark={isDark}
          language={language}
          welcomeMessage={welcomeMessage}
          messageHistory={messageHistory}
          currentIndex={currentIndex}
          quickReplies={quickReplies}
          usedReplies={usedReplies}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
          navigateHistory={navigateHistory}
        />
      </div>
    </div>
  );
};

export default Page;
