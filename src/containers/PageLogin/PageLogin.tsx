import { postLogin } from 'api/auth';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import { LoginPayload } from 'types/payload/login';
import { LoginResponse } from 'types/response/login';
import { toastSuccess } from 'utils/toast';
import { setCurrentUser, setToken } from '../../states/userSlice';

export interface PageLoginProps {
  className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginPayload>();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation<
    LoginResponse | null,
    Error,
    LoginPayload
  >({
    mutationFn: postLogin,
    onSuccess: (response) => {
      if (response) {
        if(response.user.user_profile){
          response.user.user_profile = process.env.REACT_APP_BACKEND_URL +response.user.user_profile 
        }
        dispatch(setCurrentUser(response.user));
        dispatch(
          setToken({ access: response.access, refresh: response.refresh })
        );
        navigate('/');
        toastSuccess('Succesfully logged in!');
      }
    },
  });
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
    
      <div className="container pb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input
                {...register('password', {
                  required: 'Password is required to login!',
                })}
                type="password"
                className="mt-1"
              />
            </label>
            <ButtonPrimary loading={isLoading} type="submit">
              Login
            </ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup" className='text-primary-500 dark:text-primary-400'>Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
