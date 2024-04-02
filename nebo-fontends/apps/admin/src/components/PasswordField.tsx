import { IconButton, Input, InputAdornment, InputProps } from "@mui/material";
import { useToggle } from "../utils/useToggle";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const PasswordField = ({ ...props }: InputProps) => {
  const { value: isShowPassword, toggle: toggleShowPassword } =
    useToggle(false);
  const handleClickShowPassword = () => toggleShowPassword();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Input
      id="standard-adornment-password"
      {...props}
      type={isShowPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {isShowPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
