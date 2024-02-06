export type AddItemToCartType = {
  payload: {
    productId: string;
  };
  response: {
    message: string;
  };
};

export type RemoveItemFromCartType = {
  payload: {
    removeAll: boolean;
    productId: string;
  };
  response: {
    message: string;
  };
};
