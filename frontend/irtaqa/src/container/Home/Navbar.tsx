"use client";
import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import CustomButton from "@/src/components/common/CustomButton";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navigationItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "#services" },
  { label: "Our Mission", path: "#mission" },
  { label: "Contact Us", path: "#contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#004d40", // Updated background color
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile Navigation */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box
            sx={{
              backgroundColor: "#004d40",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: 2,
            }}
          >
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color: "#ffffff",
                  paddingY: 1.5,
                  paddingX: 2,
                  marginBottom: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#00695c", // Darker shade on hover
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Drawer>

        {/* Logo or Brand Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Replace this with your actual logo component or image */}
          {/* <Logo /> */}
        </Box>

        {/* Desktop Navigation Links */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              style={{ textDecoration: "none" }}
            >
              <Typography
                color="#ffffff" // Changed to white for better contrast
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#4DB6AC",
                    transform:
                      pathname === item.path ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "bottom left",
                    transition: "transform 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                  fontWeight: pathname === item.path ? 600 : 400,
                }}
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Right Side (e.g., Login Button) */}
        <Box sx={{ display: "flex", gap: 2 , }}>
          <CustomButton
            variant="tertiary"
            onClick={() => handleNavigation("/login")}
          >
            Login
          </CustomButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
