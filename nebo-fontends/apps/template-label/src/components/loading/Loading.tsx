import { useContext, useEffect } from "react";
import { LoadingContext } from "./LoadingContext";
export const Loading = () => {
  const context = useContext(LoadingContext);
  useEffect(() => {
    context.setValue(true);
    return () => {
      context.setValue(false);
    };
  }, []);

  return <></>;
};
