// @ts-nocheck
import CategoryDropdownMenu from '@components/category/category-dropdown-menu';
import { useModalAction } from '@components/common/modal/modal.context';
import Search from '@components/common/search';
import SearchIcon from '@components/icons/search-icon';
import UserIcon from '@components/icons/user-icon';
import HeaderMenu from '@components/layout/header/header-menu';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings';
import { useAddActiveScroll } from '@utils/add-active-scroll';
import { ROUTES } from '@utils/routes';
import useOnClickOutside from '@utils/use-click-outside';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
const AuthMenu = dynamic(() => import('./auth-menu'), { ssr: false });
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { t } = useTranslation('common');
  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch,
    isAuthorized,
  } = useUI();

  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;

  const [categoryMenu, setCategoryMenu] = useState(Boolean(false));

  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 15,
  });

  useAddActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());

  const handleLogin = () => {
    openModal('LOGIN_VIEW');
  };

  const handleCategoryMenuOpen = () => {
    setCategoryMenu(true);
  };
  const handleCategoryMenuClose = () => {
    setCategoryMenu(false);
  };

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-five sticky-header sticky -top-[1px] z-20 lg:relative w-full h-16 lg:h-auto',
        displayMobileSearch && 'active-mobile-search'
      )}
      dir="rtl"
    >
      <div className="z-20 w-screen transition-all duration-200 ease-in-out innerSticky lg:w-full body-font bg-brand-light">
        <Search
          searchId="mobile-search"
          className="top-bar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-1"
        />
        {/* End of Mobile search */}
        <Container className="absolute sticky top-0 left-0 z-10 flex items-center justify-between h-16 py-3 border-b bg-brand-light top-bar lg:h-auto border-border-base">
          {/* End of Category */}

          <div className="flex items-center justify-start w-full">
            <div className="flex justify-center ">
              <Logo className="logo -mt-1.5 md:-mt-1 md:mx-auto ltr:pl-3 rtl:pr-3 md:ltr:pl-0 md:rtl:pr-0 lg:mx-0 hidden lg:flex" />
              {/* End of logo */}
            </div>

            <Search
              searchId="top-bar-search"
              className="lg:flex lg:max-w-[650px] 2xl:max-w-[800px] lg:mx-8"
              variant="fill"
            />
          </div>

          <div className="items-center justify-center hidden w-1/4 text-center ltr:ml-auto rtl:mr-auto md:ltr:ml-0 md:rtl:mr-0 lg:flex">
            <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5 ">
              <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
                <UserIcon className="text-brand-dark text-opacity-40" />
                <AuthMenu
                  isAuthorized={isAuthorized}
                  href={ROUTES.ACCOUNT}
                  btnProps={{
                    children: t('text-sign-in'),
                    onClick: handleLogin,
                  }}
                >
                  {t('text-account')}
                </AuthMenu>
              </div>
              <CartButton className="hidden lg:flex xl:mx-3.5 mx-2.5" />
            </div>
          </div>
        </Container>

        <div className=" bg-brand-light">
          <Container className="h-20 justify-between items-center py-2.5 lg:flex hidden">
            <div className="relative rtl:ml-8 shrink-0 w-1/7">
              <div
                onMouseEnter={handleCategoryMenuOpen}
                onMouseLeave={handleCategoryMenuClose}
              >
                <button className="border border-border-base rounded-md focus:outline-none shrink-0 text-15px font-medium text-brand-dark px-[18px] py-3 flex items-center transition-all hover:border-border-four ">
                  <FiMenu className="text-2xl ltr:mr-3 rtl:ml-3" />
                  {t('text-all-categories')}
                </button>
                <div className="pt-1">
                  {categoryMenu && (
                    <CategoryDropdownMenu query={{ data, loading, error }} />
                  )}
                </div>
              </div>
            </div>
            {/* <div className="relative rtl:ml-5 shrink-0">
              <button
                className="focus:outline-none shrink-0 text-15px font-medium text-brand-dark px-[18px] py-3 flex items-center transition-all hover:border-border-four "
                onClick={handleCategoryMenu}
              >
                <FiMenu className="text-2xl ltr:mr-3 rtl:ml-3" />
                {t('text-all-brands')}
              </button>
              {categoryMenu && <CategoryDropdownMenu />}
            </div> */}

            <HeaderMenu
              data={site_header.menu}
              className="flex transition-all duration-200 ease-in-out"
            />

            {displaySearch && (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-4 sticky-search">
                <Search
                  ref={siteSearchRef}
                  className="max-w-[780px] xl:max-w-[830px] 2xl:max-w-[1000px]"
                />
              </div>
            )}
            {/* End of conditional search  */}

            <div className="flex items-center ltr:ml-auto rtl:mr-auto shrink-0">
              {/* <Delivery /> */}
              <div className="flex items-center w-0 py-4 overflow-hidden transition-all duration-200 ease-in-out opacity-0 navbar-right">
                <button
                  type="button"
                  aria-label="Search Toggle"
                  onClick={() => openSearch()}
                  title="Search toggle"
                  className="flex items-center justify-center w-12 h-full transition duration-200 ease-in-out outline-none ltr:mr-6 rtl:ml-6 md:w-14 hover:text-heading focus:outline-none"
                >
                  <SearchIcon className="w-[22px] h-[22px] text-brand-dark text-opacity-40" />
                </button>
                {/* End of search handler btn */}

                <CartButton />
                {/* End of cart btn */}

                <div className="flex items-center shrink-0 ltr:ml-7 rtl:mr-7">
                  <UserIcon className="text-brand-dark text-opacity-40" />
                  <AuthMenu
                    isAuthorized={isAuthorized}
                    href={ROUTES.ACCOUNT}
                    btnProps={{
                      children: t('text-sign-in'),
                      onClick: handleLogin,
                    }}
                  >
                    {t('text-account')}
                  </AuthMenu>
                </div>
                {/* End of auth */}
              </div>
            </div>
          </Container>
        </div>
        {/* End of menu part */}
      </div>
    </header>
  );
};

export default Header;
