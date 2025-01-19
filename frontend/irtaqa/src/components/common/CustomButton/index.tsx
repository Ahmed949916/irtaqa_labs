// src/components/common/Button/index.tsx
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary'|'tertiary';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fontWeight?: string;
  padding?: string;
}

const CustomButton = ({ 
  children, 
  variant = 'primary',
  startIcon,
  endIcon,
  fontWeight="500",
  padding="8px 24px",
  fullWidth,
  ...props 
}: ButtonProps) => {
  const getStyles = () => {
    const baseStyles = {
      borderRadius: "10px",
      textTransform: 'none' as const,
      padding: padding,
      fontWeight: fontWeight,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: 'fit-content',
      width: fullWidth ? '100%' : 'auto',
    };

    const variants = {
      primary: {
        bgcolor: '#006241',
        color: 'white',
        border: 'none',
      
      },
      secondary: {
        bgcolor: '#121212',
        color: 'white',
        border: '2px solid #4DA1A9',
      },
      tertiary: {
        bgcolor: '#fff',
        color: 'black',
        border:"none"
      
      },
    };

    return {
      ...baseStyles,
      ...variants[variant],
    };
  };

  return (
    <MuiButton
      {...props}
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      sx={{
        ...getStyles(),
        ...props.sx,
      }}
    >
      {startIcon}
      {children}
      {endIcon}
    </MuiButton>
  );
};

export default CustomButton;