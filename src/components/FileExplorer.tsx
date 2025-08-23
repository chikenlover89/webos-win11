import React, { useState } from 'react';

import { APPS, DESKTOP_ITEMS, PATHS, FILE_TYPES } from '../constants';

import { BackIcon, FolderIcon, FileIcon, ControllerIcon } from '../icons';

import WindowFrame from './WindowFrame';

import './FileExplorer.css';

interface FileExplorerProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  initialPath?: string;
  openApp?: (appName: string) => void;
}

interface FileItem {
  name: string;
  type: 'folder' | 'file' | 'game';
  size?: string;
  modified: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose, onMinimize, onMaximize, isMaximized, initialPath = PATHS.DESKTOP, openApp }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  
  const getFiles = (path: string): FileItem[] => {
    if (path === PATHS.DESKTOP) {
      return [
        { name: DESKTOP_ITEMS.GAMES, type: FILE_TYPES.FOLDER, modified: '8/19/2025 12:45 PM' },
        { name: APPS.CALCULATOR, type: FILE_TYPES.FILE, size: '1.2 MB', modified: '8/19/2025 11:30 AM' },
        { name: APPS.BACKGROUND, type: FILE_TYPES.FILE, size: '2.1 MB', modified: '8/19/2025 10:15 AM' },
        { name: APPS.PROFILE, type: FILE_TYPES.FILE, size: '850 KB', modified: '8/23/2025 2:30 PM' },
        { name: DESKTOP_ITEMS.RECYCLE_BIN, type: FILE_TYPES.FOLDER, modified: '8/19/2025 9:00 AM' },
      ];
    } else if (path === PATHS.DESKTOP_GAMES) {
      return [
        { name: APPS.STONKS, type: FILE_TYPES.GAME, size: '25.3 MB', modified: '8/22/2025 2:00 PM' },
      ];
    } else if (path === PATHS.DESKTOP_RECYCLE_BIN) {
      return [];
    } else if (path === PATHS.PICTURES) {
      return [];
    }
    
    return [
      { name: 'Desktop', type: 'folder', modified: '8/19/2025 2:30 PM' },
      { name: 'Pictures', type: 'folder', modified: '8/19/2025 1:15 PM' },
    ];
  };
  
  const files = getFiles(currentPath);

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === FILE_TYPES.FOLDER) {
      const newPath = `${currentPath}\\${item.name}`;
      setCurrentPath(newPath);
    } else if ((item.type === FILE_TYPES.FILE || item.type === FILE_TYPES.GAME) && openApp) {
      // Handle app launching for desktop items
      switch (item.name) {
        case APPS.CALCULATOR:
          openApp(APPS.CALCULATOR);
          break;
        case APPS.BACKGROUND:
          openApp(APPS.BACKGROUND);
          break;
        case APPS.PROFILE:
          openApp(APPS.PROFILE);
          break;
        case APPS.STONKS:
          openApp(APPS.STONKS);
          break;
        default:
          break;
      }
    }
  };

  const navigateUp = () => {
    const pathParts = currentPath.split('\\');
    if (pathParts.length > 1) {
      pathParts.pop();
      setCurrentPath(pathParts.join('\\'));
    }
  };

  return (
    <WindowFrame
      title={APPS.FILE_EXPLORER}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      width={600}
      height={400}
    >
      <div className="file-explorer">
        <div className="explorer-toolbar">
          <button
            className="nav-button"
            disabled={currentPath === PATHS.USERS}
            onClick={navigateUp}
          >
            <BackIcon size={16} />
          </button>
          <div className="address-bar">
            <input 
              type="text" 
              value={currentPath} 
              readOnly
              className="address-input"
            />
          </div>
        </div>
        
        <div className="explorer-content">
          <div className="file-list-header">
            <div className="column-header name">Name</div>
            <div className="column-header size">Size</div>
            <div className="column-header modified">Date modified</div>
          </div>
          
          <div className="file-list">
            {files.map((file, index) => (
              <div
                key={index}
                className="file-item"
                onDoubleClick={() => handleItemDoubleClick(file)}
              >
                <div className="file-info name">
                  <div className="file-icon">
                    {file.type === FILE_TYPES.FOLDER ? (
                      <FolderIcon size={16} />
                    ) : file.type === FILE_TYPES.GAME ? (
                      <ControllerIcon size={16} />
                    ) : (
                      <FileIcon size={16} />
                    )}
                  </div>
                  <span>{file.name}</span>
                </div>
                <div className="file-info size">{file.size || ''}</div>
                <div className="file-info modified">{file.modified}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default FileExplorer;