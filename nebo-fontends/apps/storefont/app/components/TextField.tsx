import { TextFieldProps, TextField as TextFieldMUI } from "@mui/material";

export const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <TextFieldMUI
      {...props}
      InputLabelProps={{ sx: { top: "-6px" } }}
      InputProps={{
        sx: {
          height: "41px",
          "> input": {
            padding: "0 16px !important",
            height: "100% !important",
          },
          ...props.sx,
        },
      }}
    />
  );
};