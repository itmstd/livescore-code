import React from 'react';
import IconButton from './IconButton';

interface HistoryModalProps {
  history: { a: number; b: number }[];
  onClose: () => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const HistoryModal: React.FC<HistoryModalProps> = ({ history, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <header className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Match History</h2>
          <IconButton onClick={onClose} ariaLabel="Close history modal">
            <CloseIcon />
          </IconButton>
        </header>
        <div className="p-6 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-400 text-center">No completed matches yet.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((score, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-md text-lg">
                  <span className="font-semibold text-gray-300">Match {index + 1}</span>
                  <div className="font-mono tracking-wider">
                    <span className="font-bold text-blue-400">{score.a}</span>
                    <span className="text-gray-500 mx-2">-</span>
                    <span className="font-bold text-red-400">{score.b}</span>
                  </div>
                </li>
              )).reverse() /* Show most recent match first */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;