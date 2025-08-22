import React, { useState, useEffect } from 'react';

import { WindowsIcon } from './Icons';

import StartMenu from './StartMenu';

import './Taskbar.css';

interface WindowState {
  isMinimized: boolean;
  isMaximized: boolean;
}

interface TaskbarProps {
  showStartMenu: boolean;
  setShowStartMenu: (show: boolean) => void;
  openApp: (appName: string) => void;
  openApps: string[];
  windowStates: Record<string, WindowState>;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  showStartMenu, 
  setShowStartMenu, 
  openApp, 
  openApps,
  windowStates
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const toggleStartMenu = () => {
    setShowStartMenu(!showStartMenu);
  };

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <button className="start-button" onClick={toggleStartMenu}>
          <WindowsIcon size={20} />
        </button>
        
        <div className="taskbar-apps">
          {openApps.map(app => (
            <div 
              key={app} 
              className={`taskbar-app ${windowStates[app]?.isMinimized ? 'minimized' : ''}`}
              onClick={() => openApp(app)}
              title={app}
            >
              {app}
            </div>
          ))}
        </div>
      </div>

      <div className="taskbar-right">
        <div className="system-tray">
          <div className="clock">
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {showStartMenu && (
        <StartMenu 
          openApp={openApp}
          onClose={() => setShowStartMenu(false)}
        />
      )}
    </div>
  );
};

export default Taskbar;