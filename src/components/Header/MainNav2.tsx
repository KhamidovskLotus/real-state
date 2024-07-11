import HeroSearchForm2MobileFactory from 'components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory';
import {  NAVIGATION_LOTUS } from 'data/navigation';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from 'shared/Logo/Logo';
import MenuBar from 'shared/MenuBar/MenuBar';
import NavigationItem from 'shared/Navigation/NavigationItem';
import SwitchDarkMode from 'shared/SwitchDarkMode/SwitchDarkMode';
import { StoreState } from 'states/store';
import AvatarDropdown from './AvatarDropdown';
import LangDropdown from './LangDropdown';
import NotifyDropdown from './NotifyDropdown';

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = '' }) => {
  const user = useSelector((store: StoreState) => store.user);
  return (
    <div className={`nc-MainNav1 nc-MainNav2 relative container z-10 ${className}`}>
      <div className="px-4 md:flex hidden py-4 relative  justify-around items-center">
        <div className="hidden md:flex justify-start  items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo className='w-36' />
        </div>
        <div className="justify-center hidden md:flex  items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <ul className="list-none flex gap-2">
            {NAVIGATION_LOTUS.map((item) => (
              <NavigationItem key={item.id} menuItem={item} />
            ))}
          </ul>
        </div>

        <div className="hidden md:flex flex-shrink-0 items-center justify-end  lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden items-center lg:flex space-x-1">
            <LangDropdown />

            <div></div>
            <SwitchDarkMode />
            {/* <div className="pr-1.5">
              <NotifyDropdown className="-ml-2 xl:-ml-1" />
            </div> */}
            {!user.current ? (
              <Link
                to="/login"
                className="
            text-opacity-90
            group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Login
              </Link>
            ) : (
              <AvatarDropdown />
            )}
          </div>
          <div className="flex items-center space-x-2 lg:hidden">
            {/* <NotifyDropdown /> */}
            {user.current && <AvatarDropdown />}
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
