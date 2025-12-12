import { MatchEvent } from '../types/match';

export const mockEvents: MatchEvent[] = [
  { id: '1', minute: "89'", type: 'substitution', team: 'home', playerOut: 'Martinelli', playerIn: 'Trossard' },
  { id: '2', minute: "88'", type: 'goal', team: 'away', player: 'Salah', assist: 'Nunez' },
  { id: '3', minute: "78'", type: 'yellowCard', team: 'home', player: 'Saliba' },
  { id: '4', minute: "74'", type: 'corner', team: 'home', cornerNumber: '3rd corner' },
  { id: '5', minute: "67'", type: 'substitution', team: 'home', playerOut: 'Rice', playerIn: 'Jorginho' },
  { id: '6', minute: "67'", type: 'substitution', team: 'away', playerOut: 'Szoboszlai', playerIn: 'Robertson' },
  { id: '7', minute: "66'", type: 'redCard', team: 'away', player: 'Van Dijk', description: 'Sent Off' },
  { id: '8', minute: "55'", type: 'goal', team: 'home', player: 'Saka', assist: 'Odegaard' },
  { id: '9', minute: "52'", type: 'corner', team: 'home', cornerNumber: '5th corner' },
  { id: '10', minute: "48'", type: 'corner', team: 'away', cornerNumber: '3rd Corner' },
  { id: '11', minute: "45+2'", type: 'corner', team: 'home', cornerNumber: '2nd corner' },
  { id: '12', minute: "45'", type: 'substitution', team: 'away', playerOut: 'Jones', playerIn: 'Mac Allister' },
  { id: '13', minute: "44'", type: 'yellowCard', team: 'home', player: 'Gabriel' },
  { id: '14', minute: "44'", type: 'injury', team: 'away', player: 'Jones', description: 'Injured' },
  { id: '15', minute: "36'", type: 'corner', team: 'home', cornerNumber: '1st corner' },
  { id: '16', minute: "34'", type: 'yellowCard', team: 'away', player: 'Konate' },
  { id: '17', minute: "25'", type: 'shot', team: 'home', player: 'Odegaard' },
  { id: '18', minute: "16'", type: 'corner', team: 'away', cornerNumber: '2nd Corner' },
  { id: '19', minute: "12'", type: 'goal', team: 'home', player: 'Odegaard', assist: 'Saka' },
  { id: '20', minute: "3'", type: 'corner', team: 'away', cornerNumber: '1st Corner' },
];

