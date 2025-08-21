import React from 'react';

interface MaximizeIconProps {
  size?: number;
  color?: string;
}

const MaximizeIcon: React.FC<MaximizeIconProps> = ({ 
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </svg>
  );
};

export default MaximizeIcon;