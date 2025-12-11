/**
 * Custom hook for managing favorite matches
 */

import { useState, useEffect } from 'react';
import { Match } from '../types/match';

const FAVORITES_STORAGE_KEY = 'sports-hub-favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const ids = JSON.parse(stored) as string[];
        setFavoriteIds(new Set(ids));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favoriteIds]);

  const toggleFavorite = (matchId: string) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(matchId)) {
        newSet.delete(matchId);
      } else {
        newSet.add(matchId);
      }
      return newSet;
    });
  };

  const isFavorite = (matchId: string) => {
    return favoriteIds.has(matchId);
  };

  const getFavoriteMatches = (allMatches: Match[]): Match[] => {
    return allMatches.filter((match) => favoriteIds.has(match.id));
  };

  const getFavoriteCount = () => {
    return favoriteIds.size;
  };

  return {
    isFavorite,
    toggleFavorite,
    getFavoriteMatches,
    getFavoriteCount,
    favoriteIds: Array.from(favoriteIds),
  };
}

