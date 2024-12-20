import React from 'react';

interface WebsiteAnalysisFeatureProps {
  isDark: boolean;
  borderColor: string;
  textColor: string;
}

const WebsiteAnalysisFeature: React.FC<WebsiteAnalysisFeatureProps> = ({ isDark, borderColor, textColor }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Website URL
          </label>
          <input
            type="text"
            placeholder="Enter website URL"
            className={`w-full px-4 py-2 rounded-lg ${
              isDark ? 'bg-slate-700/50' : 'bg-white'
            } ${textColor} 
            placeholder-gray-400 border ${borderColor} focus:outline-none focus:ring-1 
            ${isDark ? 'focus:ring-gray-600' : 'focus:ring-gray-300'}
            transition-all duration-300`}
          />
        </div>
        <button
          className={`w-full px-4 py-2 rounded-lg bg-black text-white hover:bg-black/80 
            transition-colors duration-300 flex items-center justify-center gap-2`}
        >
          Analyze Website
        </button>
      </div>
      
      <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
        <h3 className={`${textColor} font-medium mb-4`}>Analysis Tips</h3>
        <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm`}>
          Enter a complete website URL (including https://) to analyze its content, performance, and technology stack.
        </p>
      </div>
    </div>
  );
};

export default WebsiteAnalysisFeature;
