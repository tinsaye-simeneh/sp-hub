/**
 * Custom hook for fetching matches with pagination
 */

import { useState, useEffect } from 'react';
import { fetchEventsByDate, PaginatedResponse } from '../services/api';
import { Match } from '../types/match';

interface UseMatchesOptions {
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
  const { date, includePast = false, page: initialPage = 1, limit = 10 } = options;
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

      // Use today's date if no date is provided
      const targetDate = date || new Date().toISOString().split('T')[0];
      
      // Fetch matches for the specified date (gets all leagues)
      const result: PaginatedResponse<Match> = await fetchEventsByDate(targetDate, page, limit);

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
  }, [date, includePast, page, limit]);

  return {
    matches,
    pagination,
    loading,
    error,
    refetch: fetchMatches,
    setPage,
  };
}

