export const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const API_ENDPOINTS = {
  EVENTS_NEXT: (id: string) => `${API_BASE_URL}/eventsnext.php?id=${id}`,
  
  EVENTS_LAST: (id: string) => `${API_BASE_URL}/eventslast.php?id=${id}`,
  
  LOOKUP_EVENT: (id: string) => `${API_BASE_URL}/lookupevent.php?id=${id}`,
  
  SEARCH_EVENTS: (query: string) => `${API_BASE_URL}/searchevents.php?e=${encodeURIComponent(query)}`,
  
  EVENTS_BY_DATE: (date: string) => `${API_BASE_URL}/eventsday.php?d=${date}`,
  
  EVENTS_BY_LEAGUE: (id: string) => `${API_BASE_URL}/eventsseason.php?id=${id}`,
  
  TEAMS_BY_LEAGUE: (id: string) => `${API_BASE_URL}/lookup_all_teams.php?id=${id}`,
  
  ALL_LEAGUES: () => `${API_BASE_URL}/all_leagues.php`,
} as const;

export const DEFAULT_LEAGUE_ID = '4328'; 

export const LIVE_POLLING_INTERVAL = 15000; 

