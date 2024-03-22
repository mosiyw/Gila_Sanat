import { API_ENDPOINTS } from '@framework/api-endpoints';
import { Product, QueryOptionsType } from '@framework/types';
import rest from '@framework/utils/rest';
import { useQuery } from 'react-query';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const paramsObject = { Keyword: _params.text };
  const params = new URLSearchParams(paramsObject).toString();
  const response = await rest.get(`${API_ENDPOINTS.SEARCH}?${params}`);
  return response;
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.SEARCH, options],
    fetchSearchedProducts
  );
};
