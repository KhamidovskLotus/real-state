import api from 'api/api';
import endpoints from 'api/endpoint';
import { getAllProperty, getProperty, getPropertyById } from 'api/property';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import Loader from 'components/Loader/Loader';
import { AccountLoadingScreen } from 'containers/AccountPage/AccountPage';
import { LoadingScreen } from 'containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage';
import SectionGridHasMap from 'containers/PropertyPage/SectionGridHasMap';
import { debounce } from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { StoreState } from 'states/store';
import { PaginationResult } from 'types/pagination';
import { UpdatePropertyAvailabilityPayload } from 'types/payload/update-property-availability';
import { Property } from 'types/property';
import { toastSuccess } from 'utils/toast';

export interface PortofolioPageProps {
  className?: string;
}

const PortofolioPage: FC<PortofolioPageProps> = ({
  className = '',
}) => {
  const filter = useSelector((store: StoreState) => store.property.filter)
  const [page, setPage] = useState<number>(1); 
  const { data: dataAll } = useQuery<Property[], Error>(
    'userPropertyAll',
    () => getAllProperty({ ...filter, page }, true)
  );
  const { data, refetch } = useQuery<PaginationResult<Property> | null, Error>(
    'userProperty',
    () => getProperty({ ...filter, page }, true)
  );

  const { mutate: mutateChangeAvailability } = useMutation<
    any,
    Error,
    UpdatePropertyAvailabilityPayload & {
      id: string;
    },
    any
  >({
    mutationFn: async (payload) =>
      api.mutateBackend(
        endpoints.agent.updatePropertyAvailability,
        payload,
        payload.id
      ),
    onSuccess: (response) => {
      refetch();
      toastSuccess('Succesfully changing property availability!');
    },
  });

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    [refetch]
  );

  useEffect(() => {
    debouncedRefetch();
    return () => {
      debouncedRefetch.cancel();
    };
  }, [filter, debouncedRefetch]);
  
  useEffect(() => {
    refetch();
    setPage(1);
  }, [filter])

  useEffect(() => {
    refetch();
  }, [page])

  if (!data) {
    return <LoadingScreen></LoadingScreen>;
  }
  
  return (
    <div
      className={`nc-PortofolioPage relative ${className}`}
      data-nc-id="PortofolioPage"
    >
     
      <BgGlassmorphism />
      <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap 
        allData={dataAll}
        isShowLike={false}
        maxPrice={25000000}
        isShow2Change={true}
        onChangeAvailability={(e, id) => {
          mutateChangeAvailability({property_availability: e, id})
        }} page={page} setPage={setPage} data={data} />
      </div>

      <div className="container overflow-hidden">
      </div>
    </div>
  );
};

export default PortofolioPage;
