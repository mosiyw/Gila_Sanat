import Countdown from '@components/common/countdown';
import HighlightedBar from '@components/common/highlighted-bar';
import Image from '@components/ui/image';
import { layoutSetting } from '@settings/layout-settting';
import { useTranslation } from 'next-i18next';
import { useSessionStorage } from 'react-use';

function HighlightedBarComponent() {
  const { t } = useTranslation('common');

  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'highlightedBar',
    true
  );

  return (
    <>
      {layoutSetting.showHighlightedBar && highlightedBar === true && (
        <HighlightedBar onClose={() => setHighlightedBar(false)}>
          <div className="flex items-center">
            <div className="hidden sm:flex shrink-0 items-center justify-center bg-brand-light w-9 h-9 rounded-full ltr:mr-2.5 rtl:ml-2.5">
              <Image
                width={23}
                height={23}
                src="/assets/images/delivery-box.svg"
                alt="Delivery Box"
              />
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: t('text-highlighted-bar'),
              }}
            />
          </div>
          <Countdown date={Date.now() + 4000000 * 71} />
        </HighlightedBar>
      )}
    </>
  );
}

export default HighlightedBarComponent;
