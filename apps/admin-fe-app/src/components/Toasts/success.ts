import { toast } from "react-toastify";

export const notifySuccess = (successMsg: string) => {
    toast.success(successMsg, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };