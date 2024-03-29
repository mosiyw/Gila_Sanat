// @ts-nocheck
import CategoryCard from '@components/cards/category-card';
import SectionHeader from '@components/common/section-header';
import Alert from '@components/ui/alert';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import { useBrandsQuery } from '@framework/brand/get-all-brands';
import { LIMITS } from '@framework/utils/limits';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface brandsProps {
  className?: string;
}
const breakpoints = {
  '1640': {
    slidesPerView: 10,
    spaceBetween: 24,
  },
  '1280': {
    slidesPerView: 10,
    spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  '530': {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  '0': {
    slidesPerView: 4,
    spaceBetween: 15,
  },
};

const CategoryGridBlock: React.FC<brandsProps> = ({
  className = 'mb-12 md:pt-3 lg:pt-0 3xl:pb-2 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16 ',
}) => {
  const { width } = useWindowSize();

  const { data, isLoading, error } = useBrandsQuery({
    limit: LIMITS.brands_LIMITS,
  });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="محبوب ترین برند های فروشگاه"
        sectionSubHeading="!محصول مورد نظر خود را بر اساس برند جستحو کنید"
        headingPosition="center"
      />
      <div
        className="block 2xl:flex justify-center flex-wrap 3xl:-mx-3.5"
        dir="rtl"
        style={{
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {error ? (
          <Alert message={error?.message} className="mb-14 3xl:mx-3.5" />
        ) : width! < 1536 ? (
          <Carousel
            breakpoints={breakpoints}
            buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
          >
            {isLoading && !data
              ? Array.from({ length: 16 }).map((_, idx) => {
                  return (
                    <SwiperSlide key={`category-key-${idx}`}>
                      <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
                    </SwiperSlide>
                  );
                })
              : data?.brands?.data?.slice(0, 16)?.map((category) => (
                  <SwiperSlide key={`category--key-${category.id}`}>
                    <CategoryCard
                      item={category}
                      href={{
                        pathname: ROUTES.SEARCH,
                        query: { category: category.slug },
                      }}
                    />
                  </SwiperSlide>
                ))}
          </Carousel>
        ) : isLoading && !data ? (
          Array.from({ length: 16 }).map((_, idx) => {
            return (
              <div
                key={`category-card-${idx}`}
                className="shrink-0 lg:px-3.5 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
              >
                <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
              </div>
            );
          })
        ) : (
          data?.brands?.data?.slice(0, 16).map((category) => (
            <CategoryCard
              key={`category--key-${category.id}`}
              item={category}
              href={{
                pathname: ROUTES.SEARCH,
                query: { category: category.slug },
              }}
              className="shrink-0 2xl:px-3.5 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryGridBlock;
