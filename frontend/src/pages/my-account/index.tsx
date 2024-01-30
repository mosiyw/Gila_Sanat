import ProtectedLayout from '@components/layout/protected-layout';
import AccountLayout from '@components/my-account/account-layout';
import Seo from '@components/seo/seo';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AccountDetailsPage() {
  return (
    <>
      <Seo
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout>
        <button onClick={() => {}}>Login</button>

        <button onClick={() => {}}>Logout</button>
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = ProtectedLayout;

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
