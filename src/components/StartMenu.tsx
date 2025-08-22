import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FileExplorerIcon, CalculatorIcon, BackgroundIcon } from './Icons';

import './StartMenu.css';

interface StartMenuProps {
  openApp: (appName: string) => void;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ openApp, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Check if the click is on the start button by checking if target has start-button class
        const target = event.target as HTMLElement;
        const isStartButton = target.closest('.start-button');
        
        if (!isStartButton) {
          handleClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  const apps = [
    { name: 'File Explorer', icon: '📁', action: () => openApp('File Explorer') },
    { name: 'Calculator', icon: '🔢', action: () => openApp('Calculator') },
    { name: 'Background', icon: '🖼️', action: () => openApp('Background') },
  ];

  const handleAppClick = (app: typeof apps[0]) => {
    app.action();
    handleClose();
  };

  return (
    <>
      <div 
        className={`start-menu-overlay ${isClosing ? 'closing' : ''}`} 
        onClick={handleClose} 
      />
      <div 
        ref={menuRef}
        className={`start-menu ${isClosing ? 'closing' : ''}`}
      >
        <div className="start-menu-header">
          <h3>Start Menu</h3>
        </div>
        <div className="start-menu-apps">
          {apps.map((app, index) => (
            <button
              key={index}
              className="start-menu-app"
              onClick={() => handleAppClick(app)}
            >
              <div className="app-icon">
                {app.name === 'File Explorer' && <FileExplorerIcon size={24} />}
                {app.name === 'Calculator' && <CalculatorIcon size={24} />}
                {app.name === 'Background' && <BackgroundIcon size={24} />}
              </div>
              <span className="app-name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default StartMenu;