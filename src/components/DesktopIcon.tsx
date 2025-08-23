import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { APPS, FILE_TYPES } from '../constants';

import { CalculatorIcon, TrashIcon, SettingsIcon, BackgroundIcon, FancyFolderIcon, ProfileIcon } from '../icons';

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
        openApp(APPS.FILE_EXPLORER);
        break;
      case 'calculator':
        openApp(APPS.CALCULATOR);
        break;
      case 'background-changer':
        openApp(APPS.BACKGROUND);
        break;
      case 'profile':
        openApp(APPS.PROFILE);
        break;
      default:
        break;
    }
  };

  const getIconSvg = () => {
    switch (type) {
      case FILE_TYPES.FOLDER:
        return <FancyFolderIcon size={32} />;
      case FILE_TYPES.APP:
        if (id === 'calculator') {
          return <CalculatorIcon size={32} />;
        }
        if (id === 'profile') {
          return <ProfileIcon size={32} />;
        }
        return <BackgroundIcon size={32} />;
      case 'bin':
        return <TrashIcon size={32} color={isOver && canDrop ? "#ff4444" : "#666"} />;
      default:
        return <SettingsIcon size={32} />;
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