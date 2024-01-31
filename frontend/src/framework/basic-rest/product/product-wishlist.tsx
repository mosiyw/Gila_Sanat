import { API_ENDPOINTS } from '@framework/api-endpoints';
import { RestErrorType } from '@framework/types';
import rest from '@framework/utils/rest';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { GetIsProductExistInWishlistType, ProductWishlistType } from './types';

export const postWishlistProduct = (
  payload: ProductWishlistType['payload']
): Promise<ProductWishlistType['response']> =>
  rest.post(API_ENDPOINTS.ADD_WISHLIST, payload);

export const deleteWishlistProduct = (
  payload: ProductWishlistType['payload']
): Promise<ProductWishlistType['response']> =>
  rest.delete(API_ENDPOINTS.REMOVE_WISHLIST, {
    data: payload,
  });

export const fetchIsProductExistInWishlist = (
  param: GetIsProductExistInWishlistType['param']
): Promise<GetIsProductExistInWishlistType['response']> =>
  rest.get(`${API_ENDPOINTS.IS_EXIST_IN_WISHLIST}${param.productId}`);

export const useIsProductExistInWishlistQuery = (
  param: GetIsProductExistInWishlistType['param']['productId']
) => {
  return useQuery(['isExistInWishList'], {
    queryFn: () => fetchIsProductExistInWishlist({ productId: param }),
  });
};

export const useWishlistProductMutation = () => {
  const addProduct = useMutation(
    (payload: string) =>
      postWishlistProduct({
        productId: payload,
      }),
    {
      onSuccess: (data) => {
        toast.success('با موفقیت ثبت شد');
      },
      onError: (data: RestErrorType) => {
        toast.error('خطا حین ثبت');
      },
    }
  );

  const removeProduct = useMutation(
    (payload: string) =>
      deleteWishlistProduct({
        productId: payload,
      }),
    {
      onSuccess: (data) => {
        toast.success('محصول با موفقیت حذف شد');
      },
      onError: (data: RestErrorType) => {
        toast.error('خطا حین حذف');
      },
    }
  );

  const isLoading = addProduct.isLoading || removeProduct.isLoading;

  return {
    add: addProduct,
    remove: removeProduct,
    isLoading,
  };
};
