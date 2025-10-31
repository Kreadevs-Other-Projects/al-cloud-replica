import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ background: "#0F2435", color: "#fff", py: 5, mt: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight={700}>
              CloudCare.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Smart, connected healthcare experience.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight={600}>
              Contact
            </Typography>
            <Typography variant="body2">hello@cloudcare.com</Typography>
            <Typography variant="body2">+1 (555) 123 4567</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} CloudCare. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
