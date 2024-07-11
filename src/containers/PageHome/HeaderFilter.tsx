import { FC, ReactNode, useEffect, useState } from 'react';
import Heading from 'shared/Heading/Heading';

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: ReactNode;
  subHeading?: ReactNode;
  onClickTab: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  subHeading = '',
  heading = '🎈 Latest Articles',
  onClickTab,
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive);

  useEffect(() => {
    setTabActiveState(tabActive);
  }, [tabActive]);

  const handleClickTab = (item: string) => {
    onClickTab && onClickTab(item);
    setTabActiveState(item);
  };

  return (
    <div className="flex flex-col  relative">
      <Heading isUseBorder className='mb-8' desc={subHeading}>{heading}</Heading>
      {/* <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActiveState === item}
              onClick={() => handleClickTab(item)}
            >
              {item}
            </NavItem>
          ))}
        </Nav>
        <span className="hidden sm:block flex-shrink-0">
          <ButtonSecondary className="!leading-none">
            <span>View all</span>
            <i className="ml-3 las la-arrow-right text-xl"></i>
          </ButtonSecondary>
        </span>
      </div> */}
    </div>
  );
};

export default HeaderFilter;
