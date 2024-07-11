import { getAllProperty, getProperty } from 'api/property';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { FC, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { PaginationResult } from 'types/pagination';
import { Property } from 'types/property';
import SectionGridHasMap from './SectionGridHasMap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'states/store';
import { debounce } from 'lodash';
import { setPropertyFilter } from 'states/propertyFilterSlice';

export interface ListingStayMapPageProps {
  className?: string;
}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filter = useSelector((store: StoreState) => store.property.filter)
  const getPropertyForFilter  = () => {
    const {pathname} = window.location;
    if (pathname.includes('buy')) {
      return 'sell';
    }
    if(pathname.includes('rent')) {
      return 'rent';
    }
    return '';
  }

  const getMaxPrice = () => {
    if(window.location.pathname.includes('rent')) {
      return 100000
    }
    return 25000000
  }

  const location = useLocation();

  const [page, setPage] = useState<number>(1);
  const { data: dataAll, refetch: refetchAll } = useQuery<Property[], Error>(
    'propertyAll',
    () => getAllProperty({...filter, property_for: getPropertyForFilter()})
  );

  const { data , refetch } = useQuery<PaginationResult<Property> | null, Error>(
    'propertyTest',
    async () => {
      const res =  await getProperty({...filter, page, property_for: getPropertyForFilter()})
      setIsLoading(false);
      return res;
    },
  );

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
      refetchAll()
    }, 300),
    [refetch, refetchAll]
  );

  useEffect(() => {
    setIsLoading(true);
    debouncedRefetch();
    return () => {
      debouncedRefetch.cancel();
    };
  }, [filter, debouncedRefetch]);

  const dispatch = useDispatch();

  useEffect(() => {
    const newFilter = {...filter}
    newFilter.to_price = getMaxPrice();
    dispatch(setPropertyFilter(newFilter))
    setPage(1);
    setIsLoading(true);
  }, [location])

  useEffect(() => {
    window.scrollTo(0, 0)    
    refetch();
    setIsLoading(true);
  }, [page])

  if (!data) {
    return <></>;
  }
  

  return (
    <div
      className={`nc-ListingStayMapPage relative ${className}`}
      data-nc-id="ListingStayMapPage"
    >
    
      <BgGlassmorphism />

      {/* SECTION HERO */}
      {/* <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage currentPage="Stays" currentTab="Stays" />
      </div> */}

      {/* SECTION */}
      <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap isLoading={isLoading} page={page} setPage={setPage}  allData={dataAll} data={data} maxPrice={getMaxPrice()} />
      </div>

      <div className="container overflow-hidden">
        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingStayMapPage"
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}

        {/* SECTION */}
        {/* <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
      </div>
    </div>
  );
};

export default ListingStayMapPage;
