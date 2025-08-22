import React from 'react';

interface BackgroundIconProps {
  size?: number;
  color?: string;
}

const BackgroundIcon: React.FC<BackgroundIconProps> = ({ 
  size = 24,
  color = "#0078D4",
  ...props 
}) => {
  return (
    <svg 
      width={size}
      height={size}
      viewBox="0 0 24 24" 
      fill={color}
      {...props}
    >
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  );
};

export default BackgroundIcon;