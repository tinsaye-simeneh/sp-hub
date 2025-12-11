import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Match } from './MatchCard';
import ArrowLeft from '../../public/arrow-left.png';

export interface MatchEvent {
  id: string;
  minute: string;
  type: 'goal' | 'substitution' | 'yellowCard' | 'redCard' | 'corner' | 'shot' | 'injury';
  team: 'home' | 'away';
  player?: string;
  playerOut?: string;
  playerIn?: string;
  assist?: string;
  description?: string;
  cornerNumber?: string;
}

interface EventsTimelineProps {
  events: MatchEvent[];
  homeScore: number;
  awayScore: number;
}

const EventsTimeline: React.FC<EventsTimelineProps> = ({ events, homeScore, awayScore }) => {
  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        );
      case 'substitution':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
            {/* Red up arrow on the left - crossing */}
            <path strokeLinecap="round" strokeLinejoin="round" stroke="#FF0000" d="M7 18L7 6M7 6L3 10M7 6L11 10" />
            {/* Green down arrow on the right - crossing */}
            <path strokeLinecap="round" strokeLinejoin="round" stroke="#10B981" d="M17 6L17 18M17 18L13 14M17 18L21 14" />
          </svg>
        );
      case 'yellowCard':
        return (
          <div className="w-3 h-3 bg-[#FFD700] opacity-70" />
        );
      case 'redCard':
        return (
          <div className="w-3 h-3 bg-[#FF0000] opacity-60" />
        );
      case 'corner':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 2v20l20-20H2zm2 2h14.83L4 18.17V4z"/>
          </svg>
        );
      case 'shot':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'injury':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.36 2.72L20.78 4.14 15.06 9.85C16.13 11.39 16.28 13.24 15.38 14.89L21.3 20.81L19.89 22.22L13.97 16.3C12.32 17.2 10.47 17.05 8.93 15.98L3.22 21.69L1.81 20.28L7.52 14.57C6.45 13.03 6.3 11.18 7.2 9.53L1.28 3.61L2.69 2.2L8.61 8.12C10.26 7.22 12.11 7.37 13.65 8.44L19.36 2.72ZM9.78 12.43L11.5 10.71C10.73 10.26 9.78 10.26 9.01 10.71L7.29 12.43C6.84 13.2 6.84 14.15 7.29 14.92L9.01 16.64C9.78 17.09 10.73 17.09 11.5 16.64L13.22 14.92C13.67 14.15 13.67 13.2 13.22 12.43L11.5 10.71C10.73 10.26 9.78 10.26 9.01 10.71L7.29 12.43Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getEventText = (event: MatchEvent) => {
    switch (event.type) {
      case 'goal':
        if (event.assist) {
          return (
            <span>
              <span className="font-medium">{event.player}</span>
              <span className="text-[#B3B3B3]"> ({event.assist})</span>
            </span>
          );
        }
        return <span className="font-medium">{event.player}</span>;
      case 'substitution':
        // This will be handled separately in the render
        return <span></span>;
      case 'yellowCard':
      case 'redCard':
        return event.description ? (
          <span>
            <span className="font-medium">{event.player}</span>
            <span className="text-[#B3B3B3]"> - {event.description}</span>
          </span>
        ) : (
          <span className="font-medium">{event.player}</span>
        );
      case 'corner':
        return <span>{event.cornerNumber || 'Corner'}</span>;
      case 'shot':
        return <span>{event.player}</span>;
      case 'injury':
        return event.description ? (
          <span>
            <span className="font-medium">{event.player}</span>
            <span className="text-[#B3B3B3]"> - {event.description}</span>
          </span>
        ) : (
          <span className="font-medium">{event.player}</span>
        );
      default:
        return '';
    }
  };

  // Parse minute value for comparison
  const parseMinute = (minute: string): number => {
    // Handle cases like "45+2'" -> 45, "89'" -> 89
    const match = minute.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Sort events by minute (latest first, as shown in the image)
  const sortedEvents = [...events].sort((a, b) => {
    const minuteA = parseMinute(a.minute);
    const minuteB = parseMinute(b.minute);
    return minuteB - minuteA;
  });

  // Split events: first half includes 45' and 45+X', so second half is strictly > 45
  const eventsAfterHalftime = sortedEvents.filter(event => {
    const minute = parseMinute(event.minute);
    return minute > 45;
  });

  const eventsBeforeHalftime = sortedEvents.filter(event => {
    const minute = parseMinute(event.minute);
    return minute <= 45;
  });

  const renderEventContent = (event: MatchEvent, isGoal: boolean) => {
    const isSubstitution = event.type === 'substitution';

    if (isSubstitution) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
          <div className="flex flex-col gap-1 leading-tight">
            <div className="text-[#FFFFFF] text-sm">{event.playerIn}</div>
            <div className="text-[#B3B3B3] text-sm">{event.playerOut}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className={`flex-shrink-0 ${isGoal ? 'text-[#10B981]' : 'text-[#FFFFFF]'}`}>
          {getEventIcon(event.type)}
        </div>
        <div className="text-[#FFFFFF] text-sm">{getEventText(event)}</div>
      </div>
    );
  };

  const renderEventRow = (event: MatchEvent) => {
    const isGoal = event.type === 'goal';
    const isHome = event.team === 'home';

    return (
      <div
        key={event.id}
        className="grid grid-cols-[1fr_64px_1fr] items-center gap-x-0.5 min-h-[40px]"
      >
        {/* Left column (home) */}
        <div className="flex items-center justify-end">
          {isHome ? (
            <div className="flex items-center gap-2">
              <div className="text-right">{renderEventContent(event, isGoal)}</div>
              {/* Connector line (leave space due to column gap) */}
              <div className="w-[45px] h-0.5 bg-[#2A2A2A] flex-shrink-0" />
            </div>
          ) : null}
        </div>

        {/* Center minute pill */}
        <div className="flex justify-center">
          <div
            className={`${isGoal ? 'bg-[#10B981]' : 'bg-[#2A2A2A]'} text-white text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap`}
          >
            {event.minute}
          </div>
        </div>

        {/* Right column (away) */}
        <div className="flex items-center justify-start">
          {!isHome ? (
            <div className="flex items-center gap-2">
              {/* Connector line */}
              <div className="w-[45px] h-0.5 bg-[#2A2A2A] flex-shrink-0" />
              <div className="text-left">{renderEventContent(event, isGoal)}</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="text-[#FFFFFF] w-[707px] bg-[#1D1E2B] rounded-lg mx-auto px-5 pt-5">
      <h2 className="text-lg font-medium mb-3 ml-6">Events</h2>
      
      <div className="relative pb-8">
        <div className="flex flex-col">
          {/* Fulltime Score Marker */}
          <div className="relative flex items-center justify-center py-3 mb-4">
            <div className="absolute left-0 right-0 h-0.5 bg-[#2A2A2A]" />
            <div className="relative z-10 bg-[#1d1e2b] px-4">
              <span className="text-[#FFFFFF] text-sm font-medium">Fulltime {homeScore} - {awayScore}</span>
            </div>
          </div>

          {/* Events After Halftime (>= 45) */}
          <div className="flex flex-col gap-3">
            {eventsAfterHalftime.map(renderEventRow)}
          </div>

          {/* Halftime Score Marker */}
          <div className="relative flex items-center justify-center py-3 my-4">
            <div className="absolute left-0 right-0 h-0.5 bg-[#2A2A2A]" />
            <div className="relative z-10 bg-[#1d1e2b] px-4">
              <span className="text-[#FFFFFF] text-sm font-medium">Halftime 1 - 0</span>
            </div>
          </div>

          {/* Events Before Halftime (< 45) */}
          <div className="flex flex-col gap-3">
            {eventsBeforeHalftime.map(renderEventRow)}
          </div>

          {/* Kick Off Marker */}
          <div className="relative flex items-center justify-center py-3 mt-4">
            <div className="absolute left-0 right-0 h-0.5 bg-[#2A2A2A]" />
            <div className="relative z-10 bg-[#1d1e2b] px-4">
              <span className="text-[#FFFFFF] text-sm font-medium">Kick Off -13:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MatchDetailsProps {
  match?: Match;
  leagueName?: string;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match, leagueName = 'English Premier League' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'Details' | 'Odds' | 'Lineups' | 'Events' | 'Stats' | 'Standings'>('Events');

  // Get match data from navigation state or use provided match or fallback to mock
  const matchFromState = (location.state as { match?: Match })?.match;
  const matchData: Match = match || matchFromState || {
    id: id || '1',
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
  };

  const tabs: Array<'Details' | 'Odds' | 'Lineups' | 'Events' | 'Stats' | 'Standings'> = [
    'Details',
    'Odds',
    'Lineups',
    'Events',
    'Stats',
    'Standings',
  ];

  const getStatusColor = () => {
    if (matchData.status === 'ft') return 'bg-[#EE5E52]';
    if (matchData.status === 'live' || matchData.status === 'ht') return 'bg-[#10B981]';
    return 'bg-[#808080]';
  };

  const getStatusText = () => {
    if (matchData.status === 'ft') return 'Finished';
    if (matchData.status === 'live') return 'Live';
    if (matchData.status === 'ht') return 'Half Time';
    return 'Scheduled';
  };

  // Mock events data - in real app, this would come from API
  const mockEvents: MatchEvent[] = [
    { id: '1', minute: "89'", type: 'substitution', team: 'home', playerOut: 'Gyokores', playerIn: 'Odegard' },
    { id: '2', minute: "88'", type: 'goal', team: 'away', player: 'Ekitike', assist: 'Sallah' },
    { id: '3', minute: "78'", type: 'yellowCard', team: 'home', player: 'Saliba' },
    { id: '4', minute: "74'", type: 'corner', team: 'home', cornerNumber: '3rd corner' },
    { id: '5', minute: "67'", type: 'substitution', team: 'home', playerOut: 'Rice', playerIn: 'Zubemendi' },
    { id: '6', minute: "67'", type: 'substitution', team: 'away', playerOut: 'Frimpong', playerIn: 'Robertson' },
    { id: '7', minute: "66'", type: 'redCard', team: 'away', player: 'Van Dijk', description: 'Sent Off' },
    { id: '8', minute: "55'", type: 'goal', team: 'home', player: 'Saka' },
    { id: '9', minute: "52'", type: 'corner', team: 'home', cornerNumber: '5th corner' },
    { id: '10', minute: "48'", type: 'corner', team: 'away', cornerNumber: '3rd Corner' },
    { id: '11', minute: "45+2'", type: 'corner', team: 'home', cornerNumber: '2nd corner' },
    { id: '12', minute: "45'", type: 'substitution', team: 'away', playerOut: 'Jones', playerIn: 'Mcalister' },
    { id: '13', minute: "44'", type: 'yellowCard', team: 'home', player: 'Gabriel' },
    { id: '14', minute: "44'", type: 'injury', team: 'away', player: 'Jones', description: 'Injured' },
    { id: '15', minute: "36'", type: 'corner', team: 'home', cornerNumber: '1st corner' },
    { id: '16', minute: "34'", type: 'yellowCard', team: 'away', player: 'Konate' },
    { id: '17', minute: "25'", type: 'shot', team: 'home', player: 'Gyokores' },
    { id: '18', minute: "16'", type: 'corner', team: 'away', cornerNumber: '2nd Corner' },
    { id: '19', minute: "12'", type: 'goal', team: 'home', player: 'Gyokores', assist: 'Odegard' },
    { id: '20', minute: "3'", type: 'corner', team: 'away', cornerNumber: '1st Corner' },
  ];

  return (
    <div className="bg-[#181921]">
      <div className="max-w-[820px] mx-auto pt-10">
      <div className="xl:w-[707px] bg-[#1D1E2B] rounded-t-lg mx-auto">
        {/* Header with back button and league name */}
        <div className="flex items-center gap-4 px-4 py-4 border-b border-[#2A2A2A]">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#252525] rounded-full transition-colors"
          >
            <img src={ArrowLeft} alt="back" className="w-[24px] h-[24px]" />
          </button>
          <h1 className="text-[#FFFFFF] text-lg font-medium">{leagueName}</h1>
        </div>

        {/* Match Summary Card */}
        <div className="px-4 py-6 w-[680px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 flex-1 relative">
              <div className="relative">
                {/* Yellow Card Indicator - Upper Right */}
                {matchData.homeTeamCards?.yellow && matchData.homeTeamCards.yellow > 0 && (
                  <div className="absolute -top-3 -right-5 w-5 h-5 bg-[#FFD700] flex items-center justify-center z-10">
                    <span className="text-[#000] text-[10px] font-bold">{matchData.homeTeamCards.yellow}</span>
                  </div>
                )}
                {/* Red Card Indicator - Above Logo */}
                {matchData.homeTeamCards?.red && matchData.homeTeamCards.red > 0 && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-6 w-5 h-5 bg-[#FF0000] flex items-center justify-center z-10">
                    <span className="text-[#000] text-[10px] font-bold">{matchData.homeTeamCards.red}</span>
                  </div>
                )}
                
                <div className="w-[48px] h-[48px] bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  {matchData.homeTeam.logo ? (
                    <img src={matchData.homeTeam.logo} alt={matchData.homeTeam.name} className="w-[48px] h-[48px]" />
                  ) : (
                    <div className="w-[48px] h-[48px] bg-[#808080] rounded-full" />
                  )}
                </div>
              </div>
              <span className="text-[#FFFFFF] text-sm font-medium">{matchData.homeTeam.name}</span>
            </div>

            {/* Center: Date, Score, Status */}
            <div className="flex flex-col items-center gap-2 flex-1 w-[48px]">
              <span className="text-[#B3B3B3] text-xs font-medium">{matchData.date || '11 AUG'}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#FFFFFF] text-[22px] font-bold">{matchData.homeTeam.score ?? 0}</span>
                <span className="text-[#FFFFFF] text-[22px] font-bold">-</span>
                <span className="text-[#FFFFFF] text-[22px] font-bold">{matchData.awayTeam.score ?? 0}</span>
              </div>
              <div className={`${getStatusColor()} text-white text-xs font-medium p-1 rounded-sm`}>
                {getStatusText()}
              </div>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 flex-1 relative">
              <div className="relative">
                {/* Card Indicators - Upper Left (stacked if both present) */}
                {matchData.awayTeamCards && (matchData.awayTeamCards.red > 0 || matchData.awayTeamCards.yellow > 0) && (
                  <div className="absolute -top-3 -left-10 flex flex-col gap-0.5 z-10 flex-row">
                    {matchData.awayTeamCards.red > 0 && (
                      <div className="w-5 h-5 bg-[#FF0000] flex items-center justify-center">
                        <span className="text-[#000] text-[10px] font-bold">{matchData.awayTeamCards.red}</span>
                      </div>
                    )}
                    {matchData.awayTeamCards.yellow > 0 && (
                      <div className="w-5 h-5 bg-[#FFD700] flex items-center justify-center">
                        <span className="text-[#000] text-[10px] font-bold">{matchData.awayTeamCards.yellow}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  {matchData.awayTeam.logo ? (
                    <img src={matchData.awayTeam.logo} alt={matchData.awayTeam.name} className="w-12 h-12" />
                  ) : (
                    <div className="w-12 h-12 bg-[#808080] rounded-full" />
                  )}
                </div>
              </div>
              <span className="text-[#FFFFFF] text-sm font-medium">{matchData.awayTeam.name}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#2A2A2A] px-4 ">
          <div className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap relative ${
                  activeTab === tab
                    ? 'text-[#00FFA5]'
                    : 'text-[#B3B3B3] hover:text-[#FFFFFF]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FFA5]" />
                )}
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 py-6">
          {activeTab === 'Events' && (
            <EventsTimeline
              events={mockEvents}
              homeScore={matchData.homeTeam.score ?? 0}
              awayScore={matchData.awayTeam.score ?? 0}
            />
          )}
          {activeTab === 'Details' && (
            <div className="text-[#FFFFFF]">
              <p className="text-sm text-[#B3B3B3]">Match details will be displayed here</p>
            </div>
          )}
          {activeTab === 'Odds' && (
            <div className="text-[#FFFFFF]">
              <p className="text-sm text-[#B3B3B3]">Odds will be displayed here</p>
            </div>
          )}
          {activeTab === 'Lineups' && (
            <div className="text-[#FFFFFF]">
              <p className="text-sm text-[#B3B3B3]">Lineups will be displayed here</p>
            </div>
          )}
          {activeTab === 'Stats' && (
            <div className="text-[#FFFFFF]">
              <p className="text-sm text-[#B3B3B3]">Statistics will be displayed here</p>
            </div>
          )}
          {activeTab === 'Standings' && (
            <div className="text-[#FFFFFF]">
              <p className="text-sm text-[#B3B3B3]">Standings will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

