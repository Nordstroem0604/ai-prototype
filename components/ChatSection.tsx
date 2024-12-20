import React, { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import QuickReplyButton from '@/components/QuickReplyButton';
import NavigationButton from '@/components/NavigationButton';

interface Message {
  content: string;
  isUser: boolean;
}

interface MessagePair {
  userMessage: Message;
  botMessage: Message;
}

interface QuickReplies {
  [key: string]: string[];
}

interface ChatSectionProps {
  isDark: boolean;
  language: string;
  welcomeMessage: Message;
  messageHistory: MessagePair[];
  currentIndex: number;
  quickReplies: QuickReplies;
  usedReplies: Set<string>;
  inputValue: string;
  setInputValue: (val: string) => void;
  handleSubmit: (content: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  navigateHistory: (direction: number) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  isDark,
  language,
  welcomeMessage,
  messageHistory,
  currentIndex,
  quickReplies,
  usedReplies,
  inputValue,
  setInputValue,
  handleSubmit,
  handleKeyDown,
  navigateHistory
}) => {
  const bgColor = isDark ? 'bg-slate-800' : 'bg-slate-100';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const inputBgColor = isDark ? 'bg-slate-700/50' : 'bg-white';

  const currentMessages = currentIndex >= 0 ? messageHistory[currentIndex] : null;

  return (
    <div className={`transition-all duration-300 ${'mx-auto w-2/3 max-w-4xl'}`}>
      <div className={`${bgColor} rounded-lg h-full flex flex-col`}>
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6 mb-6">
            <ChatMessage message={welcomeMessage} isDark={isDark} />
            {currentMessages && (
              <>
                <ChatMessage message={currentMessages.userMessage} isDark={isDark} />
                <ChatMessage message={currentMessages.botMessage} isDark={isDark} />
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
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

            {messageHistory.length > 1 && (
              <div className="flex justify-center gap-4 mt-8 mb-4">
                <NavigationButton
                  direction="left"
                  onClick={() => navigateHistory(-1)}
                  disabled={currentIndex <= -1}
                  isDark={isDark}
                />
                <NavigationButton
                  direction="right"
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

export default ChatSection;

