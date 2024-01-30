import ProtectedLayout from '@components/layout/protected-layout';
import AccountLayout from '@components/my-account/account-layout';
import Legal from '@components/my-account/notice';
import Seo from '@components/seo/seo';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function LegalNotice() {
  return (
    <>
      <Seo
        title="Legal Notice"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="legal-notice"
      />
      <AccountLayout>
        <Legal />
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = ProtectedLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'legal',
        'footer',
      ])),
    },
  };
};
