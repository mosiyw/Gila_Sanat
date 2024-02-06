/* eslint-disable react-hooks/exhaustive-deps */
import { useUI } from '@contexts/ui.context';
import { useCartMutation } from '@framework/cart/use-cart';
import { useLocalStorage } from '@utils/use-local-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { State, cartReducer, initialState } from './cart.reducer';
import { Item, getItem, inStock } from './cart.utils';

interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item['id']) => void;
  clearItemFromCart: (id: Item['id']) => void;
  getItemFromCart: (id: Item['id']) => Item;
  isInCart: (id: Item['id']) => boolean;
  isInStock: (id: Item['id']) => boolean;
  resetCart: () => void;
}

export const cartContext = createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
};

export const CartProvider: React.FC = (props) => {
  const { isAuthorized, withAuth } = useUI();
  const {
    addItemToCartAuthenticated,
    removeItemFromCartAuthenticated,
    getItemsAuthenticated,
  } = useCartMutation();

  const [savedCart, saveCart] = useLocalStorage(
    `borobazar-cart`,
    JSON.stringify(initialState)
  );

  const [state, dispatch] = useReducer(cartReducer, JSON.parse(savedCart!));

  useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) => {
    if (isAuthorized) {
      addItemToCartAuthenticated.mutate(
        { productId: item.id },
        {
          onSuccess(data, variables, context) {
            getItemsAuthenticated.refetch();
          },
        }
      );
    }

    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  };

  const removeItemFromCart = (id: Item['id']) => {
    if (isAuthorized) {
      removeItemFromCartAuthenticated.mutate({
        productId: id,
        removeAll: false,
      });
    }
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
  };

  const clearItemFromCart = (id: Item['id']) =>
    dispatch({ type: 'REMOVE_ITEM', id });

  const isInCart = useCallback(
    (id: Item['id']) => !!getItem(state.items, id),
    [state.items]
  );

  const getItemFromCart = useCallback(
    (id: Item['id']) => getItem(state.items, id),
    [state.items]
  );

  const isInStock = useCallback(
    (id: Item['id']) => inStock(state.items, id),
    [state.items]
  );

  const resetCart = () => dispatch({ type: 'RESET_CART' });

  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [addItemToCart, getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
