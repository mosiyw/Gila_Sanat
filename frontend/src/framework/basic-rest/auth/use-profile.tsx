import { API_ENDPOINTS } from '@framework/api-endpoints';
import rest from '@framework/utils/rest';
import { useQuery } from 'react-query';
import { ProfileType } from './types';

export const getProfile = (): Promise<ProfileType['response']> =>
  rest.get(API_ENDPOINTS.PROFILE);

export const useProfileQuery = () => {
  return useQuery({
    queryFn: getProfile,
    onSuccess(data) {
      console.log(data);
    },
  });
};
