import React from 'react';

interface ScoreDisplayProps {
  score: number;
  teamName: string;
  onIncrement: () => void;
  bgColor: string;
  textColor: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, teamName, onIncrement, bgColor, textColor }) => {
  return (
    <div
      onClick={onIncrement}
      className={`flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out ${bgColor} ${textColor} relative p-4`}
    >
      <div className="absolute top-4 text-2xl md:text-4xl font-semibold uppercase tracking-wider opacity-80">
        {teamName}
      </div>
      <span className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-black tracking-tighter">
        {score}
      </span>
    </div>
  );
};

export default ScoreDisplay;