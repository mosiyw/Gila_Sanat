import { API_ENDPOINTS } from '@framework/api-endpoints';
import { RestErrorType } from '@framework/types';
import rest from '@framework/utils/rest';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AddFavoriteProductType } from './types';

export const postFavoriteProduct = (
  input: AddFavoriteProductType['payload']
): Promise<AddFavoriteProductType['response']> =>
  rest.post(API_ENDPOINTS.ADD_WISHLIST, input);

export const useFavoriteProductMutation = () => {
  return useMutation(
    (input: string) =>
      postFavoriteProduct({
        productId: input,
      }),
    {
      onSuccess: (data) => {
        toast('محصول با موفقیت اضافه شد', {
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      onError: (data: RestErrorType) => {
        toast('خطا حین ثبت محصول', {
          progressClassName: 'fancy-progress-bar',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    }
  );
};
