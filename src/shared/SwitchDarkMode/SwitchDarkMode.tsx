import { SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from 'states/themeSlice';
export interface SwitchDarkModeProps {
  className?: string;
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.theme === 'dark'
    ) {
      toDark();
    } else {
      toLight();
    }
  }, []);

  const toDark = () => {
    dispatch(setTheme('dark'));
    setIsDarkMode(true);
    const root = document.querySelector('html');
    if (!root) return;
    !root.classList.contains('dark') && root.classList.add('dark');
    localStorage.theme = 'dark';
  };

  const toLight = () => {
    dispatch(setTheme('light'));
    setIsDarkMode(false);
    const root = document.querySelector('html');
    if (!root) return;
    root.classList.remove('dark');
    localStorage.theme = 'light';
  };

  function _toogleDarkMode() {
    if (localStorage.theme === 'light') {
      toDark();
    } else {
      toLight();
    }
  }

  return (
    <button
      onClick={_toogleDarkMode}
      className={`text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center ${className}`}
    >
      <span className="sr-only">Enable dark mode</span>
      {isDarkMode ? (
        <MoonIcon className="w-7 h-7" aria-hidden="true" />
      ) : (
        <SunIcon className="w-7 h-7" aria-hidden="true" />
      )}
    </button>
  );
};

export default SwitchDarkMode;
