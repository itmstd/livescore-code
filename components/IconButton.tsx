import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, ariaLabel, children }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-all duration-200 ease-in-out active:scale-90"
    >
      {children}
    </button>
  );
};

export default IconButton;
