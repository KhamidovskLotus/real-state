import { Inquiries } from 'types/inquiries';
import { PaginationResult } from 'types/pagination';
import api from './api';
import endpoints from './endpoint';

export const getInquiries = async (
  filter: any
): Promise<PaginationResult<Inquiries> | null> => {
  let res = await api.getBackend<PaginationResult<Inquiries>>(
    endpoints.inquiries.get,
    filter
  );
  if (!res) {
    return null;
  }
  return res;
};
