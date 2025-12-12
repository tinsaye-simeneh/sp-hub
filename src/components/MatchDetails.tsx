import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Match } from '../types/match';
import EventsTimeline from './EventsTimeline';
import MatchSummary from './MatchSummary';
import TabNavigation from './TabNavigation';
import MatchDetailsTab from './MatchDetailsTab';
import MatchLineupsTab from './MatchLineupsTab';
import Loader from './Loader';
import ErrorFallback from './ErrorFallback';
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

  const { match: apiMatch, events: apiEvents, loading, error, refetch } = useMatchDetails(id);

  const matchFromState = (location.state as { match?: Match })?.match;
  
  const matchData: Match | null = apiMatch || 
    (!loading && error && (match || matchFromState)) || 
    (loading && (match || matchFromState)) || 
    null;

  const displayEvents = apiEvents.length > 0 ? apiEvents : [];
  
  const displayLeagueName = apiMatch?.league || leagueName;

  return (
    <div className="bg-[#181921] min-h-screen w-full overflow-x-hidden pt-[70px]">
      <div className="w-full max-w-[820px] mx-auto xl:px-4 xl:pt-10 overflow-x-hidden">
      <div className="w-full max-w-[707px] bg-[#1D1E2B] xl:rounded-t-lg mx-auto overflow-x-hidden">
        <div className="flex items-center gap-4 px-4 py-4 border-b border-border-primary">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-bg-hover rounded-full transition-colors cursor-pointer"
          >
            <img src={arrowLeft} alt="back" className="w-[24px] h-[24px]" />
          </button>
          <h1 className="text-text-primary text-lg font-medium">{displayLeagueName}</h1>
        </div>

        {loading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)] w-full bg-[#1D1E2B]">
            <Loader size="lg" />
          </div>
        )}

        {error && !matchData && !loading && (
          <div className="bg-[#1D1E2B] min-h-[calc(100vh-200px)]">
            <ErrorFallback
              error={error}
              onRetry={refetch}
              title="Failed to load match details"
              message="We couldn't fetch the match details. Please check your connection and try again."
            />
          </div>
        )}

        {matchData && (
          <>
            <MatchSummary match={matchData} />

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </>
        )}
        </div>

        {matchData && (
          <div className="px-4 py-6">
            {error && (
              <div className="mb-4 p-3 bg-bg-secondary rounded-lg">
                <div className="text-status-error text-sm">Warning: {error}</div>
              </div>
            )}

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
              <div className="text-text-primary mx-auto text-center">
                <p className="text-sm text-text-secondary">Odds will be displayed here</p>
              </div>
            )}
            {activeTab === 'Lineups' && (
              <MatchLineupsTab match={matchData} />
            )}
            {activeTab === 'Stats' && (
              <div className="text-text-primary mx-auto text-center">
                <p className="text-sm text-text-secondary">Statistics will be displayed here</p>
              </div>
            )}
            {activeTab === 'Standings' && (
              <div className="text-text-primary mx-auto text-center">
                <p className="text-sm text-text-secondary">Standings will be displayed here</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;

