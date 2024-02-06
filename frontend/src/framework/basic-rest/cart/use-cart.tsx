import { API_ENDPOINTS } from '@framework/api-endpoints';
import { RestErrorType } from '@framework/types';
import rest from '@framework/utils/rest';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import type { AddItemToCartType, RemoveItemFromCartType } from './types';

export const getItems = (): Promise<AddItemToCartType['response']> =>
  rest.get(API_ENDPOINTS.CART);

export const postItemToCart = (
  payload: AddItemToCartType['payload']
): Promise<AddItemToCartType['response']> =>
  rest.post(API_ENDPOINTS.ADD_CART, payload);

export const removeItemFromCart = (
  payload: RemoveItemFromCartType['payload']
): Promise<RemoveItemFromCartType['response']> =>
  rest.delete(API_ENDPOINTS.REMOVE_CART, {
    data: payload,
  });

export const useCartMutation = () => {
  const getItemsAuthenticated = useQuery({
    queryFn: getItems,
    queryKey: 'cart-items',
    enabled: false,
    onSuccess(data) {
      console.log(data);
    },
  });

  const addItemToCartAuthenticated = useMutation(
    (payload: AddItemToCartType['payload']) => postItemToCart(payload),
    {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (data: RestErrorType) => {
        toast.error(data.error);
      },
    }
  );

  const removeItemFromCartAuthenticated = useMutation(
    (payload: RemoveItemFromCartType['payload']) => removeItemFromCart(payload),
    {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (data: RestErrorType) => {
        toast.error(data.error);
      },
    }
  );

  return {
    getItemsAuthenticated,
    addItemToCartAuthenticated,
    removeItemFromCartAuthenticated,
  };
};
