import { IoWarningOutline } from 'react-icons/io5';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';

export type TDeleteModalProps = {
  callback?: () => void;
  name?: string;
  onClose: () => void;
};

export default function DeleteModal({
  callback,
  name,
  onClose,
}: TDeleteModalProps) {
  return (
    <>
      <div className="pt-3 sm:flex sm:items-start">
        <div className="p-3  bg-red-200 rounded-full">
          <IoWarningOutline
            className="size-8 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left">
          <div className="text-xl  font-semibold leading-6 text-gray-900">
            Deleting {name} ?
          </div>
          <div className="mt-2">
            <p className="text-md font-medium opacity-70">
              Are you sure want to delete {name?.toLowerCase()} ? This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="gap-5 mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <ButtonPrimary type="button" className="" onClick={callback}>
          Remove
        </ButtonPrimary>
        <ButtonSecondary className="w-fit px-5 py-2 h-fit" onClick={onClose}>
          Cancel
        </ButtonSecondary>
      </div>
    </>
  );
}
