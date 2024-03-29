import DownloadApps from '@components/common/download-apps';
import Layout from '@components/layout/layout';
import { ProductGrid } from '@components/product/product-grid';
import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { API_ENDPOINTS } from '@framework/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchProducts } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Element } from 'react-scroll';

export default function Search() {
  return (
    <>
      <Seo
        title="Search"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="search"
      />
      <Divider />
      <Container>
        <Element
          name="grid"
          style={{ direction: 'rtl' }}
          className="flex pb-16 pt-7 lg:pt-7 lg:pb-20 p-4"
        >
          <div className="sticky hidden h-full lg:pt-4 shrink-0  xl:pl-8 lg:block w-[25%] top-16">
            <ShopFilters />
          </div>
          <div className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
            <SearchTopBar />
            <ProductGrid />
          </div>
        </Element>
      </Container>
      <DownloadApps />
    </>
  );
}

Search.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.PRODUCTS, { limit: LIMITS.PRODUCTS_LIMITS }],
    fetchProducts
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
