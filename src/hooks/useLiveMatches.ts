/**
 * Custom hook for fetching live matches with polling and pagination
 */

import { useState, useEffect, useRef } from 'react';
import { fetchEventsByLeague, PaginatedResponse } from '../services/api';
import { Match } from '../types/match';
import { DEFAULT_LEAGUE_ID, LIVE_POLLING_INTERVAL } from '../constants/api';

interface UseLiveMatchesOptions {
  leagueId?: string;
  enabled?: boolean;
  page?: number;
  limit?: number;
}

interface UseLiveMatchesReturn {
  matches: Match[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  loading: boolean;
  error: string | null;
  refetch: () => void;
  setPage: (page: number) => void;
}

export function useLiveMatches(options: UseLiveMatchesOptions = {}): UseLiveMatchesReturn {
  const { leagueId = DEFAULT_LEAGUE_ID, enabled = true, page: initialPage = 1, limit = 10 } = options;
  const [page, setPage] = useState(initialPage);
  const [matches, setMatches] = useState<Match[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMatches = async () => {
    try {
      setError(null);
      const result: PaginatedResponse<Match> = await fetchEventsByLeague(leagueId, page, limit);
      
      // Filter for live matches only
      const liveMatches = result.data.filter(
        (match) => match.status === 'live' || match.status === 'ht'
      );
      
      setMatches(liveMatches);
      setPagination({
        ...result.pagination,
        total: liveMatches.length,
        totalPages: Math.ceil(liveMatches.length / limit),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch live matches';
      setError(errorMessage);
      console.error('Error in useLiveMatches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Initial fetch
    fetchMatches();

    // Set up polling
    intervalRef.current = setInterval(() => {
      fetchMatches();
    }, LIVE_POLLING_INTERVAL);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leagueId, enabled, page, limit]);

  return {
    matches,
    pagination,
    loading,
    error,
    refetch: fetchMatches,
    setPage,
  };
}

