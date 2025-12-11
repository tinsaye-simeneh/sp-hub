import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Match } from '../types/match';
import EventsTimeline from './EventsTimeline';
import MatchSummary from './MatchSummary';
import TabNavigation from './TabNavigation';
import MatchDetailsTab from './MatchDetailsTab';
import MatchLineupsTab from './MatchLineupsTab';
import Loader from './Loader';
import { useMatchDetails } from '../hooks/useMatchDetails';
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

  const { match: apiMatch, events: apiEvents, loading, error } = useMatchDetails(id);

  const matchFromState = (location.state as { match?: Match })?.match;
  const matchData: Match = apiMatch || match || matchFromState || {
    id: id || '1',
    status: 'ft',
    statusText: 'FT',
    homeTeam: {
      name: 'Loading...',
      score: 0,
    },
    awayTeam: {
      name: 'Loading...',
      score: 0,
    },
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase(),
  };

  const displayEvents = apiEvents.length > 0 ? apiEvents : [];
  
  // Get league name from API match if available
  const displayLeagueName = apiMatch?.league || leagueName;

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
          <h1 className="text-text-primary text-lg font-medium">{displayLeagueName}</h1>
        </div>

        <MatchSummary match={matchData} />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="px-4 py-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader size="lg" />
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-status-error">Error: {error}</div>
            </div>
          )}

          {!loading && !error && (
            <>
              {activeTab === 'Events' && (
                <EventsTimeline
                  events={displayEvents}
                  homeScore={matchData.homeTeam.score ?? 0}
                  awayScore={matchData.awayTeam.score ?? 0}
                />
              )}
          {activeTab === 'Details' && (
            <MatchDetailsTab match={matchData} />
          )}
          {activeTab === 'Odds' && (
            <div className="text-text-primary">
              <p className="text-sm text-text-secondary">Odds will be displayed here</p>
            </div>
          )}
          {activeTab === 'Lineups' && (
            <MatchLineupsTab match={matchData} />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

