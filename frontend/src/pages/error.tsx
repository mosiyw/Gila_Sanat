import Layout from '@components/layout/layout';
import Seo from '@components/seo/seo';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <>
      <Seo
        title="Error"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="Error"
      />
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl">خطای داخلی پیش آمده</h1>
          <Link href="/">بازگشت</Link>
        </div>
      </div>
    </>
  );
}

ErrorPage.Layout = Layout;

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
