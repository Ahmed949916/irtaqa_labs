"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { styled } from "@mui/material/styles";
import CustomButton from "@/src/components/common/CustomButton";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

interface Service {
  title: string;
}

const services: Service[] = [
  { title: "Malicious URL detection" },
  { title: "Malicious Email detection" },
];

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    nameEmail: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      id="contact"
      // Switch to column layout for mobile, row for larger screens
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "stretch",
        bgcolor: "#1F4043",
        // Make padding responsive as well
        p: { xs: 2, md: 6 },
        gap: 2,
      }}
    >
      {/* Left Column: Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" component="h3" color="#fff" gutterBottom>
          Contact us
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            label="Enter your name or email"
            name="nameEmail"
            value={formData.nameEmail}
            onChange={handleChange}
            fullWidth
          />
          <StyledTextField
            label="Enter comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </StyledForm>
        <Box sx={{ alignSelf: "flex-end", mt: 2 }}>
          <CustomButton variant="primary" onClick={handleSubmit}>
            Submit
          </CustomButton>
        </Box>
      </Box>

      {/* Right Column: Services & Icons */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Example if you want to show a list of services, or something else */}
        {/* 
          <Box>
            {services.map((service, index) => (
              <Typography key={index} color="#fff">
                {service.title}
              </Typography>
            ))}
          </Box>
        */}

        <Box>
          <Stack direction="row" spacing={2} color="#fff">
            <IconButton color="inherit" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
