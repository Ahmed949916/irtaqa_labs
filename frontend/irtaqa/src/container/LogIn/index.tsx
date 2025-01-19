"use client";

import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
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
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        gap:"16px"
      }}
      bgcolor={"#fff"}
    >
      <Typography variant="h4" color="#006241" sx={{fontWeight:"600"}}>IRTAQA LAB</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "80%",
          maxWidth: "400px",
          padding: "30px 40px",
          borderRadius: "20px",
          border:"1px solid #006241",
          // bgcolor: "#F6F4F0",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#006241" }}>
            Login...
          </Typography>
          <Typography color="#4F4F4F" fontSize="12px">
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
        <Box sx={{ display: "flex", justifyContent: "left" }}>
          <CustomButton variant="primary" type="submit">
            Login
          </CustomButton>
        </Box>

        {error && (
          <Typography color="error" fontSize="14px" sx={{ marginTop: "8px" }}>
            {error}
          </Typography>
        )}

     
      </Box>
    </Box>
  );
};

export default Login;
