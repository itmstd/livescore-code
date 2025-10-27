import React, { useState, useCallback, useEffect } from 'react';
import ScoreDisplay from './components/ScoreDisplay';
import Controls from './components/Controls';
import HistoryModal from './components/HistoryModal';
import SettingsModal from './components/SettingsModal';

type Team = {
  name: string;
  color: string;
};

type Scores = { a: number; b: number };

export type Match = {
  teamA: { name: string; score: number; color: string; };
  teamB: { name: string; score: number; color: string; };
  timestamp: number;
};

const defaultTeamA: Team = { name: 'Team A', color: 'bg-blue-600' };
const defaultTeamB: Team = { name: 'Team B', color: 'bg-red-600' };

function App() {
  const [scores, setScores] = useState<Scores>({ a: 0, b: 0 });
  const [isSwapped, setIsSwapped] = useState(false);
  const [teamA, setTeamA] = useState<Team>(defaultTeamA);
  const [teamB, setTeamB] = useState<Team>(defaultTeamB);
  
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

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
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
    }
  }, []);

  const handleIncrement = useCallback((team: 'a' | 'b') => {
    setScores(prev => ({ ...prev, [team]: prev[team] + 1 }));
  }, []);

  const handleSwap = useCallback(() => {
    setIsSwapped(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setScores({ a: 0, b: 0 });
  }, []);

  const handleEndMatch = useCallback(() => {
    if (scores.a === 0 && scores.b === 0) return;
    
    const newMatch: Match = {
      teamA: { name: teamA.name, score: scores.a, color: teamA.color },
      teamB: { name: teamB.name, score: scores.b, color: teamB.color },
      timestamp: Date.now(),
    };

    const newHistory = [...matchHistory, newMatch];
    setMatchHistory(newHistory);
    localStorage.setItem('liveScoreboardHistoryV2', JSON.stringify(newHistory));
    setScores({ a: 0, b: 0 });
  }, [scores, matchHistory, teamA, teamB]);

  const toggleHistoryView = useCallback(() => {
    setIsHistoryVisible(prev => !prev);
  }, []);
  
  const toggleSettingsView = useCallback(() => {
    setIsSettingsVisible(prev => !prev);
  }, []);

  const handleSaveSettings = useCallback((newTeamA: Team, newTeamB: Team) => {
    setTeamA(newTeamA);
    setTeamB(newTeamB);
    localStorage.setItem('liveScoreboardTeamA', JSON.stringify(newTeamA));
    localStorage.setItem('liveScoreboardTeamB', JSON.stringify(newTeamB));
    toggleSettingsView();
  }, [toggleSettingsView]);

  const teamADisplay = (
    <ScoreDisplay
      score={scores.a}
      teamName={teamA.name}
      onIncrement={() => handleIncrement('a')}
      bgColor={teamA.color}
      textColor="text-white"
    />
  );

  const teamBDisplay = (
    <ScoreDisplay
      score={scores.b}
      teamName={teamB.name}
      onIncrement={() => handleIncrement('b')}
      bgColor={teamB.color}
      textColor="text-white"
    />
  );

  return (
    <main className="w-screen h-screen bg-gray-900 flex flex-col md:flex-row overflow-hidden">
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
          onSave={handleSaveSettings}
          onClose={toggleSettingsView}
        />
      )}
    </main>
  );
}

export default App;