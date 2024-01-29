import { API_ENDPOINTS } from '@framework/api-endpoints';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

const fetchAddress = async () => {
  const { data } = await http.get(API_ENDPOINTS.ADDRESS);
  return {
    data: data,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchAddress);
};

export { fetchAddress, useAddressQuery };
