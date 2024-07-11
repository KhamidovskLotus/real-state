import BtnLikeIcon from 'components/BtnLikeIcon/BtnLikeIcon';
import GallerySlider from 'components/GallerySlider/GallerySlider';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'shared/Badge/Badge';
import { Property } from 'types/property';

export interface NewProperyCardProps {
  className?: string;
  data: Property;
  isShowLike? : boolean
}

const NewPropertyCardH: FC<NewProperyCardProps> = ({
  className = '',
  data,
  isShowLike = true,
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full">
        <GallerySlider
          ratioClass="aspect-w-6 aspect-h-4"
          galleryImgs={data?.images.map((image) => image.image)}
          uniqueID={`NewPropertyCardH_${data?.property_id}`}
          href={`/property/${data.property_id}`}
        />
        {isShowLike &&
          <BtnLikeIcon isLiked={false} className="absolute right-3 top-3" />
        }
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <>
         <div className="flex text-green-500 dark:text-green-400 font-semibold items-center ">
            <i className="las la-dollar-sign text-lg"></i>
            <span className="text-md mt-0.5">
              {data.price}
            </span>
          </div>

      <div className="grid grid-cols-4 gap-2">
          <div className="flex items-center gap-1 overflow-hidden">
            <i className="las la-bath text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data.bathrooms}
            </span>
          </div>
          <div className="flex items-center gap-1 overflow-hidden">
            <i className="las la-bed text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data.bedrooms}
            </span>
          </div>
          
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
              {data.area_sqft} 
              <span className='text-[12px]'>
                sqm
              </span>
            </span>
        </div>
        <div className="flex items-center gap-1 overflow-hidden">
          <i className="las la-compass text-lg"></i>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {data.built_year}
          </span>
        </div>
      </div>
      </>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 flex flex-col">
        <div className="">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              {data.state} · {data.city}
            </span>
          </div>
          <div className="flex items-center">
            <h2 className="text-md font-medium capitalize">
              <span className="line-clamp-1 truncate">{data.property_type} - {data.property_title}</span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block my-1 w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        {renderTienIch()}
        {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        {/* <div className="flex justify-between items-end">
          <div className="text-base font-semibold center text-neutral-600">
            {data.total_views}
            <span className="ml-1 text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              views
            </span>
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <div
      className={`nc-NewPropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="NewPropertyCardH"
    >
      <Link to={''} className="absolute inset-0"></Link>
      <div className="grid grid-cols-1">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default NewPropertyCardH;
