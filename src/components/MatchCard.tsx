import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Match } from '../types/match';

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
    if (isLive) return 'border-l-status-live';
    if (match.status === 'ft') return 'border-l-status-ft';
    if (match.status === 'scheduled') return 'border-l-status-scheduled';
    return 'border-l-transparent';
  };

  const getStatusTextColor = () => {
    switch (match.status) {
      case 'live':
        return 'text-status-live';
      case 'ht':
        return 'text-status-live';
      case 'ft':
        return 'text-red-500/70';
      case 'scheduled':
        return 'text-text-tertiary';
      default:
        return 'text-text-primary';
    }
  };

  const formatTime = (time?: string): string => {
    if (!time) return '';
    const timeMatch = time.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hours = timeMatch[1];
      const minutes = timeMatch[2];
      return `${hours}:${minutes}`;
    }
    return time;
  };

  const getFirstLetter = (name: string): string => {
    if (!name) return '';
    return name.trim().charAt(0).toUpperCase();
  };

  const getTeamColor = (name: string): string => {
    if (!name) return 'bg-bg-tertiary';
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
      'bg-teal-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-rose-500',
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div 
      className="w-full max-w-[788px] mx-auto h-auto min-h-[80px] border-b border-border-primary relative cursor-pointer hover:bg-bg-hover transition-colors"
      onClick={handleMatchClick}
    >
      {isLive && (
        <div 
          className="absolute left-4 right-0 top-2 bottom-2 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.1) 10%, transparent 30%)'
          }}
        />
      )}
      {match.postponed && (
        <div className="absolute top-2 right-16 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-medium rounded z-20">
          POSTPONED
        </div>
      )}
      <div className="flex items-start gap-4 px-4 pt-2 pb-1 h-full relative z-10">
        <div className={`w-[56px] h-[60px] flex flex-col items-center justify-center gap-1 border-l-4 ${getBorderColor()} flex-shrink-0 ${match.status === 'scheduled' ? 'pl-2' : ''}`}>
          {match.status === 'scheduled' ? (
            <span className={`${getStatusTextColor()} text-sm font-medium`}>
              {formatTime(match.time)}
            </span>
          ) : (
            <>
              <span className={`${getStatusTextColor()} text-sm font-medium`}>
                {match.statusText}
              </span>
              {isLive && (
                <div className="relative w-full h-0.5 flex justify-center">
                  <div className="w-[16px] h-0.5 relative">
                    <div className="bg-status-live h-0.5 animate-width-pulse max-w-[16px]" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between h-[56px]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 relative ${
                match.homeTeam.logo ? 'bg-bg-tertiary' : getTeamColor(match.homeTeam.name)
              }`}>
                {match.homeTeam.logo ? (
                  <img 
                    src={match.homeTeam.logo} 
                    alt={match.homeTeam.name} 
                    className="w-[16px] h-[16px] object-contain"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      const parent = img.parentElement;
                      if (parent) {
                        img.style.display = 'none';
                        parent.className = parent.className.replace('bg-bg-tertiary', getTeamColor(match.homeTeam.name));
                        if (!parent.querySelector('.team-initial')) {
                          const initial = document.createElement('span');
                          initial.className = 'team-initial text-white text-xs font-semibold';
                          initial.textContent = getFirstLetter(match.homeTeam.name);
                          parent.appendChild(initial);
                        }
                      }
                    }}
                  />
                ) : (
                  <span className="text-white text-xs font-semibold">
                    {getFirstLetter(match.homeTeam.name)}
                  </span>
                )}
              </div>
              <span className="text-text-primary text-sm font-medium truncate">{match.homeTeam.name}</span>
              {match.indicators?.aggregate === 'home' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                  <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary text-[8px] leading-[12px] font-medium mt-[2px]">AGG</span>
                </div>
              )}
              {match.indicators?.penalty === 'home' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                 <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary text-[8px] leading-[12px] font-medium mt-[2px]">PEN</span>
                </div>
              )}
              {match.indicators?.redCard === 'home' && (
                <svg
                  className="w-[10px] h-[12px] flex-shrink-0 self-center"
                  viewBox="0 0 10 12"
                  fill="none"
                  aria-label="Red card"
                >
                  <rect x="0" y="0" width="10" height="12" rx="2" fill="#FF0000" />
                </svg>
              )}
            </div>
            {match.homeTeam.score !== undefined && (
              <div className="flex items-center gap-1">
                {match.homeTeam.aggregateScore !== undefined && (
                  <span className="text-text-tertiary text-[11px] leading-[16px] font-medium font-inter mr-1">[{match.homeTeam.aggregateScore}]</span>
                )}
                <span className="text-text-primary text-[12px] leading-[20px] font-medium font-inter">{match.homeTeam.score}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 relative ${
                match.awayTeam.logo ? 'bg-bg-tertiary' : getTeamColor(match.awayTeam.name)
              }`}>
                {match.awayTeam.logo ? (
                  <img 
                    src={match.awayTeam.logo} 
                    alt={match.awayTeam.name} 
                    className="w-[16px] h-[16px] object-contain"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      const parent = img.parentElement;
                      if (parent) {
                        img.style.display = 'none';
                        parent.className = parent.className.replace('bg-bg-tertiary', getTeamColor(match.awayTeam.name));
                        if (!parent.querySelector('.team-initial')) {
                          const initial = document.createElement('span');
                          initial.className = 'team-initial text-white text-xs font-semibold';
                          initial.textContent = getFirstLetter(match.awayTeam.name);
                          parent.appendChild(initial);
                        }
                      }
                    }}
                  />
                ) : (
                  <span className="text-white text-xs font-semibold">
                    {getFirstLetter(match.awayTeam.name)}
                  </span>
                )}
              </div>
              <span className="text-text-primary text-sm font-medium truncate">{match.awayTeam.name}</span>
              {match.indicators?.aggregate === 'away' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                  <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary text-[8px] leading-[12px] font-medium mt-[2px]">AGG</span>
                </div>
              )}
              {match.indicators?.penalty === 'away' && (
                <div className="w-[35px] h-[14px] flex items-center justify-center gap-0.5 rounded-[100px] p-1 bg-[#26273B]">
                  <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-brand-secondary text-[8px] leading-[12px] font-medium mt-[2px]">PEN</span>
                </div>
              )}
              {match.indicators?.redCard === 'away' && (
                <svg
                  className="w-[10px] h-[12px] flex-shrink-0 self-center"
                  viewBox="0 0 10 12"
                  fill="none"
                  aria-label="Red card"
                >
                  <rect x="0" y="0" width="10" height="12" rx="2" fill="#FF0000" />
                </svg>
              )}
            </div>
            {match.awayTeam.score !== undefined && (
              <div className="flex items-center gap-1">
                {match.awayTeam.aggregateScore !== undefined && (
                  <span className="text-text-tertiary text-[11px] leading-[16px] font-medium font-inter mr-1">[{match.awayTeam.aggregateScore}]</span>
                )}
                <span className="text-text-primary text-[12px] leading-[20px] font-medium font-inter">{match.awayTeam.score}</span>
              </div>
            )}
          </div>
        </div>

        <button title="More options" className="p-2 hover:bg-bg-hover rounded-full transition-colors flex-shrink-0 self-center cursor-pointer">
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MatchCard;

