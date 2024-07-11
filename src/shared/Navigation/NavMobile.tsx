import React, { useMemo } from 'react';
import ButtonClose from 'shared/ButtonClose/ButtonClose';
import Logo from 'shared/Logo/Logo';
import { Disclosure } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavItemType } from './NavigationItem';
import { MOBILE_SIDEBAR_NAVIGATION_LOTUS, NAVIGATION_DEMO, NAVIGATION_LOTUS } from 'data/navigation';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import SocialsList from 'shared/SocialsList/SocialsList';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import SwitchDarkMode from 'shared/SwitchDarkMode/SwitchDarkMode';
import LangDropdown from 'components/Header/LangDropdown';
import { solutions } from 'components/Header/AvatarDropdown';
import ncNanoId from 'utils/ncNanoId';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import api from 'api/api';
import { useMutation } from 'react-query';
import endpoints from 'api/endpoint';
import { removeCurrentUser } from 'states/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutPayload } from 'types/payload/logout';
import { toastSuccess } from 'utils/toast';
import { StoreState } from 'states/store';
import { resetSaveList } from 'states/saveListSlice';

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = MOBILE_SIDEBAR_NAVIGATION_LOTUS,
  onClickClose,
}) => {
  const user = useSelector((store: StoreState) => store.user)
  const addedData = data = useMemo(() => {
    if(user){
        for(const s of solutions) {
          const newData = [...data];
          newData[newData.length - 1].children?.push({
          href: s.href,
          name: s.name,
          id: ncNanoId()
        })
      }
    }
    return data;
  }, [data, solutions, user])

  const dispatch = useDispatch();
  const navigate =useNavigate();
  
  const { mutate } = useMutation<any, Error, LogoutPayload>({
    mutationFn: async (payload) =>
      api.mutateBackend(endpoints.auth.logout, payload, undefined, false),
    onMutate: (response) => {
      dispatch(removeCurrentUser({}));
      dispatch(resetSaveList({}))
      navigate('/login');
      toastSuccess('Succesfully logged out');
    },
  });

  const handleOnLogout = () => {
    if (user && user.token) {
      const { refresh } = user.token;
      mutate({ refresh_token: refresh });
    }
  };


  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              end
              to={{
                pathname: i.href || undefined,
              }}
              className={({ isActive }) =>
                `flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 ${
                  isActive ? 'text-secondary' : ''
                }`
              }
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </NavLink>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? 'text-secondary' : ''
            }`
          }
          to={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          {/* <span>
            Discover the most outstanding real estate on all life. Tell about
            your properties and share them
          </span> */}

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span> 
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {addedData.map(_renderItem)}
      </ul>
      <div className="flex items-center justify-between py-6 px-5">
        <LangDropdown panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 left-2 bottom-full sm:px-0" />
        {user.current &&
          <ButtonSecondary onClick={handleOnLogout}>Logout</ButtonSecondary>
        }
      </div>
    </div>
  );
};

export default NavMobile;
