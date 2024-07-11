import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import SectionSubscribe2 from 'components/SectionSubscribe2/SectionSubscribe2';
import { DEMO_POSTS } from 'data/posts';
import React from 'react';
import { Helmet } from 'react-helmet';
import SectionAds from './SectionAds';
import SectionLatestPosts from './SectionLatestPosts';
import SectionMagazine5 from './SectionMagazine5';

// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const BlogPage: React.FC = () => {
  return (
    <div className="nc-BlogPage overflow-hidden relative">
   

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      {/* ======== ALL SECTIONS ======== */}
      {/* ======= START CONTAINER ============= */}
      <div className="container relative">
        {/* === SECTION 1 === */}
        <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 posts={MAGAZINE1_POSTS} />
        </div>

        {/* === SECTION 1 === */}
        <SectionAds />

        {/* === SECTION 8 === */}
        <SectionLatestPosts className="py-16 lg:py-28" />

        {/* === SECTION 1 === */}
        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default BlogPage;
