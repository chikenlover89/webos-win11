import React, { useState } from 'react';
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
  type: 'folder' | 'file';
  size?: string;
  modified: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose, onMinimize, onMaximize, isMaximized, initialPath = 'C:\\Users\\Desktop', openApp }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  
  const getFiles = (path: string): FileItem[] => {
    if (path === 'C:\\Users\\Desktop') {
      // Desktop root - show desktop items
      return [
        { name: 'Games', type: 'folder', modified: '8/19/2025 12:45 PM' },
        { name: 'Calculator', type: 'file', size: '1.2 MB', modified: '8/19/2025 11:30 AM' },
        { name: 'Background', type: 'file', size: '2.1 MB', modified: '8/19/2025 10:15 AM' },
        { name: 'Recycle Bin', type: 'folder', modified: '8/19/2025 9:00 AM' },
      ];
    } else if (path === 'C:\\Users\\Desktop\\Games') {
      // Games folder - empty
      return [];
    } else if (path === 'C:\\Users\\Desktop\\Recycle Bin') {
      // Recycle Bin - empty
      return [];
    }
    
    // Default fallback
    return [
      { name: 'Documents', type: 'folder', modified: '8/19/2025 2:30 PM' },
      { name: 'Pictures', type: 'folder', modified: '8/19/2025 1:15 PM' },
    ];
  };
  
  const files = getFiles(currentPath);

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      const newPath = `${currentPath}\\${item.name}`;
      setCurrentPath(newPath);
    } else if (item.type === 'file' && openApp) {
      // Handle app launching for desktop items
      switch (item.name) {
        case 'Calculator':
          openApp('Calculator');
          break;
        case 'Background':
          openApp('Background');
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
      title="File Explorer"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      width={600}
      height={400}
    >
      <div className="file-explorer">
        <div className="explorer-toolbar">
          <button className="nav-button" onClick={navigateUp}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
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
                    {file.type === 'folder' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                        <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0078d4">
                        <path d="M13 9V4H6v16h12V9h-5zM8 6h3v2H8V6zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/>
                      </svg>
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