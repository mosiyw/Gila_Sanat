import { API_ENDPOINTS } from '@framework/api-endpoints';
import { Order } from '@framework/types';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

export const fetchOrder = async (_id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.ORDER}`);
  return data;
};

export const useOrderQuery = (id: string) => {
  return useQuery<Order, Error>([API_ENDPOINTS.ORDER, id], () =>
    fetchOrder(id)
  );
};
