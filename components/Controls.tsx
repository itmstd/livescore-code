import React from 'react';
import IconButton from './IconButton';
import { SwapIcon, ResetIcon, EndMatchIcon, HistoryIcon, SettingsIcon } from './icons';

interface ControlsProps {
  onSwap: () => void;
  onReset: () => void;
  onEndMatch: () => void;
  onViewHistory: () => void;
  onOpenSettings: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onSwap, onReset, onEndMatch, onViewHistory, onOpenSettings }) => {
  return (
    <div className="bg-gray-800 p-2 md:p-0 md:w-24 flex md:flex-col items-center justify-center gap-4">
      <IconButton onClick={onOpenSettings} ariaLabel="Open settings">
        <SettingsIcon />
      </IconButton>
      <IconButton onClick={onSwap} ariaLabel="Swap team sides">
        <SwapIcon />
      </IconButton>
      <IconButton onClick={onReset} ariaLabel="Reset scores">
        <ResetIcon />
      </IconButton>
      <IconButton onClick={onEndMatch} ariaLabel="End match and save score">
        <EndMatchIcon />
      </IconButton>
      <IconButton onClick={onViewHistory} ariaLabel="View match history">
        <HistoryIcon />
      </IconButton>
    </div>
  );
};

export default Controls;