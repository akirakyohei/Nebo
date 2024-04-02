import { Button } from "@mui/material";
import { ComplexAction } from "./types";
import { Spinner } from "./Spinner";

export const Buttons = ({ ...props }: ComplexAction) => {
  return (
    <Button
      startIcon={props.icon}
      disabled={props.disabled}
      color={props.color}
    >
      {!props.loading ? props.content : <Spinner />}
    </Button>
  );
};
