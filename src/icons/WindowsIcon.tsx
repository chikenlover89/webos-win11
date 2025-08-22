import React from 'react';

interface WindowsIconProps {
  size?: number;
  color?: string;
}

const WindowsIcon: React.FC<WindowsIconProps> = ({ 
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
      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
    </svg>
  );
};

export default WindowsIcon;