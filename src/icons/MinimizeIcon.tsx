import React from 'react';

interface MinimizeIconProps {
  size?: number;
  color?: string;
}

const MinimizeIcon: React.FC<MinimizeIconProps> = ({ 
  size = 24,
  color = "currentColor",
  ...props 
}) => {
  return (
    <svg 
      width={size}
      height={size}
      viewBox="0 0 24 24" 
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export default MinimizeIcon;