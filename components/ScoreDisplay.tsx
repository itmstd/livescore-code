import React from 'react';

interface ScoreDisplayProps {
  score: number;
  onIncrement: () => void;
  bgColor: string;
  textColor: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, onIncrement, bgColor, textColor }) => {
  return (
    <div
      onClick={onIncrement}
      className={`flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out ${bgColor} ${textColor} relative`}
    >
      <span className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-tighter">
        {score}
      </span>
    </div>
  );
};

export default ScoreDisplay;
