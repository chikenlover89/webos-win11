import React from 'react';

interface FolderIconProps {
  size?: number;
  color?: string;
}

const FolderIcon: React.FC<FolderIconProps> = ({ 
  size = 24,
  color = "#FFD700",
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
      <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
    </svg>
  );
};

export default FolderIcon;