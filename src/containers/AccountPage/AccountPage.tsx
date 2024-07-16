import api from 'api/api';
import endpoints from 'api/endpoint';
import Label from 'components/Label/Label';
import { createRef, FC, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'shared/Avatar/Avatar';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import { StoreState } from 'states/store';
import { upsertUser } from 'states/userSlice';
import { UpdateUserPayload } from 'types/payload/update-user';
import { UpdateUserResponse } from 'types/response/update-user';
import { objectToFormData } from 'utils/objectUtil';
import { toastSuccess } from 'utils/toast';
import CommonLayout from './CommonLayout';
import { toTitleCase } from 'utils/strUtil';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import { Link } from 'react-router-dom';
import { LoadingScreen } from 'containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage';

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = '' }) => {
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);
  const user = useSelector((store: StoreState) => store.user.current);
  const dispatch = useDispatch();
  const submitBtnRef = createRef<HTMLButtonElement>();

  const { register, handleSubmit, setValue, getValues } =
    useForm<UpdateUserPayload>({
      defaultValues: {
        username: user?.username,
      },
    });
  const { mutate, isLoading } = useMutation<
    UpdateUserResponse | null,
    Error,
    UpdateUserPayload
  >({
    mutationFn: async (payload) =>
      api.mutateBackend(
        endpoints.auth.update,
        objectToFormData(payload),
        undefined,
        true
      ),
    onSuccess: (response) => {
      if (response) {
        toastSuccess('Succesfully change profile!');
        dispatch(
          upsertUser({
            username: response.username,
            user_profile: response.user_profile,
          })
        );
      }
    },
  });
  const getFileUrl = (): string | undefined => {
    const file = getValues('user_profile');
    if (file) {
      return URL.createObjectURL(file);
    }
    if (user && user.user_profile) {
      return user.user_profile;
    }
  };
  return (
    user?<div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <CommonLayout>
        <form
          onSubmit={handleSubmit((e) => {
            mutate(e);
          })}
          className="space-y-6 sm:space-y-8"
        >
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account infomation</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex items-center justify-center sm:justify-normal sm:items-start">
              <div className="relative rounded-full overflow-hidden flex">
                <Avatar imgUrl={getFileUrl()} sizeClass="w-32 h-32" />
                <div
                  className={`
                  ${isMouseEnter ? 'opacity-100' : 'opacity-0'}
                absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer`}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="mt-1 text-xs">Change Image</span>
                </div>
                <input
                  onChange={(e) => {
                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                      setValue('user_profile', e.currentTarget.files[0]);
                      if(submitBtnRef.current){
                        submitBtnRef.current.click();
                      }
                    }
                  }}
                  onMouseEnter={() => setIsMouseEnter(true)}
                  onMouseLeave={() => setIsMouseEnter(false)}
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="sm:flex md:hidden hidden ml-3 max-w-[250px] w-full flex-col gap-2 mt-8">
                <Link className='w-full' to={'/portofolio'}>
                  <ButtonPrimary className='w-full'>Portofolio Map</ButtonPrimary>
                </Link>
                <Link className='w-full'  to={'/my-property'}>
                  <ButtonSecondary className='w-full'>All Properties</ButtonSecondary>
                </Link>
              </div>
            </div>

            <div className="sm:hidden flex ml-0 md:ml-3 w-full flex-col gap-2 mt-8">
              <Link className='w-full' to={'/portofolio'}>
                <ButtonPrimary className='w-full'>Portofolio Map</ButtonPrimary>
              </Link>
              <Link className='w-full'  to={'/my-property'}>
                <ButtonSecondary className='w-full'>All Properties</ButtonSecondary>
              </Link>
            </div>

            <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
              <div>
                <Label>Username</Label>
                <Input
                  {...register('username', {
                    required: 'Username is required to register!',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters',
                    },
                  })}
                  disabled
                  className="mt-1.5"
                />
              </div>
              {/* <div>
                <Label>Email</Label>
                <Input value={user?.username} disabled className="mt-1.5" />
              </div> */}
              <div>
                <Label>Phone</Label>
                <Input value={user?.phone} disabled className="mt-1.5" />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={toTitleCase(user?.role!)} disabled className="mt-1.5" />
              </div>

              <div className="pt-2">
                <button hidden type="submit" ref={submitBtnRef}>submit</button>
                <ButtonPrimary  loading={isLoading}>Update info</ButtonPrimary>
              </div>
            </div>
          </div>
        </form>
      </CommonLayout>
    </div>: <AccountLoadingScreen />
  );
};

export default AccountPage;


export const AccountLoadingScreen = ()=>{
  return (
        <div className="flex gap-2 sm:flex-row flex-col">
          <div className="w-full h-[250px] bg-slate-200 dark:bg-slate-400 animate-pulse rounded-xl"></div>
        </div>
  )
}