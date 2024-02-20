import { API_ENDPOINTS } from '@framework/api-endpoints';
import rest from '@framework/utils/rest';
import { useQuery } from 'react-query';

const fetchAddress = async () => {
  const { data } = await rest.get(API_ENDPOINTS.ADDRESS);
  return {
    data: data,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchAddress);
};

export { fetchAddress, useAddressQuery };
