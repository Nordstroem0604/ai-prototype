import React from 'react';

interface CompanySearchFeatureProps {
  isDark: boolean;
  borderColor: string;
  textColor: string;
}

const CompanySearchFeature: React.FC<CompanySearchFeatureProps> = ({ isDark, borderColor, textColor }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            CVR Number
          </label>
          <input
            type="text"
            placeholder="Enter CVR number"
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
          Search Company
        </button>
      </div>
      
      <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
        <h3 className={`${textColor} font-medium mb-4`}>Search Tips</h3>
        <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm`}>
          Enter a valid Danish CVR number to search for company information and get detailed insights.
        </p>
      </div>
    </div>
  );
};

export default CompanySearchFeature;
