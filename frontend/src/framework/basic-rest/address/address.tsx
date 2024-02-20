import { API_ENDPOINTS } from '@framework/api-endpoints';
import rest from '@framework/utils/rest';
import { useQuery } from 'react-query';

const fetchAddress = async () => {
  const response = await rest.get(API_ENDPOINTS.ADDRESS);
  console.log(response);
  return {
    data: response,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.ADDRESS], fetchAddress);
};

export { fetchAddress, useAddressQuery };
