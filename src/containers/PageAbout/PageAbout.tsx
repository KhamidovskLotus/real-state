import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import SectionClientSay from 'components/SectionClientSay/SectionClientSay';
import SectionSubscribe2 from 'components/SectionSubscribe2/SectionSubscribe2';
import rightImg from 'images/about-hero-right.png';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SectionFaq from './SectionFaq';
import SectionHero from './SectionHero';
import SectionStatistic from './SectionStatistic';

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
   
      <BgGlassmorphism />
      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading={`👋 ${t('aboutUs')}.`}
          btnText=""
          subHeading={t('aboutUsContent')}
        />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageAbout_" />
        </div>
        <SectionStatistic />
        <SectionFaq />
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
