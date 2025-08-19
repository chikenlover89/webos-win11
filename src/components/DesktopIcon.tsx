import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './DesktopIcon.css';

interface DesktopIconProps {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  openApp: (appName: string) => void;
  onDelete?: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, type, name, position, openApp, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'icon',
    item: { id, gridPosition: { x: position.x * 80, y: position.y * 80 } },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, position]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'icon',
    drop: (item: { id: string }) => {
      if (type === 'bin' && item.id !== id && onDelete) {
        onDelete(item.id);
        return;
      }
    },
    canDrop: () => type === 'bin',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [type, onDelete]);

  const handleDoubleClick = () => {
    switch (id) {
      case 'games-folder':
        openApp('File Explorer');
        break;
      case 'calculator':
        openApp('Calculator');
        break;
      case 'background-changer':
        openApp('Background');
        break;
      default:
        break;
    }
  };

  const getIconSvg = () => {
    switch (type) {
      case 'folder':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFD700">
            <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
          </svg>
        );
      case 'app':
        if (id === 'calculator') {
          return (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#0078d4">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4H7V7h2v2zm4 0h-2V7h2v2zm4 0h-2V7h2v2z"/>
            </svg>
          );
        }
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#0078d4">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'bin':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill={isOver && canDrop ? "#ff4444" : "#666"}>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        );
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#0078d4">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
    }
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`desktop-icon ${isDragging ? 'dragging' : ''} ${isOver && canDrop ? 'drop-target' : ''}`}
      style={{
        gridColumn: position.x + 1,
        gridRow: position.y + 1,
        opacity: isDragging ? 0.5 : 1,
      }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="icon-image">
        {getIconSvg()}
      </div>
      <div className="icon-name">{name}</div>
    </div>
  );
};

export default DesktopIcon;