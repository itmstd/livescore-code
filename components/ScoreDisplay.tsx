import React from 'react';
import PlayerAvatars from './PlayerAvatars';
import type { Team } from '../App';

interface ScoreDisplayProps {
  score: number;
  team: Team;
  onIncrement: () => void;
  bgColor: string;
  textColor: string;
  onViewPlayers: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, team, onIncrement, bgColor, textColor, onViewPlayers }) => {
  return (
    <div
      onClick={onIncrement}
      className={`flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out ${bgColor} ${textColor} relative p-4 gap-4`}
    >
      <div className="text-center">
          <div className="text-2xl md:text-4xl font-semibold uppercase tracking-wider opacity-80">
            {team.name}
          </div>
          {team.players.length > 0 && (
             <div className="mt-2">
                <PlayerAvatars players={team.players} teamColor={team.color} onClick={onViewPlayers} />
             </div>
          )}
      </div>
      <span className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-tighter">
        {score}
      </span>
    </div>
  );
};

export default ScoreDisplay;