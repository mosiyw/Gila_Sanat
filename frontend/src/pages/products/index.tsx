import DownloadApps from '@components/common/download-apps';
import Layout from '@components/layout/layout';
import { ProductGrid } from '@components/product/product-grid';
import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Element } from 'react-scroll';

export default function Products() {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo
        title="Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="products"
      />
      <PageHeroSection heroTitle={t('text-all-grocery-items')} />
      <Container>
        <Element name="grid" className="flex pb-16 pt-7 lg:pt-11 lg:pb-20">
          <div className="sticky hidden h-full shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
            <ShopFilters />
          </div>
          <div className="w-full lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
            <SearchTopBar />
            <ProductGrid />
          </div>
        </Element>
      </Container>
      <DownloadApps />
    </>
  );
}

Products.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
