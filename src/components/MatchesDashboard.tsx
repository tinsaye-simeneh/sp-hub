import React, { useState, useMemo, useEffect } from 'react';
import LeagueSection from './LeagueSection';
import DateSelector from './DateSelector';
import FilterButtons from './FilterButtons';
import Loader from './Loader';
import Pagination from './Pagination';
import { useMatches } from '../hooks/useMatches';
import { useLiveMatches } from '../hooks/useLiveMatches';
import { useFavorites } from '../hooks/useFavorites';
import { fetchEventsByLeague } from '../services/api';
import { Match } from '../types/match';
import { DEFAULT_LEAGUE_ID } from '../constants/api';

const MatchesDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'favorites'>('all');
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [liveCount, setLiveCount] = useState(0);

  const { getFavoriteMatches, getFavoriteCount, favoriteIds } = useFavorites();

  const { matches: allMatches, pagination: allPagination, loading: allLoading, error: allError, setPage: setAllPage } = useMatches({
    includePast: true,
    date: selectedDate,
    page,
    limit,
  });
  
  const { matches: liveMatches, pagination: livePagination, loading: liveLoading, error: liveError, setPage: setLivePage } = useLiveMatches({
    enabled: activeFilter === 'live',
    page,
    limit,
  });

  useEffect(() => {
    const fetchLiveCount = async () => {
      try {
        const result = await fetchEventsByLeague(DEFAULT_LEAGUE_ID, 1, 1000);
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

  const currentPagination = activeFilter === 'live' ? livePagination : allPagination;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (activeFilter === 'live') {
      setLivePage(newPage);
    } else {
      setAllPage(newPage);
    }
  };

  const groupedMatches = useMemo(() => {
    if (displayMatches.length === 0) {
      return [];
    }
    
    return [{
      league: 'English Premier League',
      matches: displayMatches,
    }];
  }, [displayMatches]);

  const loading = activeFilter === 'live' ? liveLoading : allLoading;
  const error = activeFilter === 'live' ? liveError : allError;

  return (
    <div className="bg-[#181921] min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-[820px] mx-auto px-4 py-6">
        <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-6">Matches</h1>

        <DateSelector onDateChange={setSelectedDate} />

        <FilterButtons 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          allCount={allPagination.total}
          liveCount={liveCount}
          favoritesCount={getFavoriteCount()}
        />

        {loading && (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)] w-full bg-[#181921] -mx-4 px-4">
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
            <div>
              {groupedMatches.length > 0 ? (
                groupedMatches.map((section) => (
                  <LeagueSection
                    key={section.league}
                    leagueName={section.league}
                    matches={section.matches}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center py-12">
                  <div className="text-text-secondary">No matches found</div>
                </div>
              )}
            </div>

            {currentPagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPagination.page}
                  totalPages={currentPagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MatchesDashboard;

