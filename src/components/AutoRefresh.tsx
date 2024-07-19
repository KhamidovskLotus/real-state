import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AutoRefreshWrapperProps {
  children: React.ReactNode;
}

const AutoRefreshWrapper: React.FC<AutoRefreshWrapperProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const pageKey = `hasReloaded_${location.pathname}`;
    const hasReloaded = sessionStorage.getItem(pageKey);

    if (!hasReloaded) {
      console.log('No reload flag found for this page, reloading...');
      sessionStorage.setItem(pageKey, 'true');
      window.location.reload();
    } else {
      console.log('Reload flag found for this page, removing flag.');
      sessionStorage.removeItem(pageKey);
    }
  }, [location]);

  return <>{children}</>;
};

export default AutoRefreshWrapper;