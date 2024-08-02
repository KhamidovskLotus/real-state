import AutoRefreshWrapper from 'components/AutoRefresh';
import FooterNav from 'components/FooterNav';
import TopMobileNav from 'components/TopMobileNav';
import AccountPage from 'containers/AccountPage/AccountPage';
import AccountPass from 'containers/AccountPage/AccountPass';
import AccountSavelists from 'containers/AccountPage/AccountSavelists';
import AddNewPropertyPage from 'containers/AddNewPropertyPage/AddNewPropertyPage';
import AuthorPage from 'containers/AuthorPage/AuthorPage';
import ListingStayDetailPage from 'containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage';
import ManageInquiriesPage from 'containers/ManageInquiries/ManageInquiriesPage';
import ManagePropertyPage from 'containers/ManagePropertyPage/ManagePropertyPage';
import Page404 from 'containers/Page404/Page404';
import PageAbout from 'containers/PageAbout/PageAbout';
import PageAgent from 'containers/PageAgent/PageAgent';
import PageContact from 'containers/PageContact/PageContact';
import PageForgotPass from 'containers/PageForgotPass/PageForgotPass';
import PageForgotPassConfirm from 'containers/PageForgotPassConfirm/PageForgotPassConfirm';
import PageHome2 from 'containers/PageHome/PageHome2';
import PageLogin from 'containers/PageLogin/PageLogin';
import PortofolioPage from 'containers/PagePortofolio/PagePortofolio';
import PageSell from 'containers/PageSell/PageSell';
import PageSignUp from 'containers/PageSignUp/PageSignUp';
import ListingStayMapPage from 'containers/PropertyPage/ListingStayMapPage';
import ListingStayPage from 'containers/PropertyPage/ListingStayPage';
import SiteHeader from 'containers/SiteHeader';
import useSaveList from 'hooks/useSavelist';
import useWindowSize from 'hooks/useWindowResize';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from 'shared/Footer/Footer';
import ScrollToTop from './ScrollToTop';
import { Page } from './types';

export const pages: Page[] = [
  { path: '/', exact: true, component: PageHome2 },
  { path: '/#', exact: true, component: PageHome2 },
  // { path: '/home-1-header-2', exact: true, component: PageHome2 },
  // { path: '/home-2', component: PageHome2 },
  // { path: '/home-3', component: PageHome3 },
  //
  { path: '/sport', component: ListingStayPage },
  { path: '/eco-friendly', component: ListingStayPage },
  { path: '/millionare', component: ListingStayPage },
  { path: '/dacha', component: ListingStayPage },
  { path: '/agent', component: PageAgent },
  { path: '/portofolio', component: PortofolioPage },
  { path: '/agent/:id', component: AuthorPage },
  { path: '/property/:id', component: ListingStayDetailPage },
  { path: '/my-property', component: ManagePropertyPage },
  { path: '/property', component: ListingStayPage },
  { path: '/property/add', component: AddNewPropertyPage },
  { path: '/property/update/:id', component: AddNewPropertyPage },
  { path: '/forgot-pass', component: PageForgotPass },
  { path: '/password-reset-confirm/:uidb64/:token', component: PageForgotPassConfirm },
  { path: '/buy', component: ListingStayMapPage },
  { path: '/sell', component: PageSell },
  { path: '/rent', component: ListingStayMapPage },
  { path: '/map', component: ListingStayMapPage },
  { path: '/my-inquiries', component: ManageInquiriesPage },
  // { path: '/listing-stay-detail', component: ListingStayDetailPage },
  //
  // {
  //   path: '/listing-experiences',
  //   component: ListingExperiencesPage,
  // },
  // {
  //   path: '/property/map',
  //   component: PagePropertyMap,
  // },
  // {
  //   path: '/listing-experiences-map',
  //   component: ListingExperiencesMapPage,
  // },
  // {
  //   path: '/listing-experiences-detail',
  //   component: ListingExperiencesDetailPage,
  // },
  //
  // { path: '/listing-car', component: ListingCarPage },
  // { path: '/listing-car-map', component: ListingCarMapPage },
  // { path: '/listing-car-detail', component: ListingCarDetailPage },
  //
  // { path: '/listing-real-estate-map', component: ListingRealEstateMapPage },
  // { path: '/listing-real-estate', component: ListingRealEstatePage },
  //
  // { path: '/listing-flights', component: ListingFlightsPage },
  //
  // { path: '/checkout', component: CheckOutPage },
  // { path: '/pay-done', component: PayPage },
  //
  { path: '/account', component: AccountPage },
  { path: '/account-password', component: AccountPass },
  { path: '/account-savelists', component: AccountSavelists },
  // { path: '/account-billing', component: AccountBilling },
  //
  // { path: '/blog', component: BlogPage },
  // { path: '/blog-single', component: BlogSingle },
  //
  // { path: '/add-listing-1', component: PageAddListing1 },
  // { path: '/add-listing-2', component: PageAddListing2 },
  // { path: '/add-listing-3', component: PageAddListing3 },
  // { path: '/add-listing-4', component: PageAddListing4 },
  // { path: '/add-listing-5', component: PageAddListing5 },
  // { path: '/add-listing-6', component: PageAddListing6 },
  // { path: '/add-listing-7', component: PageAddListing7 },
  // { path: '/add-listing-8', component: PageAddListing8 },
  // { path: '/add-listing-9', component: PageAddListing9 },
  // { path: '/add-listing-10', component: PageAddListing10 },
  //
  { path: '/contact', component: PageContact },
  { path: '/about', component: PageAbout },
  { path: '/signup', component: PageSignUp },
  { path: '/login', component: PageLogin },
  // { path: '/staff-login', component: PageStaffLogin },
  // { path: '/subscription', component: PageSubcription },
  //
];

const MyRoutes = () => {
  const { width } = useWindowSize();
  // if (typeof window !== 'undefined') {
  //   width = width || window.innerWidth;
  // }
  useSaveList();

  return (
    <BrowserRouter>
    <TopMobileNav />
    {/* {width < 768 && <TopMobileNav />} */}
    <ScrollToTop />
    <SiteHeader />
    <div className="min-h-[60vh]">
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route
              key={path}
              element={
                path === "/property/update/:id" ? (
                  <Component />
                ) : (
                  <AutoRefreshWrapper>
                    <Component />
                  </AutoRefreshWrapper>
                )
              }
              path={path}
            />
          );
        })}
        <Route element={<Page404 />} />
      </Routes>
    </div>
    <FooterNav />
    {/* {width < 768 && <FooterNav />} */}
    <Footer />
  </BrowserRouter>
  );
};

export default MyRoutes;
