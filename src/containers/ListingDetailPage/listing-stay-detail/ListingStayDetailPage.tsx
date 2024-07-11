import { Dialog, Transition } from '@headlessui/react';
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { getPropertyById } from 'api/property';
import CommentListing from 'components/CommentListing/CommentListing';
import FiveStartIconForRate from 'components/FiveStartIconForRate/FiveStartIconForRate';
import LikeSaveBtns from 'components/LikeSaveBtns';
import ListingImageGallery from 'components/ListingImageGallery/ListingImageGallery';
import StartRating from 'components/StartRating/StartRating';
import { AMENITIES_ICONS } from 'data/amenities';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Avatar, { DEFAULT_IMAGE } from 'shared/Avatar/Avatar';
import Badge from 'shared/Badge/Badge';
import ButtonCircle from 'shared/Button/ButtonCircle';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import ButtonClose from 'shared/ButtonClose/ButtonClose';
import Input from 'shared/Input/Input';
import Textarea from 'shared/Textarea/Textarea';
import { AddInquiriesPayload } from 'types/payload/add-inquiries';
import { Property } from 'types/property';
import { toastSuccess } from 'utils/toast';
import DetailPagetLayout from '../Layout';
import StayDatesRangeInput from './StayDatesRangeInput';
import GuestsInput from './GuestsInput';
import convertNumbThousand from 'utils/convertNumbThousand';
import { toTitleCase } from 'utils/strUtil';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'states/store';
import { addSaveList, removeSaveList } from 'states/saveListSlice';

const StayDetailPageContainer: FC<{}> = () => {
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const [isOpenModalImage, setIsOpenModalImage] = useState<boolean>(false);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, refetch } = useQuery('propertyDetail', () => getPropertyById(id!), {
    enabled: false,
    onSuccess: () => {
      setIsLoading(false);
    }
  });
  const saveListData = useSelector((store: StoreState) => store.saveList.datas);
  const [isRenderMap, setIsRenderMap] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    refetch()
  }, [id])

  useEffect(() => {
    window.setTimeout(() => {
      setIsRenderMap(true);
    }, 500)
  }, [])

  const agent =
    data && typeof data.agent_assigned !== 'string'
      ? data?.agent_assigned
      : null;

  

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    setIsOpenModalImage(true);
  };
  const user = useMemo(() => {
    let user = undefined;
    if(data){
      user = data.agent_assigned ? data.agent_assigned : data.client
      if(data?.agent_assigned && typeof user !== 'number' && typeof user !== 'string'){
        user.role = 'Agent'
      }
    }
    return user;
  }, [data]);

  if (!data || isLoading) {
    return <LoadingScreen></LoadingScreen>;
  }

  if(!user || typeof user === 'number' || typeof user === 'string') {
    return <LoadingScreen></LoadingScreen>
  }
  const amenities = data.amenities.split(',');
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name={data?.property_type} />
          <LikeSaveBtns
          onClickLike={() => {
            if(saveListData.has(data.property_id)){
              dispatch(removeSaveList(data))
            } else{
              dispatch(addSaveList(data))
            }
          }}
          isLiked={saveListData.has(data.property_id)}
          onClickShare={() => {
            navigator.clipboard.writeText(`Check this Property "${data.property_title}" on ${window.location.href}`);
            toastSuccess('Link copied to your clipboard!')
          }} />
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-0.25">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {data.property_title} - ${data.price}
          </h2>
          {/* <div className="flex items-center">
            <i className='las la-user text-2xl'></i>
            <p className='mt-[0.125rem]'>+{user.phone}</p>
          </div> */}
        </div>
        {/* 3 */}
        <div className="text-neutral-500 dark:text-neutral-400">
          {data.property_address}
        </div>
        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
              {' '}
              {data.country}, {data.city}
            </span>
          </span>
        </div>
        <div className="flex items-center">
          <Avatar imgUrl={user.user_profile ? user.user_profile : DEFAULT_IMAGE}  hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by
            <span className="ml-1 text-neutral-900 dark:text-neutral-200 font-medium">
              {user.username}
              <Badge className='ml-3' color='green' name={toTitleCase(user.role)}></Badge>
            </span>
          </span>
        </div>
        <ButtonPrimary className='sm:hidden block mb-5'>
          +{user.phone}
        </ButtonPrimary>
        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
        {/* 6 */}
        <div className="ml-1 flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center space-x-3 ">
              <i className=" las la-door-open text-2xl "></i>
              <span className="">{data.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-3 ">
              <i className=" las la-bath text-2xl "></i>
              <span className="">{data.bathrooms}</span>
            </div>
            <div className="items-center space-x-3 flex sm:hidden">
              <span className="">{data.area_sqft} M <sup>2</sup></span>
            </div>
            <div className="flex items-center space-x-3 ">
              <i className=" las la-compass text-2xl "></i>
              <span className="">{data.built_year}</span>
            </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Description</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>{data.description}</span>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {amenities
            .filter((val, i) => i < 6)
            .map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <i className={`text-3xl la ${AMENITIES_ICONS[item]}`}></i>
                <span className=" ">{item}</span>
              </div>
            ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more {amenities.length} amenities
          </ButtonSecondary>
        </div>
        {renderMotalAmenities()}
      </div>
    );
  };

  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {amenities
                      .filter((_, i) => i < 1212)
                      .map((item) => (
                        <div
                          key={item}
                          className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                        >
                          <i
                            className={`text-4xl text-neutral-6000 las ${AMENITIES_ICONS[item]}`}
                          ></i>
                          <span>{item}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4  flex justify-between items-center space-x-4 rounded-lg">
              <span>Monday - Thursday</span>
              <span>$199</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Friday - Sunday</span>
              <span>$219</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Rent by month</span>
              <span>-8.34 %</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Agent Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {agent?.username}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              {/* <StartRating /> */}
              {/* <span className="mx-2">·</span> */}
              <span>Agent</span>
            </div>
          </div>
        </div>

        {/* desc */}
        {/* <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span> */}

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2024</span>
          </div>
          {/* <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div> */}
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>{agent?.username}</span>
          </div>
        </div>

        {/* == */}
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div> */}
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        {/* <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2> */}
        {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block smt-2 text-neutral-500 dark:text-neutral-400">
            {data.country}, {data.city} · {data.state}
            {/* San Diego, CA, United States of America (SAN-San Diego Intl.) */}
          </span>
          <p className='text-neutral-500 dark:text-neutral-400'>{data.property_address}</p>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              title="x"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_API}&q=${data.latitude},${data.longitude}&zoom=10`}
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Check-in</span>
              <span>08:00 am - 12:00 am</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Check-out</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>
                Ban and I will work together to keep the landscape and
                environment green and clean by not littering, not using
                stimulants and respecting people around.
              </li>
              <li>Do not sing karaoke past 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      <ListingImageGallery
        images={
          data
            ? data.images.map((image, index) => ({
                id: index,
                url: image.image,
              }))
            : []
        }
        isShowModal={isOpenModalImage}
        onClose={() => setIsOpenModalImage(false)}
      />

      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className={`${data.images.length === 1 && 'min-h-[400px]'} relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2`}>
          <div
            className=" col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
            onClick={handleOpenModalImageGallery}
          >
            <img
              className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
              src={data.images[0].image}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {data.images
            .filter((_, i) => i >= 1 && i < 5)
            .map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? 'hidden sm:block' : ''
                }`}
              >
                <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                  <img
                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                    src={item.image || ''}
                    alt=""
                    sizes="400px"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-8 sm:mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {isRenderMap && renderSection7()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">
            <Sidebar data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default function ListingStayDetailPage() {
  return (
    <DetailPagetLayout>
      <StayDetailPageContainer />
    </DetailPagetLayout>
  );
}

interface SidebarProps {
  data?: Property;
}

function Sidebar({ data }: SidebarProps) {
  const [clickedReserve, setClickedReserve] = useState<boolean>(false);
  if(!data) return <></>
  const user = data.agent_assigned ? data.agent_assigned : data.client;
  if(!user || typeof user === 'string' || typeof user === 'number') return <></>
  return (
    <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            $ {convertNumbThousand(data.price)}
            {/* <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span> */}
          </span>
          {/* <StartRating /> */}
        </div>

        {/* FORM */}
        {/* <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl "> */}
          {/* <StayDatesRangeInput className="flex-1 z-[11]" /> */}
          {/* <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div> */}
          {/* <GuestsInput className="flex-1" /> */}
        {/* </form> */}

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Area m<sup>2</sup></span>
            <span>{data.area_sqft} m<sup>2</sup></span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Price per m<sup>2</sup></span>
            <span>$ {convertNumbThousand(data.price  / data.area_sqft)}</span>
          </div>
          {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Telephone</span>
            <span>{user.phone}</span>
          </div> */}
          {/* <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Email</span>
            <span>{user.email}</span>
          </div> */}
          {/* <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Telephone</span>
            <span>{getPhone(user)}</span>
          </div> */}
        </div>
        <ButtonPrimary onClick={() => {
          setClickedReserve(true)
        }}>{`+${user.phone}`}</ButtonPrimary>
      </div>
  );
}


function LoadingScreen(){
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full h-[200px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
      <div className="w-full h-[400px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
    </div>
  )
}