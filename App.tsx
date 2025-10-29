import React, { useState, useCallback, useEffect } from 'react';
import ScoreDisplay from './components/ScoreDisplay';
import Controls from './components/Controls';
import HistoryModal from './components/HistoryModal';
import SettingsModal from './components/SettingsModal';
import WinnerModal from './components/WinnerModal';
import PlayerListModal from './components/PlayerListModal';

export type Player = {
  id: string;
  name: string;
};

export type Team = {
  name: string;
  color: string;
  players: Player[];
};

type Scores = { a: number; b: number };

export type Match = {
  teamA: { name: string; score: number; color: string; players: Player[]; };
  teamB: { name: string; score: number; color: string; players: Player[]; };
  timestamp: number;
};

export const gameModes = {
  none: { name: 'Free Play', winningScore: Infinity, maxPlayers: Infinity },
  badminton: { name: 'Badminton', winningScore: 21, maxPlayers: 2 },
  pickleball: { name: 'Pickleball', winningScore: 11, maxPlayers: 2 },
  volleyball: { name: 'Volleyball', winningScore: 25, maxPlayers: 6 },
  tableTennis: { name: 'Table Tennis', winningScore: 11, maxPlayers: 2 },
};
export type GameMode = keyof typeof gameModes;


const defaultTeamA: Team = { name: 'Team A', color: 'bg-blue-600', players: [] };
const defaultTeamB: Team = { name: 'Team B', color: 'bg-red-600', players: [] };

function App() {
  const [scores, setScores] = useState<Scores>({ a: 0, b: 0 });
  const [isSwapped, setIsSwapped] = useState(false);
  const [teamA, setTeamA] = useState<Team>(defaultTeamA);
  const [teamB, setTeamB] = useState<Team>(defaultTeamB);
  
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>('none');
  const [winner, setWinner] = useState<Team | null>(null);
  const [isDeuce, setIsDeuce] = useState(false);
  const [viewingPlayersFor, setViewingPlayersFor] = useState<Team | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('liveScoreboardHistoryV2');
      if (storedHistory) {
        setMatchHistory(JSON.parse(storedHistory));
      }
      const storedTeamA = localStorage.getItem('liveScoreboardTeamA');
      if (storedTeamA) {
        setTeamA(JSON.parse(storedTeamA));
      }
      const storedTeamB = localStorage.getItem('liveScoreboardTeamB');
      if (storedTeamB) {
        setTeamB(JSON.parse(storedTeamB));
      }
      const storedGameMode = localStorage.getItem('liveScoreboardGameMode');
      if (storedGameMode && Object.keys(gameModes).includes(JSON.parse(storedGameMode))) {
        setGameMode(JSON.parse(storedGameMode));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  }, []);

  const handleIncrement = useCallback((team: 'a' | 'b') => {
    if (winner) return; // Don't increment score if there's a winner

    const newScores = { ...scores, [team]: scores[team] + 1 };
    setScores(newScores);

    const winningScore = gameModes[gameMode].winningScore;
    if (winningScore !== Infinity) {
        const opponentTeam = team === 'a' ? 'b' : 'a';
        let deuceActive = isDeuce;

        // Check if scores are tied at or after winningScore - 1, which defines a deuce situation
        if (newScores.a >= winningScore - 1 && newScores.a === newScores.b) {
            if (!isDeuce) setIsDeuce(true);
            deuceActive = true;
        }

        let hasWinner = false;
        if (deuceActive) {
            // Must win by 2
            if (newScores[team] >= newScores[opponentTeam] + 2) {
                hasWinner = true;
            }
        } else {
            // Standard win condition
            if (newScores[team] >= winningScore) {
                hasWinner = true;
            }
        }

        if (hasWinner) {
            setWinner(team === 'a' ? teamA : teamB);
            setIsDeuce(false); // Deuce is over, hide indicator
        }
    }
  }, [scores, gameMode, winner, teamA, teamB, isDeuce]);

  const handleSwap = useCallback(() => {
    setIsSwapped(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setScores({ a: 0, b: 0 });
    setIsDeuce(false);
  }, []);

  const handleEndMatch = useCallback(() => {
    if (scores.a === 0 && scores.b === 0) return;
    
    const newMatch: Match = {
      teamA: { name: teamA.name, score: scores.a, color: teamA.color, players: teamA.players },
      teamB: { name: teamB.name, score: scores.b, color: teamB.color, players: teamB.players },
      timestamp: Date.now(),
    };

    const newHistory = [...matchHistory, newMatch];
    setMatchHistory(newHistory);
    localStorage.setItem('liveScoreboardHistoryV2', JSON.stringify(newHistory));
    setScores({ a: 0, b: 0 });
    setIsDeuce(false);
  }, [scores, matchHistory, teamA, teamB]);

  const toggleHistoryView = useCallback(() => {
    setIsHistoryVisible(prev => !prev);
  }, []);
  
  const toggleSettingsView = useCallback(() => {
    setIsSettingsVisible(prev => !prev);
  }, []);

  const handleSaveSettings = useCallback((newTeamA: Team, newTeamB: Team, newGameMode: GameMode) => {
    setTeamA(newTeamA);
    setTeamB(newTeamB);
    setGameMode(newGameMode);
    localStorage.setItem('liveScoreboardTeamA', JSON.stringify(newTeamA));
    localStorage.setItem('liveScoreboardTeamB', JSON.stringify(newTeamB));
    localStorage.setItem('liveScoreboardGameMode', JSON.stringify(newGameMode));
    toggleSettingsView();
  }, [toggleSettingsView]);

  const handleWinAcknowledged = useCallback(() => {
    handleEndMatch();
    setWinner(null);
  }, [handleEndMatch]);

  const teamADisplay = (
    <ScoreDisplay
      score={scores.a}
      team={teamA}
      onIncrement={() => handleIncrement('a')}
      bgColor={teamA.color}
      textColor="text-white"
      onViewPlayers={() => setViewingPlayersFor(teamA)}
    />
  );

  const teamBDisplay = (
    <ScoreDisplay
      score={scores.b}
      team={teamB}
      onIncrement={() => handleIncrement('b')}
      bgColor={teamB.color}
      textColor="text-white"
      onViewPlayers={() => setViewingPlayersFor(teamB)}
    />
  );

  return (
    <main className="w-screen h-screen bg-gray-900 flex flex-col md:flex-row overflow-hidden relative">
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 mt-4 z-30 transition-opacity duration-500 pointer-events-none ${isDeuce ? 'opacity-100' : 'opacity-0'}`}
        aria-live="polite"
      >
        <span className="text-white bg-yellow-600 font-bold uppercase tracking-widest text-xl md:text-2xl px-6 py-2 rounded-lg shadow-lg">
          Deuce
        </span>
      </div>

      {isSwapped ? teamBDisplay : teamADisplay}
      <Controls
        onSwap={handleSwap}
        onReset={handleReset}
        onEndMatch={handleEndMatch}
        onViewHistory={toggleHistoryView}
        onOpenSettings={toggleSettingsView}
      />
      {isSwapped ? teamADisplay : teamBDisplay}
      {isHistoryVisible && (
        <HistoryModal history={matchHistory} onClose={toggleHistoryView} />
      )}
      {isSettingsVisible && (
        <SettingsModal
          teamA={teamA}
          teamB={teamB}
          gameMode={gameMode}
          onSave={handleSaveSettings}
          onClose={toggleSettingsView}
        />
      )}
      {winner && (
        <WinnerModal winner={winner} onClose={handleWinAcknowledged} />
      )}
      {viewingPlayersFor && (
        <PlayerListModal team={viewingPlayersFor} onClose={() => setViewingPlayersFor(null)} />
      )}
    </main>
  );
}

export default App;