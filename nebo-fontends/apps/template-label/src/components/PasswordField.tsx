import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, TextFieldProps } from "./TextField";
import { useToggle } from "../utils/useToggle";

export const PasswordField = ({ ...props }: TextFieldProps) => {
  const { value: isShowPassword, toggle: toggleShowPassword } =
    useToggle(false);
  const handleClickShowPassword = () => toggleShowPassword();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      id="standard-adornment-password"
      {...props}
      type={isShowPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {isShowPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  );
};
