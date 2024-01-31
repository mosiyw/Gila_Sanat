import ManagedDrawer from '@components/common/drawer/managed-drawer';
import ManagedModal from '@components/common/modal/managed-modal';
import { DefaultSeo } from '@components/seo/default-seo';
import { ManagedUIContext } from '@contexts/ui.context';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';

const Noop: React.FC = ({ children }) => <>{children}</>;

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();

  const Layout = (Component as any).Layout || Noop;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ManagedUIContext>
          <>
            <DefaultSeo />
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />
            </Layout>
            <ToastContainer />
            <ManagedModal />
            <ManagedDrawer />
          </>
        </ManagedUIContext>
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default appWithTranslation(App);
