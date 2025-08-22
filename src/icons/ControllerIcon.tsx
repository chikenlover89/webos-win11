import React from 'react';

interface ControllerIconProps {
  size?: number;
}

const ControllerIcon: React.FC<ControllerIconProps> = ({ 
  size = 24,
  ...props 
}) => {
  return (
    <svg 
      viewBox="0 0 256 256"
      width={size}
      height={size}
      {...props}
    >
      <defs>
        <style>
          {`.controller-body{fill:#2c3e50;}.controller-highlight{fill:#34495e;}.controller-button{fill:#e74c3c;}.controller-dpad{fill:#95a5a6;}.controller-stick{fill:#7f8c8d;}`}
        </style>
      </defs>
      <path className="controller-body" d="M80,80 Q50,80 30,100 Q10,120 10,150 Q10,180 30,200 Q50,220 80,220 L176,220 Q206,220 226,200 Q246,180 246,150 Q246,120 226,100 Q206,80 176,80 Z"/>
      <ellipse className="controller-highlight" cx="128" cy="130" rx="90" ry="35"/>
      
      <circle className="controller-button" cx="190" cy="110" r="8"/>
      <circle className="controller-button" cx="210" cy="130" r="8"/>
      <circle className="controller-button" cx="190" cy="150" r="8"/>
      <circle className="controller-button" cx="170" cy="130" r="8"/>
      
      <rect className="controller-dpad" x="60" y="120" width="6" height="20" rx="3"/>
      <rect className="controller-dpad" x="53" y="127" width="20" height="6" rx="3"/>
      
      <circle className="controller-stick" cx="100" cy="160" r="12"/>
      <circle className="controller-stick" cx="156" cy="160" r="12"/>
      
      <rect className="controller-highlight" x="110" y="95" width="36" height="8" rx="4"/>
      <rect className="controller-highlight" x="110" y="185" width="36" height="8" rx="4"/>
    </svg>
  );
};

export default ControllerIcon;