import { API_ENDPOINTS } from '@framework/api-endpoints';
import rest from '@framework/utils/rest';
import ssr_rest from '@framework/utils/ssr-rest';
import { useQuery } from 'react-query';
import { ProductType } from './types';

export const fetchProduct = (_slug: string) =>
  rest.get(`${API_ENDPOINTS.PRODUCT}/${_slug}`);

export const fetchProductSsr = (_slug: string) =>
  ssr_rest.get<ProductType['response']>(`${API_ENDPOINTS.PRODUCT}/${_slug}`);

export const useProductQuery = (slug: string) => {
  return useQuery([API_ENDPOINTS.PRODUCT, slug], () => fetchProduct(slug));
};
