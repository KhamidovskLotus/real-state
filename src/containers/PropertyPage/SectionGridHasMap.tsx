import AnyReactComponent from 'components/AnyReactComponent/AnyReactComponent';
import Heading2 from 'components/Heading/Heading2';
import NewPropertyCardH from 'components/NewPropertyCardH/NewPropertyCardH';
import GoogleMap from 'google-maps-react-markers'
import React, { Dispatch, FC, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react';
import ButtonClose from 'shared/ButtonClose/ButtonClose';
import { Position } from 'shared/GoogleMapChooser/GoogleMapChooser';
import Pagination from 'shared/Pagination/Pagination';
import { Property, PropertyAvailability } from 'types/property';
import TabFilters from './TabFilters';
import { PaginationResult } from 'types/pagination';
import PropertyTabFilter from './PropertyTabFilter';
import PropertyCard from 'components/PropertyCard/PropertyCard';
import PropertyCardH from 'components/PropertyCardH/PropertyCardH';
import { PiBuildingApartmentFill, PiOfficeChairDuotone } from 'react-icons/pi';
import { IoHome } from 'react-icons/io5';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { FaComputer } from 'react-icons/fa6'
import { Transition } from '@headlessui/react';
import PropertyLoadingCard from 'shared/PropertyLoadingCard/PropertyLoadingCard';

export interface SectionGridHasMapProps {
  data: PaginationResult<Property>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isShow2Change?: boolean;
  onChangeAvailability?: (availability: PropertyAvailability, id: string) => void;
  maxPrice?: number;
  isShowLike? : boolean;
  allData?: Property[];
  isOwner?: boolean;
  isLoading?: boolean;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({ isLoading = false, isOwner, isShowLike,maxPrice, isShow2Change, data, page, setPage, onChangeAvailability, allData = []}) => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const filteredAllData = useMemo(() => {
    const set = new Set();
    for(const p of data.results){
      set.add(p.property_id);
    }
    return allData.filter((data) => !set.has(data.property_id))
  }, [allData, data])


  const getDefaultCenter = (): Position => {
    if (data.results[0]) {
      return {
        lat: parseFloat(data.results[0].latitude),
        lng: parseFloat(data.results[0].longitude),
      };
    }
    return {
      lat: 41.29224834570854,
      lng: 69.25562178581964,
    };
  };

  

  return (
    <div className="">
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          {/* <Heading2 className="pt-12" heading="Where Your Story Begins" /> */}
          <div className="h-4 sm:h-12"></div>
          <div className="mb-8 lg:mb-11">
            <PropertyTabFilter maxPrice={maxPrice}/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {!isLoading && data.results.map((item) => (
              <div
                key={item.property_id}
                onMouseEnter={() => setCurrentHoverID((_) => item.property_id)}
                onMouseLeave={() => setCurrentHoverID((_) => -1)}
              >
                <PropertyCard isOwner={isOwner}  data={item}/>
              </div>
            ))}
            {isLoading && <>
              <PropertyLoadingCard/>
              <PropertyLoadingCard/>
              <PropertyLoadingCard/>
            </>}
          </div>
          {data.results.length > 0 &&
              <div className="flex mt-16 justify-center items-center">
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

        {!showFullMapFixed && (
          <div
            className="flex xl:hidden items-center justify-center fixed bottom-19 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            
          </div>
        )}

        {/* map */}
        <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-16 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-2 left-2 transform py-2 px-4 bg-white dark:bg-neutral-800 shadow-xl z-10 rounded-2xl min-w-max flex flex-col gap-1">
                <div className="flex justify-start items-center gap-2">
                  <div className="bg-green-600 p-1 rounded-full">
                    <IoHome className='size-3 text-white'/>
                  </div>
                  <div className="text-xs mt-[1px]">House</div>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="bg-green-600 p-1 rounded-full">
                  <PiBuildingApartmentFill className='size-3 text-white'/>
                  </div>
                  <div className="text-xs mt-[1px]">
                    Apartment
                  </div>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="bg-green-600 p-1 rounded-full">
                    <FaComputer className='size-3 text-white'/>
                  </div>
                  <div className="text-xs mt-[1px]">Offices</div>
                </div>
            {isShow2Change &&
                <>
                    <div className="mt-3 flex justify-start items-center gap-2">
                      <div className="bg-red-400 size-3"></div>
                      <div className="text-xs mt-[1px]">Available</div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="bg-green-400 size-3"></div>
                      <div className="text-xs mt-[1px]">Rented</div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div className="bg-yellow-400 size-3"></div>
                      <div className="text-xs mt-[1px]">Not for rent</div>
                    </div>
                </>
            }
            </div>
            <GoogleMap
              options={{gestureHandling: 'greedy'}}
              defaultZoom={12}
              defaultCenter={getDefaultCenter()}
              apiKey={process.env.REACT_APP_GOOGLE_MAP_API}
            >
              {/* {!isLoading && filteredAllData.map((item, index) => (
                <PropertyPoint
                isShow2Change={isShow2Change}
                onChangeAvailability={(e) => {
                  onChangeAvailability && onChangeAvailability(e, item.property_id.toString())
                }}
                key={index}
                data={item}
                lat={parseFloat(item.latitude)}
                lng={parseFloat(item.longitude)}
                />
              ))} */}
              {!isLoading && data.results.map((item) => (
                <AnyReactComponent
                  isShow2Change={isShow2Change}
                  onChangeAvailability={(e) => {
                    onChangeAvailability && onChangeAvailability(e, item.property_id.toString())
                  }}
                  isSelected={currentHoverID === item.property_id}
                  key={item.property_id}
                  lat={parseFloat(item.latitude)}
                  lng={parseFloat(item.longitude)}
                  listing={item}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;

function PropertyPoint({lat, lng, data, isShow2Change, onChangeAvailability}: {lat: number, lng: number, data: Property,  isShow2Change?: boolean;
  onChangeAvailability?: (availability: PropertyAvailability) => void}){
  const [isOpen, setIsOpen] = useState(false);
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const parentDiv = e.currentTarget.parentElement;
    if(parentDiv){
      const parentSiblings = parentDiv.parentElement?.children;
      if (parentSiblings) {
        Array.from(parentSiblings).forEach((sibling: any) => {
          sibling.style.zIndex = '0';
        });
      }
      parentDiv.style.zIndex = '10';
    }
    setIsOpen(true);
  }

  return <div 
  onMouseEnter={onMouseEnter}
  onMouseLeave={() => setIsOpen(false)}
  className='cursor-pointer bg-green-500 hover:bg-green-600 transition-all size-3 border border-white rounded-full focus:bg-black'>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute z-50 bottom-full pb-3 -left-12 w-[260px] aspect-w-1">
          
          {/* <PropertyCard
          onChangeAvailability={onChangeAvailability}
          isShow2Change={isShow2Change}
          size="small" data={data} className="shadow-2xl" isOpen={isOpen}/> */}
        </div>
      </Transition>

  </div>
}

