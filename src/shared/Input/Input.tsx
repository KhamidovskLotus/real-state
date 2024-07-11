// @ts-ignore
import { ErrorMessage } from '@hookform/error-message';
import React, { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
  errors?: { [x: string]: any };
  component?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'text-sm font-normal',
      rounded = 'rounded-2xl',
      children,
      type = 'text',
      errors,
      component,
      ...args
    },
    ref
  ) => {
    return (
      <>
       <div className='relative'>
          <div className="absolute left-3 top-[50%] translate-y-[-50%]">
            {component}
          </div>
          <input
          onChange={(e) => {}}
          onWheel={(e) => e.currentTarget.blur()}
          ref={ref}
          type={type}
          className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
          {...args}
          />
        </div>
        {errors && (
          <ErrorMessage
            errors={errors}
            name={args && args.name ? args.name : ''}
            render={({ message }: { message: string }) => (
              <ErrorText>{message}</ErrorText>
            )}
          />
        )}
      </>
    );
  }
);

interface ErrorTextProps {
  className?: string;
  children: React.ReactNode;
}

function ErrorText({ className, children }: ErrorTextProps) {
  return (
    <div className={`${className} text-red-400 text-xs mt-1 ml-2`}>
      {children}
    </div>
  );
}

export default Input;
