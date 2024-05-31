import {
  TextFieldProps as MITextFieldProps,
  TextField as TextFieldMUI,
} from "@mui/material";

export type TextFieldProps = Omit<MITextFieldProps, "error"> & {
  error?: string;
};
export const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <TextFieldMUI
      {...props}
      error={!!props.error}
      helperText={props.error ? props.error : props.helperText}
      InputLabelProps={{ sx: { top: "-6px" }, ...props.InputLabelProps }}
      InputProps={{
        sx: {
          height: "41px",
          "> input": {
            padding: "0 16px !important",
            height: "100% !important",
          },
          ...props?.InputProps?.sx,
        },
        ...props.InputProps,
      }}
    />
  );
};
