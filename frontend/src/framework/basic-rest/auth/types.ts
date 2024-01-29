export type LoginType = {
  payload: { phone_number: string; password: string; remember_me: boolean };
  response: {
    message: string;
    token: string;
    isAdmin: boolean;
  };
};
