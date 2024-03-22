import Container from '@components/ui/container';
import Image from '@components/ui/image';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'next-i18next';

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = () => {
  const { t } = useTranslation('footer');

  return (
    <div className="pb-20 lg:pb-7">
      <Container>
        <div className="flex justify-center flex-col pt-6 text-center border-t  md:justify-between border-border-three lg:pt-7">
          <p className="text-center text-brand-dark text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &nbsp;{t('text-copyright')} &nbsp;
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
