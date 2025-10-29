import React from 'react';
import type { Player } from '../App';

interface PlayerAvatarsProps {
  players: Player[];
  teamColor: string;
  onClick: (event: React.MouseEvent) => void;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const PlayerAvatars: React.FC<PlayerAvatarsProps> = ({ players, teamColor, onClick }) => {
  const displayedPlayers = players.slice(0, 5);
  const hasMorePlayers = players.length > 5;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the score from incrementing
    onClick(e);
  };
  
  const avatarColor = teamColor.replace('bg-', '').split('-')[0];

  return (
    <div onClick={handleClick} className="flex -space-x-2 justify-center cursor-pointer group">
      {displayedPlayers.map((player) => (
        <div
          key={player.id}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm border-2 border-white/50 transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: avatarColor }}
          title={player.name}
        >
          {getInitials(player.name)}
        </div>
      ))}
      {hasMorePlayers && (
        <div
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-gray-500 text-white font-bold text-xs md:text-sm border-2 border-white/50 transition-transform duration-200 group-hover:scale-110"
          title={`${players.length - 5} more players`}
        >
          ...
        </div>
      )}
    </div>
  );
};

export default PlayerAvatars;