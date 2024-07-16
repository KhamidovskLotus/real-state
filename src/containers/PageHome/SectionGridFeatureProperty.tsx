import { getProperty } from 'api/property';
import PropertyCard from 'components/PropertyCard/PropertyCard';
import { DEMO_STAY_LISTINGS } from 'data/listings';
import { StayDataType } from 'data/types';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { PaginationResult } from 'types/pagination';
import { Property } from 'types/property';
import HeaderFilter from './HeaderFilter';
import { ShimmerEffect   } from './PageHome2';

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
//
export interface SectionGridFeaturePropertyProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  stayListings = DEMO_DATA,
  gridClass = '',
  heading = 'Feature Your Listing',
  subHeading = 'Get prime visibility and attract more buyers by placing your property at the top',
  headingIsCenter,
  tabs = ['New York', 'Tokyo', 'Paris', 'London'],
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const renderCard = (property: Property, index: number) => {
    return <PropertyCard  key={index} className="h-full" data={property} />;
  };
  const { data,refetch } = useQuery<PaginationResult<Property> | null, Error>(
    'property',
    () => getProperty({}),{
      enabled:false,
      onSuccess: () => {
        setIsLoading(false);
      }
    }
  );


  useEffect(()=>{
    setIsLoading(true)
    refetch()
  },[])


  

  return (
     <div className="nc-SectionGridFeatureProperty relative">
      <div className="sm:block hidden">
        <HeaderFilter
          tabActive={'New York'}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
          onClickTab={() => {}}
          />
      </div>
      {data ? <div
        className={`grid  sm:mx-0 mx-3 gap-6 md:gap-8 grid-cols-1 md:grid-cols-4 ${gridClass}`}
      >
        {data?.results.slice(0, 8).map(renderCard)}
      </div>: <ShimmerEffect  />}
      <Link to="/property" className="flex mt-16 justify-center items-center">
        <ButtonPrimary>More</ButtonPrimary>
      </Link>
    </div>
  );
};

export default SectionGridFeatureProperty;
