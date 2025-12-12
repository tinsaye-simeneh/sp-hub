import React, { useState, useMemo } from 'react';
import MatchCard from './MatchCard';
import { Match } from '../types/match';
import { chevronLeft, chevronRight } from '../assets';

interface LeagueSectionProps {
  leagueName: string;
  matches: Match[];
  leagueBadge?: string;
}

const MATCHES_PER_PAGE = 5;

const LeagueSection: React.FC<LeagueSectionProps> = ({ leagueName, matches, leagueBadge }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get league badge from first match if not provided
  const badge = leagueBadge || matches[0]?.leagueBadge;
  
  // Get sport, season, and round from first match
  const firstMatch = matches[0];
  const sport = firstMatch?.sport;
  const season = firstMatch?.season;
  const round = firstMatch?.round;

  // Calculate pagination
  const totalPages = Math.ceil(matches.length / MATCHES_PER_PAGE);
  const startIndex = (currentPage - 1) * MATCHES_PER_PAGE;
  const endIndex = startIndex + MATCHES_PER_PAGE;
  const paginatedMatches = useMemo(() => {
    return matches.slice(startIndex, endIndex);
  }, [matches, startIndex, endIndex]);

  // Reset to page 1 when matches change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [matches.length]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const hasPagination = matches.length > MATCHES_PER_PAGE;

  return (
    <div className="w-full max-w-[780px] mx-auto h-auto rounded-lg p-4 border-b border-border-primary mb-6 flex flex-col gap-2 bg-[#1D1E2B]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {badge && (
            <img 
              src={badge} 
              alt={leagueName} 
              className="w-5 h-5 object-contain flex-shrink-0"
              onError={(e) => {
                // Hide image if it fails to load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <h2 className="text-text-primary text-[14px] font-normal leading-[20px] font-inter">{leagueName}</h2>
          {(sport || season || round !== undefined) && (
            <div className="flex items-center gap-2 text-[12px] text-text-tertiary">
              {sport && (
                <span>{sport}</span>
              )}
              {season && (
                <span>{season}</span>
              )}
              {round !== undefined && (
                <span>Round {round}</span>
              )}
            </div>
          )}
        </div>
        <button title="View All" className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {paginatedMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {hasPagination && (
        <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border-primary">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              currentPage === 1
                ? 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'
                : 'bg-bg-secondary text-text-primary hover:bg-bg-hover cursor-pointer'
            }`}
            aria-label="Previous page"
          >
            <img src={chevronLeft} alt="previous" className="w-4 h-4" />
          </button>
          
          <span className="text-text-secondary text-sm">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              currentPage === totalPages
                ? 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'
                : 'bg-bg-secondary text-text-primary hover:bg-bg-hover cursor-pointer'
            }`}
            aria-label="Next page"
          >
            <img src={chevronRight} alt="next" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LeagueSection;

