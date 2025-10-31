import React from "react";
import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #ebfbff 0%, #ffffff 45%, #e1f3f7 100%)",
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 620,
          }}
        >
          <Typography variant="overline" sx={{ color: "primary.main" }}>
            Smart, connected healthcare.
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              lineHeight: 1.05,
              fontSize: { xs: "2.8rem", md: "3.5rem" },
              mb: 2,
              color: "#0f172a",
            }}
          >
            Modern healthcare, <br /> human touch.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, maxWidth: 480, color: "rgba(15,23,42,0.7)" }}
          >
            Book appointments, talk to specialists and get your reports online.
            Built for hospitals, clinics and remote care teams.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/appointment")}
              sx={{ borderRadius: 99, textTransform: "none", px: 3 }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/services")}
              sx={{ borderRadius: 99, textTransform: "none" }}
            >
              Our Services
            </Button>
          </Stack>

          <Stack direction="row" spacing={4}>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                25k+
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Appointments booked
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                120+
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Certified doctors
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
