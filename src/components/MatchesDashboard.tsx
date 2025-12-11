import React, { useState } from 'react';
import LeagueSection from './LeagueSection';
import { Match } from './MatchCard';

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

  const filterButtons = [
    { id: 'all' as const, label: 'All', count: 6 },
    { id: 'live' as const, label: 'Live', count: 4 },
    { id: 'favorites' as const, label: 'Favorites', count: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#181921]">
      <div className="max-w-[820px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#FFFFFF] mb-6">Matches</h1>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <button title="Previous Day" className="p-2 hover:bg-[#252525] rounded-full transition-colors">
              <svg className="w-5 h-5 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1E1E1E] rounded-lg">
              <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[#FFFFFF] text-sm font-medium">Today</span>
            </div>
            <button title="Next Day" className="p-2 hover:bg-[#252525] rounded-full transition-colors">
              <svg className="w-5 h-5 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveFilter(button.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                activeFilter === button.id
                  ? 'bg-[#10B981] text-[#FFFFFF]'
                  : 'bg-[#1E1E1E] text-[#B3B3B3] hover:text-[#FFFFFF]'
              }`}
            >
              {button.id === 'live' && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="3" />
                  <circle cx="10" cy="10" r="6" opacity="0.3" />
                </svg>
              )}
              {button.id === 'favorites' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              <span>{button.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeFilter === button.id
                  ? 'bg-white/20'
                  : 'bg-[#252525]'
              }`}>
                {button.count}
              </span>
            </button>
          ))}
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

