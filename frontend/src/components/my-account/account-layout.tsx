// @ts-nocheck
import MapIcon from '@components/icons/account-address';
import NotificationIcon from '@components/icons/account-notification';
import OrdersIcon from '@components/icons/account-order';
import SettingsIcon from '@components/icons/account-settings';
import WishlistIcon from '@components/icons/account-wishlist';
import AccountNav from '@components/my-account/account-nav';
import Container from '@components/ui/container';
import { ROUTES } from '@utils/routes';
import { IoSettingsOutline } from 'react-icons/io5';
import AccountNavMobile from './account-nav-mobile';

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'account-settings',
    icon: <SettingsIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: 'text-orders',
    icon: <OrdersIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.WISHLIST,
    name: 'text-wishlist',
    icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ADDRESS,
    name: 'text-address',
    icon: <MapIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.NOTIFICATION,
    name: 'text-notifications',
    icon: <NotificationIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: 'text-change-password',
    icon: (
      <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-[#8C969F]" />
    ),
  },
];

const AccountLayout: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <div className="border-t border-b border-border-base">
      <Container>
        <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="lg:hidden">
              <AccountNavMobile
                options={accountMenu}
                style={{ fontFamily: 'BYekan' }}
              />
            </div>
            <div className="w-full p-4 mt-4 border rounded-md lg:mt-0 border-border-base sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12">
              {children}
            </div>

            <div
              className="hidden lg:block shrink-0 w-72 xl:w-[385px] ltr:mr-7 rtl:ml-7 xl:ltr:mr-8 xl:rtl:ml-8"
              dir="rtl"
            >
              <AccountNav options={accountMenu} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountLayout;
