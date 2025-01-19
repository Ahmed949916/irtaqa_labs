"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomButton from "@/src/components/common/CustomButton";

// Optional: You might retrieve user data from localStorage or a global store.
const Dashboard = () => {
  const router = useRouter();
  
  // Example: If you saved user data in localStorage upon login
  // const [user, setUser] = React.useState<any>(null);
  // React.useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const handleViewReports = () => {
    // Navigate to some route or page where reports are displayed
    router.push("/reports");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #eafaf1 0%, #ffffff 100%)",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {/* Title / Branding */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, color: "#006241", mt: 4, mb: 2 }}
      >
        IRTAQA LAB
      </Typography>

      {/* A container (card-like) for the available service(s) */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
        //   bgcolor: "#ffffff",
          borderRadius: "16px",
        //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        //   border: "1px solid #cccccc",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          p: { xs: 3, sm: 4 },
          mb: 4,
        }}
      >
      

        {/* If you want to greet the user by name: */}
        {/* <Typography variant="body1" color="#4F4F4F">
          Welcome back, {user?.name || "User"}!
        </Typography> */}
         <Typography variant="body1" color="#4F4F4F" fontWeight={600}>
          Welcome back, { "Ahmad"}!
        </Typography>

  
        {/* Services List (only one right now) */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Single service: View Reports */}
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "16px",
              p: 3,
              backgroundColor: "#FAFAFA",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ color: "#006241" }}>
              View Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access your medical or test reports.
            </Typography>
            <Box>
              <CustomButton variant="primary" onClick={handleViewReports}>
                Go to Reports
              </CustomButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
