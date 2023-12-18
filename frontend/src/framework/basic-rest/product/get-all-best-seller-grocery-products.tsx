import { QueryOptionsType, Product } from '@framework/types';
import http2 from '@framework/utils/http2';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints2';
import { useQuery } from 'react-query';

export const fetchBestSellerGroceryProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http2.get(API_ENDPOINTS.PRODUCTS);
  return data as Product[];
};
export const useBestSellerGroceryProductsQuery = (
  options: QueryOptionsType
) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchBestSellerGroceryProducts
  );
};
