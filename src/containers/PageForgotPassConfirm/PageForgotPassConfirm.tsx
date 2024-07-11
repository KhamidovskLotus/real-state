import { postLogin } from 'api/auth';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import { LoginPayload } from 'types/payload/login';
import { LoginResponse } from 'types/response/login';
import { toastSuccess } from 'utils/toast';
import { setCurrentUser, setToken } from '../../states/userSlice';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { ForgotPasswordRequestPayload } from 'types/payload/forgot-password-request';
import { ForgotPasswordPayload } from 'types/payload/forgot-password';

export interface PageForgotPassConfirmProps {
  className?: string;
}

const PageForgotPassConfirm: FC<PageForgotPassConfirmProps> = ({ className = '' }) => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ForgotPasswordPayload>();
  const { mutate, isLoading, isSuccess } = useMutation<
    any,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: (payload) => api.mutateBackend(endpoints.auth.forgotPassword, payload),
    onSuccess: () => {
        toastSuccess('Succesfully change your password!');
        navigate('/login')
    },
  });

  // useEffect(() => {
  //   if(uidb64 && token){
  //     setValue('token', token)
  //     setValue('uidb64', uidb64)
  //   }
  // }, [uidb64, token])

  return (
    <div className={`nc-PageForgotPass ${className}`} data-nc-id="PageForgotPass">
   
      <div className="  container mb-24 lg:mb-32">
        {!isSuccess &&
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        }
        <div className="max-w-md mx-auto space-y-6">
          <form
          onSubmit={handleSubmit((e) => mutate(e))}
            className="grid grid-cols-1 gap-6"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                New Password
              </span>
              <Input
                {...register('new_password', {
                  required: 'Password is required for your new password!',
                })}
                type="password"
                placeholder=""
                className="mt-1"
                />
            </label>
            <ButtonPrimary loading={isLoading} type="submit">
              Submit
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageForgotPassConfirm;
