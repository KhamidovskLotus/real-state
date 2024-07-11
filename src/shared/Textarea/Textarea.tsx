import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import ncNanoId from 'utils/ncNanoId';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TEXT_AREA_HEIGHT_SIZE = 100;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', children, ...args }, ref) => {
    const [id, setId] = useState<string>(ncNanoId());

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = 'inherit';
      e.target.style.height = `${Math.max(
        e.target.scrollHeight,
        TEXT_AREA_HEIGHT_SIZE
      )}px`;
    };

    useEffect(() => {
      const e = document.getElementById(id);
      if (e) {
        e.style.height = 'inherit';
        e.style.height = `${Math.max(e.scrollHeight, TEXT_AREA_HEIGHT_SIZE)}px`;
      }
    }, []);

    return (
      <textarea
        id={id}
        ref={ref}
        className={`overflow-hidden resize-none block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
        {...args}
        onChange={handleOnChange}
      >
        {children}
      </textarea>
    );
  }
);

export default Textarea;
