import { getProperty } from 'api/property';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { debounce } from 'lodash';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { StoreState } from 'states/store';
import { PaginationResult } from 'types/pagination';
import { Property } from 'types/property';
import SectionGridFilterCard from './SectionGridFilterCard';
import useParameter from 'hooks/useParameter';
import { TOP_AMENITIES_LIST } from 'data/amenities';

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = '' }) => {
  const filter = useSelector(
    (selector: StoreState) => selector.property.filter
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const parameter  = useParameter();
  const amenities = useMemo(() => {
      let amenities = parameter.get('amenities')
      if(!amenities){
        const arr = window.location.pathname.split('/')
        const last = arr[arr.length - 1];
        if(TOP_AMENITIES_LIST.find((v) => v.toLowerCase() === last)){
          amenities = last;
        }
      }
      if(amenities){
        amenities = amenities.charAt(0).toUpperCase() + amenities.slice(1);
      }
      return amenities;
  }, [parameter])

  const { data, refetch } = useQuery<PaginationResult<Property> | null, Error>(
    'property',
    () => {
      return getProperty(amenities ? { amenities , ...filter} : filter )
    },
     {
      onSuccess: () => {
        setIsLoading(false);
      }
     }
  );

  useEffect(() => {
      refetch();
      setIsLoading(true);
  }, [amenities]  )

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    [refetch]
  );

  useEffect(() => {
    setIsLoading(true);
    debouncedRefetch();
    return () => {
      debouncedRefetch.cancel();
    };
  }, [filter, debouncedRefetch]);

  return (
    <div
      className={`nc-ListingStayPage min-h-[70vh] relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
  
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO */}
        {/* <SectionHeroArchivePage
          currentPage="Stays"
          currentTab="Stays"
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        /> */}
        {/* SECTION */}
        <SectionGridFilterCard
        isLoading={isLoading}
        isShowPropertyTypeFilter={amenities === undefined}
        heading={amenities ? `Browse ${amenities}` : undefined}
        data={data} className="pt-4 sm:pt-24 pb-24 lg:pb-28" />
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

export default ListingStayPage;
