import React from 'react';

interface QuickReplyButtonProps {
  text: string;
  onClick: () => void;
  isVisible?: boolean;
}

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

export default QuickReplyButton;

