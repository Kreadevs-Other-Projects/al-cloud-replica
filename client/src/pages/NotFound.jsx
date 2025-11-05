// src/pages/NotFound.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #ebfbff 0%, #ffffff 40%, #dff3f8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* floating blobs */}
      <Box
        sx={{
          position: "absolute",
          top: -120,
          right: -90,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(11,134,157,0.18)",
          filter: "blur(2px)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -70,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(5,99,123,0.16)",
          animation: "float 7s ease-in-out infinite",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            textAlign: "center",
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 18px 48px rgba(13,38,76,0.08)",
            animation: "fadeUp404 .6s ease",
          }}
        >
          {/* animated 404 */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 78, md: 110 },
              fontWeight: 700,
              lineHeight: 1,
              background:
                "linear-gradient(120deg, #0b869d 0%, #094c79 35%, #0b869d 75%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
            }}
          >
            404
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Page not found
          </Typography>
          <Typography sx={{ opacity: 0.7, mb: 3 }}>
            The page you are looking for doesn’t exist or was moved.
            <br />
            Let’s get you back to CloudCare 🏥
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="center"
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 999,
                px: 3,
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() => nav("/")}
            >
              Go to Home
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 999,
                px: 3,
                textTransform: "none",
              }}
              onClick={() => nav("/contact")}
            >
              Contact Support
            </Button>
          </Stack>

          {/* tiny helper footer */}
          <Typography
            variant="caption"
            sx={{ display: "block", mt: 3, opacity: 0.4 }}
          >
            cloudcare / assisted living platform
          </Typography>
        </Paper>
      </Container>

      {/* keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(14px); }
            100% { transform: translateY(0); }
          }
          @keyframes fadeUp404 {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default NotFound;
