import { useSession } from 'next-auth/react';
import { useLayoutEffect, useState } from 'react';

type AuthHookData = {
  isAuthenticated: boolean;
};

export const useAuth = (): AuthHookData => {
  const { status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (status === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, [status]);

  return { isAuthenticated };
};
