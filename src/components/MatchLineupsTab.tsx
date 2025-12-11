import React from 'react';
import { Match } from '../types/match';

interface MatchLineupsTabProps {
  match: Match;
}

const MatchLineupsTab: React.FC<MatchLineupsTabProps> = ({ match }) => {
  if (!match.homeLineup && !match.awayLineup) {
    return (
      <div className="text-text-secondary text-center py-8">
        <p>Lineup information is not available for this match.</p>
      </div>
    );
  }

  const renderLineup = (teamName: string, lineup: Match['homeLineup']) => {
    if (!lineup) return null;

    return (
      <div className="bg-bg-secondary rounded-lg p-4">
        <h3 className="text-text-primary text-lg font-semibold mb-4">{teamName}</h3>
        <div className="space-y-4">
          {lineup.goalkeeper && lineup.goalkeeper.length > 0 && (
            <div>
              <span className="text-text-secondary text-sm font-medium">Goalkeeper</span>
              <div className="mt-2 space-y-1">
                {lineup.goalkeeper.map((player, idx) => (
                  <p key={idx} className="text-text-primary">{player}</p>
                ))}
              </div>
            </div>
          )}
          {lineup.defense && lineup.defense.length > 0 && (
            <div>
              <span className="text-text-secondary text-sm font-medium">Defense</span>
              <div className="mt-2 space-y-1">
                {lineup.defense.map((player, idx) => (
                  <p key={idx} className="text-text-primary">{player}</p>
                ))}
              </div>
            </div>
          )}
          {lineup.midfield && lineup.midfield.length > 0 && (
            <div>
              <span className="text-text-secondary text-sm font-medium">Midfield</span>
              <div className="mt-2 space-y-1">
                {lineup.midfield.map((player, idx) => (
                  <p key={idx} className="text-text-primary">{player}</p>
                ))}
              </div>
            </div>
          )}
          {lineup.forward && lineup.forward.length > 0 && (
            <div>
              <span className="text-text-secondary text-sm font-medium">Forward</span>
              <div className="mt-2 space-y-1">
                {lineup.forward.map((player, idx) => (
                  <p key={idx} className="text-text-primary">{player}</p>
                ))}
              </div>
            </div>
          )}
          {lineup.substitutes && lineup.substitutes.length > 0 && (
            <div>
              <span className="text-text-secondary text-sm font-medium">Substitutes</span>
              <div className="mt-2 space-y-1">
                {lineup.substitutes.map((player, idx) => (
                  <p key={idx} className="text-text-primary">{player}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderLineup(match.homeTeam.name, match.homeLineup)}
      {renderLineup(match.awayTeam.name, match.awayLineup)}
    </div>
  );
};

export default MatchLineupsTab;

