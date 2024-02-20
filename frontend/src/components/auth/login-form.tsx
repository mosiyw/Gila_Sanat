import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import CloseButton from '@components/ui/close-button';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Logo from '@components/ui/logo';
import Switch from '@components/ui/switch';
import { useLoginMutation } from '@framework/auth/use-login';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

interface LoginInputType1 {
  phone_number: string;
  password: string;
  remember_me: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const { mutate: login, isLoading } = useLoginMutation();
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType1>();

  const onSubmit = ({ phone_number, password }: LoginInputType1) => {
    login({
      phone_number,
      password,
      remember_me: remember,
    });
    // closeModal();
  };

  const handleSignUp = () => openModal('SIGN_UP_VIEW');

  const handleForgetPassword = () => openModal('FORGET_PASSWORD');

  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[70vw] xl:w-[45vw] 2xl:w-[45vw] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="flex flex-col justify-center w-full px-4 py-6 rounded-md sm:py-10 sm:px-8 md:px-6 lg:px-8 xl:px-12">
          <div className="mb-6 text-center">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:login-to-your-account')}
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-15px text-body">
              {t('common:text-don’t-have-account')}
              <button
                type="button"
                className="text-sm font-semibold text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
                onClick={handleSignUp}
              >
                {t('common:text-create-account')}
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              {/* <Input
                label={t('label-email')}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.email?.message}
              /> */}
              <Input
                label={t('forms:label-phone-number')}
                type="tel"
                variant="solid"
                className="text-right"
                {...register('phone_number', {
                  required: `${t('forms:phone-number-required')}`,
                  pattern: {
                    value: /^(\+\d{1,3}[- ]?)?\d{11}$/,
                    message: t('forms:phone-number-error'),
                  },
                })}
                error={errors.phone_number?.message} // Corrected here
              />
              <PasswordInput
                label={t('forms:label-password')}
                className="text-right"
                error={errors.password?.message}
                {...register('password', {
                  required: `${t('forms:password-required')}`,
                })}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    htmlFor="remember"
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    {t('common:text-forgot-password')}
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-sign-in')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
