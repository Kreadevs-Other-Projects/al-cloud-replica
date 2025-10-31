import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AppointmentForm from "../components/AppointmentForm.jsx";

const Appointment = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
              Book your appointment
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Fill out the form and we’ll confirm your appointment by email or
              phone.
            </Typography>
            <AppointmentForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 420,
                borderRadius: 4,
                background:
                  "url(https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1200) center/cover",
              }}
            ></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Appointment;
