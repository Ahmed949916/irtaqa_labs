"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, MobileStepper, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Image, { StaticImageData } from "next/image";
import { useSwipeable } from "react-swipeable";

interface SlideshowImage {
  src: string | StaticImageData;
  alt: string;
}

interface SlideshowProps {
  images: SlideshowImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const SlideShow: React.FC<SlideshowProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const maxSteps = images.length;

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev === maxSteps - 1 ? 0 : prev + 1));
  }, [maxSteps]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => (prev === 0 ? maxSteps - 1 : prev - 1));
  }, [maxSteps]);

  // Auto-play effect with pause on hover
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, handleNext, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleBack();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBack, handleNext]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handleBack,
    preventScrollOnSwipe: true, // from react-swipeable
    trackMouse: true,
  });

  return (
    <Box
      sx={{ width: "100%", flexGrow: 1 }}
      {...handlers}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slideshow container with fixed (responsive) height */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 200, sm: 400, md: 500 },
          width: "100%",
          overflow: "hidden",
        }}
      >
        {images.map((image, index) => {
          const isActive = index === activeStep;
          return (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                transition: "opacity 1s ease-in-out",
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </Box>
          );
        })}
      </Box>

      {/* Navigation Buttons
      <IconButton
        onClick={handleBack}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
        aria-label="previous slide"
      >
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton> */}

      {/* <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
        aria-label="next slide"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton> */}

      {/* Stepper Indicators */}
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          backgroundColor: "transparent",
          justifyContent: "center",
          py: 1,
        }}
        nextButton={null}
        backButton={null}
        variant="dots"
      />
    </Box>
  );
};

export default SlideShow;
