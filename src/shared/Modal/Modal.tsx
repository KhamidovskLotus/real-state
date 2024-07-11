import { Dialog, Transition } from '@headlessui/react';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  width?: string;
  children: ReactNode;
}

export default function Modal({
  open,
  setOpen,
  children,
  width = 'sm:max-w-2xl',
}: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[99999]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[99999] w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center mx-4 text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-0 scale-95"
            >
              <Dialog.Panel
                className={`relative z-[99999] transform  rounded-lg dark:bg-slate-900 bg-white dark:bg-boxdark px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full w-full ${width} sm:p-6`}
              >
                <div className="mt-sm:mt-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
