import { API_ENDPOINTS } from '@framework/api-endpoints';
import { Product, QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

export const fetchFreshVegetablesProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FRESH_VEGETABLES_PRODUCTS);
  return data as Product[];
};

export const useFreshVegetablesProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FRESH_VEGETABLES_PRODUCTS, options],
    fetchFreshVegetablesProducts
  );
};
