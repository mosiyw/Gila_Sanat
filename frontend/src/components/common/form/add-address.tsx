import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { useTranslation } from 'next-i18next';
import rest from '@framework/utils/rest';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import ListBox from '@components/ui/form/list-box';
import statelist from 'public/locales/fa/states.json';

interface ContactFormValues {
  title: string;
  default: boolean;
  lat: number;
  lng: number;
  formatted_address?: string;
  state: string;
  city: string;
  zipcode: number;
  postal_address: string;
  fullname: string;
  phone_number: string;
}

const AddAddressForm: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useModalState();

  const { closeModal } = useModalAction();

  // function onSubmit(values: ContactFormValues, e: any) {
  //   console.log(values, 'Add Address');
  // }

  // Define your mutation
  const mutation = useMutation((values: ContactFormValues) =>
    rest.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/address`, {
      state: values.state,
      city: values.city,
      address: values.postal_address,
      zipcode: values.zipcode,
      transferee: {
        full_name: values.fullname,
        phone_number: values.phone_number,
      },
    })
  );

  async function onSubmit(values: ContactFormValues, e: any) {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success('Address added successfully');
      },
      onError: () => {
        toast.error('Failed to add address');
      },
    });
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      title: data || data?.title ? data?.title : '',
      default: data || data?.default ? data?.default : '',
      formatted_address:
        data || data?.address?.formatted_address
          ? data?.address?.formatted_address
          : '',
    },
  });

  return (
    <div
      className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md"
      dir="rtl"
    >
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5 text-right">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          {/* <Input
            variant="solid"
            label="Address Title"
            {...register('title', { required: 'Title Required' })}
            error={errors.title?.message}
          /> */}
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ListBox
              options={statelist}
              label="استان"
              {...register('state', { required: 'استان را وارد کنید!' })}
              error={errors.state?.message}
            />
            <Input
              variant="solid"
              label="شهر"
              {...register('city', { required: 'شهر را وارد کنید!' })}
              error={errors.city?.message}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="number"
              variant="solid"
              label="کد پستی"
              {...register('zipcode', { required: 'کد پستی را وارد کنید!' })}
              error={errors.zipcode?.message}
            />
            <Input
              variant="solid"
              label="آدرس پستی"
              {...register('postal_address', {
                required: 'آدرس پستی را وارد کنید!',
              })}
              error={errors.postal_address?.message}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              variant="solid"
              label="نام و نام خانوادگی تحویل گیرنده"
              {...register('fullname', {
                required: 'نام و نام خانوادگی تحویل گیرنده را وارد کنید',
              })}
              error={errors.fullname?.message}
            />
            <Input
              type="text"
              variant="solid"
              label="شماره همراه تحویل گیرنده"
              {...register('phone_number', {
                required: 'شماره همراه تحوبل گیرنده را وارد کنید!',
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Only numbers are allowed',
                },
              })}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              error={errors.phone_number?.message}
            />
          </div>
        </div>
        <div className="flex w-full flex-row-reverse">
          <Button
            className="h-11 md:h-12 mt-1.5 w-full sm:w-auto text-left"
            type="submit"
          >
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
