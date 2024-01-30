import { useSession } from 'next-auth/react';

type AuthHookData = {
  isAuthenticated: boolean;
};

export const useAuth = (): AuthHookData => {
  const { status } = useSession();

  let isAuthenticated = false;

  if (status === 'authenticated') {
    isAuthenticated = true;
  }

  return { isAuthenticated };
};
