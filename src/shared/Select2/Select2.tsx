import { useEffect, useState } from 'react';
import ReactSelect, { SingleValue, StylesConfig } from 'react-select';
import { SelectOption } from 'types/selectOption';

export interface Select2Props {
  className?: string;
  options: Array<SelectOption>;
  defaultValue?: SelectOption;
  isFirstDefault?: boolean;
  onChange?: (e: SelectOption) => void;
  placeholder?: string;
  zIndex?: number;
}

const Select2 = ({
  className = '',
  options,
  defaultValue,
  isFirstDefault = false,
  onChange,
  placeholder = 'Select...',
  zIndex = 10
}: Select2Props) => {
  if (isFirstDefault && options[0]) {
    defaultValue = options[0];
  }
  const colourStyles: StylesConfig<any, true> = {
    container: (styles, {  isDisabled, isFocused  }) => {
      return {
        zIndex
      };
    },
    
  };

  const [value, setValue] = useState<SingleValue<SelectOption>>();
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <ReactSelect
       styles={colourStyles}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        // @ts-ignore
        setValue(e)
        // @ts-ignore
        onChange && onChange(e);
      }}
      defaultValue={defaultValue}
      options={options}
      className={`nc-Select relative z-[100]  ${className} block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
    ></ReactSelect>
  );
};

export default Select2;
