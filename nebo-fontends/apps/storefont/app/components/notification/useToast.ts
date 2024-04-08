import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export const useToast = () => {
  const context = useContext(NotificationContext);
  return { show: context.show };
};
