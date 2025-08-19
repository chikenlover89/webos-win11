import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import './BackgroundChanger.css';

interface BackgroundChangerProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  setBackgroundImage: (url: string) => void;
  currentBackground: string;
}

const BackgroundChanger: React.FC<BackgroundChangerProps> = ({ 
  onClose, 
  onMinimize,
  onMaximize,
  isMaximized,
  setBackgroundImage, 
  currentBackground 
}) => {
  const [customUrl, setCustomUrl] = useState('');

  const presetBackgrounds = [
    {
      name: 'Windows 11 Default',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
    },
    {
      name: 'Mountain Landscape',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
    },
    {
      name: 'Ocean Waves',
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&h=1080&fit=crop'
    },
    {
      name: 'Forest Path',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop'
    },
    {
      name: 'City Skyline',
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop'
    },
    {
      name: 'Desert Sunset',
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop'
    }
  ];

  const handlePresetClick = (url: string) => {
    setBackgroundImage(url);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim()) {
      setBackgroundImage(customUrl.trim());
      setCustomUrl('');
    }
  };

  return (
    <WindowFrame
      title="Background Settings"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      width={500}
      height={450}
    >
      <div className="background-changer">
        <div className="section">
          <h3>Preset Backgrounds</h3>
          <div className="preset-grid">
            {presetBackgrounds.map((bg, index) => (
              <div
                key={index}
                className={`preset-item ${currentBackground === bg.url ? 'active' : ''}`}
                onClick={() => handlePresetClick(bg.url)}
              >
                <div 
                  className="preset-thumbnail"
                  style={{ backgroundImage: `url(${bg.url})` }}
                />
                <div className="preset-name">{bg.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Custom Background URL</h3>
          <form onSubmit={handleCustomUrlSubmit} className="custom-form">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="custom-input"
            />
            <button type="submit" className="custom-button">
              Apply
            </button>
          </form>
        </div>

        <div className="section">
          <h3>Current Background</h3>
          <div className="current-preview">
            <div 
              className="current-thumbnail"
              style={{ backgroundImage: `url(${currentBackground})` }}
            />
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export default BackgroundChanger;