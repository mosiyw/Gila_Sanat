import { useModalAction } from '@components/common/modal/modal.context';
import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/api-endpoints';
import { RestErrorType } from '@framework/types';
import rest from '@framework/utils/rest';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { LoginType } from './types';

export const postLogin = (
  input: LoginType['payload']
): Promise<LoginType['response']> => rest.post(API_ENDPOINTS.LOGIN, input);

export const useLoginMutation = () => {
  const { authorize } = useUI();
  const { closeModal } = useModalAction();

  return useMutation((input: LoginType['payload']) => postLogin(input), {
    onSuccess: (data) => {
      toast(data.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data: RestErrorType) => {
      toast(data.error, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  });
};
