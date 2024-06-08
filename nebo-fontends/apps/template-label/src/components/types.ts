import { ButtonTypeMap, IconProps } from "@mui/material";
import { ReactNode } from "react";

export type Action = {
  url?: string;
  content: string;
  icon?: React.ReactNode;
  outline?: boolean;
  onAction?: () => void;
};

export type LoadingAction = Action & {
  loading?: boolean;
};

export type DisabledAction = Action & {
  disabled?: boolean;
};

export type ColorAction = Action & {
  color?: ButtonTypeMap["props"]["color"];
};

export type ComplexAction = Action &
  LoadingAction &
  DisabledAction &
  ColorAction;

export type Option<T = number> = {
  value: T;
  label: string;
  renderInput?: string | ReactNode;
  disabled?: boolean;
};
