import axios, { AxiosError, AxiosResponse } from 'axios';
import { getToken } from './get-token';

const rest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

rest.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

rest.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error.response?.data)
);

export default rest;
