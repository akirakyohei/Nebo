import { ButtonTypeMap, IconProps } from "@mui/material";

export type Action = {
  url?: string;
  content: string;
  icon?: React.ReactNode;
  outline?: boolean;
  onClick?: () => void;
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

export type ComplexAction = LoadingAction & DisabledAction & ColorAction;
