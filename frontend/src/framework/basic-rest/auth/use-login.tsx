import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { LoginType } from './types';

const postLogin = (
  input: LoginType['payload']
): Promise<LoginType['response']> => http.post(API_ENDPOINTS.LOGIN, input);

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();

  return useMutation((input: LoginType['payload']) => postLogin(input), {
    onSuccess: (data) => {
      console.log(data);

      toast(data.message, {
        progressClassName: 'fancy-progress-bar',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      Cookies.set('auth_token', data.token);
      // authorize();
      // closeModal();
    },
    onError: (error) => {
      console.log(error);

      // toast(error, {
      //   progressClassName: 'fancy-progress-bar',
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });
    },
  });
};
