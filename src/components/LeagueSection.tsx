import React from 'react';
import MatchCard, { Match } from './MatchCard';

interface LeagueSectionProps {
  leagueName: string;
  matches: Match[];
}

const LeagueSection: React.FC<LeagueSectionProps> = ({ leagueName, matches }) => {
  return (
    <div className="mb-6">
      {/* League Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
        <h2 className="text-[#FFFFFF] text-base font-semibold">{leagueName}</h2>
        <button className="text-[#B3B3B3] hover:text-[#FFFFFF] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Matches */}
      <div className="divide-y divide-border-primary">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default LeagueSection;

