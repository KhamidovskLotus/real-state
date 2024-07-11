import GallerySlider from 'components/GallerySlider/GallerySlider';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'shared/Badge/Badge';
import { Property } from 'types/property';

export interface PropertyCardHProps {
  className?: string;
  data: Property;
}

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = '',
  data,
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full md:w-72 ">
        <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={data?.images.map((image) => image.image)}
          uniqueID={`PropertyCardH_${data?.property_id}`}
          href={''}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" /> */}
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="hidden sm:grid grid-cols-3 gap-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-bath text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data.bathrooms} baths
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-bed text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data.bedrooms} beds
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-home text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {data.area_sqft} sqm
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              {data.state} · {data.city}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge name="SALE" color="green" />
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{data.property_type}</span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-2.5"></div>
        {renderTienIch()}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-2.5"></div>
        <div className="flex justify-between items-end">
          {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
          <div className="flex text-green-500 dark:text-green-400 font-semibold items-center ">
            <i className="las la-dollar-sign text-lg"></i>
            <span className="text-md mt-0.5">
              {data.price}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="PropertyCardH"
    >
      <Link to={''} className="absolute inset-0"></Link>
      <div className="grid grid-cols-1 md:flex md:flex-row ">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default PropertyCardH;
