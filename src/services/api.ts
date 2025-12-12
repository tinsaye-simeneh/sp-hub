/**
 * API Service Functions
 * Handles all communication with The SportsDB API
 */

import { API_ENDPOINTS } from '../constants/api';
import { Match, MatchEvent } from '../types/match';

// The SportsDB API Response Types
export interface SportsDBEvent {
  idEvent: string;
  idSoccerXML: string | null;
  idAPIfootball: string | null;
  strEvent: string;
  strEventAlternate: string | null;
  strFilename: string | null;
  strSport: string;
  idLeague: string;
  strLeague: string;
  strLeagueBadge: string | null;
  strSeason: string | null;
  strDescriptionEN: string | null;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  intRound: string | null;
  intSpectators: string | null;
  strOfficial: string | null;
  dateEvent: string;
  dateEventLocal: string | null;
  strDate: string | null;
  strTime: string | null;
  strTimeLocal: string | null;
  strTVStation: string | null;
  idHomeTeam: string;
  strHomeTeamBadge: string | null;
  idAwayTeam: string;
  strAwayTeamBadge: string | null;
  intScore: string | null;
  intScoreVotes: string | null;
  strResult: string | null;
  idVenue: string | null;
  strVenue: string | null;
  strCountry: string | null;
  strCity: string | null;
  strGroup: string | null;
  strPoster: string | null;
  strSquare: string | null;
  strFanart: string | null;
  strThumb: string | null;
  strBanner: string | null;
  strMap: string | null;
  strTweet1: string | null;
  strTweet2: string | null;
  strTweet3: string | null;
  strVideo: string | null;
  strStatus: string | null;
  strPostponed: string;
  strLocked: string | null;
  strTimestamp: string | null;
  dateEventISO: string | null;
  strTimeUTC: string | null;
}

export interface SportsDBEventDetail extends SportsDBEvent {
  strHomeFormation: string | null;
  strAwayFormation: string | null;
  intHomeShots: string | null;
  intAwayShots: string | null;
  strHomeGoalDetails: string | null;
  strAwayGoalDetails: string | null;
  strHomeRedCards: string | null;
  strAwayRedCards: string | null;
  strHomeYellowCards: string | null;
  strAwayYellowCards: string | null;
  strHomeLineupGoalkeeper: string | null;
  strHomeLineupDefense: string | null;
  strHomeLineupMidfield: string | null;
  strHomeLineupForward: string | null;
  strHomeLineupSubstitutes: string | null;
  strAwayLineupGoalkeeper: string | null;
  strAwayLineupDefense: string | null;
  strAwayLineupMidfield: string | null;
  strAwayLineupForward: string | null;
  strAwayLineupSubstitutes: string | null;
  strHomeScorers: string | null;
  strAwayScorers: string | null;
  strHomeAssists: string | null;
  strAwayAssists: string | null;
  intHomeScore: string | null;
  intAwayScore: string | null;
}

export interface SportsDBResponse<T> {
  events?: T[];
  event?: T;
  results?: T[];
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Generic API fetch function with error handling
 */
async function fetchAPI<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

/**
 * Convert SportsDB status to our Match status type
 */
function convertStatus(strStatus: string, intHomeScore: string | null, intAwayScore: string | null): Match['status'] {
  const status = strStatus?.toLowerCase() || '';
  
  if (status.includes('live') || status.includes('1h') || status.includes('2h')) {
    return 'live';
  }
  if (status.includes('half time') || status.includes('ht')) {
    return 'ht';
  }
  if (status.includes('finished') || status.includes('ft') || status.includes('result')) {
    return 'ft';
  }
  if (intHomeScore !== null && intAwayScore !== null) {
    return 'ft';
  }
  return 'scheduled';
}

/**
 * Get status text from SportsDB event
 */
function getStatusText(event: SportsDBEvent): string {
  const status = (event.strStatus || '').toLowerCase();
  
  if (status.includes('live') || status.includes('1h') || status.includes('2h')) {
    // Extract minute if available
    const minuteMatch = status.match(/(\d+)\s*'/);
    if (minuteMatch) {
      return `${minuteMatch[1]}'`;
    }
    return 'LIVE';
  }
  if (status.includes('half time') || status.includes('ht')) {
    return 'HT';
  }
  if (status.includes('finished') || status.includes('ft')) {
    return 'FT';
  }
  // If status is null but scores exist, it's finished
  if (event.intHomeScore !== null && event.intAwayScore !== null) {
    return 'FT';
  }
  if (event.strTime) {
    return event.strTime;
  }
  return 'Scheduled';
}

/**
 * Format date to short format (e.g., "11 AUG")
 */
function formatDate(dateString: string | null): string | undefined {
  if (!dateString) return undefined;
  
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  } catch {
    return undefined;
  }
}

/**
 * Parse goal details to extract events
 */
function parseGoalDetails(goalDetails: string | null, team: 'home' | 'away'): MatchEvent[] {
  if (!goalDetails) return [];
  
  const events: MatchEvent[] = [];
  // Format: "Player Name (minute')" or "Player Name (minute') assist: Assister Name"
  const goalRegex = /([^(]+)\s*\((\d+['\+]?)\)(?:\s*assist:\s*([^)]+))?/gi;
  let match;
  
  while ((match = goalRegex.exec(goalDetails)) !== null) {
    const player = match[1].trim();
    const minute = match[2];
    const assist = match[3]?.trim();
    
    events.push({
      id: `${team}-goal-${minute}-${player}`,
      minute: `${minute}'`,
      type: 'goal',
      team,
      player,
      assist,
    });
  }
  
  return events;
}

/**
 * Parse card details to extract events
 */
function parseCardDetails(
  cardDetails: string | null,
  team: 'home' | 'away',
  cardType: 'yellowCard' | 'redCard'
): MatchEvent[] {
  if (!cardDetails) return [];
  
  const events: MatchEvent[] = [];
  // Format: "Player Name (minute')"
  const cardRegex = /([^(]+)\s*\((\d+['\+]?)\)/gi;
  let match;
  
  while ((match = cardRegex.exec(cardDetails)) !== null) {
    const player = match[1].trim();
    const minute = match[2];
    
    events.push({
      id: `${team}-${cardType}-${minute}-${player}`,
      minute: `${minute}'`,
      type: cardType,
      team,
      player,
    });
  }
  
  return events;
}

/**
 * Convert SportsDB event to our Match type
 */
export function convertToMatch(event: SportsDBEvent): Match {
  const homeScore = event.intHomeScore ? parseInt(event.intHomeScore, 10) : undefined;
  const awayScore = event.intAwayScore ? parseInt(event.intAwayScore, 10) : undefined;
  const status = convertStatus(event.strStatus || '', event.intHomeScore, event.intAwayScore);
  
  // Get team badges/logos from the event
  const homeTeamLogo = event.strHomeTeamBadge || undefined;
  const awayTeamLogo = event.strAwayTeamBadge || undefined;
  
  // Parse additional fields
  const round = event.intRound ? parseInt(event.intRound, 10) : undefined;
  const spectators = event.intSpectators ? parseInt(event.intSpectators, 10) : undefined;
  const postponed = event.strPostponed === 'yes';
  
  return {
    id: event.idEvent,
    status,
    statusText: getStatusText(event),
    homeTeam: {
      name: event.strHomeTeam,
      score: homeScore,
      logo: homeTeamLogo,
    },
    awayTeam: {
      name: event.strAwayTeam,
      score: awayScore,
      logo: awayTeamLogo,
    },
    date: formatDate(event.dateEvent),
    fullDate: event.dateEvent || undefined, // Keep original date for filtering
    time: event.strTime || undefined,
    league: event.strLeague || undefined,
    leagueBadge: event.strLeagueBadge || undefined,
    season: event.strSeason || undefined,
    sport: event.strSport || undefined,
    round,
    postponed,
    venue: event.strVenue || undefined,
    city: event.strCity || undefined,
    country: event.strCountry || undefined,
    spectators,
    official: event.strOfficial || undefined,
  };
}

/**
 * Parse lineup string into array
 */
function parseLineup(lineup: string | null): string[] {
  if (!lineup) return [];
  return lineup.split(';').filter(Boolean).map(p => p.trim());
}

/**
 * Convert SportsDB event detail to Match with additional data
 */
export function convertToMatchDetail(event: SportsDBEventDetail): Match {
  const match = convertToMatch(event);
  
  // Add league information
  match.league = event.strLeague || undefined;
  match.venue = event.strVenue || undefined;
  match.city = event.strCity || undefined;
  match.country = event.strCountry || undefined;
  
  // Add formations
  match.homeFormation = event.strHomeFormation || undefined;
  match.awayFormation = event.strAwayFormation || undefined;
  
  // Add shots
  match.homeShots = event.intHomeShots ? parseInt(event.intHomeShots, 10) : undefined;
  match.awayShots = event.intAwayShots ? parseInt(event.intAwayShots, 10) : undefined;
  
  // Parse cards if available
  if (event.strHomeYellowCards || event.strHomeRedCards) {
    const yellowCount = event.strHomeYellowCards?.split(',').filter(Boolean).length || 0;
    const redCount = event.strHomeRedCards?.split(',').filter(Boolean).length || 0;
    match.homeTeamCards = { yellow: yellowCount, red: redCount };
  }
  
  if (event.strAwayYellowCards || event.strAwayRedCards) {
    const yellowCount = event.strAwayYellowCards?.split(',').filter(Boolean).length || 0;
    const redCount = event.strAwayRedCards?.split(',').filter(Boolean).length || 0;
    match.awayTeamCards = { yellow: yellowCount, red: redCount };
  }
  
  // Parse lineups
  if (event.strHomeLineupGoalkeeper || event.strHomeLineupDefense || event.strHomeLineupMidfield || event.strHomeLineupForward) {
    match.homeLineup = {
      goalkeeper: parseLineup(event.strHomeLineupGoalkeeper),
      defense: parseLineup(event.strHomeLineupDefense),
      midfield: parseLineup(event.strHomeLineupMidfield),
      forward: parseLineup(event.strHomeLineupForward),
      substitutes: parseLineup(event.strHomeLineupSubstitutes),
    };
  }
  
  if (event.strAwayLineupGoalkeeper || event.strAwayLineupDefense || event.strAwayLineupMidfield || event.strAwayLineupForward) {
    match.awayLineup = {
      goalkeeper: parseLineup(event.strAwayLineupGoalkeeper),
      defense: parseLineup(event.strAwayLineupDefense),
      midfield: parseLineup(event.strAwayLineupMidfield),
      forward: parseLineup(event.strAwayLineupForward),
      substitutes: parseLineup(event.strAwayLineupSubstitutes),
    };
  }
  
  return match;
}

/**
 * Convert SportsDB event detail to MatchEvents
 */
export function convertToMatchEvents(event: SportsDBEventDetail): MatchEvent[] {
  const events: MatchEvent[] = [];
  
  // Parse goals
  if (event.strHomeGoalDetails) {
    events.push(...parseGoalDetails(event.strHomeGoalDetails, 'home'));
  }
  if (event.strAwayGoalDetails) {
    events.push(...parseGoalDetails(event.strAwayGoalDetails, 'away'));
  }
  
  // Parse yellow cards
  if (event.strHomeYellowCards) {
    events.push(...parseCardDetails(event.strHomeYellowCards, 'home', 'yellowCard'));
  }
  if (event.strAwayYellowCards) {
    events.push(...parseCardDetails(event.strAwayYellowCards, 'away', 'yellowCard'));
  }
  
  // Parse red cards
  if (event.strHomeRedCards) {
    events.push(...parseCardDetails(event.strHomeRedCards, 'home', 'redCard'));
  }
  if (event.strAwayRedCards) {
    events.push(...parseCardDetails(event.strAwayRedCards, 'away', 'redCard'));
  }
  
  // Sort by minute (descending - most recent first)
  return events.sort((a, b) => {
    const minuteA = parseInt(a.minute.replace(/'|\+/g, ''), 10) || 0;
    const minuteB = parseInt(b.minute.replace(/'|\+/g, ''), 10) || 0;
    return minuteB - minuteA;
  });
}

/**
 * Paginate array results
 */
function paginateArray<T>(array: T[], page: number = 1, limit: number = 10): PaginatedResponse<T> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = array.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: array.length,
      totalPages: Math.ceil(array.length / limit),
      hasNextPage: endIndex < array.length,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Fetch upcoming events for a team/league with pagination
 */
export async function fetchUpcomingEvents(
  id: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Match>> {
  try {
    const url = API_ENDPOINTS.EVENTS_NEXT(id);
    const response = await fetchAPI<SportsDBResponse<SportsDBEvent>>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    const events = response.events || [];
    const matches = events.map(convertToMatch);
    return paginateArray(matches, page, limit);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
}

/**
 * Fetch past events for a team/league with pagination
 */
export async function fetchPastEvents(
  id: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Match>> {
  try {
    const url = API_ENDPOINTS.EVENTS_LAST(id);
    const response = await fetchAPI<SportsDBResponse<SportsDBEvent>>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    const events = response.events || [];
    const matches = events.map(convertToMatch);
    return paginateArray(matches, page, limit);
  } catch (error) {
    console.error('Error fetching past events:', error);
    throw error;
  }
}

/**
 * Fetch match details by event ID
 */
export async function fetchMatchDetails(eventId: string): Promise<{
  match: Match;
  events: MatchEvent[];
}> {
  try {
    const url = API_ENDPOINTS.LOOKUP_EVENT(eventId);
    const response = await fetchAPI<SportsDBResponse<SportsDBEventDetail>>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    const event = response.event || response.events?.[0];
    if (!event) {
      throw new Error('Event not found');
    }
    
    const match = convertToMatchDetail(event);
    const events = convertToMatchEvents(event);
    
    return { match, events };
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
}

/**
 * Fetch events by date with pagination
 */
export async function fetchEventsByDate(
  date: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Match>> {
  try {
    const url = API_ENDPOINTS.EVENTS_BY_DATE(date);
    const response = await fetchAPI<SportsDBResponse<SportsDBEvent>>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    const events = response.events || [];
    const matches = events.map(convertToMatch);
    return paginateArray(matches, page, limit);
  } catch (error) {
    console.error('Error fetching events by date:', error);
    throw error;
  }
}

/**
 * Fetch events by league (all teams in league) with pagination
 */
export async function fetchEventsByLeague(
  leagueId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Match>> {
  try {
    const url = API_ENDPOINTS.EVENTS_BY_LEAGUE(leagueId);
    const response = await fetchAPI<SportsDBResponse<SportsDBEvent>>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    const events = response.events || [];
    const matches = events.map(convertToMatch);
    return paginateArray(matches, page, limit);
  } catch (error) {
    console.error('Error fetching events by league:', error);
    throw error;
  }
}

/**
 * Fetch all teams in a league
 */
export interface SportsDBTeam {
  idTeam: string;
  strTeam: string;
  strTeamShort: string | null;
  strAlternate: string | null;
  intFormedYear: string | null;
  strSport: string;
  strLeague: string;
  idLeague: string;
  strManager: string | null;
  strStadium: string | null;
  strKeywords: string | null;
  strRSS: string | null;
  strStadiumThumb: string | null;
  strStadiumDescription: string | null;
  strStadiumLocation: string | null;
  intStadiumCapacity: string | null;
  strWebsite: string | null;
  strFacebook: string | null;
  strTwitter: string | null;
  strInstagram: string | null;
  strDescriptionEN: string | null;
  strGender: string | null;
  strCountry: string | null;
  strTeamBadge: string | null;
  strTeamJersey: string | null;
  strTeamLogo: string | null;
  strTeamFanart1: string | null;
  strTeamFanart2: string | null;
  strTeamFanart3: string | null;
  strTeamFanart4: string | null;
  strTeamBanner: string | null;
  strYoutube: string | null;
  strLocked: string | null;
}

export interface SportsDBTeamsResponse {
  teams?: SportsDBTeam[];
  error?: string;
}

/**
 * Fetch all teams in a league
 */
export async function fetchTeamsByLeague(leagueId: string): Promise<SportsDBTeam[]> {
  try {
    const url = API_ENDPOINTS.TEAMS_BY_LEAGUE(leagueId);
    const response = await fetchAPI<SportsDBTeamsResponse>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return response.teams || [];
  } catch (error) {
    console.error('Error fetching teams by league:', error);
    throw error;
  }
}

/**
 * SportsDB League interface
 */
export interface SportsDBLeague {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string | null;
}

export interface SportsDBLeaguesResponse {
  leagues?: SportsDBLeague[];
  error?: string;
}

/**
 * Fetch all leagues
 */
export async function fetchAllLeagues(): Promise<SportsDBLeague[]> {
  try {
    const url = API_ENDPOINTS.ALL_LEAGUES();
    const response = await fetchAPI<SportsDBLeaguesResponse>(url);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return response.leagues || [];
  } catch (error) {
    console.error('Error fetching all leagues:', error);
    throw error;
  }
}

