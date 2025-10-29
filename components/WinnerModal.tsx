import React from 'react';

type Team = {
  name: string;
  color: string;
};

interface WinnerModalProps {
  winner: Team;
  onClose: () => void;
}

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="absolute w-2 h-4" style={style}></div>
);

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  const confetti = Array.from({ length: 50 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animation: `fall 3s linear ${Math.random() * 2}s infinite`,
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
    return <ConfettiPiece key={i} style={style} />;
  });

  return (
    <>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative bg-gray-900 text-white rounded-lg shadow-2xl w-full max-w-md text-center p-8 overflow-hidden">
          {confetti}
          <div className="relative z-10">
            <h2 className="text-5xl font-black uppercase tracking-widest text-yellow-400">Winner!</h2>
            <div className={`mt-6 text-4xl font-bold py-3 px-6 rounded-lg inline-block ${winner.color}`}>
              {winner.name}
            </div>
            <p className="mt-4 text-gray-300">Congratulations on your victory!</p>
            <button
              onClick={onClose}
              className="mt-8 w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition-colors text-lg"
            >
              Start Next Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WinnerModal;
