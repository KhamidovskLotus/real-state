import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { FAQ_LIST } from 'data/faq';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function SectionFaq() {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="mx-auto sm:py-32 lg:py-40">
        <div className="mx-auto divide-y divide-white/10">
          <h2 className=" text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
            {t('faq')}
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {FAQ_LIST.map((faq) => (
              <Disclosure as="div" key={faq.title} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left ">
                        <span className="font-semibold block text-lg xl:text-xl text-neutral-600 dark:text-neutral-400">
                          {faq.title}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <div className="mt-6 flex flex-col gap-2 text-base xl:text-lg text-neutral-6000 dark:text-neutral-400 ">
                        {faq.description.split('\n').map((line, index) => (
                          <Fragment key={index}>
                            <div className="">{line}</div>
                          </Fragment>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
