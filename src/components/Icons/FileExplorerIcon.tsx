import React from 'react';

interface FileExplorerProps {
  size?: number;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  size = 24, 
  ...props 
}) => {
  return (
    <svg 
      id="Ebene_2" 
      data-name="Ebene 2" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 192 182.85"
      width={size}
      height={size}
      {...props}
    >
      <defs>
        <linearGradient id="Unbenannter_Verlauf_13" data-name="Unbenannter Verlauf 13" x1="96.09" y1="0" x2="96.09" y2="37.11" gradientUnits="userSpaceOnUse">
          <stop offset=".46" stopColor="#e09f00"/>
          <stop offset="1" stopColor="#bb8500"/>
        </linearGradient>
        <linearGradient id="Unbenannter_Verlauf_90" data-name="Unbenannter Verlauf 90" x1="0" y1="94.52" x2="192" y2="94.52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe28e"/>
          <stop offset="1" stopColor="#ffcf48"/>
        </linearGradient>
        <linearGradient id="Unbenannter_Verlauf_11" data-name="Unbenannter Verlauf 11" x1="19.35" y1="19.25" x2="177.44" y2="177.35" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd65e"/>
          <stop offset=".26" stopColor="#fed45a"/>
          <stop offset=".46" stopColor="#fdd151"/>
          <stop offset=".64" stopColor="#fccb40"/>
          <stop offset=".81" stopColor="#f9c229"/>
          <stop offset=".97" stopColor="#f6b70c"/>
          <stop offset="1" stopColor="#f6b505"/>
        </linearGradient>
        <linearGradient id="Unbenannter_Verlauf_3" data-name="Unbenannter Verlauf 3" x1="62.84" y1="101.18" x2="124.72" y2="189.57" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1391dd"/>
          <stop offset=".28" stopColor="#118cd8"/>
          <stop offset=".6" stopColor="#0b7dcc"/>
          <stop offset=".94" stopColor="#0166b7"/>
          <stop offset="1" stopColor="#0062b4"/>
        </linearGradient>
        <filter id="drop-shadow-1" x="18.11" y="97.85" width="157" height="85" filterUnits="userSpaceOnUse">
          <feOffset dx="1" dy="-1"/>
          <feGaussianBlur result="blur" stdDeviation="5"/>
          <feFlood floodColor="#000" floodOpacity=".2"/>
          <feComposite in2="blur" operator="in"/>
          <feComposite in="SourceGraphic"/>
        </filter>
      </defs>
      <g id="Ebene_1-2" data-name="Ebene 1">
        <path fill="url(#Unbenannter_Verlauf_13)" d="M.18,37.11V8.33C.18,3.73,3.91,0,8.52,0h49.87c4.6,0,9.36,3.55,19.4,17.85h104.6c5.31,0,9.62,3.31,9.62,8.62v10.64H.18Z"/>
        <path fill="url(#Unbenannter_Verlauf_90)" d="M0,38.91c0-4.95,4.01-8.96,8.96-8.96h51.85c5.62,0,17.36-8.55,17.23-8.68-.11-.11,79.47-.04,105.69,0,4.57,0,8.27,3.71,8.27,8.28v129.69c0,4.75-3.85,8.6-8.6,8.6H8.77c-4.84,0-8.77-3.92-8.77-8.77V38.91Z"/>
        <path fill="url(#Unbenannter_Verlauf_11)" d="M0,42.6c0-5.32,4.32-9.64,9.64-9.64h51.17c5.62,0,17.36-8.55,17.23-8.68-.11-.11,79.47-.04,105.69,0,4.57,0,8.27,3.71,8.27,8.28v126.69c0,4.75-3.85,8.6-8.6,8.6H8.77c-4.84,0-8.77-3.92-8.77-8.77V42.6Z"/>
        <path fill="url(#Unbenannter_Verlauf_3)" filter="url(#drop-shadow-1)" d="M54.89,113.87h82.04c12.07,0,21.87,9.8,21.87,21.87v32.26H33.02v-32.26c0-12.07,9.8-21.87,21.87-21.87Z"/>
        <line fill="#114a8b" stroke="#114a8b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="6px" x1="59.91" y1="140.6" x2="131.4" y2="140.6"/>
      </g>
    </svg>
  );
};

export default FileExplorer;