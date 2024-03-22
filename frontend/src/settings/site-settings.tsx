import { USFlag } from '@components/icons/language/USFlag';

export const siteSettings = {
  name: 'Gila Sanat',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'RedQ, Inc.',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.svg',
    alt: 'BoroBazar',
    href: '/',
    width: 150,
    height: 40,
  },
  defaultLanguage: 'fa',
  currencyCode: 'IRT',
  site_header: {
    menu: [
      // {
      //   id: 1,
      //   path: '/',
      //   label: 'menu-pages',
      //   subMenu: [
      //     {
      //       id: 1,
      //       path: '/',
      //       label: 'menu-users',
      //       subMenu: [
      //         {
      //           id: 1,
      //           path: '/my-account/account-settings',
      //           label: 'menu-my-account',
      //         },
      //         {
      //           id: 2,
      //           path: '/signin',
      //           label: 'menu-sign-in',
      //         },
      //         {
      //           id: 3,
      //           path: '/signup',
      //           label: 'menu-sign-up',
      //         },
      //       ],
      //     },
      //     {
      //       id: 4,
      //       path: '/privacy',
      //       label: 'menu-privacy-policy',
      //     },
      //     {
      //       id: 5,
      //       path: '/terms',
      //       label: 'menu-terms-condition',
      //     },
      //     {
      //       id: 7,
      //       path: '/checkout',
      //       label: 'menu-checkout',
      //     },
      //     {
      //       id: 8,
      //       path: '/404',
      //       label: 'menu-404',
      //     },
      //   ],
      // },
      {
        id: 1,
        path: '/faq',
        label: 'menu-faq',
      },
      {
        id: 2,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 3,
        path: '/cooperation-in-sales/',
        label: 'menu-cooperation',
      },
    ],
    languageMenu: [
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'fa',
        name: 'فارسی',
        value: 'fa',
        icon: <USFlag />,
      },
    ],
  },
};
