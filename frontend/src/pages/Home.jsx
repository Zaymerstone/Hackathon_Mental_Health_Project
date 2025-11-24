// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
// Optional: import your illustration
// import illustration from "../assets/mental_health_illustration.svg";

const testimonials = [
  {
    name: "Jane D.",
    feedback: "I felt supported and heard. The students were great listeners!",
  },
  {
    name: "John S.",
    feedback: "A safe space to talk about my problems and get advice.",
  },
  {
    name: "Emily W.",
    feedback: "Gamification keeps students motivated, and I feel heard!",
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Illustration / Call to Action Section */}
      <Box
        sx={{
          py: 8,
          px: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#F9FAFB",
        }}
      >
        {/* Left side text */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 4, md: 0 },
          }}
        >
          <Typography variant="h4" gutterBottom>
            Why ListenLab?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ListenLab connects psychology students with people seeking support
            in a safe environment.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#6C63FF", "&:hover": { bgcolor: "#5a54d1" } }}
          >
            Join Now
          </Button>
        </Box>

        {/* Right side illustration */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          {/* <img src={illustration} alt="Mental Health" style={{ width: "100%", maxWidth: 400 }} /> */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              height: 300,
              bgcolor: "#E0E0E0",
              borderRadius: 2,
              display: "inline-block",
            }}
          >
            {/* Placeholder for illustration */}
          </Box>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, px: 2, bgcolor: "#FFFFFF" }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          What People Say
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((t, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>
                  "{t.feedback}"
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  - {t.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer Placeholder */}
      <Box sx={{ py: 4, textAlign: "center", bgcolor: "#F3F4F6" }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 ListenLab. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
