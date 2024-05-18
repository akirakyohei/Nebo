import { Button as ButtonUI } from "@mui/material";
import { ComplexAction } from "./types";
import { Spinner } from "./Spinner";

export const Button = ({ ...props }: ComplexAction) => {
  return (
    <ButtonUI
      startIcon={props.icon}
      disabled={props.disabled}
      color={props.color}
      onClick={props.onAction}
      href={props.url}
      variant={props.outline ? "outlined" : "contained"}
    >
      {!props.loading ? props.content : <Spinner />}
    </ButtonUI>
  );
};
