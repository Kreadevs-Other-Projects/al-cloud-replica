import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState(0);
  const [doctors, setDoctors] = useState(0);

  useEffect(() => {
    const targetAppointments = 25000;
    const targetDoctors = 120;

    const stepAppointments = Math.ceil(targetAppointments / 80);
    const stepDoctors = Math.ceil(targetDoctors / 80);

    const interval = setInterval(() => {
      setAppointments((prev) => {
        const next = prev + stepAppointments;
        return next >= targetAppointments ? targetAppointments : next;
      });
      setDoctors((prev) => {
        const next = prev + stepDoctors;
        return next >= targetDoctors ? targetDoctors : next;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) return `${Math.floor(num / 1000)}k+`;
    return `${num}+`;
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #ebfbff 0%, #ffffff 45%, #e1f3f7 100%)",
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6}>
            <Box sx={{ maxWidth: 580 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  letterSpacing: ".3em",
                }}
              >
                Smart, connected healthcare.
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.05,
                  fontSize: { xs: "2.4rem", sm: "2.8rem", md: "3.3rem" },
                  mb: 2,
                  color: "#0f172a",
                }}
              >
                Modern healthcare, <br /> human touch.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: 480,
                  color: "rgba(15,23,42,0.72)",
                }}
              >
                Book appointments, talk to specialists and get your reports
                online. Built for hospitals, clinics and remote care teams.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/appointment")}
                  sx={{
                    borderRadius: 99,
                    textTransform: "none",
                    px: 3,
                    boxShadow: "0 10px 25px rgba(14,116,144,.25)",
                  }}
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

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    24/7 virtual care
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Talk to a real doctor in minutes.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Encrypted & secure
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    HIPAA-ready platform.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {formatNumber(appointments)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Appointments booked
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {doctors}+
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Certified doctors
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -40,
                  right: 30,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "rgba(14,116,144,0.12)",
                  filter: "blur(2px)",
                }}
              />
              <Paper
                elevation={6}
                sx={{
                  ml: "auto",
                  width: 420,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  p: 3,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Today’s appointments
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  3 new teleconsultations booked, 1 follow-up and 2 lab results
                  ready.
                </Typography>

                <Stack spacing={1.5}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      background: "#0f7c9012",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        Dr. Ayesha Khan
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cardiology · 11:30 AM
                      </Typography>
                    </Box>
                    <Button size="small" variant="text">
                      Join
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      background: "#fff",
                      border: "1px solid #edf2f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        Lab report ready
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Patient: Sara · CBC
                      </Typography>
                    </Box>
                    <Button size="small" variant="outlined">
                      View
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: 2,
                      background: "#fff",
                      border: "1px solid #edf2f7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">Home nursing</Typography>
                      <Typography variant="caption" color="text.secondary">
                        2:15 PM · Assigned
                      </Typography>
                    </Box>
                    <Button size="small" variant="text">
                      Details
                    </Button>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
