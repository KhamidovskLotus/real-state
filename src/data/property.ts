import { PropertyAvailability, PropertyFor } from 'types/property';

export const PROPERTY_TYPE: string[] = ['Office', 'House', 'Apartment'];
export const PROPERTY_TYPE_DESCRIPTION: string[] = [
  'Professional workspace for businesses and organizations.',
  'Residential dwelling with private outdoor space.',
  'Compact living space within a larger building complex.',
];
export const PROPERTY_AVAILABILITY: PropertyAvailability[] = [
  'Available',
  'Rented',
  'Not for rent',
];
export const PROPERTY_FOR: PropertyFor[] = [
  'Rent',
  'Sell'
]