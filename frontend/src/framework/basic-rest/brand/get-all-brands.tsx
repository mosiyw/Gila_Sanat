import { API_ENDPOINTS } from '@framework/api-endpoints';
import { Brand, QueryOptionsType } from '@framework/types';
import rest from '@framework/utils/rest';
import { useQuery } from 'react-query';

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const response = await rest.get(API_ENDPOINTS.BRANDS);
  return { brands: { data: response as unknown as Brand[] } };
};

export const useBrandsQuery = (options: QueryOptionsType) => {
  return useQuery<{ brands: { data: Brand[] } }, Error>(
    [API_ENDPOINTS.BRANDS, options],
    fetchBrands
  );
};
