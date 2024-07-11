import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { StoreState } from 'states/store';
import { SelectOption } from 'types/selectOption';

interface MultiSelectProps {
  options: Array<SelectOption>;
  className?: string;
  onChange?: (e: Array<SelectOption>) => void;
  defaultValue?: Array<SelectOption>;
  zIndex?: number;
}

export default function MultiSelect({
  options,
  zIndex = 10,
  className,
  onChange,
  defaultValue,
}: MultiSelectProps) {
  const theme = useSelector((store: StoreState) => store.theme);
  const lightFontColor = '#E5E7EB';
  const darkFontColor = '#1F2937';
  const primaryColor = '#4F46E5';
  const colourStyles: StylesConfig<any, true> = {
    container: (styles) => {
      return {
        ...styles, 
        zIndex
      }
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: isFocused
          ? lightFontColor
          : theme.current === 'light'
          ? darkFontColor
          : lightFontColor,
        backgroundColor: isFocused || isSelected ? primaryColor : undefined,
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: primaryColor,
        borderRadius: '10px',
      };
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        color: lightFontColor,
      };
    },
  };
  const [value, setValue] = useState<MultiValue<SelectOption>>();
  useEffect(() => {
    if (defaultValue && (!value || value.length === 0)) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <Select
      value={value}
      closeMenuOnSelect={false}
      defaultValue={defaultValue}
      onChange={(e) => {
        setValue(e);
        // @ts-ignore
        onChange && onChange(e);
      }}
      isMulti
      styles={colourStyles}
      name="colors"
      options={options}
      className={` block w-full text-white border-neutral-200  focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-sm  dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
    />
  );
}
