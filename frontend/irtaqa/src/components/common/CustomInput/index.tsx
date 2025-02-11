import { useState } from "react";
import { Box, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";

import MyIcon from "./PreviewIcon";

interface InputProps extends Omit<TextFieldProps, "label"> {
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  bgColor?: string;
  textColor?: string;
  inputVal?: string;
  onInputChange?: (value: string) => void;
}

const CustomInput = ({
  label,
  type,
  placeholder,
  fullWidth = false,
  error,
  bgColor,
  textColor,
  helperText,
  inputVal,
  onInputChange,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneValue, setPhoneValue] = useState(inputVal || "");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "");
    setPhoneValue(formattedValue);
    onInputChange?.(formattedValue);
  };

  const passwordProps =
    type === "password"
      ? {
          type: showPassword ? "text" : "password",
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                  {showPassword ? <MyIcon /> : <MyIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }
      : {};

  const phoneProps =
    type === "tel"
      ? {
          value: phoneValue,
          onChange: handlePhoneChange,
          inputProps: {
            maxLength: 15,
          },
        }
      : {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "black",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        fullWidth={fullWidth}
        variant="outlined"
        size="small"
        placeholder={placeholder}
        type={type !== "password" && type !== "tel" ? type : undefined}
        {...passwordProps}
        {...phoneProps}
        {...props}
        error={!!error}
        helperText={helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: bgColor || "white",
            color: textColor || "black",
            borderRadius: "10px",
            "& fieldset": {
              borderColor: "#006241",
            },
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#444",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4DA1A9",
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: bgColor === "#1E1E1E" ? "#fff" : "#555",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "#f44336",
          },
          "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f44336",
          },
          ...props.sx,
        }}
      />
    </Box>
  );
};

export default CustomInput;
