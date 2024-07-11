import { Popover, Transition } from '@headlessui/react';
import { HomeIcon } from '@heroicons/react/24/outline';
import { PROPERTY_TYPE, PROPERTY_TYPE_DESCRIPTION } from 'data/property';
import { FC, Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from 'shared/Checkbox/Checkbox';
import { upsertPropertFilter } from 'states/propertyFilterSlice';

export interface PropertyTypeSelectProps {
  onChange?: (data: string) => void;
  fieldClassName?: string;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
  onChange,
  fieldClassName = '[ nc-hero-field-padding ]',
}) => {
  const [selected, setSelected] = useState<string>('');
  const dispatch = useDispatch();
  return (
    <Popover className="flex relative flex-1">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${
              open ? 'nc-hero-field-focused' : ''
            }`}
            onClickCapture={() => document.querySelector('html')?.click()}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <HomeIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-lg font-semibold overflow-hidden">
                <span className="line-clamp-1">{selected || `Type`}</span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                Property type
              </span>
            </div>
          </Popover.Button>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <div className="">
                <div className="relative flex flex-col space-y-5">
                  {PROPERTY_TYPE.map((item, index) => (
                    <div key={item} className="">
                      <Checkbox
                        inputClassName="tab_checkbox_home_property_type"
                        name={item}
                        label={item}
                        subLabel={PROPERTY_TYPE_DESCRIPTION[index]}
                        onChange={(e) => {
                          const tabCheckboxs = document.getElementsByClassName(
                            'tab_checkbox_home_property_type'
                          ) as HTMLCollectionOf<HTMLInputElement>;
                          for (const tabCheckbox of Array.from(tabCheckboxs)) {
                            if (tabCheckbox.name !== item) {
                              tabCheckbox.checked = false;
                            }
                          }
                          dispatch(
                            upsertPropertFilter({ property_type: item })
                          );
                          onChange && onChange(item);
                          setSelected(item);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PropertyTypeSelect;
