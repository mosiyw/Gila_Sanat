// @ts-nocheck
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import ManagedModal from '@components/common/modal/managed-modal';
import { DefaultSeo } from '@components/seo/default-seo';
import { ManagedUIContext } from '@contexts/ui.context';
import { hotToastSetting } from '@settings/toast-setting';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from 'react-query';
import { Hydrate } from 'react-query/hydration';

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/toast.css';

// Material-UI imports
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Noop: React.FC = ({ children }) => <>{children}</>;

const theme = createTheme({
  typography: {
    fontFamily: 'IranYekan, Arial',
  },
});

const App = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();

  const Layout = (Component as any).Layout || Noop;

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ManagedUIContext>
            <>
              <DefaultSeo />
              <Layout pageProps={pageProps}>
                <Component {...pageProps} key={router.route} />
              </Layout>
              <Toaster {...hotToastSetting} />
              <ManagedModal />
              <ManagedDrawer />
            </>
          </ManagedUIContext>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

// @ts-ignore
export default appWithTranslation(App);
