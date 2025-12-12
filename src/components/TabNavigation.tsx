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
    <div className="border-b border-border-primary xl:px-4 px-0">
      <div className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`xl:px-4 px-2 py-3 text-sm font-medium transition-colors whitespace-nowrap relative cursor-pointer ${
              activeTab === tab
                ? 'text-brand-secondary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-secondary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;

