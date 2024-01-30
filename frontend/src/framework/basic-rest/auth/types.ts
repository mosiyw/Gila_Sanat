export type LoginType = {
  payload: { phone_number: string; password: string; remember_me?: boolean };
  response: {
    message: string;
    token: string;
    isAdmin: boolean;
  };
};

export type ProfileType = {
  user: {
    favorites: any[];
    cart: any[];
    orders: any[];
    tickets: any[];
    _id: string;
    username: string;
    password: string;
    isAdmin: boolean;
    __v: number;
    phone_number: string;
    addresses: any[];
  };
};
