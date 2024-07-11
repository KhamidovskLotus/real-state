import BtnLikeIcon from 'components/BtnLikeIcon/BtnLikeIcon';
import GallerySlider from 'components/GallerySlider/GallerySlider';
import { PROPERTY_AVAILABILITY } from 'data/property';
import { TwMainColor } from 'data/types';
import { toNumber } from 'lodash';
import { CSSProperties, FC } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Badge from 'shared/Badge/Badge';
import Select2 from 'shared/Select2/Select2';
import { addSaveList, removeSaveList } from 'states/saveListSlice';
import { StoreState } from 'states/store';
import { Property, PropertyAvailability } from 'types/property';
import convertNumbThousand from 'utils/convertNumbThousand';
import { stringToSelectOption } from 'utils/selectUtil';
import { extractNumbers } from 'utils/strUtil';

export interface PropertyCardProps {
  size?: 'default' | 'small';
  className?: string;
  style?: CSSProperties;
  data: Property;
  isOwner?: boolean;
  handleDelete?: (propertyId: string) => void;
  onChangeAvailability?: (availability: PropertyAvailability) => void;
  isShowChange?: boolean;
  isShow2Change? : boolean;
}

const PropertyCard: FC<PropertyCardProps> = ({
  isShowChange = false,
  isShow2Change = false,
  style,
  className = '',
  data,
  isOwner = false,
  size = 'default',
  handleDelete,
  onChangeAvailability,
}) => {
  const dispatch = useDispatch();
  const saveListData = useSelector((store: StoreState) => store.saveList.datas)
  const renderSliderGallery = () => {
    return (
      <div className="rounded-t-2xl relative overflow-hidden w-full">
        <GallerySlider
          uniqueID={`PropertyCard_${data.property_id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={data.images.map((image) => image.image)}
          href={'/property/' + data.property_id}
        />
        {isOwner && 
            <div className="absolute top-2 right-2 center gap-2 text-white">
              <div className="cursor-pointer rounded-full transition-all  bg-neutral-800 hover:bg-opacity-60 bg-opacity-30 p-2">
                <GoTrash
                  className="size-[18px]"
                  onClick={() =>
                    handleDelete && handleDelete(data.property_id.toString())
                  }
                />
              </div>
              <Link
                className="cursor-pointer rounded-full transition-all bg-neutral-800 hover:bg-opacity-60 bg-opacity-30 p-2"
                to={`/property/update/${data.property_id}`}
              >
                <FiEdit2 className="size-[18px]" />
              </Link>
          </div>
        }
        {!isOwner &&
          <BtnLikeIcon 
          onChange={(e: boolean) => {
            if(e){
              dispatch(addSaveList(data))
            } else {
              dispatch(removeSaveList(data))
            }
          }} isLiked={saveListData.has(data.property_id)} className="absolute right-3 top-3 z-[1]" />
         }
        {/* {data. && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    const getColor = (): TwMainColor => {
      const propertyType = data.property_type.toString();
      switch (propertyType) {
        case 'rent':
          return 'yellow';
        case 'available':
          return 'green';
        case 'not for rented':
          return 'red';
      }
      return 'green';
    };
    const propertyAvailabilityOptions = stringToSelectOption(
      PROPERTY_AVAILABILITY
    );

    return (
      <div className={size === 'default' ? 'p-4 space-y-3' : 'p-3 space-y-2'}>
        <div className="space-y-2">
          <span className="min-h-[40px] line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
            {data.property_address}
          </span>
          <div className="flex items-center space-x-2">
            <Badge name={data.property_type} color={getColor()} />
            <h2
              className={` font-medium capitalize text-lg`}
            >
              <span className="line-clamp-1">$ {convertNumbThousand(data.price)}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === 'default' && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="line-clamp-1">
              {data.city} - {data.state}
            </span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="grid grid-cols-4 items-center  pt-1 overflow-x-scroll scrollbar-hide">
          <div className="text-sm sm:text-xs font-semibold center dark:text-neutral-400 text-neutral-600">
            {data.bedrooms}
            <span className="ml-1 text-sm sm:text-xs text-neutral-500 dark:text-neutral-400 font-normal">
              <i className='text-[1.1rem] las la-bed'></i>
            </span>
          </div>
          {/* <div className="center w-0.5">·</div> */}
          <div className="text-sm sm:text-xs font-semibold center dark:text-neutral-400 text-neutral-600">
            {data.bathrooms}
            <span className="ml-1 text-sm sm:text-xs text-neutral-500 dark:text-neutral-400 font-normal">
              <i className='text-[1.1rem] las la-bath'></i>
            </span>
          </div>
          {/* <div className="center w-0.5">·</div> */}
          <div className="text-sm sm:text-xs font-semibold center dark:text-neutral-400 text-neutral-600">
            {data.area_sqft}
            <span className="ml-1 text-sm sm:text-xs flex items-center text-neutral-500 dark:text-neutral-400 font-normal">
              M <sup>2</sup>
            </span>
          </div>
          {/* <div className="center w-0.5">·</div> */}
          <div className="text-sm sm:text-xs font-semibold center dark:text-neutral-400 text-neutral-600">
            {data.built_year}
            <span className="ml-1 text-sm sm:text-xs text-neutral-500 dark:text-neutral-400 font-normal">
              <i className='text-[1.1rem] las la-calendar'></i>
            </span>
          </div>
        </div>
        {isShowChange && (
      
          <Select2
            defaultValue={propertyAvailabilityOptions.find(
              (option) => option.value === data.property_availability
            )}
            onChange={(e) =>
              onChangeAvailability &&
              onChangeAvailability(e.value as PropertyAvailability)
            }
            className="mt-1"
            isFirstDefault={false}
            options={propertyAvailabilityOptions}
          ></Select2>
        )}
        {isShow2Change && (
          <>
            <div className='grid grid-cols-2 gap-y-3'>
              {PROPERTY_AVAILABILITY.map((avail)=> 
              <div key={avail} className='flex items-center gap-1'>
                <input
                      onChange={(e) =>
                        {
                          const tabCheckboxs =
                          document.getElementsByClassName(
                            `checkbox_availability_${data.property_id}`
                          ) as HTMLCollectionOf<HTMLInputElement>;
                        for (const tabCheckbox of Array.from(
                          tabCheckboxs
                        )) {
                          if (tabCheckbox.name !== avail) {
                            tabCheckbox.checked = false;
                          }
                        }
                          onChangeAvailability &&
                          onChangeAvailability(avail)
                        }
                    }
                    defaultChecked={data.property_availability === avail}
                    type="checkbox"
                    name={avail}
                    className={`checkbox_availability_${data.property_id} focus:ring-action-primary size-[1rem] text-primary-500 border-slate-400 rounded bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500`}
                  />
                  <div className="text-neutral-500 dark:text-neutral-400 text-xs font-light">{avail}</div>
              </div>
            )}
            </div>
            {/* <div className="mt-1 w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
            <Input sizeClass='h-8 px-4 py-0.5 text-xs' placeholder='Price' type="number" className=''></Input> */}
          </>
        )}
      </div>
    );
  };
  return (
    <div
      style={style}
      className={`relative nc-PropertyCard group  bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="PropertyCard"
    >
      {renderSliderGallery()}
      <div>{renderContent()}</div>
    </div>
  );
};

export default PropertyCard;
