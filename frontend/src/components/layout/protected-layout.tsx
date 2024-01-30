import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import Layout from './layout';

type Props = {
  children: React.ReactElement;
};

function ProtectedLayout({ children }: Props) {
  const router = useRouter();
  const { isAuthorized } = useUI();

  useLayoutEffect(() => {
    if (!isAuthorized) {
      router.push('/signin');
    }
  }, [isAuthorized, router]);

  return <Layout>{children}</Layout>;
}

export default ProtectedLayout;
