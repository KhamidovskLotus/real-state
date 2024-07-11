import React, { useMemo, useState } from "react";
import ModalReserveMobile from "./ModalReserveMobile";
import ModalSelectDate from "components/ModalSelectDate";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Property } from "types/property";
import convertNumbThousand from "utils/convertNumbThousand";

interface MobileFooterStickyProps {
  data: Property | undefined | null
}

const MobileFooterSticky = ({data}: MobileFooterStickyProps) => {
  const user = useMemo(() => {
    if(data){
      return (data.agent_assigned ? data.agent_assigned : data.client) as Agent
    }
    return null
  }, [data]);
  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            $ {convertNumbThousand(data?.price)}
            <span className="mb-0.5 ml-2 text-sm font-normal text-neutral-500 dark:text-neutral-400">
            ({data?.area_sqft} M <sup>2</sup>)
          </span>


          </span>
          <div className="text-sm text-neutral-600 dark:text-neutral-500">
            {user?.username}
          </div>
        </div>
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
            >
              +{user?.phone}
            </ButtonPrimary>
      </div>
    </div>
  );
};

export default MobileFooterSticky;
