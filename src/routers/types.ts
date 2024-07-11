import { ComponentType } from 'react';

export interface LocationStates {
  '/'?: {};
  '/#'?: {};
  '/home-2'?: {};
  '/home-3'?: {};
  '/home-1-header-2'?: {};
  //
  '/listing-flights'?: {};
  //
  '/listing-stay'?: {};
  '/listing-stay-map'?: {};
  '/listing-stay-detail'?: {};
  //
  '/dacha'?: {};
  '/millionare'?: {};
  '/eco-friendly'?: {};
  '/sport'?: {};
  //
  '/listing-experiences'?: {};
  '/listing-experiences-map'?: {};
  '/listing-experiences-detail'?: {};
  //
  '/listing-real-estate'?: {};
  '/listing-real-estate-map'?: {};
  '/listing-real-estate-detail'?: {};
  //
  '/listing-car'?: {};
  '/listing-car-map'?: {};
  '/listing-car-detail'?: {};
  //
  '/checkout'?: {};
  '/pay-done'?: {};
  //
  '/property/update/:id'?: {};
  '/property/:id'?: {};
  '/property'?: {};
  '/rent'?: {};
  '/sell'?: {};
  '/buy'?: {};
  '/map'?: {};
  '/portofolio' ? : {};
  '/my-property'?: {};
  '/property/add'?: {};
  '/my-inquiries'?: {};
  '/password-reset-confirm/:uidb64/:token'?: {};
  //
  '/account'?: {};
  '/account-savelists'?: {};
  '/account-password'?: {};
  '/account-billing'?: {};
  //
  '/blog'?: {};
  '/blog-single'?: {};
  //
  '/add-listing-1'?: {};
  '/add-listing-2'?: {};
  '/add-listing-3'?: {};
  '/add-listing-4'?: {};
  '/add-listing-5'?: {};
  '/add-listing-6'?: {};
  '/add-listing-7'?: {};
  '/add-listing-8'?: {};
  '/add-listing-9'?: {};
  '/add-listing-10'?: {};
  //
  '/author'?: {};
  '/search'?: {};
  '/agent'?: {};
  '/about'?: {};
  '/contact'?: {};
  '/login'?: {};
  '/staff-login'?: {};
  '/signup'?: {};
  '/forgot-pass'?: {};
  '/page404'?: {};
  '/subscription'?: {};
  '/agent/:id'? : {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
