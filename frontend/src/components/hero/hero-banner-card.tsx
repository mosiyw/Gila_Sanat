// @ts-nocheck
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import type { FC } from 'react';
import banner2 from '../../../public/assets/images/banner/Ronix-banner.jpg';
import arrowForward from '../../../public/assets/images/carousel/arrow-ios-forward.svg';
import arrowBack from '../../../public/assets/images/carousel/arrow-ios-back.svg';
import Image from 'next/image';

// ... rest of your imports

const HeroBannerCard: FC<BannerProps> = ({
  banner,
  className = 'py-20 xy:pt-24',
  variant = 'default',
}) => {
  const images = [{ url: `${banner2.src}` }, { url: `${banner2.src}` }];

  return (
    <div
      className="relative mb-5 lg:h-[45vh] h-[25vh] md:h-[20vh] lg:pt-5 pt-[2%] md:pt-[3%] pl-[2%] pr-[2%] mb-[6%] "
      style={{ borderRadius: '20 px' }}
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 15px)',
                left: 15,
              }}
            >
              <Image
                src={arrowBack.src}
                width={25}
                height={25}
                alt="arrow forward"
              />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                zIndex: 2,
                top: 'calc(50% - 15px)',
                right: 15,
              }}
            >
              <Image
                src={arrowForward.src}
                width={25}
                height={25}
                alt="arrow forward"
              />
            </button>
          )
        }
      >
        {images.map((img, index) => (
          <div key={index} className="p-1.5">
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
