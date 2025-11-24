// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 8,
        py: 6,
        px: 3,
        textAlign: "center",
        background: "linear-gradient(135deg, #D9E4FF 0%, #FFE0DE 100%)",
        borderTop: "2px solid rgba(255,255,255,0.4)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Brand */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Dancing Script', cursive",
          color: "#FFBFA5",
          fontWeight: 700,
          textShadow: "0px 2px 6px rgba(0,0,0,0.15)",
          mb: 2,
          userSelect: "none",
        }}
      >
        ListenLab
      </Typography>

      {/* Footer Links */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
        {["Privacy", "Terms", "Support"].map((text) => (
          <Link
            key={text}
            href="#"
            underline="none"
            sx={{
              fontFamily: "EB Garamond, serif",
              fontSize: "1rem",
              color: "#6B4C3B", // dark warm chocolate color for readability
              transition: "0.3s ease",
              textShadow: "0px 1px 2px rgba(0,0,0,0.2)", // subtle depth
              "&:hover": { color: "#FF9E80", textDecoration: "underline" }, // soft warm highlight
            }}
          >
            {text}
          </Link>
        ))}
      </Box>

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          color: "#6B4C3B", // same warm chocolate
          fontFamily: "EB Garamond, serif",
          fontSize: "0.95rem",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)", // subtle shadow for contrast
        }}
      >
        © 2025 ListenLab. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
