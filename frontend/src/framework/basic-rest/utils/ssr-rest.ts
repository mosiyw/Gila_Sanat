import axios from 'axios';

const ssr_rest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

ssr_rest.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ssr_rest;
