import React, { useState, useMemo, useEffect } from 'react';
import LeagueSection from './LeagueSection';
import DateSelector from './DateSelector';
import FilterButtons from './FilterButtons';
import Loader from './Loader';
import ErrorFallback from './ErrorFallback';
import { useMatches } from '../hooks/useMatches';
import { useLiveMatches } from '../hooks/useLiveMatches';
import { useFavorites } from '../hooks/useFavorites';
import { fetchEventsByDate, fetchEventsByLeague } from '../services/api';
import { Match } from '../types/match';

const PREMIER_LEAGUE_ID = '4328';
const PREMIER_LEAGUE_NAME = 'Premier League';

const MatchesDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'favorites'>('all');
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [liveCount, setLiveCount] = useState(0);
  const [premierLeagueMatches, setPremierLeagueMatches] = useState<Match[]>([]);
  const [premierLeagueLoading, setPremierLeagueLoading] = useState(false);

  const { getFavoriteMatches, getFavoriteCount, favoriteIds } = useFavorites();

  const { matches: allMatches, loading: allLoading, error: allError } = useMatches({
    includePast: true,
    date: selectedDate,
    page: 1,
    limit: 1000, 
  });
  
  const { matches: liveMatches, pagination: livePagination, loading: liveLoading, error: liveError } = useLiveMatches({
    enabled: activeFilter === 'live',
    page: 1,
    limit: 1000, 
  });

  useEffect(() => {
    const fetchPremierLeague = async () => {
      try {
        setPremierLeagueLoading(true);

        const result = await fetchEventsByLeague(PREMIER_LEAGUE_ID, 1, 1000);
        
        let filteredMatches = result.data;
        if (selectedDate) {
          filteredMatches = result.data.filter((match: Match) => {
            if (!match.fullDate) return false;
            return match.fullDate === selectedDate;
          });
        }
        
        console.log(`Fetched ${result.data.length} Premier League matches, showing ${filteredMatches.length} after date filter`);
        setPremierLeagueMatches(filteredMatches);
      } catch (error) {
        console.error('Error fetching Premier League matches:', error);
        setPremierLeagueMatches([]);
      } finally {
        setPremierLeagueLoading(false);
      }
    };

    fetchPremierLeague();
  }, [selectedDate]);

  useEffect(() => {
    const fetchLiveCount = async () => {
      try {
          const today = new Date().toISOString().split('T')[0];
        const result = await fetchEventsByDate(today, 1, 1000);
        const liveMatches = result.data.filter(
          (match: Match) => match.status === 'live' || match.status === 'ht'
        );
        setLiveCount(liveMatches.length);
      } catch (error) {
        console.error('Error fetching live count:', error);
      }
    };

    fetchLiveCount();
    const interval = setInterval(fetchLiveCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const favoriteMatches = useMemo(() => {
    return getFavoriteMatches(allMatches);
  }, [allMatches, favoriteIds]);

  const displayMatches = useMemo(() => {
    if (activeFilter === 'live') {
      return liveMatches;
    }
    if (activeFilter === 'favorites') {
      return favoriteMatches;
    }
    return allMatches;
  }, [activeFilter, allMatches, liveMatches, favoriteMatches]);


  const isPremierLeague = (match: Match): boolean => {
    const leagueName = match.league?.toLowerCase() || '';
    return leagueName.includes('premier league') || 
           leagueName.includes('english premier') ||
           leagueName === 'premier league';
  };

  const allMatchesCount = useMemo(() => {
    if (activeFilter === 'live') {
      return livePagination.total;
    }
    if (activeFilter === 'favorites') {
      return getFavoriteCount();
    }
    const nonPremierCount = allMatches.filter(match => !isPremierLeague(match)).length;
    return nonPremierCount + premierLeagueMatches.length;
  }, [activeFilter, allMatches, premierLeagueMatches, livePagination.total, getFavoriteCount]);

  const groupedMatches = useMemo(() => {
    const nonPremierMatches = displayMatches.filter(match => !isPremierLeague(match));
    
    const leagueMap = new Map<string, { matches: Match[]; badge?: string }>();
    
    nonPremierMatches.forEach((match) => {
      const leagueName = match.league || 'Other Leagues';
      if (!leagueMap.has(leagueName)) {
        leagueMap.set(leagueName, { matches: [], badge: match.leagueBadge });
      }
      leagueMap.get(leagueName)!.matches.push(match);
      if (match.leagueBadge && !leagueMap.get(leagueName)!.badge) {
        leagueMap.get(leagueName)!.badge = match.leagueBadge;
      }
    });
    
    const otherLeagues = Array.from(leagueMap.entries()).map(([league, data]) => ({
      league,
      matches: data.matches,
      badge: data.badge,
    }));
    
    const shouldShowPremierLeague = activeFilter === 'all' && premierLeagueMatches.length > 0;
    const premierLeagueSection = shouldShowPremierLeague ? [{
      league: premierLeagueMatches[0]?.league || PREMIER_LEAGUE_NAME,
      matches: premierLeagueMatches,
      badge: premierLeagueMatches[0]?.leagueBadge,
    }] : [];
    
    console.log('Grouped matches:', {
      premierLeagueCount: premierLeagueMatches.length,
      premierLeagueSection: premierLeagueSection.length,
      otherLeaguesCount: otherLeagues.length,
      activeFilter
    });
    
    return [...premierLeagueSection, ...otherLeagues];
  }, [displayMatches, premierLeagueMatches, activeFilter]);

  const loading = activeFilter === 'live' ? liveLoading : (allLoading || premierLeagueLoading);
  const error = activeFilter === 'live' ? liveError : allError;

  return (
    <div className="bg-[#181921] min-h-screen w-full overflow-x-hidden pt-[60px]">
      <div className="w-full max-w-[820px] mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-6">Matches</h1>

        <DateSelector onDateChange={setSelectedDate} />

        <FilterButtons 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          allCount={allMatchesCount}
          liveCount={liveCount}
          favoritesCount={getFavoriteCount()}
        />

        {loading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)] w-full bg-[#181921] -mx-4 px-4">
            <Loader size="lg" />
          </div>
        )}

        {error && !loading && (
          <ErrorFallback
            error={error}
            onRetry={() => {
              if (activeFilter === 'live') {
                // Retry logic for live matches
                window.location.reload();
              } else {
                // Retry logic for all matches
                window.location.reload();
              }
            }}
            title="Failed to load matches"
            message="We couldn't fetch the matches. Please check your connection and try again."
          />
        )}

        {!loading && !error && (
          <div>
            {groupedMatches.length > 0 ? (
              groupedMatches.map((section) => (
                <LeagueSection
                  key={section.league}
                  leagueName={section.league}
                  matches={section.matches}
                  leagueBadge={section.badge}
                />
              ))
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-text-secondary">No matches found</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesDashboard;

