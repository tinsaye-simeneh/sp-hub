import React, { useState } from 'react';
import LeagueSection from './LeagueSection';
import DateSelector from './DateSelector';
import FilterButtons from './FilterButtons';
import { mockMatches } from '../data/mockMatches';

const MatchesDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'favorites'>('all');

  return (
    <div className="bg-[#181921]">
      <div className="w-full max-w-[820px] mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-bold text-[#FFFFFF] mb-6">Matches</h1>

        <DateSelector />

        <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />

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

