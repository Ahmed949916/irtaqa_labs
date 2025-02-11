import { Typography } from "@mui/material";
import React from "react";

interface HeadProps {
  text: string;
}

const PageHead: React.FC<HeadProps> = ({ text }) => {
  return ( // ✅ Added return statement
    <Typography 
      variant="h4" 
      sx={{ 
        fontWeight: 600, 
        color: "#fff", 
        background: "#006241", 
        p: "16px" 
      }}
    >
      {text}
    </Typography>
  );
};

export default PageHead;
