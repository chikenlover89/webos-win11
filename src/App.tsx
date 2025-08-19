import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import './App.css';

const defaultBackground = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop';

interface WindowState {
  isMinimized: boolean;
  isMaximized: boolean;
}

function App() {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [fileExplorerPath, setFileExplorerPath] = useState('C:\\Users\\Desktop');
  const [windowStates, setWindowStates] = useState<Record<string, WindowState>>({});

  const openApp = (appName: string, path?: string) => {
    if (appName === 'File Explorer' && path) {
      setFileExplorerPath(path);
    } else if (appName === 'File Explorer') {
      // Reset to desktop when opened from start menu
      setFileExplorerPath('C:\\Users\\Desktop');
    }
    
    // If app is minimized, restore it instead of creating new instance
    if (windowStates[appName]?.isMinimized) {
      setWindowStates(prev => ({
        ...prev,
        [appName]: { ...prev[appName], isMinimized: false }
      }));
      return;
    }
    
    if (!openApps.includes(appName)) {
      setOpenApps([...openApps, appName]);
      // Initialize window state
      setWindowStates(prev => ({
        ...prev,
        [appName]: { isMinimized: false, isMaximized: false }
      }));
    }
  };

  const closeApp = (appName: string) => {
    setOpenApps(openApps.filter(app => app !== appName));
    // Clean up window state
    setWindowStates(prev => {
      const newStates = { ...prev };
      delete newStates[appName];
      return newStates;
    });
  };

  const minimizeApp = (appName: string) => {
    setWindowStates(prev => ({
      ...prev,
      [appName]: { ...prev[appName], isMinimized: true }
    }));
  };

  const maximizeApp = (appName: string) => {
    setWindowStates(prev => ({
      ...prev,
      [appName]: { 
        ...prev[appName], 
        isMaximized: !prev[appName]?.isMaximized 
      }
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Desktop 
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          openApp={openApp}
          openApps={openApps}
          closeApp={closeApp}
          fileExplorerPath={fileExplorerPath}
          windowStates={windowStates}
          minimizeApp={minimizeApp}
          maximizeApp={maximizeApp}
        />
        <Taskbar 
          showStartMenu={showStartMenu}
          setShowStartMenu={setShowStartMenu}
          openApp={openApp}
          openApps={openApps}
          windowStates={windowStates}
        />
      </div>
    </DndProvider>
  );
}

export default App;
