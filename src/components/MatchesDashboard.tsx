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
        status: 'ft',
        statusText: 'FT',
        homeTeam: {
          name: 'Arsenal',
          score: 2,
        },
        awayTeam: {
          name: 'Liverpool',
          score: 1,
        },
        date: '11 AUG',
        homeTeamCards: {
          yellow: 2,
          red: 0,
        },
        awayTeamCards: {
          yellow: 1,
          red: 1,
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
      <div className="w-full max-w-[820px] mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#FFFFFF] mb-6">Matches</h1>

        {/* Desktop Date Selector */}
        <div className="hidden md:flex items-center justify-center mb-6">
          <div className="w-full max-w-[820px] h-[56px] flex items-center justify-between rounded-lg pt-2 pr-4 pb-2 pl-4 bg-[#1D1E2B] relative">
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

        {/* Mobile Date Selector - match design */}
        <div className="md:hidden mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-8 pr-4 min-w-max">
                {/* Faded previous */}
                <div className="flex flex-col items-center leading-tight opacity-30">
                  <span className="text-[#B3B3B3] text-[14px] font-medium tracking-wide">WED</span>
                  <span className="text-[#B3B3B3] text-[14px] font-medium">AUG</span>
                </div>

                <div className="flex flex-col items-center leading-tight">
                  <span className="text-[#B3B3B3] text-[14px] font-medium tracking-wide">WED</span>
                  <span className="text-[#B3B3B3] text-[14px] font-medium">30 AUG</span>
                </div>

                <div className="flex flex-col items-center leading-tight">
                  <span className="text-[#FFFFFF] text-[14px] font-medium tracking-wide">THU</span>
                  <span className="text-[#FFFFFF] text-[14px] font-medium">31 JUL</span>
                </div>

                {/* Today - Highlighted */}
                <div className="bg-[#252636] rounded-lg px-5 py-2 flex flex-col items-center leading-tight">
                  <span className="text-[#00FFA5] text-[16px] font-medium">Today</span>
                  <span className="text-[#00FFA5] text-[16px] font-medium">1 AUG</span>
                </div>

                <div className="flex flex-col items-center leading-tight">
                  <span className="text-[#B3B3B3] text-[14px] font-medium tracking-wide">SAT</span>
                  <span className="text-[#B3B3B3] text-[14px] font-medium">2 AUG</span>
                </div>

                <div className="flex flex-col items-center leading-tight opacity-40">
                  <span className="text-[#B3B3B3] text-[14px] font-medium tracking-wide">SUN</span>
                  <span className="text-[#B3B3B3] text-[14px] font-medium">3 AUG</span>
                </div>
              </div>
            </div>

            {/* Calendar Icon Button (pinned right) */}
            <button
              title="Open Calendar"
              aria-label="Open Calendar"
              className="w-11 h-11 rounded-full bg-[#1D1E2B] flex items-center justify-center flex-shrink-0"
            >
              <svg className="w-6 h-6 text-[#00FFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M6 11h12M6 21h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
              </svg>
            </button>
          </div>

        </div>

        <div className="flex items-center gap-2 md:gap-3 mb-6 w-full md:w-[328px] md:mr-auto h-[36px]">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 md:flex-none md:w-[65px] h-[36px] bg-[#00FFA5] border border-[#26273B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
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
            className={`flex-1 md:flex-none md:w-[100px] h-[36px] bg-[#1D1E2B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors group ${
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
            className={`flex-1 md:flex-none md:w-[134px] h-[36px] bg-[#1D1E2B] pt-2 pr-3 pb-2 pl-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors group ${
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

