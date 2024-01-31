import Layout from '@components/layout/layout';
import Seo from '@components/seo/seo';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Products() {
  const { t } = useTranslation('common');
  return (
    <>
      <Seo
        title="Products"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="products"
      />
      <h1>Product Not Found</h1>
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
