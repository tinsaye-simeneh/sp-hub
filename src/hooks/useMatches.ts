/**
 * Custom hook for fetching matches with pagination
 */

import { useState, useEffect } from 'react';
import { fetchEventsByLeague, fetchEventsByDate, PaginatedResponse } from '../services/api';
import { Match } from '../types/match';
import { DEFAULT_LEAGUE_ID } from '../constants/api';

interface UseMatchesOptions {
  leagueId?: string;
  date?: string;
  includePast?: boolean;
  page?: number;
  limit?: number;
}

interface UseMatchesReturn {
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

export function useMatches(options: UseMatchesOptions = {}): UseMatchesReturn {
  const { leagueId = DEFAULT_LEAGUE_ID, date, includePast = false, page: initialPage = 1, limit = 10 } = options;
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

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      let result: PaginatedResponse<Match>;

      if (date) {
        // Fetch matches for specific date
        result = await fetchEventsByDate(date, page, limit);
      } else {
        // Fetch all events by league (includes all teams in the league)
        result = await fetchEventsByLeague(leagueId, page, limit);
      }

      setMatches(result.data);
      setPagination(result.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch matches';
      setError(errorMessage);
      console.error('Error in useMatches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [leagueId, date, includePast, page, limit]);

  return {
    matches,
    pagination,
    loading,
    error,
    refetch: fetchMatches,
    setPage,
  };
}

