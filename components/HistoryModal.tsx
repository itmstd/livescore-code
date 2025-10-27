import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import IconButton from './IconButton';
import { DownloadIcon } from './icons';
import type { Match } from '../App';

interface HistoryModalProps {
  history: Match[];
  onClose: () => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const HistoryModal: React.FC<HistoryModalProps> = ({ history, onClose }) => {

  const handleDownloadPdf = () => {
    if (history.length === 0) return;

    const doc = new jsPDF();
    const reversedHistory = [...history].reverse();
    const lastMatch = reversedHistory[0];

    doc.text("Match History", 14, 20);
    
    const tableData = reversedHistory.map((match, index) => {
        const matchNumber = history.length - index;
        const matchDate = new Date(match.timestamp).toLocaleDateString();
        return [
            match.teamA.score,
            `Match ${matchNumber}\n${matchDate}`,
            match.teamB.score,
        ];
    });

    autoTable(doc, {
        head: [[lastMatch.teamA.name, 'Match', lastMatch.teamB.name]],
        body: tableData,
        startY: 30,
        headStyles: {
            fillColor: [41, 128, 185], // A nice blue color
            textColor: 255,
            fontStyle: 'bold',
        },
        styles: {
            halign: 'center',
            valign: 'middle'
        },
        columnStyles: {
            0: { halign: 'center', fontStyle: 'bold', fontSize: 14 },
            1: { halign: 'center' },
            2: { halign: 'center', fontStyle: 'bold', fontSize: 14 },
        }
    });

    doc.save('match-history.pdf');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 text-white rounded-lg shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <header className="p-4 flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold">Match History</h2>
             {history.length > 0 && (
                <IconButton onClick={handleDownloadPdf} ariaLabel="Download match history as PDF">
                    <DownloadIcon />
                </IconButton>
             )}
          </div>
          <IconButton onClick={onClose} ariaLabel="Close history modal">
            <CloseIcon />
          </IconButton>
        </header>
        <div className="p-6 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-400 text-center">No completed matches yet.</p>
          ) : (
            <ul className="space-y-3">
              {[...history].reverse().map((match) => (
                <li key={match.timestamp} className="bg-gray-700 p-3 rounded-md text-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1 text-left">
                        <span className="font-semibold">{match.teamA.name}</span>
                    </div>
                    <div className="font-mono tracking-wider mx-4">
                      <span className="font-bold p-1 rounded" style={{ backgroundColor: match.teamA.color }}>{match.teamA.score}</span>
                      <span className="text-gray-500 mx-2">-</span>
                      <span className="font-bold p-1 rounded" style={{ backgroundColor: match.teamB.color }}>{match.teamB.score}</span>
                    </div>
                    <div className="flex-1 text-right">
                       <span className="font-semibold">{match.teamB.name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;