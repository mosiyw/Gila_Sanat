import { Product, QueryOptionsType } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints2';
import http2 from '@framework/utils/ssr-rest';
import { useQuery } from 'react-query';

export const fetchPopularProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http2.get(API_ENDPOINTS.PRODUCTS);
  return data as Product[];
};

export const usePopularProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchPopularProducts
  );
};
