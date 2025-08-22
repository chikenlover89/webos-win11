import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { APPS, DESKTOP_ITEMS, PATHS, FILE_TYPES } from '../constants';

import DesktopIcon from './DesktopIcon';
import FileExplorer from './FileExplorer';
import Calculator from './Calculator';
import BackgroundChanger from './BackgroundChanger';

import './Desktop.css';

interface WindowState {
  isMinimized: boolean;
  isMaximized: boolean;
}

interface DesktopProps {
  backgroundImage: string;
  setBackgroundImage: (url: string) => void;
  openApp: (appName: string, path?: string) => void;
  openApps: string[];
  closeApp: (appName: string) => void;
  fileExplorerPath: string;
  windowStates: Record<string, WindowState>;
  minimizeApp: (appName: string) => void;
  maximizeApp: (appName: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ 
  backgroundImage, 
  setBackgroundImage, 
  openApp, 
  openApps, 
  closeApp,
  fileExplorerPath,
  windowStates,
  minimizeApp,
  maximizeApp
}) => {
  const [iconPositions, setIconPositions] = useState([
    { id: 'games-folder', type: FILE_TYPES.FOLDER, name: DESKTOP_ITEMS.GAMES, position: { x: 0, y: 0 } },
    { id: 'calculator', type: FILE_TYPES.APP, name: APPS.CALCULATOR, position: { x: 0, y: 1 } },
    { id: 'background-changer', type: FILE_TYPES.APP, name: APPS.BACKGROUND, position: { x: 0, y: 2 } }
  ]);

  const isPositionOccupied = useCallback((position: { x: number; y: number }, excludeId?: string) => {
    return iconPositions.some(icon => 
      icon.id !== excludeId && 
      icon.position.x === position.x && 
      icon.position.y === position.y
    );
  }, [iconPositions]);

  const findNearestFreePosition = useCallback((targetPosition: { x: number; y: number }, excludeId?: string) => {
    // If target position is free, use it
    if (!isPositionOccupied(targetPosition, excludeId)) {
      console.log('Target position is free:', targetPosition);
      return targetPosition;
    }

    console.log('Target position occupied, searching for alternative:', targetPosition);

    // Search in expanding spiral pattern from target position
    const maxSearchRadius = 10;
    for (let radius = 1; radius <= maxSearchRadius; radius++) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          // Skip positions not on the current radius perimeter
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          
          const candidatePosition = {
            x: Math.max(0, targetPosition.x + dx),
            y: Math.max(0, targetPosition.y + dy)
          };
          
          if (!isPositionOccupied(candidatePosition, excludeId)) {
            console.log('Found free position:', candidatePosition);
            return candidatePosition;
          }
        }
      }
    }

    // Fallback: find any free position starting from (0,0)
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        const position = { x, y };
        if (!isPositionOccupied(position, excludeId)) {
          console.log('Fallback position found:', position);
          return position;
        }
      }
    }

    console.log('No free position found, using target position as last resort');
    return targetPosition; // Last resort
  }, [isPositionOccupied]);

  const moveIcon = useCallback((id: string, newPosition: { x: number; y: number }) => {
    console.log('moveIcon called for', id, 'to position', newPosition);
    const finalPosition = findNearestFreePosition(newPosition, id);
    console.log('Final position for', id, ':', finalPosition);
    
    setIconPositions(prev => {
      const newPositions = prev.map(icon => 
        icon.id === id ? { ...icon, position: finalPosition } : icon
      );
      console.log('Updated positions:', newPositions);
      return newPositions;
    });
  }, [findNearestFreePosition]);

  const deleteIcon = useCallback((id: string) => {
    setIconPositions(prev => prev.filter(icon => icon.id !== id));
  }, []);

  const [, drop] = useDrop(() => ({
    accept: 'icon',
    drop: (item: { id: string; gridPosition: { x: number; y: number } }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const targetPosition = {
          x: Math.max(0, Math.round((item.gridPosition.x + delta.x) / 80)),
          y: Math.max(0, Math.round((item.gridPosition.y + delta.y) / 80))
        };
        console.log('Attempting to move', item.id, 'to position', targetPosition);
        moveIcon(item.id, targetPosition);
      }
    },
  }), [moveIcon]);

  return (
    <div ref={drop as any} className="desktop">
      <div className="desktop-grid">
        {iconPositions.map(icon => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            type={icon.type}
            name={icon.name}
            position={icon.position}
            openApp={(appName) => {
              if (icon.id === 'games-folder') {
                openApp(APPS.FILE_EXPLORER, PATHS.DESKTOP_GAMES);
              } else {
                openApp(appName);
              }
            }}
          />
        ))}
      </div>

      <div className="recycle-bin-container">
        <DesktopIcon
          id="recycle-bin"
          type="bin"
          name={DESKTOP_ITEMS.RECYCLE_BIN}
          position={{ x: 0, y: 0 }}
          openApp={openApp}
          onDelete={deleteIcon}
        />
      </div>

      {openApps.includes(APPS.FILE_EXPLORER) && !windowStates[APPS.FILE_EXPLORER]?.isMinimized && (
        <FileExplorer 
          onClose={() => closeApp(APPS.FILE_EXPLORER)} 
          onMinimize={() => minimizeApp(APPS.FILE_EXPLORER)}
          onMaximize={() => maximizeApp(APPS.FILE_EXPLORER)}
          isMaximized={windowStates[APPS.FILE_EXPLORER]?.isMaximized || false}
          initialPath={fileExplorerPath}
          openApp={openApp}
        />
      )}
      
      {openApps.includes(APPS.CALCULATOR) && !windowStates[APPS.CALCULATOR]?.isMinimized && (
        <Calculator 
          onClose={() => closeApp(APPS.CALCULATOR)}
          onMinimize={() => minimizeApp(APPS.CALCULATOR)}
          onMaximize={() => maximizeApp(APPS.CALCULATOR)}
          isMaximized={windowStates[APPS.CALCULATOR]?.isMaximized || false}
        />
      )}
      
      {openApps.includes(APPS.BACKGROUND) && !windowStates[APPS.BACKGROUND]?.isMinimized && (
        <BackgroundChanger 
          onClose={() => closeApp(APPS.BACKGROUND)}
          onMinimize={() => minimizeApp(APPS.BACKGROUND)}
          onMaximize={() => maximizeApp(APPS.BACKGROUND)}
          isMaximized={windowStates[APPS.BACKGROUND]?.isMaximized || false}
          setBackgroundImage={setBackgroundImage}
          currentBackground={backgroundImage}
        />
      )}
    </div>
  );
};

export default Desktop;