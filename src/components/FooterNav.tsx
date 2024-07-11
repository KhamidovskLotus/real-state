import {isIOS} from 'react-device-detect'
import {
  HeartIcon,
  HomeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { PathName } from "routers/types";
import MenuBar from "shared/MenuBar/MenuBar";
import { StoreState } from "states/store";
import isInViewport from "utils/isInViewport";
import Avatar from 'shared/Avatar/Avatar';

let WIN_PREV_POSITION = window.pageYOffset;

interface NavItem {
  name: string;
  link?: PathName;
  icon: any;
}

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const user = useSelector((store: StoreState) => store.user.current)
  const NAV: NavItem[] = [
    {
      name: "Home",
      link: "/",
      icon: HomeIcon,
    },
    {
      name: "Buy",
      link: "/buy",
      icon: MagnifyingGlassIcon,
    },
    {
      name: "New",
      link: "/sell",
      icon: PlusIcon,
    },
    {
      name:  "Rent",
      link:   "/rent",
      icon: CalendarDaysIcon,
    },
    {
      link: !user ? "/login" : undefined,
      name: !user ? "Log in" : "Profile",
      icon: !user ? UserCircleIcon :  MenuBar,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    // window.addEventListener("scroll", handleEvent);
  }, []);


  // const showHideHeaderMenu = () => {
  //   let currentScrollPos = window.pageYOffset;
  //   if (!containerRef.current) return;

  //   // SHOW _ HIDE MAIN MENU
  //   if (currentScrollPos > WIN_PREV_POSITION) {
  //     if (
  //       isInViewport(containerRef.current) &&
  //       currentScrollPos - WIN_PREV_POSITION < 80
  //     ) {
  //       return;
  //     }

  //     containerRef.current.classList.add("FooterNav--hide");
  //   } else {
  //     if (
  //       !isInViewport(containerRef.current) &&
  //       WIN_PREV_POSITION - currentScrollPos < 80
  //     ) {
  //       return;
  //     }
  //     containerRef.current.classList.remove("FooterNav--hide");
  //   }

  //   WIN_PREV_POSITION = currentScrollPos;
  // };

  return (
    <div
      ref={containerRef}
      className={`md:hidden block FooterNav bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
      transition-transform duration-300 ease-in-out ${isIOS ? 'pb-6' : 'pb-2'}`}
    >
      <div className="w-full max-w-lg flex  mx-auto text-sm text-center ">
        {/* MENU */}
        {NAV.map((item, index) => {
          const active = location.pathname === item.link;
          return item.link ? (
            <Link
              key={index}
              to={item.link}
              className={`flex flex-col pt-2 w-full items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? "  dark:text-neutral-100" : ""
              }`}
            >
              <item.icon
              className={`w-6 h-6 ${active ? "text-red-500" : ""}`}
              />
              <span className={`text-[11px] ${active ? 'text-red-600 dark:text-red-400' : ''} leading-none mt-1`}>{item.name}</span>
            </Link>
          ) : (
            <div
              key={index}
              className={`w-full pt-2 flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? "text-neutral-900 dark:text-neutral-100" : ""
              }`}
            >
              <item.icon iconClassName="w-6 h-6" className={``} />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterNav;
