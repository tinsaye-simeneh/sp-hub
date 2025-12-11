/**
 * Custom hook for fetching match details
 */

import { useState, useEffect } from 'react';
import { fetchMatchDetails } from '../services/api';
import { Match, MatchEvent } from '../types/match';

interface UseMatchDetailsReturn {
  match: Match | null;
  events: MatchEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMatchDetails(eventId: string | undefined): UseMatchDetailsReturn {
  const [match, setMatch] = useState<Match | null>(null);
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    if (!eventId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { match: matchData, events: eventsData } = await fetchMatchDetails(eventId);
      setMatch(matchData);
      setEvents(eventsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch match details';
      setError(errorMessage);
      console.error('Error in useMatchDetails:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [eventId]);

  return {
    match,
    events,
    loading,
    error,
    refetch: fetchDetails,
  };
}

