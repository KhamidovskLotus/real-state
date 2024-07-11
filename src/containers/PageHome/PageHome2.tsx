import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import SectionGridAuthorBox from 'components/SectionGridAuthorBox/SectionGridAuthorBox';
import SectionHero2 from 'components/SectionHero2/SectionHero2';
import SectionHowItWork from 'components/SectionHowItWork/SectionHowItWork';
import SectionSliderNewCategories from 'components/SectionSliderNewCategories/SectionSliderNewCategories';
import { TaxonomyType } from 'data/types';
import { useEffect } from 'react';
import HIW1imgDark from 'images/HIW2-1-dark.png';
import HIW1img from 'images/HIW2-1.png';
import HIW2imgDark from 'images/HIW2-2-dark.png';
import HIW2img from 'images/HIW2-2.png';
import HIW3imgDark from 'images/HIW2-3-dark.png';
import HIW3img from 'images/HIW2-3.png';

import SectionGridFeatureProperty from './SectionGridFeatureProperty';
import SectionDowloadApp from './SectionDowloadApp';
import SectionBlock from './SectionBlock';
import { useQuery } from 'react-query';
import { PaginationResult } from 'types/pagination';
import { Property } from 'types/property';
import { getProperty } from 'api/property';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { Tree } from 'types/tree';

function PageHome2() {
  const { data: dachaData  } = useQuery<PaginationResult<Property> | null, Error>(
    'dachaProperty',
    () => getProperty({ page: 1, amenities: 'Dacha' })
  );
  
  const { data: millionareData  } = useQuery<PaginationResult<Property> | null, Error>(
    'millionareProperty',
    () => getProperty({ page: 1, amenities: 'Millionare' })
  );

  const { data: treeData  } = useQuery<Tree | null, Error>(
    'treeData',
    () =>  api.getBackend<Tree>(endpoints.other.treeCounter)
  );
  
  const { data: ecofriendlyData  } = useQuery<PaginationResult<Property> | null, Error>(
    'ecoFriendlyProperty',
    () => getProperty({ page: 1, amenities: 'Eco-friendly' })
  );
  
  const { data: sportData  } = useQuery<PaginationResult<Property> | null, Error>(
    'sportProperty',
    () => getProperty({ page: 1, amenities: 'Sport' })
  );

  const { data: allData } = useQuery<PaginationResult<Property> | null, Error>(
    'allProperty',
    () => getProperty({ page: 1 })
  );
  
  
  const DATA: TaxonomyType[] = [
    // {
    //   id: '1',
    //   href: '/dacha',
    //   name: 'Dacha',
    //   taxonomy: 'category',
    //   count: dachaData?.count,
    //   thumbnail:
    //     '/dacha.png',
    // },
    {
      id: '222',
      href: '/sport',
      name: 'Sport',
      taxonomy: 'category',
      count: sportData?.count,
      thumbnail:
      '/property-2.webp',
    },
    {
      id: '3',
      href: '/eco-friendly',
      name: "Eco Friendly",
      taxonomy: 'category',
      count: ecofriendlyData?.count,
      thumbnail:
      '/property-3.jpg',
    },
    {
      id: '4',
      href: '/millionare',
      name: 'Millionare Life',
      taxonomy: 'category',
      count: millionareData?.count,
      thumbnail:
      '/millionare.jpg',
    }
  ]

  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      {/* <BgGlassmorphism /> */}
      <div className="container relative mb-24 sm:space-y-28 sm:mb-28">
        <SectionHero2 className="sm:block hidden" />
        
        <SectionSliderNewCategories
          className='sm:block hidden'
          categories={DATA}  
          categoryCardType="card4"
          itemPerRow={4}
          heading="Find Your Perfect Vibe"
          subHeading="Browse properties that match your passion and lifestyle"
          uniqueClassName="PageHome2_s1"
        />

        <div className="relative py-6 sm:py-16">
          <BackgroundSection />
          <SectionGridFeatureProperty />
        </div>

        {/* <SectionDowloadApp /> */}


        {/* SECTION2 */}
        {/* <SectionOurFeatures type="type2" rightImg={rightImgPng} /> */}

        {/* SECTION */}

        {/* SECTION 1 */}
  
        {/* SECTION */}

        <div className="relative py-16">
          <BackgroundSection className="bg-neutral-100 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox boxCard="box2" />
        </div>

        {allData && treeData &&
          <SectionBlock treeData={treeData} data={allData}/>
        }

        <SectionHowItWork
          data={[
            {
              id: 1,
              img: HIW1img,
              imgDark: HIW1imgDark,
              title: 'Smart search',
              desc: 'Name the area or type of home you are looking for the search bar. Our platform will find you the perfect match.',
            },
            {
              id: 2,
              img: HIW2img,
              imgDark: HIW2imgDark,
              title: 'Choose property',
              desc: 'From the number of options our platform will provide, you can select any property that you like to explore.',
            },
            {
              id: 3,
              img: HIW3img,
              imgDark: HIW3imgDark,
              title: 'Connect Directly',
              desc: 'Get connected directly to the property owner or agent to close the deal. Find your best property!',
            },
          ]}
        />
        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome2_s2"
        /> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 /> */}
      </div>
    </div>
  );
}

export default PageHome2;
