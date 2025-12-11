import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  date?: string;
  homeTeamCards?: {
    yellow: number;
    red: number;
  };
  awayTeamCards?: {
    yellow: number;
    red: number;
  };
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
  const navigate = useNavigate();
  const isLive = match.status === 'live' || match.status === 'ht';

  const handleMatchClick = () => {
    navigate(`/match/${match.id}`, { state: { match } });
  };
  
  const getBorderColor = () => {
    if (isLive) return 'border-l-[#10B981]';
    if (match.status === 'ft') return 'border-l-[#EF4444]';
    if (match.status === 'scheduled') return 'border-l-[#808080]';
    return 'border-l-transparent';
  };

  const getStatusTextColor = () => {
    switch (match.status) {
      case 'live':
        return 'text-[#10B981]';
      case 'ht':
        return 'text-[#10B981]';
      case 'ft':
        return 'text-[#FF0000]';
      default:
        return 'text-[#FFFFFF]';
    }
  };

  return (
    <div 
      className="w-full max-w-[788px] h-auto min-h-[80px] border-b border-[#2A2A2A] relative cursor-pointer hover:bg-[#252525] transition-colors"
      onClick={handleMatchClick}
    >
      {/* Gradient Overlay for Live Matches - Starting from Left Border */}
      {isLive && (
        <div 
          className="absolute left-0 right-0 top-2 bottom-2 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.1) 10%, transparent 30%)'
          }}
        />
      )}
      <div className="flex items-start gap-4 px-4 pt-2 pb-1 h-full relative z-10">
        <div className={`w-[56px] h-[60px] flex flex-col items-center justify-center gap-1 border-l-4 ${getBorderColor()} flex-shrink-0`}>
          {match.status === 'scheduled' ? (
            <span className="text-[#FFFFFF] text-sm font-medium">{match.time}</span>
          ) : (
            <>
              <span className={`${getStatusTextColor()} text-sm font-medium`}>
                {match.statusText}
              </span>
              {/* Animated Green Border for Live Matches */}
              {isLive && (
                <div className="relative w-full h-0.5 flex justify-center">
                  <div className="w-[16px] h-0.5 relative">
                    <div className="bg-[#10B981] h-0.5 animate-width-pulse max-w-[16px]" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Teams and Scores - Two Rows */}
        <div className="flex-1 flex flex-col justify-between h-[56px]">
          {/* Home Team Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0">
                {match.homeTeam.logo ? (
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-[16px] h-[16px]" />
                ) : (
                  <div className="w-4 h-4 bg-[#808080] rounded-full" />
                )}
              </div>
              <span className="text-[#FFFFFF] text-sm font-medium">{match.homeTeam.name}</span>
              {/* Indicators (AGG, PEN, etc.) */}
              {match.indicators?.aggregate === 'home' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                  <svg className="w-3 h-3 text-[#00FFA5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#00FFA5] text-[8px] leading-[12px] font-medium mt-[2px]">AGG</span>
                </div>
              )}
              {match.indicators?.penalty === 'home' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                 <svg className="w-3 h-3 text-[#00FFA5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#00FFA5] text-[8px] leading-[12px] font-medium mt-[2px]">PEN</span>
                </div>
              )}
              {match.indicators?.redCard === 'home' && (
                <div
                  className="w-[10px] h-[12px] bg-[#FF0000] rounded-[2px] flex-shrink-0"
                  title="Red card"
                  aria-label="Red card"
                />
              )}
            </div>
            {/* Home Team Scores */}
            {match.homeTeam.score !== undefined && (
              <div className="flex items-center gap-1">
                {match.homeTeam.aggregateScore !== undefined && (
                  <span className="text-[#808080] text-[11px] leading-[16px] font-medium font-inter mr-1">[{match.homeTeam.aggregateScore}]</span>
                )}
                <span className="text-[#FFFFFF] text-[12px] leading-[20px] font-medium font-inter">{match.homeTeam.score}</span>
              </div>
            )}
          </div>

          {/* Away Team Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center flex-shrink-0">
                {match.awayTeam.logo ? (
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-[16px] h-[16px]" />
                ) : (
                  <div className="w-[16px] h-[16px] bg-[#808080] rounded-full" />
                )}
              </div>
              <span className="text-[#FFFFFF] text-sm font-medium">{match.awayTeam.name}</span>
              {/* Indicators (AGG, PEN, etc.) */}
              {match.indicators?.aggregate === 'away' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                  <svg className="w-3 h-3 text-[#00FFA5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#00FFA5] text-[8px] leading-[12px] font-medium mt-[2px]">AGG</span>
                </div>
              )}
              {match.indicators?.penalty === 'away' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                  <svg className="w-3 h-3 text-[#00FFA5]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#00FFA5] text-[8px] leading-[12px] font-medium mt-[2px]">PEN</span>
                </div>
              )}
              {match.indicators?.redCard === 'away' && (
                <div
                  className="w-[10px] h-[12px] bg-[#FF0000] rounded-[2px] flex-shrink-0"
                  title="Red card"
                  aria-label="Red card"
                />
              )}
            </div>
            {/* Away Team Scores */}
            {match.awayTeam.score !== undefined && (
              <div className="flex items-center gap-1">
                {match.awayTeam.aggregateScore !== undefined && (
                  <span className="text-[#808080] text-[11px] leading-[16px] font-medium font-inter mr-1">[{match.awayTeam.aggregateScore}]</span>
                )}
                <span className="text-[#FFFFFF] text-[12px] leading-[20px] font-medium font-inter">{match.awayTeam.score}</span>
              </div>
            )}
          </div>
        </div>

        {/* Options Menu */}
        <button title="More options" className="p-2 hover:bg-[#252525] rounded-full transition-colors flex-shrink-0 self-center">
          <svg className="w-5 h-5 text-[#B3B3B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MatchCard;

