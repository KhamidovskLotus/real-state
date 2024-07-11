import { LoginPayload } from 'types/payload/login';
import { LoginResponse } from 'types/response/login';
import api from './api';
import endpoints from './endpoint';
import { UZBEKISTAN_EXTENSION } from 'data/uzbekistan';

export const postLogin = async (
  payload: LoginPayload
): Promise<LoginResponse | null> => {
  payload.phone = UZBEKISTAN_EXTENSION + payload.phone;
  let res = await api.mutateBackend<LoginResponse>(
    endpoints.auth.login,
    payload
  );
  if (!res) {
    return null;
  }
  return res;
};
