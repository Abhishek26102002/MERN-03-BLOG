import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handelSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
  });
};
export const handelError = (msg) => {
  console.log(msg,"message")
  toast.error(msg);
};
