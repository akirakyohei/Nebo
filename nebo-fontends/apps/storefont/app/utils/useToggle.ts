import { useState } from "react";

export const useToggle = (_value: boolean) => {
  const [value, setValue] = useState(_value);
  const toggle = () => {
    setValue((prev) => !prev);
  };
  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };
  return { value, toggle, setTrue, setFalse };
};
