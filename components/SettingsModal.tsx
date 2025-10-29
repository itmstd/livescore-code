import React, { useState, useEffect } from 'react';
import { gameModes, GameMode, Player, Team } from '../App';

interface SettingsModalProps {
  teamA: Team;
  teamB: Team;
  gameMode: GameMode;
  onSave: (teamA: Team, teamB: Team, gameMode: GameMode) => void;
  onClose: () => void;
}

const colors = [
  'bg-blue-600', 'bg-red-600', 'bg-green-600', 'bg-yellow-500',
  'bg-purple-600', 'bg-pink-600', 'bg-indigo-600', 'bg-teal-500',
];

const PlayerManager: React.FC<{
  team: Team;
  setTeam: React.Dispatch<React.SetStateAction<Team>>;
  maxPlayers: number;
}> = ({ team, setTeam, maxPlayers }) => {
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim() && (maxPlayers === Infinity || team.players.length < maxPlayers)) {
      const newPlayer: Player = { id: Date.now().toString(), name: playerName.trim() };
      setTeam(prev => ({ ...prev, players: [...prev.players, newPlayer] }));
      setPlayerName('');
    }
  };

  const handleRemovePlayer = (id: string) => {
    setTeam(prev => ({ ...prev, players: prev.players.filter(p => p.id !== id) }));
  };

  const isAtLimit = maxPlayers !== Infinity && team.players.length >= maxPlayers;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-400">
        Players ({team.players.length} / {maxPlayers === Infinity ? '∞' : maxPlayers})
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
          className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
          placeholder="Enter player name"
          disabled={isAtLimit}
        />
        <button
          onClick={handleAddPlayer}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isAtLimit || !playerName.trim()}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
        {team.players.map(player => (
          <li key={player.id} className="flex items-center justify-between bg-gray-700 px-3 py-1.5 rounded-md">
            <span className="truncate">{player.name}</span>
            <button
              onClick={() => handleRemovePlayer(player.id)}
              className="text-red-400 hover:text-red-300 font-bold text-lg"
              aria-label={`Remove ${player.name}`}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
  
  const maxPlayers = gameModes[currentGameMode].maxPlayers;

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

          {/* Team A Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">Team 1</h3>
            <div>
              <label htmlFor="teamAName" className="block text-sm font-medium text-gray-400 mb-2">Team Name</label>
              <input id="teamAName" type="text" value={currentTeamA.name} onChange={(e) => setCurrentTeamA(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter Team 1 Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Team Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button key={color} aria-label={`Select ${color} color`} onClick={() => setCurrentTeamA(prev => ({ ...prev, color }))} className={`w-10 h-10 rounded-full ${color} transition-transform duration-150 ${currentTeamA.color === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white scale-110' : 'hover:scale-110'}`} />
                ))}
              </div>
            </div>
            <PlayerManager team={currentTeamA} setTeam={setCurrentTeamA} maxPlayers={maxPlayers} />
          </div>

          {/* Team B Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">Team 2</h3>
            <div>
              <label htmlFor="teamBName" className="block text-sm font-medium text-gray-400 mb-2">Team Name</label>
              <input id="teamBName" type="text" value={currentTeamB.name} onChange={(e) => setCurrentTeamB(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none" placeholder="Enter Team 2 Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Team Color</label>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button key={color} aria-label={`Select ${color} color`} onClick={() => setCurrentTeamB(prev => ({ ...prev, color }))} className={`w-10 h-10 rounded-full ${color} transition-transform duration-150 ${currentTeamB.color === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white scale-110' : 'hover:scale-110'}`} />
                ))}
              </div>
            </div>
            <PlayerManager team={currentTeamB} setTeam={setCurrentTeamB} maxPlayers={maxPlayers} />
          </div>
        </div>
        <footer className="p-4 flex justify-end gap-4 border-t border-gray-700 mt-auto">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors">Save</button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;