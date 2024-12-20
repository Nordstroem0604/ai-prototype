import React from 'react';

interface Message {
  content: string;
  isUser: boolean;
}

interface ChatMessageProps {
  message: Message;
  isDark: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDark }) => (
  <div className={`max-w-3xl ${message.isUser ? 'ml-auto' : ''}`}>
    <div
      className={`rounded-lg px-4 py-2 ${
        message.isUser
          ? 'ml-auto bg-black text-white w-fit'
          : isDark
          ? 'text-white w-full'
          : 'text-gray-900 w-full'
      } ${!message.isUser ? 'whitespace-pre-line' : ''}`}
    >
      {message.content}
    </div>
  </div>
);

export default ChatMessage;

