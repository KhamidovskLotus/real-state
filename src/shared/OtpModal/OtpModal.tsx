import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Modal from 'shared/Modal/Modal';

interface OtpModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  otpValue: string;
  setOtpValue: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  isLoading: boolean;
  onResend: () => Promise<void>;
}

const TIMER_SECONDS = 60

export default function OtpModal({
  open,
  setOpen,  
  otpValue,
  setOtpValue,
  onSubmit,
  isLoading,
  onResend
}: OtpModalProps) {
  const [timer, setTimer] = useState<number>(TIMER_SECONDS);
  const [times, setTimes] = useState<number>(3);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open) {
      setTimer(TIMER_SECONDS)
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [open]);

  const handleResend = async () => {
    await onResend();
    setTimes((prev) => prev -1)
    setTimer(TIMER_SECONDS);
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="rounded-xl dark:bg-slate-900 bg-white p-4 shadow-14 dark:bg-boxdark lg:p-7.5 xl:p-12.5">
        <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white">
          Verify Your Account
        </h1>
        {/* <p className="mb-7.5 font-medium">
          Enter the 6 digit code sent to the registered email id.
        </p> */}
        <div className="mt-4 flex items-center gap-4.5">
          <OTPInput
            value={otpValue}
            onChange={setOtpValue}
            numInputs={4}
            containerStyle={{
              width: '100%',
              gap: '10px',
            }}
            inputStyle={{
              width: '100%',
            }}
            renderInput={(props) => (
              <input
                {...props}
                className="h-24 w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            )}
          />
        </div>
        <div className="mb-5 mt-4 text-left font-medium text-black dark:text-white flex gap-1">
          {/* <p className="">Did not receive a code?</p> */}
          {/* <button
            disabled={isLoading}
            className="text-primary"
            onClick={handleResend}
          >
            {' '}
            Resend
          </button> */}
        </div>
        <ButtonPrimary
          className="w-full"
          disabled={isLoading}
          onClick={onSubmit}
        >
          Verify
        </ButtonPrimary>
        
        <span className="text-sm mt-5 block">
          {times > 0 ? 
          timer > 0 ? `Send SMS verification code again in ${timer} seconds` : <span onClick={handleResend} className='cursor-pointer font-medium text-primary-6000 hover:text-primary-700'>Send SMS verification code again</span>
         : 'Please try again later' }
          </span>
      </div>
    </Modal>
  );
}
