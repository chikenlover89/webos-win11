import React, { useState } from 'react';

import MaximizeIcon from './Icons/MaximizeIcon';
import RestoreIcon from './Icons/RestoreIcon';
import MinimizeIcon from './Icons/MinimizeIcon';
import CloseIcon from './Icons/CloseIcon';

import './WindowFrame.css';

interface WindowFrameProps {
  title: string;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  width?: number;
  height?: number;
  isMaximized?: boolean;
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ 
  title, 
  onClose, 
  onMinimize,
  onMaximize,
  width = 400, 
  height = 300,
  isMaximized = false,
  children 
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const windowStyle = isMaximized ? {
    left: 0,
    top: 0,
    width: '100vw',
    height: 'calc(100vh - 48px)', // Account for taskbar height
  } : {
    left: position.x,
    top: position.y,
    width: width,
    height: height
  };

  return (
    <div
      className={`window-frame ${isMaximized ? 'maximized' : ''}`}
      style={windowStyle}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div 
        className="window-titlebar"
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button 
            className="window-control minimize" 
            onClick={onMinimize}
            title="Minimize"
          >
            <MinimizeIcon size={12} />
          </button>
          <button 
            className="window-control maximize" 
            onClick={onMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <RestoreIcon size={12} /> : <MaximizeIcon size={12} />}
          </button>
          <button className="window-control close" onClick={onClose} title="Close">
            <CloseIcon size={12} />
          </button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;