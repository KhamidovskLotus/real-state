import { PropertyFilter } from 'states/propertyFilterSlice';
import { PaginationResult } from 'types/pagination';
import { Property, PropertyImage } from 'types/property';
import api from './api';
import endpoints from './endpoint';

export const PROPERTY_DUMMY_PHOTO_URL = `https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
const FAKE_LOOP = 10;

export const getDummyPhoto = () => {
  const dummy: PropertyImage[] = [];
  for (let i = 0; i < FAKE_LOOP; i++) {
    dummy.push({
      image: PROPERTY_DUMMY_PHOTO_URL,
      property_id: '1',
      uuid: '',
    });
  }
  return dummy;
};

export const getAllProperty = async (filter: PropertyFilter, userProperty = false): Promise<Property[]> => {
  let res; 
  if(!userProperty) {
    res = await api.getBackend<Property[]>(
      endpoints.property.getAll,
      filter
    );
  } else {
    res = await api.getBackend<Property[]>(
      endpoints.property.getAllByUser,
      filter
    );
  }
  if(!res) {
    return [];
  }
  res = res.map((property) => {
    if (property.images.length <= 0) {
      property.images = getDummyPhoto();
    }
    return property;
  });
  return res;
}

export const getProperty = async (
  filter: PropertyFilter,
  userProperty = false
): Promise<PaginationResult<Property> | null> => {
  let res = null;
  if (!userProperty) {
    res = await api.getBackend<PaginationResult<Property>>(
      endpoints.property.get,
      filter
    );
  } else {
    res = await api.getBackend<PaginationResult<Property>>(
      endpoints.property.getByUser,
      filter
    );
  }
  if (!res) {
    return null;
  }
  res.results = res.results.map((property) => {
    if (!property.images ||  property.images.length <= 0) {
      property.images = getDummyPhoto();
    }
    return property;
  });
  return res;
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  let res = await api.getBackend<Property>(endpoints.property.getById, {}, id);
  if (!res) {
    return null;
  }
  if (res.images.length <= 0) {
    res.images = getDummyPhoto();
  }
  return res;
};

export const getPropertyByAgentId = async (agentId: string, filter?: any): Promise<PaginationResult<Property> | null> => {
  let res = await api.getBackend<PaginationResult<Property>>(
    endpoints.property.get,
    {...filter, 'agent_id' : agentId },
  );
  if (!res) {
    return null;
  }
  res.results = res.results.map((property) => {
    if (property.images.length <= 0) {
      property.images = getDummyPhoto();
    }
    return property;
  });
  return res;
};
