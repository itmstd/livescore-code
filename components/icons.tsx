import React from 'react';

export const SwapIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 sm:h-8 sm:w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

export const ResetIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 sm:h-8 sm:w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 3a9 9 0 0 0-9 9H3l4 4 4-4H8a6 6 0 1 1 6 6"
    />
  </svg>
);

export const EndMatchIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 sm:h-8 sm:w-8" 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12.87 1.13a.98.98 0 0 0-1.74 0l-2.1 4.25-4.69.68a.98.98 0 0 0-.54 1.67l3.4 3.31-.8 4.67a.98.98 0 0 0 1.42 1.03l4.2-2.21 4.2 2.21a.98.98 0 0 0 1.42-1.03l-.8-4.67 3.4-3.31a.98.98 0 0 0-.54-1.67l-4.69-.68-2.1-4.25z"/>
        <path d="M6 21h12v-2H6v2z"/>
    </svg>
);

export const HistoryIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 sm:h-8 sm:w-8" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
        <line x1="9" y1="15" x2="15" y2="15"></line>
        <line x1="9" y1="18" x2="15" y2="18"></line>
    </svg>
);