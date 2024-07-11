import Heading from 'components/Heading/Heading';
import { traceDeprecation } from 'process';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PaginationResult } from 'types/pagination';
import { Tree } from 'types/tree';

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

export interface SectionBlockProps {
  className?: string;
  data: PaginationResult<any>;
  treeData: Tree;
}

const SectionBlock: FC<SectionBlockProps> = ({ treeData, data, className = '' }) => {
  const { t } = useTranslation();

  const DATA: Statistic[] = [
    {
      id: '1',
      heading: `${treeData.propertyLength.toLocaleString('en-US')}`,
      subHeading: 'Number of properties has been listed with LOTUS. Each listing matters!',
    },
    {
      id: '2',
      heading: `${treeData.treeCounter.toLocaleString('en-US')} Trees`,
      subHeading: 'We Plant a Tree Every 100 Listings.\nJoin Us in Keeping Uzbekistan Beautiful!',
    },
    {
      id: '3',
      heading: 'Uzbekistan',
      subHeading: 'Uzbekistan\'s #1 Leading Digital Real Estate Platform',
    },
  ];
  
  
  return (
    <div className={`nc-SectionBlock relative  ${className}`}>
      {/* <Heading desc="">🚀 {t('whyLotus')}</Heading> */}
      <div className="sm:mt-0 mt-20  grid gap-6 grid-cols-1 sm:grid-cols-3 ">
        {DATA.map((item) => (
          <div
            key={item.id}
            className="p-12 w-full bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionBlock;
