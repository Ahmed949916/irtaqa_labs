"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// 1. Container styled for a consistent light background and padding
const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#F9F9F9",
  padding: theme.spacing(4),
}));

// 2. OurMission page component
const OurMission: React.FC = () => {
  return (
    <PageContainer id="mission">
      <Typography variant="h3" component="h1" gutterBottom color="#004d40">
        Our Mission
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Irtaqa Lab by Nawab Begum Trust is dedicated to providing accessible and
        affordable healthcare to underprivileged communities. Our goal is to
        ensure that essential medical tests, screenings, and consultations are
        available to those who need them most, regardless of financial
        limitations.
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Through outreach programs, partnerships with local health professionals,
        and community education, we aim to break down barriers and empower
        individuals to take control of their health. Our team of medical experts
        and compassionate volunteers works tirelessly to deliver reliable
        diagnostic services and ensure every patient receives the care and
        support they deserve.
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        By upholding transparency, empathy, and innovation in everything we do,
        Irtaqa Lab hopes to not only treat existing health issues but also
        promote preventive care and wellness for a healthier, more equitable
        future.
      </Typography>
    </PageContainer>
  );
};

export default OurMission;
