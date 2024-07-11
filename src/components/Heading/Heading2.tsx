import { twMerge } from 'extension/twMerge';
import React, { ReactNode } from 'react';

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
  isUseBorder?: boolean;
}

const Heading2: React.FC<Heading2Props> = ({
  className = '',
  isUseBorder = false,
  heading = 'Stays in Tokyo',
  subHeading,
}) => {
  return (
    <div className={`${twMerge('mb-12 lg:mb-16',  className)} ${isUseBorder && 'transition-all bg-neutral-200 px-20 py-7 rounded-full'} `}>
      <h2 className="text-4xl font-semibold ">{heading}</h2>
      <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
        {subHeading}
      </span>
    </div>
  );
};

export default Heading2;
