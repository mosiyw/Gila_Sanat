import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  item: any;
  href: LinkProps['href'];
  className?: string;
}

const StoryCard: React.FC<Props> = ({ item, href, className }) => {
  const { t } = useTranslation('common');
  const { name, image } = item ?? {};
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <Link
      href={href}
      className={cn('group block w-full text-center', className)}
    >
      <div className="flex md:w-[6vw] md:h-[6vw] w-[20vw] h-[20vw] mb-1 xl:mb-1 mx-auto rounded-full overflow-hidden bg-fill-thumbnail border-4 border-pink-500">
        <div
          className={`flex shrink-0 w-full h-full ${
            dir === 'rtl'
              ? 'translate-x-full group-hover:translate-x-0'
              : '-translate-x-full group-hover:translate-x-0'
          }`}
        >
          <Image
            src={image?.original ?? categoryPlaceholder}
            alt={name || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-full"
          />
        </div>
        <div
          className={`flex shrink-0 w-full h-full ${
            dir === 'rtl'
              ? 'translate-x-full group-hover:translate-x-0'
              : '-translate-x-full group-hover:translate-x-0'
          }`}
        >
          <Image
            src={image?.original ?? categoryPlaceholder}
            alt={name || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
