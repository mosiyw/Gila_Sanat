import { useEffect, useState } from 'react';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { Product } from '@framework/types';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import dynamic from 'next/dynamic';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  limit?: number | 'oneLine';
  uniqueKey?: string;
}

const breakpoints = {
  '1640': {
    slidesPerView: 5,
    spaceBetween: 16,
  },
  '1280': {
    slidesPerView: 5,
    spaceBetween: 16,
  },
  '1024': {
    slidesPerView: 5,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '530': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '0': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
};

const ProductsGridBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  products,
  loading,
  error,
  limit,
  uniqueKey,
}) => {
  const { width } = useWindowSize();

  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
        sectionSubHeading={sectionSubHeading}
        headingPosition={headingPosition}
      />
      {error ? (
        <Alert message={error} className="mb-14 3xl:mx-3.5" />
      ) : width! < 1536 ? (
        <Carousel
          autoplay={true}
          breakpoints={breakpoints}
          buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
        >
          {loading && !products
            ? Array.from({ length: limit! }).map((_, idx) => (
                <SwiperSlide key={`${uniqueKey}-${idx}`}>
                  <ProductCardLoader
                    key={`${uniqueKey}-${idx}`}
                    uniqueKey={`${uniqueKey}-${idx}`}
                  />
                </SwiperSlide>
              ))
            : products?.map((product: any) => (
                <SwiperSlide
                  key={`${uniqueKey}-${product._id}`}
                  className="lg:px-[1vw]"
                >
                  <ProductCard
                    key={`${uniqueKey}-${product._id}`}
                    product={product}
                  />
                </SwiperSlide>
              ))}
        </Carousel>
      ) : (
        <>
          {products?.map((product: any) => (
            <ProductCard
              key={`${uniqueKey}-${product._id}`}
              product={product}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ProductsGridBlock;
