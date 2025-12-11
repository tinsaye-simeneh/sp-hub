import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Match } from '../types/match';
import EventsTimeline from './EventsTimeline';
import MatchSummary from './MatchSummary';
import TabNavigation from './TabNavigation';
import { mockEvents } from '../data/mockEvents';
import { arrowLeft } from '../assets';

interface MatchDetailsProps {
  match?: Match;
  leagueName?: string;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match, leagueName = 'English Premier League' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'Details' | 'Odds' | 'Lineups' | 'Events' | 'Stats' | 'Standings'>('Events');

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
    homeTeamCards: {
      yellow: 2,
      red: 0,
    },
    awayTeamCards: {
      yellow: 1,
      red: 1,
    },
    date: '11 AUG',
  };



  return (
    <div className="bg-[#181921]">
      <div className="w-full xl:max-w-[820px] xl:mx-auto xl:pt-10">
      <div className="w-full xl:w-[707px] bg-[#1D1E2B] rounded-t-lg xl:mx-auto">
        <div className="flex items-center gap-4 px-4 py-4 border-b border-border-primary">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-bg-hover rounded-full transition-colors"
          >
            <img src={arrowLeft} alt="back" className="w-[24px] h-[24px]" />
          </button>
          <h1 className="text-text-primary text-lg font-medium">{leagueName}</h1>
        </div>

        <MatchSummary match={matchData} />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="px-4 py-6">
          {activeTab === 'Events' && (
            <EventsTimeline
              events={mockEvents}
              homeScore={matchData.homeTeam.score ?? 0}
              awayScore={matchData.awayTeam.score ?? 0}
            />
          )}
          {activeTab === 'Details' && (
            <div className="text-text-primary">
              <p className="text-sm text-text-secondary">Match details will be displayed here</p>
            </div>
          )}
          {activeTab === 'Odds' && (
            <div className="text-text-primary">
              <p className="text-sm text-text-secondary">Odds will be displayed here</p>
            </div>
          )}
          {activeTab === 'Lineups' && (
            <div className="text-text-primary">
              <p className="text-sm text-text-secondary">Lineups will be displayed here</p>
            </div>
          )}
          {activeTab === 'Stats' && (
            <div className="text-text-primary">
              <p className="text-sm text-text-secondary">Statistics will be displayed here</p>
            </div>
          )}
          {activeTab === 'Standings' && (
            <div className="text-text-primary">
              <p className="text-sm text-text-secondary">Standings will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

