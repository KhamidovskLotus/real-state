import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Token } from 'types/token';
import { toastError } from 'utils/toast';
import { Endpoint } from './endpoint';

export type BackendResponse<T> = {
  data: T;
  message: string;
};

class Api {
  private _axios: AxiosInstance;
  private _config: AxiosRequestConfig;

  public setToken(token: string | null) {
    if (!token) {
      this._config = {};
      return;
    }
    this._config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
  }

  constructor() {
    this._config = {};
    try {
      const token = JSON.parse(
        localStorage.getItem('TOKEN') as string
      ) as Token;
      if (token) {
        this.setToken(token.access);
      }
    } catch (err) {}

    this._axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    this._axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          ['token_not_valid', 'user_not_found'].includes(error.response.data.code) 
        ) {
          localStorage.removeItem('USER');
          localStorage.removeItem('TOKEN');
          this._config = {};
          window.location.href = '/login';
        }
        return error;
      }
    );
  }

  getConfig() {
    return this._config;
  }

  getAxios() {
    return this._axios;
  }

  async mutateBackend<T>(
    api: Endpoint,
    data: any,
    id?: string,
    isNeedCheckError: boolean = true
  ): Promise<T | null> {
    try {
      let url = api.url;
      if (id) {
        url = `${url}/${id}/`;
      }
      let result: AxiosResponse | null = null;
      if (api.method === 'POST') {
        result = await this._axios.post<T>(url, data, this._config);
      } else if (api.method === 'PUT') {
        result = await this._axios.put<T>(url, data, this._config);
      } else if (api.method === 'DELETE') {
        result = await this._axios.delete<T>(url, this._config);
      }
      if (result && result.data) {
        return result.data;
      }
      throw result;
    } catch (err) {
      if (isNeedCheckError) {
        this.checkError((err as AxiosError).response);
      }
    }
    return null;
  }

  createError(str: string) {
    toastError(str);
    throw new Error(str);
  }

  checkError(resp?: AxiosResponse): AxiosResponse | null {
    if (!resp) {
      return null;
    }
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
    if (resp.data.hasOwnProperty('message')) {
      this.createError(resp.data.message);
      return null;
    }

    let message: string[] = [];

    for (const key of Object.keys(resp.data)) {
      if (resp.data[key] instanceof Array) {
        message = [...message, ...resp.data[key]];
      } else {
        message.push(resp.data[key]);
      }
    }

    if (message.length > 0) {
      for (const m of message) {
        this.createError(m);
      }
      return null;
    }

    this.createError(
      "Ups like we're having internal errors! Please contact our admin!"
    );
    return null;
  }

  async getBackend<T>(
    api: Endpoint,
    params?: any,
    id?: string
  ): Promise<T | null> {
    let url = api.url;
    if (id) {
      url = `${api.url}${id}/`;
    }
    try {
      const resp = await this._axios.get<T>(url, {
        params,
        ...this._config,
      });
      return resp ? resp.data : null;
    } catch (err) {
      this.checkError((err as AxiosError).response);
    }
    return null;
  }
}

const api = new Api();
export default api;
