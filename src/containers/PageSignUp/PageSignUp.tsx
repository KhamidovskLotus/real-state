import { getValue } from '@testing-library/user-event/dist/utils';
import api from 'api/api';
import endpoints from 'api/endpoint';
import { LANGUAGE_LIST } from 'components/Header/LangDropdown';
import { UZBEKISTAN_CITIES, UZBEKISTAN_EXTENSION } from 'data/uzbekistan';
import useParameter from 'hooks/useParameter';
import { FC, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Checkbox from 'shared/Checkbox/Checkbox';
import Input from 'shared/Input/Input';
import Modal from 'shared/Modal/Modal';
import MultiSelect from 'shared/MutliSelect/MultiSelect';
import OtpModal from 'shared/OtpModal/OtpModal';
import Select from 'shared/Select/Select';
import Select2 from 'shared/Select2/Select2';
import { OtpPayload } from 'types/payload/otp';
import { RegisterPayload } from 'types/payload/register';
import { OtpResponse } from 'types/response/otp';
import { RegisterResponse } from 'types/response/register';
import { stringToSelectOption } from 'utils/selectUtil';
import { toastError, toastSuccess } from 'utils/toast';

export interface PageSignUpProps {
  className?: string;
}

const PageSignUp: FC<PageSignUpProps> = ({ className = '' }) => {
  const { register, handleSubmit, getValues, setValue } = useForm<RegisterPayload>();
  const navigate = useNavigate();
  const param = useParameter();
  const [otpValue, setOtpValue] = useState<string>('');
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [openAgreementModal, setOpenAgreementModal] = useState<boolean>(false);
  const [agreement, setAgreement] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation<
    RegisterResponse | null,
    Error,
    RegisterPayload
  >({
    mutationFn: async (payload) => {
      if(!agreement){
        toastError("You need to agree to our agreement!")
        return null;
      }
      if(payload.role.toLowerCase() === 'agent' && (!payload.city || !payload.languages)){
        toastError("City or language cannot be empty!")
        return null;
      }
      payload.phone = UZBEKISTAN_EXTENSION + payload.phone
      return api.mutateBackend<RegisterResponse>(endpoints.auth.register, payload)
    },
    onSuccess: (response) => {
      if (response) {
        setOpenOtpModal(true);
        setOtpValue('');
        toastSuccess('SMS Verification Code has been send to your phone number!');
      }
    },
  });

  const { mutate: mutateOtp, isLoading: isLoadingOtp } = useMutation<
    OtpResponse | null,
    Error,
    OtpPayload
  >({
    mutationFn: async (payload) =>
      api.mutateBackend<OtpResponse>(endpoints.auth.otpVerification, payload),
    onSuccess: (response) => {
      if (response) {
        navigate('/login');
        toastSuccess('Succesfully register account!');
      }
    },
  });

  useEffect(() => {
    const phone = param.get('phone')
    if(phone){
      setValue('phone', phone)
    }
  }, [param])

  useEffect(() => {
    if (otpValue.length === 4) {
      onSubmitOtp();
    }
  }, [otpValue]);

  const onSubmitOtp = () => {
    mutateOtp({ phone: UZBEKISTAN_EXTENSION + getValues('phone'), otp: otpValue });
  };

  const handleResend = async () => { 
    await handleSubmit((e) => {
      mutate(e)
    })()
  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <OtpModal
        onResend={handleResend}
        setOtpValue={setOtpValue}
        otpValue={otpValue}
        setOpen={setOpenOtpModal}
        open={openOtpModal}
        onSubmit={onSubmitOtp}
        isLoading={isLoadingOtp}
      />

      <Modal open={openAgreementModal} setOpen={setOpenAgreementModal}>
      <div>
        <h2 className='font-bold mb-3 text-xl'>Terms and Conditions</h2>
        <ol className='flex flex-col gap-6'>
          <li>
              <span className="agreement-header">1. Introduction</span> 
              <span className="agreement-content text-slate-600 dark:text-slate-500"> Welcome to LOTUS (my-lotus.com). By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.</span>
          </li>
          <li>
              <span className="agreement-header">2. User Accounts</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Registration: Users must provide accurate and complete information during registration. You agree to update your information as necessary to maintain its accuracy.</li>
                  <li>Account Security: Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You must notify LOTUS immediately of any unauthorized use of your account.</li>
                  <li>Eligibility: By using our platform, you represent that you are at least 18 years old and are fully able and competent to enter into and comply with these Terms.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">3. Listing Properties</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Permissible Listings: Users may only post listings related to real estate properties. Listings must comply with all applicable laws and regulations.</li>
                  <li>Accuracy: Users are fully responsible for the accuracy and completeness of all information provided in their listings. Misleading or false information is strictly prohibited.</li>
                  <li>Approval and Removal: LOTUS reserves the right to review, approve, or remove any listings at our discretion, particularly those that violate these Terms or applicable laws.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">4. Image Uploads</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Content Requirements: Images uploaded must be relevant to the real estate properties being listed. Images must not contain inappropriate, offensive, or copyrighted content.</li>
                  <li>Automated Flagging: LOTUS may use automated systems to flag and remove inappropriate images. Users agree to comply with any requests to replace flagged images.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">5. Fees and Payments</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Premium Services: Users may be required to pay fees for premium listing services. All fees will be clearly communicated before any transaction is completed.</li>
                  <li>Payment Methods: All payments must be made through the methods specified on the platform.</li>
                  <li>Refund Policy: Fees are non-refundable except as required by law or as otherwise stated in these Terms.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">6. Use of Platform</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Prohibited Activities: Users must not use the platform for any illegal or unauthorized purposes, including but not limited to posting non-real estate related listings.</li>
                  <li>Respect for Others: Users must respect the rights and privacy of other users and not engage in any activities that could harm or interfere with the platform’s operations or other users' experience.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">7. Intellectual Property</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Platform Content: All content on LOTUS, including text, graphics, logos, and images, is the property of LOTUS or its licensors and is protected by copyright and other intellectual property laws.</li>
                  <li>User License: Users are granted a limited, non-exclusive license to access and use the platform for personal, non-commercial purposes. Users are not permitted to reproduce, distribute, or create derivative works from any content without prior written consent.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">8. Limitation of Liability</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>User Responsibility: Users acknowledge that they are solely responsible for the accuracy and legality of their listings and interactions on the platform.</li>
                  <li>No Warranties: LOTUS provides the platform "as is" and does not guarantee the accuracy, completeness, or reliability of any listings or content.</li>
                  <li>Liability Cap: LOTUS is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use the platform.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">9. Privacy Policy</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Data Use: Our Privacy Policy explains how we collect, use, and protect your personal information. By using the platform, you agree to the terms of our Privacy Policy.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">10. Termination</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>By LOTUS: LOTUS may terminate or suspend access to the platform for any user who violates these Terms or engages in harmful activities.</li>
                  <li>By Users: Users may terminate their account at any time by contacting LOTUS. Termination does not relieve users of their responsibilities under these Terms.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">11. Changes to Terms</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Modifications: LOTUS reserves the right to modify these Terms at any time. Users will be notified of significant changes through the platform or via email.</li>
                  <li>Continued Use: Continued use of the platform after changes to the Terms constitutes acceptance of the new Terms.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">12. Governing Law</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Jurisdiction: These Terms are governed by the laws of the Republic of Uzbekistan. Any disputes arising from the use of the platform will be subject to the exclusive jurisdiction of the courts in Uzbekistan.</li>
              </ul>
          </li>
          <li>
              <span className="agreement-header">13. Contact Us</span>
              <ul className="px-5 list-disc agreement-content text-slate-600 dark:text-slate-500">
                  <li>Inquiries: For any questions or concerns regarding these Terms, please contact us.</li>
              </ul>
          </li>
      </ol>
        </div>
        <ButtonPrimary className='mt-5 w-full' onClick={() => {
          setOpenAgreementModal(false);
        }}>Close Agreement</ButtonPrimary>
      </Modal>
 
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <form
            onSubmit={handleSubmit((e) => mutate(e))}
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                {...register('username', {
                  required: 'Username is required to register!',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                type="text"
                placeholder="Your username"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                {...register('password', {
                  required: 'Password is required to register!',
                  minLength: {
                    value: 3,
                    message: 'Password must be at least 3 characters',
                  },
                })}
                type="password"
                placeholder="Your Password"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Phone Number
              </span>
              <Input
                {...register('phone', {
                  required: 'Phone Number is required to register!',
                  maxLength: {
                    value: 9,
                    message: 'Phone Number cannot be more than 9 digits',
                  },
                })}
                component={<span className='text-sm text-slate-500 dark:text-slate-400'>+{UZBEKISTAN_EXTENSION}</span>}
                type="number"
                placeholder="Your Phone Number"
                className="pl-[3.3rem] mt-1"
              />
            </label>
            <label className="block">
              <span className="mb-1 flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Role
              </span>
              <Select2
                zIndex={11}
                className="mt-1"
                isFirstDefault={false}
                onChange={(e) => {
                  setValue('role', e.value)
                  setRole(e.value)
                }}
                options={[{value: 'agent', label: 'Agent'}, {value: 'client', label: 'Client'}]}
              ></Select2>
              <p className='text-neutral-500 dark:text-neutral-400 pl-2 pt-1 text-sm'>* Make sure to choose the right role!</p>
            </label>
            {role === 'agent' &&
            <>
              <label className="block w-full">
                <span className="text-neutral-800 dark:text-neutral-200">
                  City
                </span>
                <Select2
                  zIndex={10}
                  className="mt-1"
                  onChange={(e) => setValue('city', e.value)}
                  options={stringToSelectOption(UZBEKISTAN_CITIES)}
                ></Select2>
              </label>
              <label className="block w-full">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Language
                </span>
                <MultiSelect
                  zIndex={9}
                  onChange={(e) =>
                    setValue('languages', e.map((v) => v.value).join(','))
                  }
                  className="mt-1"
                  options={LANGUAGE_LIST.map((lang) => {
                    return { label: lang.name, value: lang.name }
                  })}
                  ></MultiSelect>
              </label>
                  </>
              }
              <div className="w-full flex gap-2">
                <Checkbox  inputClassName='!w-4 !h-4' onChange={(e) => {
                  setAgreement(e);
                }} name='' className='cursor-pointer'/>
                <span className="text-neutral-800 text-sm dark:text-neutral-200">
                By checking this box, I agree to the <span className='cursor-pointer hover:underline text-primary-500 dark:text-primary-400' onClick={() => {
                    window.scrollTo(0, 0);
                    setOpenAgreementModal(true);
                  }}>Terms and Conditions</span>
                </span>
              </div>
            <ButtonPrimary loading={isLoading} type="submit">
              Sign Up
            </ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login" className='text-primary-500 dark:text-primary-400'>Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
