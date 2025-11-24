// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import sessionImg from "../assets/session.png";

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
          py: 12,
          px: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #FFE8D9 0%, #FFD9C8 50%, #FFCBB3 100%)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          mb: 8,
        }}
      >
        {/* Left side text */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            mb: { xs: 4, md: 0 },
            px: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "EB Garamond, serif",
              fontWeight: 700,
              color: "#FF6B6B",
              textShadow: "1px 1px 3px rgba(0,0,0,0.12)",
              mb: 2,
            }}
          >
            Why ListenLab?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "EB Garamond, serif",
              color: "#555555",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            ListenLab connects psychology students with people seeking support
            in a safe and welcoming environment. Our platform ensures meaningful
            conversations while keeping things engaging and gamified for
            students.
          </Typography>

          {/* Gradient Join Now Button (same as Hero) */}
          <Button
            variant="contained"
            size="large"
            disableRipple
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
              boxShadow: "none",
              outline: "none",
              "&:focus": { boxShadow: "none" },
              "&:active": { boxShadow: "none" },
              "&:hover": { transform: "scale(1.05)" },
              "@keyframes gradientFlow": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
            }}
          >
            Join Now
          </Button>
        </Box>

        {/* Right side illustration */}
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            px: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 450,
              height: 350,
              borderRadius: 3,
              background:
                "linear-gradient(135deg, #FFD9C8 0%, #FFE8D9 50%, #FFF1EC 100%)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              display: "inline-block",
              overflow: "hidden",
            }}
          >
            <img
              src={sessionImg}
              alt="Session Illustration"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: 12,
          px: 2,
          bgcolor: "transparent",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontFamily: "EB Garamond, serif",
            fontWeight: 700,
            color: "#FF6B6B",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          What People Say
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {testimonials.map((t, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 3,
                  bgcolor: "#FFF3E0",
                  transition: "all 0.4s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    mb: 2,
                    fontFamily: "EB Garamond, serif",
                    color: "#555555",
                  }}
                >
                  "{t.feedback}"
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontFamily: "EB Garamond, serif",
                    color: "#FF6B6B",
                  }}
                >
                  - {t.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
