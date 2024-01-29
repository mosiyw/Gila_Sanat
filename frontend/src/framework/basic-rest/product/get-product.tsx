import { API_ENDPOINTS } from '@framework/api-endpoints';
import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

export const fetchProduct = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}`);
  return data;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
    fetchProduct(slug)
  );
};
