import { API_ENDPOINTS } from '@framework/api-endpoints';
import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.ORDERS);
  return {
    data: data,
  };
};

const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery([API_ENDPOINTS.ORDERS, options], fetchOrders);
};

export { fetchOrders, useOrdersQuery };
