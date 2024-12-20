import React from 'react';
import SidebarFeatureButton from '@/components/SidebarFeatureButton';
import CompanySearchFeature from '@/components/CompanySearchFeature';
import WebsiteAnalysisFeature from '@/components/WebsiteAnalysisFeature';
import { features } from '@/data/data';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface FeatureSectionProps {
  isFeatureBoxVisible: boolean;
  isDark: boolean;
  selectedFeatureIndex: number;
  setSelectedFeatureIndex: (idx: number) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  experimentalEnabled: boolean;
  setExperimentalEnabled: (val: boolean) => void;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  isFeatureBoxVisible,
  isDark,
  selectedFeatureIndex,
  setSelectedFeatureIndex,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  experimentalEnabled,
  setExperimentalEnabled
}) => {
  const bgColor = isDark ? 'bg-slate-800' : 'bg-slate-100';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-200';

  return (
    <div className={`transition-all duration-300 ${isFeatureBoxVisible ? 'w-full' : 'w-0 overflow-hidden'}`}>
      <div className={`${bgColor} rounded-lg shadow-lg border ${borderColor}`}>
        <div className="flex">
          {/* Sidebar */}
          <div className={`border-r ${borderColor} transition-all duration-300 ${isSidebarCollapsed ? 'w-12' : 'w-64'}`}>
            <div className={`p-4 flex justify-between items-center border-b ${borderColor}`}>
              <h3 className={`${textColor} font-medium ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                Features
              </h3>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`p-1 rounded-full hover:bg-slate-700/20 ${textColor}`}
              >
                {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
            <div className="p-2">
              {!isSidebarCollapsed && features.map((feature, index) => (
                <SidebarFeatureButton
                  key={index}
                  feature={feature}
                  isActive={selectedFeatureIndex === index}
                  isDark={isDark}
                  onClick={() => setSelectedFeatureIndex(index)}
                />
              ))}
              {isSidebarCollapsed && features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFeatureIndex(index)}
                  className={`w-8 h-8 mb-2 rounded-full flex items-center justify-center
                    ${selectedFeatureIndex === index 
                      ? (isDark ? 'bg-white text-black' : 'bg-black text-white')
                      : (isDark ? 'text-white hover:bg-slate-700' : 'text-black hover:bg-slate-200')}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Main Feature Content */}
          <div className="flex-1 p-6">
            <h2 className={`text-xl font-semibold ${textColor} mb-6`}>
              {features[selectedFeatureIndex].title}
            </h2>
            {selectedFeatureIndex === 0 ? (
              <CompanySearchFeature isDark={isDark} borderColor={borderColor} textColor={textColor} />
            ) : (
              <WebsiteAnalysisFeature isDark={isDark} borderColor={borderColor} textColor={textColor} />
            )}
          </div>
        </div>

        <div className={`p-6 ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'} rounded-b-lg border-t ${borderColor}`}>
          <div className="flex items-center justify-between">
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Toggle experimental features on/off to try new capabilities.
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {experimentalEnabled ? 'On' : 'Off'}
              </span>
              <button
                onClick={() => setExperimentalEnabled(!experimentalEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  experimentalEnabled ? 'bg-black' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    experimentalEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
