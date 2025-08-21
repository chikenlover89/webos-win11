import React from 'react';

interface RestoreIconProps {
  size?: number;
  color?: string;
}

const RestoreIcon: React.FC<RestoreIconProps> = ({ 
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
      {...props}
    >
      <rect x="7" y="3" width="14" height="14" rx="1" ry="1" />
      <path d="M3 7v10a2 2 0 0 0 2 2h10" />
    </svg>
  );
};

export default RestoreIcon;