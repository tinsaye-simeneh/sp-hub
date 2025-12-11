import React from 'react';

export interface Match {
  id: string;
  status: 'live' | 'ft' | 'ht' | 'scheduled';
  statusText: string;
  homeTeam: {
    name: string;
    logo?: string;
    score?: number;
    aggregateScore?: number;
  };
  awayTeam: {
    name: string;
    logo?: string;
    score?: number;
    aggregateScore?: number;
  };
  time?: string;
  indicators?: {
    aggregate?: 'home' | 'away';
    penalty?: 'home' | 'away';
    redCard?: 'home' | 'away';
  };
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const getStatusBarColor = () => {
    switch (match.status) {
      case 'live':
        return 'bg-[#10B981]';
      case 'ft':
        return 'bg-[#EF4444]';
      case 'ht':
        return 'bg-[#F59E0B]';
      default:
        return 'bg-transparent';
    }
  };

  const getStatusTextColor = () => {
    switch (match.status) {
      case 'live':
        return 'text-[#10B981]';
      case 'ft':
        return 'text-[#EF4444]';
      case 'ht':
        return 'text-[#F59E0B]';
      default:
        return 'text-[#FFFFFF]';
    }
  };

  return (
    <div className="bg-[#1E1E1E] border-b border-[#2A2A2A] hover:bg-[#252525] transition-colors">
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Status Indicator Bar */}
        <div className={`w-1 h-12 ${getStatusBarColor()} rounded-full flex-shrink-0`} />

        {/* Status/Time */}
        <div className="flex-shrink-0 w-16">
          {match.status === 'scheduled' ? (
            <span className="text-[#FFFFFF] text-sm font-medium">{match.time}</span>
          ) : (
            <span className={`${getStatusTextColor()} text-sm font-medium`}>
              {match.statusText}
            </span>
          )}
        </div>

        {/* Teams and Scores */}
        <div className="flex-1 flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            {/* Home Team */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0">
                {match.homeTeam.logo ? (
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-6 h-6" />
                ) : (
                  <div className="w-4 h-4 bg-text-tertiary rounded-full" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#FFFFFF] text-sm font-medium">{match.homeTeam.name}</span>
                {match.indicators?.redCard === 'home' && (
                  <span className="text-[#EF4444] text-xs">🟥</span>
                )}
                {match.indicators?.aggregate === 'home' && (
                  <span className="text-[#10B981] text-xs font-medium">AGG</span>
                )}
                {match.indicators?.penalty === 'home' && (
                  <span className="text-[#10B981] text-xs font-medium">PEN</span>
                )}
              </div>
            </div>

            {/* Scores */}
            <div className="flex items-center gap-2">
              {match.homeTeam.score !== undefined && (
                <div className="text-right">
                  {match.homeTeam.aggregateScore !== undefined && (
                    <span className="text-[#808080] text-xs mr-1">
                      [{match.homeTeam.aggregateScore}]
                    </span>
                  )}
                  <span className="text-[#FFFFFF] text-lg font-bold">
                    {match.homeTeam.score}
                  </span>
                </div>
              )}
              {match.homeTeam.score !== undefined && match.awayTeam.score !== undefined && (
                <span className="text-[#808080]">-</span>
              )}
              {match.awayTeam.score !== undefined && (
                <div className="text-left">
                  <span className="text-[#FFFFFF] text-lg font-bold">
                    {match.awayTeam.score}
                  </span>
                  {match.awayTeam.aggregateScore !== undefined && (
                    <span className="text-[#808080] text-xs ml-1">
                      [{match.awayTeam.aggregateScore}]
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className="flex items-center gap-2">
                {match.indicators?.aggregate === 'away' && (
                  <span className="text-[#10B981] text-xs font-medium">AGG</span>
                )}
                {match.indicators?.penalty === 'away' && (
                  <span className="text-[#10B981] text-xs font-medium">PEN</span>
                )}
                {match.indicators?.redCard === 'away' && (
                  <span className="text-[#EF4444] text-xs">🟥</span>
                )}
                <span className="text-[#FFFFFF] text-sm font-medium">{match.awayTeam.name}</span>
              </div>
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0">
                {match.awayTeam.logo ? (
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-6 h-6" />
                ) : (
                  <div className="w-4 h-4 bg-text-tertiary rounded-full" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Options Menu */}
        <button className="p-2 hover:bg-[#252525] rounded-full transition-colors">
          <svg className="w-5 h-5 text-[#B3B3B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MatchCard;

