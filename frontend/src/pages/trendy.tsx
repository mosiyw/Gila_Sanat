import BundleComboGrid from '@components/bundle/bundle-combo-grid';
import BannerGrid from '@components/common/banner-grid';
import CollectionGrid from '@components/common/collection-grid';
import DownloadApps from '@components/common/download-apps';
import HeroBannerWithCategory from '@components/hero/hero-banner-with-category';
import Layout from '@components/layout/layout-three';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { API_ENDPOINTS } from '@framework/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { bannerGridThree as banners } from '@framework/static/banner';
import { bundleData as bundle } from '@framework/static/bundle';
import { LIMITS } from '@framework/utils/limits';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default function Home() {
  return (
    <>
      <Seo
        title="Trendy"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="trendy"
      />
      <Container>
        <HeroBannerWithCategory />
        <BundleComboGrid data={bundle} />
        <BestSellerGroceryProductFeed />
        <BannerGrid
          data={banners}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 3xl:pb-2 pt-0.5 md:pt-0"
        />
        <PopularProductFeed className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 3xl:pb-2" />
      </Container>
      <CollectionGrid headingPosition="center" />
      <DownloadApps />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: LIMITS.CATEGORIES_LIMITS }],
    fetchCategories
  );
  await queryClient.prefetchQuery(
    [
      API_ENDPOINTS.BEST_SELLER_GROCERY_PRODUCTS,
      { limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS },
    ],
    fetchBestSellerGroceryProducts
  );
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.POPULAR_PRODUCTS, { limit: LIMITS.POPULAR_PRODUCTS_LIMITS }],
    fetchPopularProducts
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
