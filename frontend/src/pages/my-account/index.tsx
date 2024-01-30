import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Seo from '@components/seo/seo';
import { GetStaticProps } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AccountDetailsPage() {
  const { data: session, status } = useSession();

  return (
    <>
      <Seo
        title="Account Settings"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="my-account/account-settings"
      />
      <AccountLayout>
        <h1>Hello World</h1>
        <button
          onClick={() => {
            signIn();
          }}
        >
          Login
        </button>

        {status === 'authenticated' ? (
          <button
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        ) : null}
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.Layout = Layout;

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
