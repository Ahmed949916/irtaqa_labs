"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

import CustomButton from "@/src/components/common/CustomButton";
import CustomInput from "@/src/components/common/CustomInput";

interface LoginData {
  phone: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData
      );
      console.log("Login successful:", response.data);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Navigate to the dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      setError(error.response?.data?.error || "An unexpected error occurred.");
    }
  };

  return (
    <Box
      sx={{
        // Subtle gradient background
        background: "linear-gradient(135deg, #eafaf1 0%, #ffffff 100%)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      {/* Logo / Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, color: "#006241", mb: 2 }}
      >
        IRTAQA LAB
      </Typography>

      {/* Form Container */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "90%",
          maxWidth: "400px",
          bgcolor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #cccccc",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#006241" }}>
            Login
          </Typography>
          <Typography color="#4F4F4F" fontSize="14px">
            Welcome! Good to see you back.
          </Typography>
        </Box>

        {/* Form Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <CustomInput
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="03xxxxxxxxx"
            value={formData.phone}
            onChange={handleChange}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </Box>

        {/* Login Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <CustomButton variant="primary" type="submit">
            Login
          </CustomButton>
        </Box>

        {/* Error message */}
        {error && (
          <Typography color="error" fontSize="14px">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
