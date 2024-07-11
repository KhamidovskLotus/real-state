import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MobileFooterSticky from './(components)/MobileFooterSticky';
import { imageGallery as listingCarImageGallery } from './listing-car-detail/constant';
import { imageGallery as listingExperienceImageGallery } from './listing-experiences-detail/constant';
import { imageGallery as listingStayImageGallery } from './listing-stay-detail/constant';
import SectionSliderNewCategories from 'components/SectionSliderNewCategories/SectionSliderNewCategories';
import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import SectionSliderProperty from 'components/SectionSliderProperty/SectionSliderProperty';
import { useQuery } from 'react-query';
import { getPropertyById } from 'api/property';

const DetailPagetLayout = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const { data } = useQuery('propertyDetail', () => getPropertyById(id!), {
    enabled: !!id,
  });
  const [isNeedRender, setIsNeedRender] = useState<boolean>(false);

  useEffect(() => {
    window.setTimeout(() => {
      setIsNeedRender(true)
    }, 500)
  }, [])

  return (
    <div className="ListingDetailPage">
      {/* <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      /> */}

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="h-20"></div>
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderProperty
            heading="More Listings You May Like"
            subHeading="Expand your search with these suggested listings"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingDetailPage"
          />
        </div>
        {/* <SectionSubscribe2 className="pt-24 lg:pt-32" /> */}
      </div>

      {/* STICKY FOOTER MOBILE */}
      {/* {isNeedRender &&
        <MobileFooterSticky data={data} />
      } */}
    </div>
  );
};

export default DetailPagetLayout;
