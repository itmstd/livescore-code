import React, { useState, useEffect } from 'react';
import { gameModes, GameMode } from '../App';

type Team = {
  name: string;
  color: string;
};

interface SettingsModalProps {
  teamA: Team;
  teamB: Team;
  gameMode: GameMode;
  onSave: (teamA: Team, teamB: Team, gameMode: GameMode) => void;
  onClose: () => void;
}

const colors = [
  'bg-blue-600',
  'bg-red-600',
  'bg-green-600',
  'bg-yellow-500',
  'bg-purple-600',
  'bg-pink-600',
  'bg-indigo-600',
  'bg-teal-500',
];

const SettingsModal: React.FC<SettingsModalProps> = ({ teamA, teamB, gameMode, onSave, onClose }) => {
  const [currentTeamA, setCurrentTeamA] = useState<Team>(teamA);
  const [currentTeamB, setCurrentTeamB] = useState<Team>(teamB);
  const [currentGameMode, setCurrentGameMode] = useState<GameMode>(gameMode);

  useEffect(() => {
    setCurrentTeamA(teamA);
    setCurrentTeamB(teamB);
    setCurrentGameMode(gameMode);
  }, [teamA, teamB, gameMode]);

  const handleSave = () => {
    onSave(currentTeamA, currentTeamB, currentGameMode);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-center">Settings</h2>
        </header>
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Team A Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">Team 1</h3>
            <div>
              <label htmlFor="teamAName" className="block text-sm font-medium text-gray-400 mb-2">Team Name</label>
              <input
                id="teamAName"
                type="text"
                value={currentTeamA.name}
                onChange={(e) => setCurrentTeamA(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Team 1 Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Team Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    aria-label={`Select ${color} color`}
                    onClick={() => setCurrentTeamA(prev => ({ ...prev, color }))}
                    className={`w-10 h-10 rounded-full ${color} transition-transform duration-150 ${currentTeamA.color === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white scale-110' : 'hover:scale-110'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Team B Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">Team 2</h3>
            <div>
              <label htmlFor="teamBName" className="block text-sm font-medium text-gray-400 mb-2">Team Name</label>
              <input
                id="teamBName"
                type="text"
                value={currentTeamB.name}
                onChange={(e) => setCurrentTeamB(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter Team 2 Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Team Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    aria-label={`Select ${color} color`}
                    onClick={() => setCurrentTeamB(prev => ({ ...prev, color }))}
                    className={`w-10 h-10 rounded-full ${color} transition-transform duration-150 ${currentTeamB.color === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white scale-110' : 'hover:scale-110'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Game Mode Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">Game Mode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(gameModes).map(([key, { name, winningScore }]) => (
                    <button 
                        key={key} 
                        onClick={() => setCurrentGameMode(key as GameMode)} 
                        className={`p-3 rounded-md text-left transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ${currentGameMode === key ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                        <div className="font-semibold">{name}</div>
                        <div className="text-sm opacity-80">{winningScore === Infinity ? 'No score limit' : `Win at ${winningScore} points`}</div>
                    </button>
                ))}
            </div>
          </div>

        </div>
        <footer className="p-4 flex justify-end gap-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors"
          >
            Save
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;