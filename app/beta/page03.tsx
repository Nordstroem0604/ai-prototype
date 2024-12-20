"use client";

import React, { useState } from 'react';
import { Moon, Sun, Send, X, LayoutPanelLeft } from 'lucide-react';

interface FeatureContent {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  header: string;
  headerDescription: string;
}

interface ChatMessageProps {
  message: string;
  type: 'ai' | 'user';
  isDark: boolean;
}

interface Message {
  type: 'ai' | 'user';
  content: string;
}

const ChatMessage = ({ message, type, isDark }: ChatMessageProps) => (
  <div className={`flex ${type === 'ai' ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`${
      type === 'ai' ? 'bg-transparent' : isDark ? 'bg-black' : 'bg-neutral-800'
    } rounded-2xl px-4 py-2 max-w-[80%]`}>
      <p className={`text-sm ${type === 'ai' ? (isDark ? 'text-white' : 'text-black') : 'text-white'}`}>
        {message}
      </p>
    </div>
  </div>
);

const CombinedLayout = () => {
  const [isDark, setIsDark] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: 'Welcome to freyai. What companies do you want to explore today?' },
    { type: 'user', content: 'Hello' }
  ]);
  const [selectedFeature, setSelectedFeature] = useState('overview');
  const [isToggled, setIsToggled] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);

  const features: FeatureContent[] = [
    {
      id: 'overview',
      title: 'Feature Overview',
      shortTitle: 'Overview',
      description: "Explore our new experimental features designed to enhance your web experience. Select a feature from the sidebar to learn more.",
      header: "Feature Preview",
      headerDescription: "Welcome to our feature preview! Discover new tools and capabilities that we're developing to make your web experience better. Select a feature from the sidebar to explore its capabilities."
    },
    {
      id: 'websiteFinder',
      title: 'Web Site Finder',
      shortTitle: 'Web Site Finder',
      description: "Discover and explore websites based on your interests. Our intelligent crawler helps you find relevant content across the web.",
      header: "Web Site Finder",
      headerDescription: "Find websites that match your interests using our advanced discovery engine. This experimental feature uses AI to understand your preferences and suggest relevant content."
    },
    {
      id: 'websiteAnalysis',
      title: 'Web Site Analysis',
      shortTitle: 'Web Site Analysis',
      description: "Get detailed insights about any website including performance metrics, SEO analysis, and content evaluation.",
      header: "Web Site Analysis",
      headerDescription: "Analyze any website's performance, SEO, and content quality. This experimental feature provides comprehensive insights to help you understand websites better."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input.trim() }]);
      setInput('');
    }
  };

  const handleClose = () => {
    setSelectedFeature('overview');
  };

  const FeatureButton = ({ feature }: { feature: FeatureContent }) => (
    <button
      onClick={() => setSelectedFeature(feature.id)}
      className={`w-full text-left font-medium p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        selectedFeature === feature.id 
          ? isDark ? 'bg-gray-700' : 'bg-gray-200'
          : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
      } ${isDark ? 'text-white' : 'text-gray-700'}`}
    >
      {feature.shortTitle}
    </button>
  );

  const FeatureDisplay = ({ feature }: { feature: FeatureContent }) => (
    <div className={`feature-content ${selectedFeature !== feature.id ? 'hidden' : ''}`}>
      <h3 className={`text-md font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {feature.title}
      </h3>
      {feature.id === 'overview' ? (
        <div className="grid grid-cols-2 gap-4">
          {features.filter(f => f.id !== 'overview').map((f) => (
            <div key={f.id} 
                 className={`p-4 rounded-lg border cursor-pointer ${
                   isDark ? 'bg-gray-800 border-gray-700 hover:border-indigo-400' : 'bg-white border-gray-300 hover:border-indigo-500'
                 }`}
                 onClick={() => setSelectedFeature(f.id)}>
              <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {f.title}
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex space-x-4">
          <div className={`w-1/2 p-4 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}>
            <img src="/api/placeholder/150/150" alt="feature preview" className="rounded-lg mb-2" />
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {feature.description}
            </p>
          </div>
          <div className={`w-1/2 p-4 rounded-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}>
            <img src="/api/placeholder/150/150" alt="feature details" className="rounded-lg mb-2" />
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Additional details about {feature.title.toLowerCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const currentFeature = features.find(f => f.id === selectedFeature) || features[0];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <span className={`text-2xl ${isDark ? 'text-white' : 'text-black'} font-sans`}>
            freyai
          </span>
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500 ${
              showFeatures ? (isDark ? 'bg-gray-800' : 'bg-gray-200') : ''
            }`}
            title="Toggle feature panel"
          >
            <LayoutPanelLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-black'}`} />
          </button>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 flex gap-6">
        {/* Feature Preview Section */}
        {showFeatures && (
          <div className="w-2/3">
            <div className={`rounded-lg shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex">
                {/* Sidebar */}
                <div className={`w-1/4 p-6 border-r ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                  <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Features
                  </h2>
                  <ul className="space-y-4">
                    {features.map((feature) => (
                      <li key={feature.id}>
                        <FeatureButton feature={feature} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Feature Content */}
                <div className="w-3/4 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {currentFeature.header}
                    </h2>
                    <X
                      className={`w-6 h-6 cursor-pointer ${
                        isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={handleClose}
                    />
                  </div>
                  <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentFeature.headerDescription}
                  </p>

                  <div className={`rounded-lg p-4 border ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}>
                    {features.map((feature) => (
                      <FeatureDisplay key={feature.id} feature={feature} />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Toggle experimental features on/off to try new capabilities. Your feedback helps us improve!
                      </p>
                    </div>
                    <label htmlFor="toggle" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="toggle"
                          className="sr-only"
                          checked={isToggled}
                          onChange={(e) => setIsToggled(e.target.checked)}
                        />
                        <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
                          isToggled ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                          isToggled ? 'transform translate-x-6' : 'transform translate-x-0'
                        }`} />
                      </div>
                      <div className={`ml-3 font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        {isToggled ? 'On' : 'Off'}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Section */}
        <div className={`${showFeatures ? 'w-1/3' : 'w-2/3 mx-auto'} transition-all duration-300 mt-4`}>
          <div>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message.content} type={message.type} isDark={isDark} />
            ))}
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message here"
                className={`w-full bg-transparent text-gray-400 border-gray-500 placeholder-gray-500 p-3 pr-12 rounded-lg border focus:outline-none ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            {/* Suggestion Buttons */}
            <div className="flex gap-3 flex-wrap mt-3">
              {[
                "Who are you?",
                "How can you help me (features)?",
                "What data do you have access to?"
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    setMessages([...messages, { type: 'user', content: suggestion }]);
                  }}
                  className={`px-4 py-2 text-xs rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? 'text-white bg-black border border-gray-500 hover:bg-neutral-900' 
                      : 'text-white bg-black border border-gray-500 hover:bg-neutral-900'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedLayout;