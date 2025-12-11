import React from 'react';
import { Match } from '../types/match';

interface MatchSummaryProps {
  match: Match;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ match }) => {
  const getStatusColor = () => {
    if (match.status === 'ft') return 'bg-[#EE5E52]';
    if (match.status === 'live' || match.status === 'ht') return 'bg-[#10B981]';
    return 'bg-[#6B7280]';
  };

  const getStatusText = () => {
    if (match.status === 'ft') return 'Finished';
    if (match.status === 'live') return 'Live';
    if (match.status === 'ht') return 'Half Time';
    return 'Scheduled';
  };

  return (
    <div className="px-4 py-6 w-full xl:w-[680px] xl:mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2 flex-1 relative">
          <div className="relative">
            {match.homeTeamCards?.yellow && match.homeTeamCards.yellow > 0 && (
              <div className="absolute -top-3 -right-5 w-5 h-5 bg-[#FFD700] flex items-center justify-center z-10">
                <span className="text-black text-[10px] font-bold">{match.homeTeamCards.yellow}</span>
              </div>
            )}
            {match.homeTeamCards?.red && match.homeTeamCards.red > 0 && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-6 w-5 h-5 bg-[#FF0000] flex items-center justify-center z-10">
                <span className="text-black text-[10px] font-bold">{match.homeTeamCards.red}</span>
              </div>
            )}
            
            <div className="w-[48px] h-[48px] bg-bg-tertiary rounded-full flex items-center justify-center">
              {match.homeTeam.logo ? (
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-[48px] h-[48px]" />
              ) : (
                <div className="w-[48px] h-[48px] bg-text-tertiary rounded-full" />
              )}
            </div>
          </div>
          <span className="text-text-primary text-sm font-medium">{match.homeTeam.name}</span>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 w-[48px]">
          <span className="text-text-secondary text-xs font-medium">{match.date || '11 AUG'}</span>
          <div className="flex items-center gap-2">
            <span className="text-text-primary text-[22px] font-bold">{match.homeTeam.score ?? 0}</span>
            <span className="text-text-primary text-[22px] font-bold">-</span>
            <span className="text-text-primary text-[22px] font-bold">{match.awayTeam.score ?? 0}</span>
          </div>
          <div className={`${getStatusColor()} text-white text-xs font-medium p-1 rounded-sm`}>
            {getStatusText()}
          </div>
        </div>
              
        <div className="flex flex-col items-center gap-2 flex-1 relative">
          <div className="relative">
            {match.awayTeamCards && (match.awayTeamCards.red > 0 || match.awayTeamCards.yellow > 0) && (
              <div className="absolute -top-3 -left-10 flex flex-col gap-0.5 z-10 flex-row">
                {match.awayTeamCards.red > 0 && (
                  <div className="w-5 h-5 bg-[#FF0000] flex items-center justify-center">
                    <span className="text-black text-[10px] font-bold">{match.awayTeamCards.red}</span>
                  </div>
                )}
                {match.awayTeamCards.yellow > 0 && (
                  <div className="w-5 h-5 bg-[#FFD700] flex items-center justify-center">
                    <span className="text-black text-[10px] font-bold">{match.awayTeamCards.yellow}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center">
              {match.awayTeam.logo ? (
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-12 h-12" />
              ) : (
                <div className="w-12 h-12 bg-text-tertiary rounded-full" />
              )}
            </div>
          </div>
          <span className="text-text-primary text-sm font-medium">{match.awayTeam.name}</span>
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;

