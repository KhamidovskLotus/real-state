import Heading from 'components/Heading/Heading';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = '' }) => {
  const { t } = useTranslation();

  const DATA: Statistic[] = [
    {
      id: '1',
      heading: t('easeOfUse'),
      subHeading: t('easeOfUseContent'),
    },
    {
      id: '2',
      heading: t('innovativeTools'),
      subHeading: t('innovativeToolsContent'),
    },
    {
      id: '3',
      heading: t('comprehensiveServices'),
      subHeading: t('comprehensiveServicesContent'),
    },
    {
      id: '4',
      heading: t('expertSupport'),
      subHeading: t('expertSupportContent'),
    },
    {
      id: '5',
      heading: t('ourPromise'),
      subHeading: t('ourPromiseContent'),
    },
  ];

  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading desc="">🚀 {t('whyLotus')}</Heading>
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
        {DATA.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
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

export default SectionStatistic;
