import { Id, toast } from 'react-toastify';

export function toastSuccess(str: String) {
  toast.success(str, {
    position: 'bottom-right',

    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    
  });
}
export function toastError(obj: { [key: string]: string } | string) {
  const errorMessage = typeof obj === 'string' ? obj : Object.values(obj)[0];
  toast.error(errorMessage, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export function toastLoading(str: string) {
  return toast.loading(str, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export function toastUpdateSuccess(id: Id, text: string = 'Success') {
  toast.update(id, {
    render: text,
    type: 'success',
    isLoading: false,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  });
}
export function toastUpdateFailed(id: Id, text: string = 'Failed!') {
  toast.update(id, {
    render: text,
    type: 'error',
    isLoading: false,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  });
}
