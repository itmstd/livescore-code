import React from 'react';
import type { Team } from '../App';
import IconButton from './IconButton';

interface PlayerListModalProps {
  team: Team;
  onClose: () => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PlayerListModal: React.FC<PlayerListModalProps> = ({ team, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-sm max-h-[70vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className={`p-4 flex justify-between items-center rounded-t-lg ${team.color}`}>
          <h2 className="text-xl font-bold">{team.name} - Players</h2>
          <IconButton onClick={onClose} ariaLabel="Close player list">
            <CloseIcon />
          </IconButton>
        </header>
        <div className="p-6 overflow-y-auto">
          {team.players.length === 0 ? (
            <p className="text-gray-400 text-center">No players on this team.</p>
          ) : (
            <ul className="space-y-3">
              {team.players.map((player) => (
                <li key={player.id} className="bg-gray-700 p-3 rounded-md text-lg font-medium">
                  {player.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerListModal;