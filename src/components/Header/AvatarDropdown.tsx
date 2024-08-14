import { Popover, Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  UserCircleIcon,
  AcademicCapIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { Fragment } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'shared/Avatar/Avatar';
import { resetSaveList } from 'states/saveListSlice';
import { StoreState } from 'states/store';
import { removeCurrentUser } from 'states/userSlice';
import { LogoutPayload } from 'types/payload/logout';
import { toastSuccess } from 'utils/toast';

export const solutions = [
  {
    name: 'Account',
    href: '/account',
    icon: UserCircleIcon,
  },
  // {
  //   name: 'Saved Listings',
  //   href: '/my-inquiries',
  //   icon: ChatBubbleBottomCenterTextIcon,
  // },
  {
    name: 'Portofolio Map',
    href: '/portofolio',
    icon: MapIcon,
  },
  {
    name: 'My Properties',
    href: '/my-property',
    icon: HomeIcon,
  },
];
const solutionsFoot = [
  {
    name: 'Logout',
    icon: ArrowRightOnRectangleIcon,
  },
];

export default function AvatarDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: StoreState) => store.user);
  const { mutate } = useMutation<any, Error, LogoutPayload>({
    mutationFn: async (payload) =>
      api.mutateBackend(endpoints.auth.logout, payload, undefined, false),
    onMutate: (response) => {
      dispatch(resetSaveList({}))
      dispatch(removeCurrentUser({}));
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

  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-4 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutions.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot.map((item, index) => (
                      <LinkOrDiv
                        onClick={() => {
                          if (item.name === 'Logout') handleOnLogout();
                        }}
                        key={index}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </LinkOrDiv>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
interface LinkOrDivProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className: string;
}

function LinkOrDiv({ onClick, children, href, className }: LinkOrDivProps) {
  if (href) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <div onClick={onClick} className={className + ' cursor-pointer'}>
      {children}
    </div>
  );
}
