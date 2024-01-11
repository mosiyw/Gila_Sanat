import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import type { FC } from 'react';
import cn from 'classnames';
import Link from '@components/ui/link';
import useWindowSize from '@utils/use-window-size';
import HeroSearchBox from '@components/hero/hero-banner-search';
import { useTranslation } from 'next-i18next';
import SimpleImageSlider from 'react-simple-image-slider';
import banner2 from '../../../public/assets/images/banner/Ronix-banner.jpg';

// ... rest of your imports

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24',
  variant = 'default',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const { title, description, image } = banner;

  const images = [{ url: `${banner2.src}` }, { url: `${banner2.src}` }];

  return (
    <div className="relative mb-5 lg:h-[45vh] h-[25vh] md:h-[20vh] lg:pt-5 pt-[2%] md:pt-[3%] pl-[3%] pr-[3%] mb-[6%]">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img.url}
              className="lg:h-[45vh] h-[25vh] md:h-[20vh] object-cover object-center rounded-xl"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBannerCard;
