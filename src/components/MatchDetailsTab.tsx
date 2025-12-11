import React from 'react';
import { Match } from '../types/match';

interface MatchDetailsTabProps {
  match: Match;
}

const MatchDetailsTab: React.FC<MatchDetailsTabProps> = ({ match }) => {
  return (
    <div className="space-y-6">
      {/* Match Information */}
      <div className="bg-bg-secondary rounded-lg p-4">
        <h3 className="text-text-primary text-lg font-semibold mb-4">Match Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {match.league && (
            <div>
              <span className="text-text-secondary text-sm">League</span>
              <p className="text-text-primary font-medium">{match.league}</p>
            </div>
          )}
          {match.venue && (
            <div>
              <span className="text-text-secondary text-sm">Venue</span>
              <p className="text-text-primary font-medium">{match.venue}</p>
            </div>
          )}
          {match.city && (
            <div>
              <span className="text-text-secondary text-sm">City</span>
              <p className="text-text-primary font-medium">{match.city}</p>
            </div>
          )}
          {match.country && (
            <div>
              <span className="text-text-secondary text-sm">Country</span>
              <p className="text-text-primary font-medium">{match.country}</p>
            </div>
          )}
          {match.date && (
            <div>
              <span className="text-text-secondary text-sm">Date</span>
              <p className="text-text-primary font-medium">{match.date}</p>
            </div>
          )}
          {match.time && (
            <div>
              <span className="text-text-secondary text-sm">Time</span>
              <p className="text-text-primary font-medium">{match.time}</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      {(match.homeShots !== undefined || match.awayShots !== undefined) && (
        <div className="bg-bg-secondary rounded-lg p-4">
          <h3 className="text-text-primary text-lg font-semibold mb-4">Statistics</h3>
          <div className="space-y-3">
            {match.homeShots !== undefined && match.awayShots !== undefined && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-primary text-sm font-medium">{match.homeTeam.name}</span>
                  <span className="text-text-primary text-sm font-medium">{match.awayTeam.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-sm">Shots</span>
                  <div className="flex items-center gap-4">
                    <span className="text-text-primary font-medium">{match.homeShots}</span>
                    <span className="text-text-tertiary">-</span>
                    <span className="text-text-primary font-medium">{match.awayShots}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Formations */}
      {(match.homeFormation || match.awayFormation) && (
        <div className="bg-bg-secondary rounded-lg p-4">
          <h3 className="text-text-primary text-lg font-semibold mb-4">Formations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {match.homeFormation && (
              <div>
                <span className="text-text-secondary text-sm">{match.homeTeam.name}</span>
                <p className="text-text-primary font-medium">{match.homeFormation}</p>
              </div>
            )}
            {match.awayFormation && (
              <div>
                <span className="text-text-secondary text-sm">{match.awayTeam.name}</span>
                <p className="text-text-primary font-medium">{match.awayFormation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetailsTab;

