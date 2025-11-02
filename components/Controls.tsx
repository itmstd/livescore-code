import React from 'react';
import IconButton from './IconButton';
import { SwapIcon, ResetIcon, EndMatchIcon, HistoryIcon, SettingsIcon, OrientationIcon } from './icons';

interface ControlsProps {
  onSwap: () => void;
  onReset: () => void;
  onEndMatch: () => void;
  onViewHistory: () => void;
  onOpenSettings: () => void;
  onToggleOrientation: () => void;
  appOrientation: 'vertical' | 'horizontal';
}

const Controls: React.FC<ControlsProps> = ({ onSwap, onReset, onEndMatch, onViewHistory, onOpenSettings, onToggleOrientation, appOrientation  }) => {
  const isVerticalControls = appOrientation === 'horizontal';
  
  return (
    <div className={`bg-gray-800 flex items-center justify-center gap-4 ${
      isVerticalControls ? 'w-24 flex-col p-0' : 'p-2 flex-row'
    }`}>
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
      <IconButton onClick={onToggleOrientation} ariaLabel="Toggle layout orientation">
        <OrientationIcon />
      </IconButton>
    </div>
  );
};

export default Controls;