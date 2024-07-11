import { PropertyImage } from 'types/property';

type AddPropertyPayload = {
  agent_assigned_id: string;
  country: string;
  upload_images: Array<File | string | PropertyImage>;
  state: string;
  city: string;
  latitude: string;
  longitude: string;
  client_id: number;
  remove_agent: boolean;
  description: string;
  amenities: string;
  property_type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  built_year: string | undefined;
  property_title: string;
  property_availability: string;
  property_for: string;
  property_address: string;
};
