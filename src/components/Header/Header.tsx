import { FC } from 'react';
import MainNav2 from './MainNav2';

export interface HeaderProps {
  navType?: 'MainNav1' | 'MainNav2';
  className?: string;
}

const Header: FC<HeaderProps> = ({ navType = 'MainNav1', className = '' }) => {
  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
    >
      <MainNav2 />
    </div>
  );
};

export default Header;
