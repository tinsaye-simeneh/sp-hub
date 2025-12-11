import React from 'react';

type TabType = 'Details' | 'Odds' | 'Lineups' | 'Events' | 'Stats' | 'Standings';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = [
    'Details',
    'Odds',
    'Lineups',
    'Events',
    'Stats',
    'Standings',
  ];

  return (
    <div className="border-b border-[#2A2A2A] px-4">
      <div className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap relative ${
              activeTab === tab
                ? 'text-[#00FFA5]'
                : 'text-[#B3B3B3] hover:text-[#FFFFFF]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FFA5]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;

