import { Tab } from '@headlessui/react';
import { getAgentById } from 'api/agent';
import { getPropertyByAgentId } from 'api/property';
import CarCard from 'components/CarCard/CarCard';
import CommentListing from 'components/CommentListing/CommentListing';
import ExperiencesCard from 'components/ExperiencesCard/ExperiencesCard';
import PropertyCard from 'components/PropertyCard/PropertyCard';
import StartRating from 'components/StartRating/StartRating';
import StayCard from 'components/StayCard/StayCard';
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from 'data/listings';
import { FC, Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Avatar from 'shared/Avatar/Avatar';
import Button from 'shared/Button/Button';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import SocialsList from 'shared/SocialsList/SocialsList';

export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = '' }) => {
  let [categories] = useState(['Stays', 'Experiences', 'Car for rent']);

  const { id } = useParams();
  const { data } = useQuery('agentDetail', () => getAgentById(id!), {
    enabled: !!id,
  });
  const [page, setPage] = useState<number>(1);
  const { data: propertyData, refetch: refetchPropertyData, isLoading: propertyDataLoading } = useQuery('propertyAgentDetail', () => getPropertyByAgentId(id!, {page}), {
    enabled: !!id,
  });

  
  useEffect(() => {
    refetchPropertyData();
  }, [page])

  if(!data || !propertyData) { 
    return <></>
  }


  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          imgUrl={data.user_profile ? data.user_profile : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{data?.username}</h2>
          {/* <StartRating className="!text-base" /> */}
        </div>

        {/* ---- */}
        {/* <p className="text-neutral-500 dark:text-neutral-400">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor.
        </p> */}

        {/* ---- */}
        {/* <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        /> */}

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {data?.city}
            </span>
          </div>
          {data.languages?.split(',').map((lang) => 
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-neutral-400"
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
                <span className="text-neutral-6000 dark:text-neutral-300">
                  Speaking {lang} 
                </span>
              </div>
              )}
              <ButtonPrimary className='cursor-default w-full'>+{data.phone}</ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{data.username}'s Properties</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {propertyData.results.map((stay, index) => (
                    <PropertyCard key={index} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  {propertyData.total_pages !== page &&
                    <ButtonSecondary
                    loading={propertyDataLoading}
                    onClick={() => {
                      setPage((prev) => prev + 1)
                    }}>Show me more</ButtonSecondary>
                  }
                </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
   
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {/* {renderSection2()} */}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
