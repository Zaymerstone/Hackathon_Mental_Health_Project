// src/components/Features.jsx
import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";

const features = [
  {
    title: "Safe Space",
    description: "Talk anonymously in a safe and supportive environment.",
  },
  {
    title: "Student Experience",
    description: "Students gain real hands‑on experience in therapy support.",
  },
  {
    title: "Earn XP",
    description:
      "Gain experience points for helping others, integrated with our learning system.",
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        py: 12,
        px: 2,
        background: "linear-gradient(135deg, #E0F7FA 0%, #FFE0B2 100%)", // main background
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 6,
          fontFamily: "EB Garamond, serif",
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "2.5rem" },
          color: "#FF6B6B",
          textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        How It Works
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {features.map((feat, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "transparent",
                transition: "all 0.3s ease-in-out",
                animation: `float 6s ease-in-out ${idx * 0.2}s infinite`,
                background:
                  "linear-gradient(135deg, #FFF3E0, #FFE0B2, #FFF1E6, #FFD7BA)",
                backgroundSize: "400% 400%",
                animationName: "float, gradientFlow",
                animationDuration: "6s, 20s",
                animationTimingFunction: "ease-in-out, ease-in-out",
                animationIterationCount: "infinite, infinite",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-8px)" },
                },
                "@keyframes gradientFlow": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" },
                  "100%": { backgroundPosition: "0% 50%" },
                },
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: "EB Garamond, serif",
                  fontWeight: 600,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  color: "#FF6B6B",
                  mb: 1,
                }}
              >
                {feat.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "EB Garamond, serif",
                  color: "#555555",
                  lineHeight: 1.6,
                }}
              >
                {feat.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
