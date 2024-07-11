import Heading2 from 'components/Heading/Heading2';
import PropertyCard from 'components/PropertyCard/PropertyCard';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'shared/Pagination/Pagination';
import { setPropertyFilter } from 'states/propertyFilterSlice';
import { StoreState } from 'states/store';
import { PaginationResult } from 'types/pagination';
import { Property } from 'types/property';
import PropertyTabFilter from './PropertyTabFilter';
import PropertyLoadingCard from 'shared/PropertyLoadingCard/PropertyLoadingCard';

export interface SectionGridFilterCardProps {
  className?: string;
  data: PaginationResult<Property> | null | undefined;
  heading?: string;
  isShowPropertyTypeFilter?: boolean;
  isLoading?: boolean;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = '',
  data,
  isLoading = false,
  heading = 'Where Your Story Begins',
  isShowPropertyTypeFilter = true
}) => {
  const filter = useSelector((store: StoreState) => store.property.filter);
  const dispatch = useDispatch();
  if (!data) {
    return <></>;
  }
  return (
    <div
      className={`nc-SectionGridFilterCard min-h-[955px] ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        heading={heading}
        subHeading={`${data.count} Results Found`}
      />
      <div className="mb-8 lg:mb-11">
        <PropertyTabFilter isShowFilterType={isShowPropertyTypeFilter} />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data && !isLoading && data.results.map((property) => (
          <PropertyCard key={property.property_id} data={property} />
        ))}
        {isLoading && <>
              <PropertyLoadingCard/>
              <PropertyLoadingCard/>
              <PropertyLoadingCard/>
            </>}
      </div>
      {data && data.results.length > 0 &&
      <div className="flex mt-16 justify-center items-center">
        <Pagination
          currentPage={filter.page ? filter.page : 1}
          onClick={(n) => {
            dispatch(setPropertyFilter({ ...filter, page: n }));
          }}
          maxPage={data.total_pages}
          />
      </div>
        }
    </div>
  );
};

export default SectionGridFilterCard;
