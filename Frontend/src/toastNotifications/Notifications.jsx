import { toast, ToastContainer as ToastContainerBase } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Notification Templates
const notificationSettings = {
    success: {
        autoClose: 3000,
        theme: "colored"
    },
    error: {
        autoClose: 4000,
        theme: "colored"
    },
    warning: {
        autoClose: 3500,
        theme: "colored"
    },
    info: {
        autoClose: 2500,
        theme: "light"
    }
};

// Notification Generators
export const SuccessNotify = (text = 'Operation successful!') =>
    toast.success(text, notificationSettings.success);

export const FailureNotify = (text = 'Something went wrong!') =>
    toast.error(text, notificationSettings.error);

export const WarningNotify = (text = 'Warning: Please check this!') =>
    toast.warning(text, notificationSettings.warning);

export const InfoNotify = (text = "Here's some information") =>
    toast.info(text, notificationSettings.info);

// Toast Container Component
export const ToastContainer = () => (
    <ToastContainerBase
        position="top-right"
        limit={3}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        {...notificationSettings.success} // Default settings
    />
);