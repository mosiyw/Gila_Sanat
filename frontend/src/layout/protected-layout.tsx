import { useAuth } from 'src/hooks/auth';

interface Props {
  children: React.ReactElement;
}

function ProtectedLayout({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <>Protected</>;
}

export default ProtectedLayout;
