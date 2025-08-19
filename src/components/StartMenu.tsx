import React, { useState, useEffect, useRef, useCallback } from 'react';
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  {app.name === 'File Explorer' && (
                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
                  )}
                  {app.name === 'Calculator' && (
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"/>
                  )}
                  {app.name === 'Background' && (
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  )}
                </svg>
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