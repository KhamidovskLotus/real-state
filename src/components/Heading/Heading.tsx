import React, { HTMLAttributes, ReactNode } from 'react';
import NextPrev from 'shared/NextPrev/NextPrev';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
  childrenClassName?: string;
  isUseBorder?: boolean;
 }

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = 'Popular places to stay that Lotus recommends for you',
  className = 'mb-12 lg:mb-16 text-neutral-900 dark:text-neutral-50',
  isCenter = false,
  hasNextPrev = false,
  childrenClassName = '',
  isUseBorder = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? 'text-center w-full max-w-2xl mx-auto' : 'max-w-2xl'
        }
      >
        <h2 className={`text-left sm:text-center  text-3xl sm:text-3xl md:text-4xl font-semibold ${isUseBorder && 'transition-all dark:bg-neutral-800 bg-neutral-100 px-12 py-7 rounded-2xl sm:rounded-full'} ${childrenClassName}`} {...args}>
          {children}
        </h2>
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
};

export default Heading;
