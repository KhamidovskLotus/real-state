import { Popover, Transition } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const LANGUAGE_LIST = [
  {
    id: 'en',
    name: 'English',
    description: 'United State',
  },
  {
    id: 'ru',
    name: 'Russian',
    description: 'Russia',
  },
  {
    id: 'uz',
    name: 'Uzbek',
    description: 'Uzbekistan',
  },
];

interface LangDropdownProps {
  panelClassName?: string;
}
function setCookie(name: string, value: string, path: string, domain?: string): void {
  const domainString = (typeof domain === "undefined") ? "" : "; domain=" + domain;
  document.cookie = `${name}=${value};path=${path}${domainString}`;
}
function removeCookie(name: string, path: string, domain?: string): void {
  const domainString = domain ? `; domain=${domain}` : "";
  document.cookie = `${name}=; path=${path}${domainString}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function getCookie(name: string): string {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
      }
  }

  return "";
}

const LangDropdown: FC<LangDropdownProps> = ({
  panelClassName = 'z-10 w-screen max-w-[280px] px-4 mt-4 right-0 sm:px-0',
}) => {
  // const { i18n } = useTranslation();
  var transCookie = useMemo(() => {
    const cookie =  getCookie('googtrans');
    if(!cookie){
      setCookie("googtrans", `/es/uz`, "/", ".my-lotus.com");
      setCookie("googtrans", `/es/uz`, "/");
      window.location.reload();
    }
    return cookie;
  }, []);

  return (
    <div className="LangDropdown">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-80'}
             group px-3 py-1.5 border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <GlobeAltIcon className="w-[18px] h-[18px] opacity-80" />

              <span className="ml-2 select-none">Language</span>
              <ChevronDownIcon
                className={`${open ? '-rotate-180' : 'text-opacity-70'}
                  ml-2 h-4 w-4  group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
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
              <Popover.Panel className={`absolute ${panelClassName}`}>
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 lg:grid-cols-2">
                    {LANGUAGE_LIST.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setCookie("googtrans", `/es/${item.id}`, "/", ".my-lotus.com");
                          setCookie("googtrans", `/es/${item.id}`, "/");
                          //important
                          window.location.reload()
                          // i18n.changeLanguage(item.id);
                        }}
                        className={`cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 ${
                          transCookie.includes(item.id)
                            ? 'bg-gray-100 dark:bg-neutral-700'
                            : 'opacity-80'
                        }`}
                      >
                        <div className="">
                          <p className="text-sm font-medium ">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-neutral-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
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
};
export default LangDropdown;
