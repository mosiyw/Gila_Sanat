import dynamic from 'next/dynamic';
import StoryCard from '@components/story/storyCard';
import SectionHeader from '@components/common/section-header';
import CategoryCardLoader from '@components/ui/loaders/category-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { ROUTES } from '@utils/routes';
import Alert from '@components/ui/alert';
import { SwiperSlide } from 'swiper/react';
import useWindowSize from '@utils/use-window-size';
import { LIMITS } from '@framework/utils/limits';
const Carousel = dynamic(() => import('@components/ui/carousel/carousel'), {
  ssr: false,
});

interface CategoriesProps {
  className?: string;
}
const breakpoints = {
  '1640': {
    slidesPerView: 9,
    spaceBetween: 24,
  },
  '1280': {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  '1024': {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  '530': {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 15,
  },
};

const StoryGridBlock: React.FC<CategoriesProps> = ({
  className = 'md:pt-3 lg:pt-0 3xl:pb-2 mb-12 sm:mb-14 md:mb-16 xl:mb-24 2xl:mb-16',
}) => {
  const { width } = useWindowSize();

  const { data, isLoading, error } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });

  return (
    <div
      className="block 2xl:flex justify-center flex-wrap 3xl:-mx-3.5 w-[96vw] p-[2vw]"
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
          autoplay={false}
          breakpoints={breakpoints}
          buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
        >
          {isLoading && !data
            ? Array.from({ length: 16 }).map((_, idx) => {
                return (
                  <SwiperSlide key={`category--key-${idx}`}>
                    <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
                  </SwiperSlide>
                );
              })
            : data?.categories?.data?.slice(0, 16)?.map((category) => (
                <SwiperSlide key={`category--key-${category.id}`}>
                  <StoryCard
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
              className="shrink-0 lg:px-2 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
            >
              <CategoryCardLoader uniqueKey={`category-card-${idx}`} />
            </div>
          );
        })
      ) : (
        data?.categories?.data?.slice(0, 16).map((category) => (
          <StoryCard
            key={`category--key-${category.id}`}
            item={category}
            href={{
              pathname: ROUTES.SEARCH,
              query: { category: category.slug },
            }}
            className="shrink-0 2xl:px-2 2xl:w-[12.5%] 3xl:w-1/9 mb-12"
          />
        ))
      )}
    </div>
  );
};

export default StoryGridBlock;
