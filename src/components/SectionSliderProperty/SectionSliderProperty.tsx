import React, { FC, useEffect, useMemo } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { TaxonomyType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import NextPrev from "shared/NextPrev/NextPrev";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import useNcId from "hooks/useNcId";
import { useQuery } from "react-query";
import { PaginationResult } from "types/pagination";
import { Property } from "types/property";
import { getProperty } from "api/property";
import PropertyCard from "components/PropertyCard/PropertyCard";
import CardProperty5 from "components/CardProperty5/CardProperty5";

export interface SectionSliderPropertyProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const SectionSliderProperty: FC<SectionSliderPropertyProps> = ({
  heading = "Heading of sections",
  subHeading = "Descriptions for sections",
  className = "",
  itemClassName = "",
  itemPerRow = 5,
  sliderStyle = "style1",
  uniqueClassName,
}) => {
  const UNIQUE_CLASS =
    "SectionSliderProperty__" + uniqueClassName + useNcId();

    const { data } = useQuery<PaginationResult<Property> | null, Error>(
      'userPropertyFirstPage',
      () => getProperty({ page: 1 })
    );

  useEffect(() => {
    const handleLoad = () => {
      console.log('Load ...')
      new Glide(`.${UNIQUE_CLASS}`, {
        perView: itemPerRow,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: {
            perView: itemPerRow - 1,
          },
          1024: {
            gap: 20,
            perView: itemPerRow - 1,
          },
          768: {
            gap: 20,
            perView: itemPerRow - 2,
          },
          640: {
            gap: 20,
            perView: itemPerRow - 3,
          },
          500: {
            gap: 20,
            perView: 1.3,
          },
        },
      }).mount();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [UNIQUE_CLASS, data]);
    
  return (
    <div className={`nc-SectionSliderProperty ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          isUseBorder
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data?.results.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                 <CardProperty5  property={item} />
              </li>
            ))}
          </ul>
        </div>

        {/* {sliderStyle === "style2" && (
          <NextPrev className="justify-center mt-16" />
        )} */}
      </div>
    </div>
  );
};

export default SectionSliderProperty;
