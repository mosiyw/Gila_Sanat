import cn from 'classnames';
import type { FC } from 'react';
interface ProductWishlistProps {
  element?: any;
  className?: string;
}
const ProductWishlistGrid: FC<ProductWishlistProps> = ({
  element,
  className = '',
}) => {
  const limit = 35;

  return (
    <div className={cn(className)}>
      {/* {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading && !data?.length
            ? Array.from({ length: 35 }).map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
        </div>
      )} */}
    </div>
  );
};

export default ProductWishlistGrid;
