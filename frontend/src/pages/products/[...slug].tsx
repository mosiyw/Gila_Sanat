import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import Seo from '@components/seo/seo';
import Breadcrumb from '@components/ui/breadcrumb';
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { fetchProductSsr } from '@framework/product/get-product';
import { ProductType } from '@framework/product/types';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Props {
  data: ProductType['response'];
}

export default function ProductPage({ data }: Props) {
  return (
    <>
      <Seo title={data.name} description={data.description} path="products" />

      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container className="!px-12">
          <Breadcrumb />
          <ProductSingleDetails product={data} />
        </Container>
      </div>

      {/* <RelatedProductFeed uniqueKey="related-products" /> */}
      {/* <OnSalesProductFeed /> */}
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const translate = await serverSideTranslations(locale!, [
    'common',
    'forms',
    'menu',
    'footer',
  ]);

  if (params && params.slug) {
    const productID = params?.slug[0];

    try {
      const product = await fetchProductSsr(productID);

      return {
        props: {
          data: {
            ...product.data,
          },
          ...translate,
        },
      };
    } catch (error) {
      const { response } = error as AxiosError;

      if (response && response.status === 404) {
        return {
          notFound: true,
        };
      }

      return {
        props: {},
        redirect: {
          destination: '/error',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      ...translate,
    },
  };
};
