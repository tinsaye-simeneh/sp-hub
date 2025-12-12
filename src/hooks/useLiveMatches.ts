
import { useState, useEffect, useRef } from 'react';
import { fetchEventsByDate, PaginatedResponse } from '../services/api';
import { Match } from '../types/match';
import { LIVE_POLLING_INTERVAL } from '../constants/api';

interface UseLiveMatchesOptions {
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
  const { enabled = true, page: initialPage = 1, limit = 10 } = options;
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMatches = async () => {
    try {
        const today = new Date().toISOString().split('T')[0];
      const result: PaginatedResponse<Match> = await fetchEventsByDate(today, 1, 1000);
      
      const liveMatches = result.data.filter(
        (match) => match.status === 'live' || match.status === 'ht'
      );
      
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedLiveMatches = liveMatches.slice(startIndex, endIndex);
      
      setMatches(paginatedLiveMatches);
      setPagination({
        page,
        limit,
        total: liveMatches.length,
        totalPages: Math.ceil(liveMatches.length / limit),
        hasNextPage: endIndex < liveMatches.length,
        hasPreviousPage: page > 1,
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

    fetchMatches();

    intervalRef.current = setInterval(() => {
      fetchMatches();
    }, LIVE_POLLING_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, page, limit]);

  return {
    matches,
    pagination,
    loading,
    error,
    refetch: fetchMatches,
    setPage,
  };
}

