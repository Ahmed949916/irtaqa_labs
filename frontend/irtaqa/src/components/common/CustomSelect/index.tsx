import React from "react";
import {
  Box,
  Typography,
  Select,
  SelectProps,
  MenuItem,
  FormControl,
  FormHelperText,
  SxProps,
  Theme,
} from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends Omit<SelectProps, "onChange" | "value"> {
  label?: string;             // Top label (like in CustomInput)
  helperText?: string;
  fullWidth?: boolean;
  error?: boolean;
  options: Option[];          // The list of dropdown options
  value: string;              // Current selected value
  onChange: (event: any) => void; // Handles selection changes
  sx?: SxProps<Theme>;        // For additional styling overrides
}

const CustomSelect = ({
  label,
  helperText,
  fullWidth = false,
  error = false,
  options,
  value,
  onChange,
  sx,
  ...props
}: CustomSelectProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: fullWidth ? "100%" : "auto",
      }}
    >
      {/* Top label, similar to CustomInput */}
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

      <FormControl
        fullWidth={fullWidth}
        size="small"
        error={error}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "white",
            color: "black",
            borderRadius: "10px",
            "& fieldset": {
              borderColor: error ? "#f44336" : "#006241",
            },
            "&:hover fieldset": {
              borderColor: "#444",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4DA1A9",
            },
          },
          ...sx,
        }}
      >
        {/* We intentionally omit <InputLabel> to avoid a second floating label */}
        <Select
  value={value}
  onChange={onChange}
  MenuProps={{ disableScrollLock: true }} // Prevents body padding
  {...props}
>
  {options.map((o) => (
    <MenuItem key={o.value} value={o.value}>
      {o.label}
    </MenuItem>
  ))}
</Select>


        {/* Helper text / error message */}
        {helperText && (
          <FormHelperText sx={{ marginLeft: "0!important" }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
