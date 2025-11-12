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
import doctorImg from "../assets/doctor.png";

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
                textAlign: "center",
              }}
            >
              <img
                src={doctorImg}
                alt="Dashboard illustration"
                style={{
                  width: "150%",
                  maxWidth: "600px",
                  borderRadius: "20px",
                  scale: "131%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
