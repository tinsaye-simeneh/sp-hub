export interface Match {
  id: string;
  status: 'live' | 'ft' | 'ht' | 'scheduled';
  statusText: string;
  homeTeam: {
    name: string;
    logo?: string;
    score?: number;
    aggregateScore?: number;
  };
  awayTeam: {
    name: string;
    logo?: string;
    score?: number;
    aggregateScore?: number;
  };
  time?: string;
  date?: string;
  fullDate?: string;
  homeTeamCards?: {
    yellow: number;
    red: number;
  };
  awayTeamCards?: {
    yellow: number;
    red: number;
  };
  indicators?: {
    aggregate?: 'home' | 'away';
    penalty?: 'home' | 'away';
    redCard?: 'home' | 'away';
  };
  league?: string;
  leagueBadge?: string;
  season?: string;
  sport?: string;
  round?: number;
  postponed?: boolean;
  venue?: string;
  city?: string;
  country?: string;
  spectators?: number;
  official?: string;
  homeFormation?: string;
  awayFormation?: string;
  homeShots?: number;
  awayShots?: number;
  homeLineup?: {
    goalkeeper?: string[];
    defense?: string[];
    midfield?: string[];
    forward?: string[];
    substitutes?: string[];
  };
  awayLineup?: {
    goalkeeper?: string[];
    defense?: string[];
    midfield?: string[];
    forward?: string[];
    substitutes?: string[];
  };
}

export interface MatchEvent {
  id: string;
  minute: string;
  type: 'goal' | 'substitution' | 'yellowCard' | 'redCard' | 'corner' | 'shot' | 'injury';
  team: 'home' | 'away';
  player?: string;
  playerOut?: string;
  playerIn?: string;
  assist?: string;
  description?: string;
  cornerNumber?: string;
}

