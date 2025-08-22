import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

import WindowFrame from './WindowFrame';

import './StonksGame.css';

interface StonksGameProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

const StonksGame: React.FC<StonksGameProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    unityProvider,
    isLoaded: unityLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: '/build/webgl/StonksWebglBuild.loader.js',
    dataUrl: '/build/webgl/StonksWebglBuild.data.unityweb',
    frameworkUrl: '/build/webgl/StonksWebglBuild.framework.js.unityweb',
    codeUrl: '/build/webgl/StonksWebglBuild.wasm.unityweb',
  });

  useEffect(() => {
    if (unityLoaded) {
      setIsLoaded(true);
    }
  }, [unityLoaded]);

  return (
    <WindowFrame
      title="Super Action Trading"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      width={960}
      height={540}
    >
      <div className="stonks-game">
        {!isLoaded && (
          <div className="loading-screen">
            <div className="loading-bar">
              <div 
                className="loading-progress" 
                style={{ width: `${loadingProgression * 100}%` }}
              />
            </div>
            <p>Loading Stonks Game... {Math.round(loadingProgression * 100)}%</p>
          </div>
        )}
        <Unity 
          unityProvider={unityProvider} 
          style={{
            width: '100%',
            height: '100%',
            visibility: isLoaded ? 'visible' : 'hidden'
          }}
        />
      </div>
    </WindowFrame>
  );
};

export default StonksGame;