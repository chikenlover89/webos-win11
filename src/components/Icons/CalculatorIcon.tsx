import React from 'react';

interface CalculatorIconProps {
  size?: number;
}

const CalculatorIcon: React.FC<CalculatorIconProps> = ({ 
  size = 24,
  ...props 
}) => {
  return (
    <svg 
      id="Layer_1" 
      data-name="Layer 1" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 256 256"
      width={size}
      height={size}
      {...props}
    >
      <defs>
        <style>
          {`.cls-1{fill:#7f878f;}.cls-2{fill:#fefefe;}.cls-3{fill:#41d1f6;}.cls-4{fill:#c9d1d8;}.cls-5{fill:#134583;}`}
        </style>
      </defs>
      <rect className="cls-1" x="32" y="0.11" width="192.07" height="255.89" rx="12.22"/>
      <path className="cls-3" d="M53.34,61.46c-.09-11.81-.22-23.63-.27-35.44,0-3.17,1.67-4.91,4.93-5,45.11,0,90.23.05,135.34,0,3.8,0,7.42.3,8.71,4.82q-.13,15.21-.26,30.41c-.06,5.89-1.58,7.54-7.22,7.54Q127,64,59.43,64C57,64,54.82,63.64,53.34,61.46Z"/>
      <rect className="cls-4" x="52.67" y="84.89" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-4" x="106.86" y="85.08" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-4" x="160.86" y="84.81" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-4" x="52.67" y="138.91" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-4" x="106.78" y="138.74" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-4" x="52.67" y="193.01" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-4" x="106.78" y="193.01" width="43.08" height="43.08" rx="6.85"/>
      <rect className="cls-5" x="160.9" y="138.76" width="42.98" height="97.32" rx="9.82"/>
    </svg>
  );
};

export default CalculatorIcon;