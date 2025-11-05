import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import AppointmentForm from "../components/AppointmentForm.jsx";

const Appointment = () => {
  return (
    <>
      {/* top hero */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #ebfbff 0%, #ffffff 45%, #e1f3f7 100%)",
          py: { xs: 6, md: 8 },
          borderBottom: "1px solid rgba(15,124,144,0.04)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 3 }}
          >
            APPOINTMENT
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              lineHeight: 1.03,
              color: "#0f172a",
              mb: 1.5,
            }}
          >
            Book your appointment
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(15,23,42,.7)", maxWidth: 560 }}
          >
            Fill the form and our care team will reach out to confirm your slot.
            You can choose the doctor, department or teleconsultation.
          </Typography>
        </Container>
      </Box>

      {/* main content */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="stretch">
            {/* form */}
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.8, md: 3.5 },
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(11,134,157,0.05)",
                  boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
                  animation: "slideUp .5s ease forwards",
                  opacity: 0,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Patient details
                </Typography>
                <AppointmentForm />
              </Paper>
            </Grid>

            {/* right side info */}
            <Grid item xs={12} md={5}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    background:
                      "url(https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1400) center/cover",
                    minHeight: 180,
                    position: "relative",
                    animation: "fadeIn .6s ease .15s forwards",
                    opacity: 0,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(145deg, rgba(15,124,144,.9) 0%, rgba(2,55,73,0.15) 100%)",
                    }}
                  />
                  <Box sx={{ position: "relative", p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#fff", fontWeight: 700, mb: 1 }}
                    >
                      Need urgent help?
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,.86)", mb: 1.6 }}
                    >
                      Call our 24/7 helpline and we will connect you to the
                      nearest doctor.
                    </Typography>
                    <Chip
                      label="+1 (555) 123 4567"
                      sx={{
                        bgcolor: "rgba(255,255,255,.2)",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(15,124,144,0.02)",
                    animation: "fadeIn .6s ease .25s forwards",
                    opacity: 0,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1.5 }}
                  >
                    Working hours
                  </Typography>

                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Mon – Fri</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      9:00 AM – 7:00 PM
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Saturday</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      9:00 AM – 5:00 PM
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">Sunday</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      On-call
                    </Typography>
                  </Stack>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(249, 253, 255, 0.7)",
                    border: "1px solid rgba(15,124,144,0.02)",
                    animation: "fadeIn .6s ease .35s forwards",
                    opacity: 0,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Why book online?
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.78 }}>
                    • Priority booking for teleconsults
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.78 }}>
                    • Digital reports & prescriptions
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.78 }}>
                    • Track past visits from dashboard
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* page animations */}
      <style>
        {`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}
      </style>
    </>
  );
};

export default Appointment;
