import React from 'react';
import { MatchEvent } from '../types/match';

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
            <path strokeLinecap="round" strokeLinejoin="round" stroke="#FF0000" d="M7 18L7 6M7 6L3 10M7 6L11 10" />
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

  const parseMinute = (minute: string): number => {
    const match = minute.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const sortedEvents = [...events].sort((a, b) => {
    const minuteA = parseMinute(a.minute);
    const minuteB = parseMinute(b.minute);
    return minuteB - minuteA;
  });

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
        <div className="flex items-center justify-end">
          {isHome ? (
            <div className="flex items-center gap-2">
              <div className="text-right">{renderEventContent(event, isGoal)}</div>
              <div className="w-[45px] h-0.5 bg-[#2A2A2A] flex-shrink-0" />
            </div>
          ) : null}
        </div>

        <div className="flex justify-center">
          <div
            className={`${isGoal ? 'bg-[#10B981]' : 'bg-[#2A2A2A]'} text-white text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap`}
          >
            {event.minute}
          </div>
        </div>

        <div className="flex items-center justify-start">
          {!isHome ? (
            <div className="flex items-center gap-2">
              <div className="w-[45px] h-0.5 bg-[#2A2A2A] flex-shrink-0" />
              <div className="text-left">{renderEventContent(event, isGoal)}</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="text-[#FFFFFF] w-full xl:w-[707px] bg-[#1D1E2B] rounded-lg xl:mx-auto px-5 pt-5">
      <h2 className="text-lg font-medium mb-3 ml-6">Events</h2>
      
      <div className="relative pb-8">
        <div className="flex flex-col">
          <div className="relative flex items-center justify-center py-3 mb-4">
            <div className="absolute left-0 right-0 h-0.5 bg-[#2A2A2A]" />
            <div className="relative z-10 bg-[#1d1e2b] px-4">
              <span className="text-[#FFFFFF] text-sm font-medium">Fulltime {homeScore} - {awayScore}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {eventsAfterHalftime.map(renderEventRow)}
          </div>

          <div className="relative flex items-center justify-center py-3 my-4">
            <div className="absolute left-0 right-0 h-0.5 bg-[#2A2A2A]" />
            <div className="relative z-10 bg-[#1d1e2b] px-4">
              <span className="text-[#FFFFFF] text-sm font-medium">Halftime 1 - 0</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {eventsBeforeHalftime.map(renderEventRow)}
          </div>

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

export default EventsTimeline;

