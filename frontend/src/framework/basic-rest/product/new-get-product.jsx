import { Product } from '@framework/types';
import http from '@framework/utils/http2';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints2';
import { useQuery } from 'react-query';

export const fetchProduct = async (_slug) => {
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}/${_slug}`);
  return data;
};

export const useProductQuery = (slug) => {
  return useQuery([API_ENDPOINTS.PRODUCT, slug], () => fetchProduct(slug));
};
