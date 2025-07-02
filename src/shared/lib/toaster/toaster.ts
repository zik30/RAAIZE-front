import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

const toastOptions: ToastOptions = {
  autoClose: 2000,
  position: 'top-right',
};

export const toaster = (type: ToastType, message: string): void => {
  const options = {
    ...toastOptions,
    progressClassName:
      type === 'success' || type === 'info' ? 'custom-blue-progress' : '',
    className: type === 'success' || type === 'info' ? 'custom-blue-icon' : '',
  };

  switch (type) {
    case 'info':
      toast.info(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
