// src/components/Hero.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import heroImage from "../assets/contemplative_lake.png";

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "80vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        background: "linear-gradient(135deg, #E0F7FA 0%, #FFE0B2 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          zIndex: 1,
        },
      }}
    >
      {/* Left side: Text */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          textAlign: { xs: "center", md: "left" },
          mb: { xs: 4, md: 0 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "EB Garamond, serif",
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "4rem" },
            color: "#FF6B6B",
            textShadow: "2px 2px 5px rgba(0,0,0,0.15)",
            lineHeight: 1.2,
          }}
        >
          We Listen. You Heal.
        </Typography>
        <Typography
          variant="h5"
          sx={{ maxWidth: 600, color: "text.secondary", mb: 2 }}
        >
          Connect with psychology students for free, safe, and meaningful
          conversations.
        </Typography>

        {/* Gradient Button with smooth flowing animation */}
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            background:
              "linear-gradient(270deg, #FFB997, #FFD9C8, #FFCBB3, #FFE0B2, #FFB997)",
            backgroundSize: "800% 800%",
            color: "#fff",
            fontWeight: 600,
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: "none",
            transition: "transform 0.3s ease",
            animation: "gradientFlow 12s ease infinite",
            "&:hover": {
              transform: "scale(1.05)",
            },
            "@keyframes gradientFlow": {
              "0%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
              "100%": { backgroundPosition: "0% 50%" },
            },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Right side: Illustration */}
      <Box
        sx={{ position: "relative", zIndex: 2, flex: 1, textAlign: "center" }}
      >
        <img
          src={heroImage}
          alt="Contemplative moment by the lake"
          style={{ width: "100%", maxWidth: 400, borderRadius: 16 }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
