import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Wishlist from '@components/my-account/wishlist';
import Seo from '@components/seo/seo';
import Heading from '@components/ui/heading';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function LegalNotice() {
  const { t } = useTranslation();
  return (
    <>
      <Seo
        title="Wishlist"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/wishlist"
      />
      <AccountLayout>
        <Heading
          dir="rtl"
          variant="titleLarge"
          className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1"
        >
          {t('common:text-account-wishlist')}
        </Heading>
        <Wishlist />
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = Layout;

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
