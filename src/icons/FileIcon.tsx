import React from 'react';

interface FileIconProps {
  size?: number;
  color?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ 
  size = 24,
  color = "#0078d4",
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
      <path d="M13 9V4H6v16h12V9h-5zM8 6h3v2H8V6zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
    </svg>
  );
};

export default FileIcon;