import Layout from '@components/layout/layout';
import Seo from '@components/seo/seo';
import ShopsPageContent from '@components/shops/shops-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { API_ENDPOINTS } from '@framework/api-endpoints';
import { fetchShops } from '@framework/shop/get-shops';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export default function ShopsPage() {
  return (
    <>
      <Seo
        title="Shops"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="shops"
      />
      <PageHeroSection
        heroTitle="text-shop-page"
        backgroundThumbnail="/assets/images/shop-page-hero-bg.jpg"
        mobileBackgroundThumbnail="/assets/images/shop-page-hero-mobile-bg.png"
        variant="white"
      />
      <ShopsPageContent />
    </>
  );
}

ShopsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SHOPS, { limit: 6 }],
    fetchShops
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
