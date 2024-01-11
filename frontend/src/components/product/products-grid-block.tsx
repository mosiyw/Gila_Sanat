import { useEffect, useState } from 'react';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { Product } from '@framework/types';
import Alert from '@components/ui/alert';

interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  limit?: number;
  rowlimit?: 'oneLine';
  uniqueKey?: string;
}

const ProductsGridBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  products,
  loading,
  error,
  limit,
  rowlimit,
  uniqueKey,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth > 768);
    }
  }, []);

  const displayedProducts =
    rowlimit === 'oneLine'
      ? isDesktop
        ? products?.slice(0, 5)
        : products?.slice(0, 6)
      : products;

  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
        sectionSubHeading={sectionSubHeading}
        headingPosition={headingPosition}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 md:gap-4 2xl:gap-5">
        {error ? (
          <Alert message={error} className="col-span-full" />
        ) : loading && !displayedProducts?.length ? (
          Array.from({ length: limit! }).map((_, idx) => (
            <ProductCardLoader
              key={`${uniqueKey}-${idx}`}
              uniqueKey={`${uniqueKey}-${idx}`}
            />
          ))
        ) : (
          <>
            {displayedProducts?.map((product: any) => (
              <ProductCard
                key={`${uniqueKey}-${product._id}`}
                product={product}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsGridBlock;
