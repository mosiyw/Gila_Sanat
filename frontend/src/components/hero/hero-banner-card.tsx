import type { FC } from 'react';
import cn from 'classnames';
import Link from '@components/ui/link';
import useWindowSize from '@utils/use-window-size';
import HeroSearchBox from '@components/hero/hero-banner-search';
import { useTranslation } from 'next-i18next';
import SimpleImageSlider from 'react-simple-image-slider';
import banner2 from '../../../public/assets/images/banner/Ronix-banner.jpg';

interface BannerProps {
  banner?: any;
  className?: string;
  variant?: 'default' | 'slider' | 'medium';
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24',
  variant = 'default',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  const { title, description, image } = banner;
  const selectedImage = getImage(width!, image);

  const images = [{ url: `${selectedImage.url}` }, { url: `${banner2.src}` }];
  return (
    <div className="mb-5">
      <SimpleImageSlider
        width={'100%'}
        height={'45vh'}
        images={images}
        slideDuration={1.5}
        autoPlay={true}
        autoPlayDelay={5}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};

export default HeroBannerCard;
