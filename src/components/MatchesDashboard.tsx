import React, { useState } from 'react';
import LeagueSection from './LeagueSection';
import { Match } from './MatchCard';
import calendar from '../../public/calendar.png';
import chevronLeft from '../../public/chevron-left.png';
import chevronRight from '../../public/chevron-right.png';
import live from '../../public/live.png';
const mockMatches: { league: string; matches: Match[] }[] = [
  {
    league: 'UEFA Champions League',
    matches: [
      {
        id: '1',
        status: 'ft',
        statusText: 'FT',
        homeTeam: {
          name: 'Arsenal',
          score: 2,
          aggregateScore: 2,
        },
        awayTeam: {
          name: 'Valencia',
          score: 1,
          aggregateScore: 0,
        },
        indicators: {
          aggregate: 'home',
        },
      },
      {
        id: '2',
        status: 'ft',
        statusText: 'FT',
        homeTeam: {
          name: 'Real Madrid',
          score: 1,
          aggregateScore: 3,
        },
        awayTeam: {
          name: 'Leicester City',
          score: 3,
          aggregateScore: 1,
        },
        indicators: {
          penalty: 'away',
          redCard: 'home',
        },
      },
    ],
  },
  {
    league: 'English Premier League',
    matches: [
      {
        id: '3',
        status: 'live',
        statusText: "63'",
        homeTeam: {
          name: 'Arsenal',
          score: 4,
        },
        awayTeam: {
          name: 'Manchester City',
          score: 1,
        },
      },
      {
        id: '4',
        status: 'ht',
        statusText: 'HT',
        homeTeam: {
          name: 'Newcastle United',
          score: 0,
        },
        awayTeam: {
          name: 'Liverpool',
          score: 1,
        },
      },
      {
        id: '5',
        status: 'scheduled',
        statusText: '23:00',
        time: '23:00',
        homeTeam: {
          name: 'Burnley',
        },
        awayTeam: {
          name: 'Manchester City',
        },
      },
      {
        id: '6',
        status: 'scheduled',
        statusText: '23:00',
        time: '23:00',
        homeTeam: {
          name: 'Chelsea',
        },
        awayTeam: {
          name: 'Southampton',
        },
      },
    ],
  },
];

const MatchesDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'favorites'>('all');

  return (
    <div className="bg-[#181921]">
      <div className="max-w-[820px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#FFFFFF] mb-6">Matches</h1>

        <div className="flex items-center justify-center mb-6">
          <div className="w-[820px] h-[56px] flex items-center justify-between rounded-lg pt-2 pr-4 pb-2 pl-4 bg-[#1D1E2B] relative">
            <button title="Previous Day" className="p-2 rounded-full transition-colors">
              <img src={chevronLeft} alt="chevron left" className="w-[20px] h-[20px]" />
            </button>
            <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
              <img src={calendar} alt="calendar" className="w-[24px] h-[24px]" />
              <span className="text-[#FFFFFF] text-[14px] font-medium">Today</span>
            </div>
            <button title="Next Day" className="p-2 rounded-full transition-colors">
              <img src={chevronRight} alt="chevron right" className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 w-[328px] mr-auto h-[36px]">
          <button
            onClick={() => setActiveFilter('all')}
            className={`w-[65px] h-[36px] bg-[#00FFA5] border border-[#26273B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'text-[#FFFFFF]'
                : 'text-[#B3B3B3] hover:text-[#FFFFFF]'
            }`}
          >
            <span className="text-[#000] text-[14px] font-medium">All</span>
            <span className="px-1 w-[16px] h-[16px] text-[12px] rounded-full bg-[#181921]">
              6
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('live')}
            className={`w-[100px] h-[36px] bg-[#1D1E2B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors group ${
              activeFilter === 'live'
                ? 'text-[#FFFFFF]'
                : 'text-[#B3B3B3]'
            }`}
          >
            <img src={live} alt="live" className="w-[20px] h-[20px]" />
            <span className="text-[#fff] text-[14px] font-medium group-hover:text-[#FFEB3B] transition-colors">Live</span>
            <span className="px-1 py-0.5 rounded-full text-[12px] bg-[#181921]">
              <span className="text-[#fff] text-[12px] font-medium group-hover:text-[#FFEB3B] transition-colors">4</span>
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`w-[134px] h-[36px] bg-[#1D1E2B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors group ${
              activeFilter === 'favorites'
                ? 'text-[#FFFFFF]'
                : 'text-[#B3B3B3]'
            }`}
          >
            <svg className="w-[20px] h-[20px] text-[#FFFFFF] group-hover:text-[#FFEB3B] transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-[#fff] text-[14px] font-medium group-hover:text-[#FFEB3B] transition-colors">Favorites</span>
            <span className="px-1 w-[16px] h-[16px] text-[12px] rounded-full bg-[#181921]">
              <span className="text-[#fff] text-[12px] font-medium group-hover:text-[#FFEB3B] transition-colors">2</span>
            </span>
          </button>
        </div>

        <div>
          {mockMatches.map((section) => (
            <LeagueSection
              key={section.league}
              leagueName={section.league}
              matches={section.matches}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchesDashboard;

