import api from 'api/api';
import endpoints from 'api/endpoint';
import { getProperty } from 'api/property';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import DeleteModal from 'components/DeleteModal/DeleteModal';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Modal from 'shared/Modal/Modal';
import { StoreState } from 'states/store';
import { PaginationResult } from 'types/pagination';
import { UpdatePropertyAvailabilityPayload } from 'types/payload/update-property-availability';
import { Property } from 'types/property';
import { toastSuccess } from 'utils/toast';
import PropertySection from './PropertySection';
import Loader from 'components/Loader/Loader';
import { LoadingScreen } from 'containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage';

export default function ManagePropertyPage() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, refetch } = useQuery<PaginationResult<Property> | null, Error>(
    'userProperty',
     async () => getProperty({ page }, true),
     {  
      onSuccess: () => {
        setIsLoading(false);
      }
     }
  );
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const { mutate: mutateDelete } = useMutation({
    mutationFn: async () =>
      api.mutateBackend(endpoints.property.delete, {}, selected),
    onSuccess: (response) => {
      toastSuccess('Successfully delete property!');
      refetch();
    },
    onSettled: () => {
      setOpenDeleteModal(false);
      setSelected('');
    },
  });
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
      if (response) {
        toastSuccess('Succesfully changing property availability!');
      }
    },
  });
  useEffect(() => {
    refetch();
    setIsLoading(true)
  }, [page]);

  if (!data || isLoading) {
    return (
    <div className='sm:px-24 px-4 sm:py-20 py-10 bg-slate-100'>
    <div className='w-full h-[100px] bg-slate-200 dark:bg-slate-400 animate-pulse sm:py-12'></div>
    <div className="flex sm:flex-row flex-col gap-2 py-2">
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
    </div>
    <div className="flex sm:flex-row flex-col gap-2 py-2">
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
    </div>
    </div>
    );
  }
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden`}
      data-nc-id="ListingStayPage"
    >
      <Modal open={openDeleteModal} setOpen={setOpenDeleteModal}>
        <DeleteModal
          name="Property"
          callback={() => mutateDelete()}
          onClose={() => setOpenDeleteModal(false)}
        />
      </Modal>
    
      <BgGlassmorphism />
      <div className="container min-h-[70vh] relative overflow-hidden">
        <PropertySection
          page={page}
          setPage={setPage}
          handleDelete={(e) => {
            setSelected(e);
            setOpenDeleteModal(true);
          }}
          onChangeAvailability={(id, payload) =>
            mutateChangeAvailability({ id, property_availability: payload })
          }
          isOwner={true}
          data={data}
          className="pt-5 sm:pt-24 pb-24 lg:pb-28"
        />
      </div>
    </div>
  );
}
