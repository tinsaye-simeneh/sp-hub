import React from 'react';
import MatchCard, { Match } from './MatchCard';

interface LeagueSectionProps {
  leagueName: string;
  matches: Match[];
}

const LeagueSection: React.FC<LeagueSectionProps> = ({ leagueName, matches }) => {
  return (
    <div className="w-full max-w-[780px] h-auto rounded-lg p-4 border-b border-[#2A2A2A] mb-6 flex flex-col gap-2 bg-[#1D1E2B]">
      {/* League Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[#FFFFFF] text-[14px] font-normal leading-[20px] font-inter">{leagueName}</h2>
        <button title="View All" className="text-[#B3B3B3] hover:text-[#FFFFFF] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default LeagueSection;

