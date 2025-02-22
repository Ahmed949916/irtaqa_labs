import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";

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
  const [phoneValue, setPhoneValue] = useState(inputVal || "");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (inputVal !== undefined) {
      setPhoneValue(inputVal);
    }
  }, [inputVal]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit characters
    let formattedValue = e.target.value.replace(/\D/g, "");

    // Restrict input to 11 characters
    if (formattedValue.length > 11) {
      formattedValue = formattedValue.slice(0, 11);
    }

    setPhoneValue(formattedValue);
    onInputChange?.(formattedValue);

    // Validation logic
    if (formattedValue.length < 11) {
      setValidationError("Phone number must be exactly 11 digits");
    } else if (!/^0\d{10}$/.test(formattedValue)) {
      setValidationError("Phone number must start with 0 and be 11 digits long");
    } else {
      setValidationError(""); // No error if valid
    }
  };

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
        type="tel"
        value={phoneValue}
        onChange={handlePhoneChange}
        inputProps={{
          maxLength: 11, // Ensures no more than 11 digits
        }}
        error={Boolean(validationError)}
        helperText={validationError || helperText}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: bgColor || "white",
            color: textColor || "black",
            borderRadius: "10px",
            "& fieldset": {
              borderColor: validationError ? "#f44336" : "#006241",
            },
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ddd",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: validationError ? "#f44336" : "#4DA1A9",
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: bgColor === "#1E1E1E" ? "#fff" : "#444",
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
