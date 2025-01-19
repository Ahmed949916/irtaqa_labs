"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

//
// 1. Container styled to match the previous theme (light background, padding, etc.)
//
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#F9F9F9",
//   minHeight: "100vh",
  padding: theme.spacing(4),
}));

//
// 2. Example data for Medical Lab services
//
const SERVICES = [
  {
    title: "Comprehensive Blood Tests",
    description:
      "From basic panels (CBC, lipid) to advanced markers for early detection.",
  },
  {
    title: "Urinalysis & Kidney Function",
    description:
      "Urine tests for infection, metabolic issues, and overall kidney health.",
  },
  {
    title: "COVID-19 Testing",
    description: "Both RT-PCR and rapid antigen testing for COVID-19 diagnosis.",
  },
  {
    title: "Immunology & Allergy Panels",
    description:
      "Allergy testing and autoimmune screenings for personalized care.",
  },
  {
    title: "Microbiology & Cultures",
    description:
      "Bacterial, viral, and fungal cultures to identify pathogens accurately.",
  },
  {
    title: "Genetic Screening",
    description:
      "Screening for hereditary conditions and risk factors for certain diseases.",
  },
  {
    title: "Hormone & Endocrine Tests",
    description:
      "Thyroid, cortisol, reproductive hormones, and more for hormonal balance.",
  },
];

//
// 3. Each service box: A simple Box with border, padding, and spacing
//
const ServiceBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  border: "1px solid #E0E0E0",
  borderRadius: "4px",
  padding: theme.spacing(2),
  // We'll allow them to shrink/grow and wrap, making them responsive
  width: "100%",
  // We'll use margin-bottom for vertical spacing in a wrap scenario
  marginBottom: theme.spacing(2),

  // Example minimal shadow:
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",

  // We can override widths at breakpoints to get multi-column layouts
  [theme.breakpoints.up("sm")]: {
    width: "48%", // 2 columns
  },
  [theme.breakpoints.up("md")]: {
    width: "30%", // 3 columns on mid-sized screens
  },
}));

const ServicesOffered: React.FC = () => {
  return (
    <PageContainer id="services">
      <Typography variant="h3" component="h1" gutterBottom color="#004d40">
        Our Medical Lab Services
      </Typography>
      <Typography variant="body1" color="textSecondary" marginBottom={3}>
        We provide a variety of diagnostic tests and screenings to ensure you get
        accurate, timely results for better healthcare decisions.
      </Typography>

      {/* 
        4. A container that uses flex-wrap instead of Grid.
           This will wrap items to the next line on small screens.
       */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "space-between" }, // Center on xs, spaced on larger
          gap: { xs: 2, sm: 0 }, // Gap of 2 on mobile, otherwise 0 (since we used margin in ServiceBox)
        }}
      >
        {SERVICES.map((service, idx) => (
          <ServiceBox key={idx}>
            <Typography variant="h6" gutterBottom color="#004d40">
              {service.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {service.description}
            </Typography>
       
          </ServiceBox>
        ))}
      </Box>
    </PageContainer>
  );
};

export default ServicesOffered;
