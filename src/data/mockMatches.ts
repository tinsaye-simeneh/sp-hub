import { Match } from '../types/match';

export const mockMatches: { league: string; matches: Match[] }[] = [
  {
    league: 'UEFA Champions League',
    matches: [
      {
        id: '1',
        status: 'ft',
        statusText: 'FT',
        homeTeam: {
          name: 'Arsenal',
          score: 2,
          aggregateScore: 2,
        },
        awayTeam: {
          name: 'Valencia',
          score: 1,
          aggregateScore: 0,
        },
        indicators: {
          aggregate: 'home',
        },
      },
      {
        id: '2',
        status: 'ft',
        statusText: 'FT',
        homeTeam: {
          name: 'Real Madrid',
          score: 1,
          aggregateScore: 3,
        },
        awayTeam: {
          name: 'Leicester City',
          score: 3,
          aggregateScore: 1,
        },
        indicators: {
          penalty: 'away',
          redCard: 'home',
        },
      },
    ],
  },
  {
    league: 'English Premier League',
    matches: [
      {
        id: '3',
        status: 'live',
        statusText: "63'",
        homeTeam: {
          name: 'Arsenal',
          score: 4,
        },
        awayTeam: {
          name: 'Manchester City',
          score: 1,
        },
      },
      {
        id: '4',
        status: 'ft',
        statusText: 'FT',
        homeTeam: {
          name: 'Arsenal',
          score: 2,
        },
        awayTeam: {
          name: 'Liverpool',
          score: 1,
        },
        date: '11 AUG',
        homeTeamCards: {
          yellow: 2,
          red: 0,
        },
        awayTeamCards: {
          yellow: 1,
          red: 1,
        },
      },
      {
        id: '5',
        status: 'scheduled',
        statusText: '23:00',
        time: '23:00',
        homeTeam: {
          name: 'Burnley',
        },
        awayTeam: {
          name: 'Manchester City',
        },
      },
      {
        id: '6',
        status: 'scheduled',
        statusText: '23:00',
        time: '23:00',
        homeTeam: {
          name: 'Chelsea',
        },
        awayTeam: {
          name: 'Southampton',
        },
      },
    ],
  },
];

