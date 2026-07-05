import { toast, type ToastOptions } from "react-toastify";

const defaults: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
};

export const notify = {
  success(message: string, options?: ToastOptions) {
    toast.success(message, { ...defaults, ...options });
  },
  error(message: string, options?: ToastOptions) {
    toast.error(message, { ...defaults, ...options });
  },
  info(message: string, options?: ToastOptions) {
    toast.info(message, { ...defaults, ...options });
  },
  warning(message: string, options?: ToastOptions) {
    toast.warn(message, { ...defaults, autoClose: 6000, ...options });
  },
};
