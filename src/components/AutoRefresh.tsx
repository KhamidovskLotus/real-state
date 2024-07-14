import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AutoRefreshWrapperProps {
  children: React.ReactNode;
}

const AutoRefreshWrapper: React.FC<AutoRefreshWrapperProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location:', location);
    if (!window.location.hash) {
      console.log('No hash found, reloading...');
      window.location.hash = 'loaded';
      window.location.reload();
    } else {
      console.log('Hash found:', window.location.hash);
    }
  }, [location]);

  return <>{children}</>;
};

export default AutoRefreshWrapper;
