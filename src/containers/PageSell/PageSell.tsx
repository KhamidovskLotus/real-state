import api from 'api/api';
import endpoints from 'api/endpoint';
import { getProperty } from 'api/property';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import DeleteModal from 'components/DeleteModal/DeleteModal';
import PropertySection from 'containers/ManagePropertyPage/PropertySection';
import SectionHero from 'containers/PageAbout/SectionHero';
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
import rightImg from 'images/about-hero-right.png';


export default function PageSell() {
  const [rentPage, setRentPage] = useState<number>(1);
  const [sellPage, setSellPage] = useState<number>(1);
  const { data: sellData, refetch: refetchSale } = useQuery<PaginationResult<Property> | null, Error>(
    'userPropertySell',
    () => getProperty({ page: sellPage, property_for: 'sell' }, true)
  );
  const { data: rentData, refetch: refetchRent } = useQuery<PaginationResult<Property> | null, Error>(
    'userPropertyRent',
    () => getProperty({ page: rentPage , property_for: 'rent'}, true)
  );

  const refetch = () => {
    refetchRent();
    refetchSale();
  }
  const user = useSelector((store: StoreState) => store.user.current);
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
  }, [rentPage, sellPage]);


  if(!user){
    return (

      <div
          className={`nc-PageAbout overflow-hidden relative`}
          data-nc-id="PageAbout"
          >
    
        <BgGlassmorphism />
        <div className="container min-h-[70vh] py-16 lg:py-28 space-y-16 lg:space-y-28">
          <SectionHero
            rightImg={rightImg}
            heading={`Sell your Best Property ✨`}
            btnText="Signup"
            subHeading={'You need to signup, before you can sell your property.'}
            />
        </div>
      </div>
    )
  }
  if (!rentData || !sellData) {
    return <></>;
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
        heading='Your Active Sale Listings'
          page={sellPage}
          setPage={setSellPage}
          handleDelete={(e) => {
            setSelected(e);
            setOpenDeleteModal(true);
          }}
          onChangeAvailability={(id, payload) =>
            mutateChangeAvailability({ id, property_availability: payload })
          }
          isOwner={true}
          data={sellData}
          paginationClassname='mt-2'
          className="pt-16 pb-2"
        />
        <PropertySection
        heading='Your Active Rent Listings'
          page={rentPage}
          setPage={setRentPage}
          handleDelete={(e) => {
            setSelected(e);
            setOpenDeleteModal(true);
          }}
          paginationClassname='mt-2'
          onChangeAvailability={(id, payload) =>
            mutateChangeAvailability({ id, property_availability: payload })
          }
          isOwner={true}
          data={rentData}
          className="pt-14 pb-24 lg:pb-28"
        />
      </div>
    </div>
  );
}
