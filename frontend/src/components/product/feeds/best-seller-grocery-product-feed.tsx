import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import { LIMITS } from '@framework/utils/limits';
import type { FC } from 'react';
import ProductsGridBlock from '../products-grid-block';

interface ProductFeedProps {
  className?: string;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useBestSellerGroceryProductsQuery({
    limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  });

  return (
    <ProductsGridBlock
      sectionHeading="text-best-sellers"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={data}
      rowlimit={'oneLine'}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
    />
  );
};

export default BestSellerGroceryProductFeed;
