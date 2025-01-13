import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  limit: 1,
  position: "top-right",
  autoClose: 1000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: false,
  hideProgressBar: false,
  theme: "light",
};


class Toaster {
  success = (message) => {
    toast.success(message, {
      ...toastOptions,
    });
     
  };
  error = (message) => {
    toast.error(message, {
      ...toastOptions,
    });
    
  };
  warn = (message) => {
    toast.warn(message, {
      ...toastOptions,
    });
       
  };
  info = (message) => {
    toast.info(message, {
      ...toastOptions,
    });
   
    
  };

}
export const toasts = new Toaster();
