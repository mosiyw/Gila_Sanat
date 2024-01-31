import { type ToasterProps } from 'react-hot-toast';

export const hotToastSetting: ToasterProps = {
  toastOptions: {
    className: 'hot-toast',
    duration: 5000,
    position: 'top-right',
    success: {
      className: 'hot-toast hot-toast-success',
      duration: 3000,
    },
    error: {
      className: 'hot-toast hot-toast-error',
    },
  },
};
