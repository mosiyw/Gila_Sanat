import { usePopcornJerkyProductsQuery } from '@framework/product/get-all-popcorn-jerky-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@framework/utils/limits';

export default function OnSalesProductFeed() {
  const { data, isLoading, error } = usePopcornJerkyProductsQuery({
    limit: LIMITS.POPCORN_JERKY_PRODUCTS_LIMITS,
  });
  return (
    <ProductsCarousel
      sectionHeading="text-onSale-products"
      categorySlug={ROUTES.PRODUCTS}
      products={data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.POPCORN_JERKY_PRODUCTS_LIMITS}
      uniqueKey="onSale-products"
    />
  );
}
