import { toast } from "react-toastify";

export const notifyError = (errorMsg: string) => {
    toast.error(errorMsg, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };