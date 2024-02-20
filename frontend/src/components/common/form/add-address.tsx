/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import CitySelect, { Option } from '@components/ui/form/city-select';
import Input from '@components/ui/form/input';
import StateSelect from '@components/ui/form/state-select';
import Heading from '@components/ui/heading';
import rest from '@framework/utils/rest';
import { useTranslation } from 'next-i18next';
import citieslist from 'public/locales/fa/city.json';
import stateslist from 'public/locales/fa/states.json';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
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

  const mutation = useMutation((values: ContactFormValues) =>
    rest.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}/address/add`, {
      state: values.state.name,
      city: values.city.name,
      address: values.postal_address,
      zipcode: values.zipcode,
      transferee: {
        full_name: values.fullname,
        phone_number: values.phone_number,
      },
    })
  );
  const { isLoading } = mutation;
  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({});

  const onSubmit = (values: ContactFormValues, e: any) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success('آدرس با موفقیت اضافه شد');
        closeModal();
      },
      onError: () => {
        toast.error('خطا در اضافه کردن آدرس');
      },
    });
  };
  const statesList = useMemo(
    () =>
      stateslist.map((state) => ({
        name: state.name,
        value: String(state.id),
      })),
    [stateslist]
  );

  const [selectedProvince, setSelectedProvince] = useState<number>();

  const stateCities = useMemo(() => {
    const provinceCities = citieslist.filter((city) => {
      const selectedProvinceCities =
        Number(city.province_id) === Number(selectedProvince);

      return selectedProvinceCities;
    });

    if (provinceCities.length !== 0) {
      const transformedArray = provinceCities.reduce((result, city) => {
        result.push({ name: city.name, value: city.slug });
        return result;
      }, [] as Option[]);

      return transformedArray;
    }

    return [];
  }, [selectedProvince]);

  useEffect(() => {
    watch((item) => {
      setSelectedProvince(item.state?.value);
    });
  }, [watch]);

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
        <div className="grid grid-cols-1 mb-6 gap-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="state"
              control={control}
              rules={{ required: 'استان خود را انتخاب کنید !' }}
              render={({ field: { onChange, name } }) => (
                <StateSelect
                  options={statesList}
                  name={name}
                  label="استان"
                  placeholder="لطفا استان خود را انتخاب کنید"
                  setValue={onChange}
                  error={errors.state && errors.state.message}
                />
              )}
            />

            <Controller
              name="city"
              control={control}
              rules={{ required: 'شهر خود را انتخاب کنید !' }}
              render={({ field: { onChange, name } }) => (
                <CitySelect
                  options={stateCities}
                  name={name}
                  label="شهر"
                  placeholder="لطفا شهر خود را انتخاب کنید"
                  setValue={onChange}
                  error={errors.city && errors.city.message}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <div className="flex flex-row-reverse w-full">
          <Button
            className="h-11 md:h-12 mt-1.5 w-full sm:w-auto text-left"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ImSpinner2 className="w-5 h-5 animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 " />
            ) : (
              t('common:text-save-address')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
