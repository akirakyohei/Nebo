import { TextFieldProps, TextField as TextFieldMUI } from "@mui/material";

export const TextField = ({
  ...props
}: TextFieldProps & { error?: string }) => {
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
