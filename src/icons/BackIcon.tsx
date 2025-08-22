import React from 'react';

interface BackIconProps {
  size?: number;
  color?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ 
  size = 24,
  color = "currentColor",
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
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  );
};

export default BackIcon;