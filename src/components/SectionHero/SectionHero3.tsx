import imagePng from 'images/travelhero2.png';
import { FC } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';

export interface SectionHero3Props {
  className?: string;
  onClick?: () => void;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = '', onClick }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[15%] sm:top-[20%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
        <span className="sm:text-sm md:text-lg font-semibold text-neutral-600">
          At LOTUS, we're here to assist you with all your real estate needs.
          Whether you have questions, need support, or want to provide feedback,
          our team is ready to help.
        </span>
        <h2 className="font-bold text-neutral-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
          Contact Us
        </h2>
        <ButtonPrimary
          onClick={() => onClick && onClick()}
          sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
        >
          Contact Now
        </ButtonPrimary>
      </div>
      <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <img
          className="absolute inset-0 object-cover rounded-xl"
          src={imagePng}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default SectionHero3;
