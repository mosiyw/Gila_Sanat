import { useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@components/common/modal/modal.context';
import { formatAddress } from '@utils/format-address';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import addressIcon from '../../../public/assets/images/address/addressIcon.svg';
import mailIcon from '../../../public/assets/images/address/mailIcon.svg';
import phoneIcon from '../../../public/assets/images/address/phoneIcon.svg';
import userIcon from '../../../public/assets/images/address/userIcon.svg';
const AddressGrid: React.FC<{ address?: any }> = ({ address }) => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  function handlePopupView(item: any) {
    openModal('ADDRESS_VIEW_AND_EDIT', item);
  }

  address = address || [];

  const [selected, setSelected] = useState(address[0]);
  return (
    <div
      className="flex flex-col justify-between h-full -mt-4 text-18px md:mt-0 "
      dir="rtl"
    >
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="space-y-4 md:grid md:grid-cols-2 md:gap-5 auto-rows-auto md:space-y-0"
      >
        <RadioGroup.Label className="sr-only">{t('address')}</RadioGroup.Label>
        {address?.length > 0 ? (
          address?.map((item: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={item}
              className={({ checked }) =>
                `${checked ? 'border-brand' : 'border-border-base'}
                  border-2 relative focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box`
              }
            >
              <RadioGroup.Label
                as="h4"
                className="mb-2 -mt-1 font-semibold text-brand-dark "
              >
                {formatAddress(item?.address)}
              </RadioGroup.Label>
              <div className="flex items-center mb-1 leading-6 text-brand-muted">
                <Image src={addressIcon.src} width={18} height={18} />
                <RadioGroup.Description className="mr-1.5" as="div">
                  {item?.state} - {item?.city}
                </RadioGroup.Description>
              </div>

              <div className="flex items-center mb-1 leading-6 text-brand-muted">
                <Image src={mailIcon.src} width={18} height={18} />
                <RadioGroup className="mr-1.5" as="p">
                  {item.zipcode}
                </RadioGroup>
              </div>

              <div className="flex items-center mb-1 leading-6 text-brand-muted">
                <Image src={userIcon.src} width={18} height={18} />
                <RadioGroup className="mr-1.5" as="p">
                  {item?.transferee?.full_name}
                </RadioGroup>
              </div>

              <div className="flex items-center mb-1 leading-6 text-brand-muted">
                <Image src={phoneIcon.src} width={18} height={18} />
                <RadioGroup as="p" className="mr-1.5">
                  {item?.transferee?.phone_number}
                </RadioGroup>
              </div>
              <div className="absolute z-10 flex transition-all bottom-3 left-3 lg:opacity-0 address__actions">
                <button
                  onClick={() => handlePopupView(item)}
                  className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80"
                >
                  <span className="sr-only">{t(item?.title)}</span>
                  <TiPencil />
                </button>
              </div>
            </RadioGroup.Option>
          ))
        ) : (
          <div className="border-2 border-border-base rounded font-semibold p-5 px-10 text-brand-danger flex justify-start items-center min-h-[112px] h-full">
            {t('text-no-address-found')}
          </div>
        )}
        <button
          className="w-full border-2 transition-all border-border-base rounded font-semibold p-5 px-10 cursor-pointer text-brand flex justify-start hover:border-brand items-center min-h-[112px] h-full"
          onClick={handlePopupView}
        >
          <AiOutlinePlus size={18} className="ltr:mr-2 rtl:ml-2" />
          {t('text-add-address')}
        </button>
      </RadioGroup>

      <div className="flex mt-5 sm:justify-end md:mt-10 lg:mt-20 save-change-button">
        <Button className="w-full sm:w-auto">{t('button-save-changes')}</Button>
      </div>
    </div>
  );
};

export default AddressGrid;
