import BannerCard from '@components/cards/banner-card';
import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import DownloadApps from '@components/common/download-apps';
import HeroBannerCard from '@components/hero/hero-banner-card';
import Layout from '@components/layout/layout-four';
import AllProductFeed from '@components/product/feeds/all-products-feed';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import { API_ENDPOINTS } from '@framework/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchProducts } from '@framework/product/get-all-products';
import {
  homeTwoBanner as banner,
  bannerDiscount,
  homeFourHeroBanner as heroBanner,
} from '@framework/static/banner';
import { LIMITS } from '@framework/utils/limits';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Element } from 'react-scroll';

export default function Home() {
  return (
    <>
      <Seo
        title="Minimal"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="minimal"
      />
      <HeroBannerCard
        banner={heroBanner}
        variant="medium"
        className="min-h-[400px] lg:min-h-[450px] 2xl:min-h-[480px] pt-20 lg:pt-32 pb-14 lg:pb-24 mb-7 md:mb-8 xl:mb-10"
      />
      <Container>
        <Element name="grid" className="flex mb-11 md:mb-14 xl:mb-16 pb-2.5">
          <CategoryDropdownSidebar className="shrink-0 ltr:pr-8 rtl:pl-8 hidden lg:block w-80 xl:w-[370px] lg:sticky lg:top-20" />
          <div className="w-full minimal-main-content">
            <BannerAllCarousel
              data={bannerDiscount}
              className="mb-12 xl:mb-14"
            />
            <AllProductFeed
              element={<BannerCard banner={banner} className="py-5" />}
            />
          </div>
        </Element>
      </Container>
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
