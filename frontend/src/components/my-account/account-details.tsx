import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Heading from '@components/ui/heading';
import { useProfileQuery } from '@framework/auth/use-profile';
import {
  UpdateUserType,
  useUpdateUserMutation,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {};

const AccountDetails: React.FC = () => {
  const { data: userProfile } = useProfileQuery();
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  useEffect(() => {
    setValue('firstName', userProfile?.user.username || '');
    setValue('phoneNumber', userProfile?.user.phone_number || '');
  }, [userProfile, setValue]);

  const onSubmit = (input: UpdateUserType) => {
    updateUser(input);
  };
  return (
    <div className="flex flex-col w-full">
      <Heading
        dir="rtl"
        variant="titleLarge"
        className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1"
      >
        {t('common:text-account-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        {/* personal information */}
        <div
          dir="rtl"
          className="border-b border-border-base pb-7 md:pb-8 lg:pb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <Input
              label={t('forms:label-first-name')}
              {...register('firstName', {
                required: 'forms:first-name-required',
              })}
              variant="solid"
              className="!w-full sm:w-1/2 px-1.5 md:px-2.5"
              error={errors.firstName?.message}
            />
            <Input
              label={t('forms:label-last-name')}
              {...register('lastName', {
                required: 'forms:last-name-required',
              })}
              variant="solid"
              className="!w-full sm:w-1/2 px-1.5 md:px-2.5"
              error={errors.lastName?.message}
            />
            <Input
              type="tel"
              label={t('forms:label-phone')}
              {...register('phoneNumber', {
                required: 'forms:phone-required',
              })}
              variant="solid"
              className="!w-full sm:w-1/2 px-1.5 md:px-2.5"
              error={errors.phoneNumber?.message}
            />
          </div>
        </div>

        <Heading
          dir="rtl"
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          {t('common:text-account-details-account')}
        </Heading>

        {/* password form */}
        <div
          dir="rtl"
          className="border-b border-border-base pb-7 md:pb-9 lg:pb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <Input
              type="email"
              label={t('forms:label-email-star')}
              {...register('email', {
                required: 'forms:email-required',
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'forms:email-error',
                },
              })}
              variant="solid"
              className="!w-full sm:w-1/2  px-1.5 md:px-2.5"
              error={errors.email?.message}
            />
            <PasswordInput
              type="tel"
              label={t('forms:label-password')}
              {...register('password', {
                required: 'forms:password-required',
              })}
              className="!w-full sm:w-1/2 px-1.5 md:px-2.5"
              error={errors.password?.message}
            />
            <PasswordInput
              label={t('forms:label-confirm-password')}
              {...register('confirmPassword', {
                required: 'forms:password-required',
              })}
              error={errors.confirmPassword?.message}
              className="!w-full sm:w-1/2 px-1.5 md:px-2.5"
            />
          </div>
        </div>

        {/* <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-ads-performance')}
            </Heading>
            <Text variant="small">
              {t('common:text-ads-performance-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="setAdsPerformance"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div> */}

        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
