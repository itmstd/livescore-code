import React, { useState, useCallback, useEffect } from 'react';
import ScoreDisplay from './components/ScoreDisplay';
import Controls from './components/Controls';
import HistoryModal from './components/HistoryModal';

type Scores = { a: number; b: number };

function App() {
  const [scores, setScores] = useState<Scores>({ a: 0, b: 0 });
  const [isSwapped, setIsSwapped] = useState(false);
  const [matchHistory, setMatchHistory] = useState<Scores[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('liveScoreboardHistory');
      if (storedHistory) {
        setMatchHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load match history:", error);
      setMatchHistory([]);
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
    // Avoid saving a 0-0 score if a match hasn't started
    if (scores.a === 0 && scores.b === 0) return;
    
    const newHistory = [...matchHistory, scores];
    setMatchHistory(newHistory);
    localStorage.setItem('liveScoreboardHistory', JSON.stringify(newHistory));
    setScores({ a: 0, b: 0 }); // Reset for the next match
  }, [scores, matchHistory]);

  const toggleHistoryView = useCallback(() => {
    setIsHistoryVisible(prev => !prev);
  }, []);

  const teamA = (
    <ScoreDisplay
      score={scores.a}
      onIncrement={() => handleIncrement('a')}
      bgColor="bg-blue-600"
      textColor="text-white"
    />
  );

  const teamB = (
    <ScoreDisplay
      score={scores.b}
      onIncrement={() => handleIncrement('b')}
      bgColor="bg-red-600"
      textColor="text-white"
    />
  );

  return (
    <main className="w-screen h-screen bg-gray-900 flex flex-col md:flex-row overflow-hidden">
      {isSwapped ? teamB : teamA}
      <Controls
        onSwap={handleSwap}
        onReset={handleReset}
        onEndMatch={handleEndMatch}
        onViewHistory={toggleHistoryView}
      />
      {isSwapped ? teamA : teamB}
      {isHistoryVisible && (
        <HistoryModal history={matchHistory} onClose={toggleHistoryView} />
      )}
    </main>
  );
}

export default App;