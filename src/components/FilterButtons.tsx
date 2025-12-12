import React from 'react';
import { live } from '../assets';

interface FilterButtonsProps {
  activeFilter: 'all' | 'live' | 'favorites';
  onFilterChange: (filter: 'all' | 'live' | 'favorites') => void;
  allCount?: number;
  liveCount?: number;
  favoritesCount?: number;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  activeFilter, 
  onFilterChange,
  allCount = 0,
  liveCount = 0,
  favoritesCount = 0,
}) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-6 w-full md:w-[328px] md:mr-auto h-[36px]">
      <button
        onClick={() => onFilterChange('all')}
        className={`flex-1 md:flex-none md:w-[65px] h-[36px] border border-border-primary pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
          activeFilter === 'all'
            ? 'bg-brand-secondary text-black'
            : 'bg-[#1D1E2B] text-text-secondary hover:text-text-primary'
        }`}
      >
        <span className={`text-[14px] font-medium ${activeFilter === 'all' ? 'text-black' : 'text-text-primary'}`}>All</span>
        <span className={`px-1 min-w-[16px] h-[16px] text-[12px] rounded-full flex items-center justify-center ${
          activeFilter === 'all' ? 'bg-bg-primary' : 'bg-bg-primary'
        }`}>
          <span className="text-white">{allCount}</span>
        </span>
      </button>

      <button
        onClick={() => onFilterChange('live')}
        className={`flex-1 md:flex-none md:w-[100px] h-[36px] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors group cursor-pointer ${
          activeFilter === 'live'
            ? 'bg-brand-secondary'
            : 'bg-[#1D1E2B]'
        } ${
          activeFilter === 'live'
            ? 'text-black'
            : 'text-text-secondary'
        }`}
      >
        <img 
          src={live} 
          alt="live" 
          className={`w-[20px] h-[20px] transition-all ${
            activeFilter === 'live' 
              ? 'brightness-0' 
              : 'group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:saturate-[10] group-hover:hue-rotate-[90deg]'
          }`}
        />
        <span className={`text-[14px] font-medium transition-colors ${
          activeFilter === 'live' 
            ? 'text-black' 
            : 'text-text-primary group-hover:text-green-400'
        }`}>Live</span>
        <span className="px-1 py-0.5 min-w-[16px] rounded-full text-[12px] bg-bg-primary flex items-center justify-center">
          <span className={`text-[12px] font-medium transition-colors ${
            activeFilter === 'live'
              ? 'text-white'
              : 'text-white group-hover:text-green-400'
          }`}>{liveCount}</span>
        </span>
      </button>

      <button
        onClick={() => onFilterChange('favorites')}
        className={`flex-1 md:flex-none md:w-[134px] h-[36px] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors group cursor-pointer ${
          activeFilter === 'favorites'
            ? 'bg-brand-secondary'
            : 'bg-[#1D1E2B]'
        } ${
          activeFilter === 'favorites'
            ? 'text-black'
            : 'text-text-secondary'
        }`}
      >
        <svg className={`w-[20px] h-[20px] transition-colors ${
          activeFilter === 'favorites'
            ? 'text-black'
            : 'text-text-primary group-hover:text-green-400'
        }`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span className={`text-[14px] font-medium transition-colors ${
          activeFilter === 'favorites'
            ? 'text-black'
            : 'text-text-primary group-hover:text-green-400'
        }`}>Favorites</span>
        <span className="px-1 min-w-[16px] h-[16px] text-[12px] rounded-full bg-bg-primary flex items-center justify-center">
          <span className={`text-[12px] font-medium transition-colors ${
            activeFilter === 'favorites'
              ? 'text-white'
              : 'text-white group-hover:text-green-400'
          }`}>{favoritesCount}</span>
        </span>
      </button>
    </div>
  );
};

export default FilterButtons;

