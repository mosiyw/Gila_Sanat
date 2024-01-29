import { API_ENDPOINTS } from '@framework/api-endpoints';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

const fetchContact = async () => {
  const { data } = await http.get(API_ENDPOINTS.CONTACT);
  return {
    data: data,
  };
};

const useContactQuery = () => {
  return useQuery([API_ENDPOINTS.CONTACT], fetchContact);
};

export { fetchContact, useContactQuery };
