import Label from "components/Label/Label";
import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import api from "api/api";
import { toastSuccess } from "utils/toast";
import endpoints from "api/endpoint";
import { useMutation } from "react-query";
import { ForgotPasswordRequestPayload } from "types/payload/forgot-password-request";
import { useForm } from "react-hook-form";
import { UZBEKISTAN_EXTENSION } from "data/uzbekistan";
import { ForgotPasswordPayload } from "types/payload/forgot-password";

const AccountPass = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordRequestPayload>();
  const { register: registerForgotPassword, handleSubmit: handleSubmitForgotPassword, setValue: setValueForgotPassword } = useForm<ForgotPasswordPayload>();
  const { mutate: mutateForgotPassword, isLoading: isLoadingForgotPassword } = useMutation<
    any,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: (payload) => api.mutateBackend(endpoints.auth.forgotPassword, payload),
    onSuccess: (response) => {
        window.location.reload();
        toastSuccess('Password has been changed!');
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
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          {!isSuccess ?
          <form
          onSubmit={handleSubmit((e) => mutate(e))}
          className="grid grid-cols-1 gap-6 max-w-[600px]"
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
                   className="grid grid-cols-1 gap-6 max-w-[600px]"
                   >
                     <label className="block">
                       <span className="text-neutral-800 dark:text-neutral-200">
                       SMS Verification Code
                       </span>
                       <Input
                         {...registerForgotPassword('otp', {
                           required: 'SMS Verification Code is required to change password!',
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
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
