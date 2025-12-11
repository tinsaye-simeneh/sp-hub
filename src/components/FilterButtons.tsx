import React from 'react';
import { live } from '../assets';

interface FilterButtonsProps {
  activeFilter: 'all' | 'live' | 'favorites';
  onFilterChange: (filter: 'all' | 'live' | 'favorites') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-6 w-full md:w-[328px] md:mr-auto h-[36px]">
      <button
        onClick={() => onFilterChange('all')}
        className={`flex-1 md:flex-none md:w-[65px] h-[36px] bg-brand-secondary border border-border-primary pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
          activeFilter === 'all'
            ? 'text-brand-secondary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        <span className="text-black text-[14px] font-medium">All</span>
        <span className="px-1 w-[16px] h-[16px] text-[12px] rounded-full bg-bg-primary">
          6
        </span>
      </button>

      <button
        onClick={() => onFilterChange('live')}
        className={`flex-1 md:flex-none md:w-[100px] h-[36px] bg-[#1D1E2B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors group ${
          activeFilter === 'live'
            ? 'text-text-primary'
            : 'text-text-secondary'
        }`}
      >
        <img src={live} alt="live" className="w-[20px] h-[20px]" />
        <span className="text-text-primary text-[14px] font-medium group-hover:text-yellow-400 transition-colors">Live</span>
        <span className="px-1 py-0.5 rounded-full text-[12px] bg-bg-primary">
          <span className="text-text-primary text-[12px] font-medium group-hover:text-yellow-400 transition-colors">4</span>
        </span>
      </button>

      <button
        onClick={() => onFilterChange('favorites')}
        className={`flex-1 md:flex-none md:w-[134px] h-[36px] bg-[#1D1E2B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors group ${
          activeFilter === 'favorites'
            ? 'text-text-primary'
            : 'text-text-secondary'
        }`}
      >
        <svg className="w-[20px] h-[20px] text-text-primary group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span className="text-text-primary text-[14px] font-medium group-hover:text-yellow-400 transition-colors">Favorites</span>
        <span className="px-1 w-[16px] h-[16px] text-[12px] rounded-full bg-bg-primary">
          <span className="text-text-primary text-[12px] font-medium group-hover:text-yellow-400 transition-colors">2</span>
        </span>
      </button>
    </div>
  );
};

export default FilterButtons;

