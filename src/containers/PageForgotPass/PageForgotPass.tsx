import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import {  useNavigate } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import { toastSuccess } from 'utils/toast';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { ForgotPasswordRequestPayload } from 'types/payload/forgot-password-request';
import { ForgotPasswordPayload } from 'types/payload/forgot-password';
import { UZBEKISTAN_EXTENSION } from 'data/uzbekistan';

export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ForgotPasswordRequestPayload>();
  const { register: registerForgotPassword, handleSubmit: handleSubmitForgotPassword, setValue: setValueForgotPassword } = useForm<ForgotPasswordPayload>();
  const { mutate: mutateForgotPassword, isLoading: isLoadingForgotPassword } = useMutation<
    any,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: (payload) => api.mutateBackend(endpoints.auth.forgotPassword, payload),
    onSuccess: (response) => {
        navigate('/login');
        toastSuccess('Password has been change!');
    },
  });
  const { mutate, isLoading, isSuccess } = useMutation<
    any,
    Error,
    ForgotPasswordRequestPayload
  >({
    mutationFn: (payload) => {
      payload.phone = UZBEKISTAN_EXTENSION + payload.phone;
      setValueForgotPassword('phone', payload.phone)
      return api.mutateBackend(endpoints.auth.forgotPasswordRequest, payload)
    },
    onSuccess: (response) => {
        setValueForgotPassword('otp', '')
        toastSuccess('Phone has been sended to your account please check it!');
    },
  });
  return (
    <div className={`nc-PageForgotPass h-full ${className}`} data-nc-id="PageForgotPass">
    
      <div className="  container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        {!isSuccess ?
          'Forgot Password' :
          'Change Password'
        }
        </h2>
        <div className="max-w-md mx-auto space-y-6">
        {!isSuccess ?
          <form
          onSubmit={handleSubmit((e) => mutate(e))}
          className="grid grid-cols-1 gap-6"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Phone number
              </span>
              <Input
                {...register('phone', {
                  required: 'Phone is required to login!',
                  maxLength: {
                    value: 9,
                    message: 'Phone Number cannot be more than 9 digits',
                  },
                })}
                component={<span className='text-sm text-slate-500 dark:text-slate-400'>+998</span>}
                type="number"
                placeholder=""
                className="pl-[3.3rem] mt-1"
                />
            </label>
            <ButtonPrimary loading={isLoading} type="submit">
              Submit
            </ButtonPrimary>
          </form>
                :
                   <form
                   onSubmit={handleSubmitForgotPassword((e) => mutateForgotPassword(e))}
                   className="grid grid-cols-1 gap-6"
                   >
                     <label className="block">
                       <span className="text-neutral-800 dark:text-neutral-200">
                       SMS Verification Code
                       </span>
                       <Input
                         {...registerForgotPassword('otp', {
                           required: 'SMS Verification Code is required to change password!',
                         })}
                         type="number"
                         placeholder=""
                         className="mt-1"
                         />
                     </label>
                     <label className="block">
                    <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                      Password
                    </span>
                    <Input
                      {...registerForgotPassword('new_password', {
                        required: 'New password is required to change password!',
                      })}
                      type="password"
                      className="mt-1"
                    />
                  </label>
                     <ButtonPrimary loading={isLoadingForgotPassword} type="submit">
                       Submit
                     </ButtonPrimary>
                   </form>
          }
        </div>
      </div>
    </div>
  );
};

export default PageForgotPass;
