type PropertyImage = {
  property_id: string;
  image: string;
  uuid: string;
};

export type PropertySaveList = {
  id: number;
  property: Property;
  user: number;
}

export type Property = {
  property_id: number;
  images: PropertyImage[];
  country: string;
  state: string;
  property_for: string;
  city: string;
  client: number | Agent;
  latitude: string;
  longitude: string;
  description: string;
  amenities: string;
  posted_date: string;
  property_availability: PropertyAvailability;
  last_updated: string;
  total_views: number;
  property_type: string;
  agent_assigned:null | string | Agent;
  property_availability: string;
  property_title: string;
  price: number;
  bathrooms: number;
  bedrooms: number,
  area_sqft: number,
  built_year: number,
  property_address: string;
};

export type PropertyFor = 'Rent' | 'Buy' | 'Sell'; 
export type PropertyAvailability = 'Available' | 'Rented' | 'Not for rent';
