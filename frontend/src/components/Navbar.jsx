// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

const Navbar = () => {
  return (
    <>
      {/* Sticky Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #FFB997, #FF928B)",
          top: 0,
          left: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo — left side */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 700,
              color: "#FFF4EA",
              letterSpacing: "1px",
              textShadow: "0px 2px 4px rgba(0,0,0,0.15)",
              userSelect: "none",
            }}
          >
            ListenLab
          </Typography>

          {/* Navigation Links — centered */}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 5, // space between links
            }}
          >
            {["Home", "About", "Contact"].map((text) => (
              <Link
                key={text}
                href={`#${text.toLowerCase()}`}
                underline="none"
                color="inherit"
                sx={{
                  fontSize: "1rem",
                  cursor: "pointer",
                  position: "relative",
                  px: 0.5,

                  "&:hover": {
                    color: "#FFE8D6", // warm cream
                  },
                  "&:active": {
                    color: "#FFD4C2", // slightly deeper warm peach
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -3,
                    width: "0%",
                    height: "2px",
                    backgroundColor: "#FFE8D6",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {text}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content Wrapper */}
      <Box sx={{ pt: "90px" }}>{/* your content goes here */}</Box>
    </>
  );
};

export default Navbar;
