import Heading2 from 'components/Heading/Heading2';
import PropertyCard from 'components/PropertyCard/PropertyCard';
import { Dispatch, FC, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import Pagination from 'shared/Pagination/Pagination';
import PropertyLoadingCard from 'shared/PropertyLoadingCard/PropertyLoadingCard';
import { StoreState } from 'states/store';
import { PaginationResult } from 'types/pagination';
import { Property, PropertyAvailability } from 'types/property';

export interface Pro {
  className?: string;
  data: PaginationResult<Property>;
  isOwner?: boolean;
  isShowFilterType?: boolean;
  handleDelete?: (propertyId: string) => void;
  onChangeAvailability?: (
    propertyId: string,
    availability: PropertyAvailability
  ) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isShowAddProperty?: boolean;
  heading?: string;
  subheading?: string;
  paginationClassname?: string;
  isLoading?: boolean;
}

const PropertySection: FC<Pro> = ({
  isOwner = false,
  className = '',
  isShowFilterType = true,
  data,
  handleDelete,
  onChangeAvailability,
  page,
  setPage,
  heading = 'View All Your Properties',
  subheading = `${data.count} Results Found`,
  isShowAddProperty = true,
  paginationClassname = '',
  isLoading
}) => {
  const navigate = useNavigate();
  const user = useSelector((store: StoreState) => store.user.current);
  return (
    <div
      className={`nc-PropertySection ${className}`}
      data-nc-id="PropertySection"
    >
      <div className="sm:flex-row flex-col flex gap-0 sm:gap-10  mb-6 sm:mb-0">
        <Heading2
          className='mb-2'
          heading={heading}
          subHeading={subheading}
        />
        {isShowAddProperty &&
          <ButtonSecondary
          onClick={() => navigate('/property/add')}
          className="mt-2 h-fit"
          >
            Add New Property
          </ButtonSecondary>
        }
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.results.map((property, index) => (
          <PropertyCard
            style={{ zIndex: data.results.length - index }}
            onChangeAvailability={(e) =>
              onChangeAvailability &&
              onChangeAvailability(property.property_id.toString(), e)
            }
            isShowChange={user?.role === 'agent'}
            handleDelete={handleDelete}
            isOwner={isOwner}
            key={property.property_id}
            data={property}
          />
        ))}
        {isLoading && <>
              <PropertyLoadingCard/>
              <PropertyLoadingCard/>
              <PropertyLoadingCard/>
            </>}
      </div>
      {data.results.length > 0 &&
        <div className={`${paginationClassname
        } flex mt-16 justify-center items-center`}>
          <Pagination
            currentPage={page}
            onClick={(n) => {
              setPage(n);
            }}
            maxPage={data.total_pages}
            />
        </div>
      }
    </div>
  );
};

export default PropertySection;
