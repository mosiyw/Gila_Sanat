import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const ErrorInformation: React.FC = () => {
  const { t } = useTranslation('common');
  const backgroundThumbnail = '/assets/images/404-bg.png';
  const errorThumbnail = '/assets/images/404.png';
  return (
    <div className="flex items-center justify-center px-12 py-16 text-center bg-center bg-no-repeat bg-cover sm:py-20 lg:py-24 xl:py-32">
      <div className="max-w-md xl:max-w-lg">
        <Image
          src={errorThumbnail}
          alt={t('error-heading')}
          width={150}
          height={150}
        />

        <h2 className="pt-5 text-6xl font-bold md:text-7xl 2xl:text-8xl text-brand-dark xl:pt-9">
          {t('error-heading')}
        </h2>
        <p className="text-15px md:text-base 2xl:text-[18px] leading-7 md:leading-8 pt-4 font-medium">
          {t('error-sub-heading')}
        </p>
      </div>
    </div>
  );
};

export default ErrorInformation;
