// src/pages/Pricing.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import PricingSection from "../components/Pricing.jsx"; // <-- this is your current component from Home

const PricingPage = () => {
  return (
    <>
      {/* page hero */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #ebfbff 0%, #ffffff 50%, #dff3f8 100%)",
          borderBottom: "1px solid rgba(15,124,144,0.04)",
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ letterSpacing: 4, color: "primary.main" }}
          >
            PRICING
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mt: 1,
              mb: 1.5,
              color: "#0f172a",
              lineHeight: 1.05,
            }}
          >
            Simple pricing for every care team.
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 620, color: "rgba(15,23,42,.65)" }}
          >
            Start small or roll out to your entire clinic — all plans include
            secure appointments, digital prescriptions and care coordination.
          </Typography>
          {/* placeholder for toggle (Monthly / Yearly) */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              size="small"
              variant="contained"
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              Monthly
            </Button>
            <Button
              size="small"
              variant="text"
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              Yearly (save 15%)
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* your existing pricing cards */}
      <PricingSection />

      {/* comparison / extras */}
      <Box sx={{ py: 6, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "#fff",
                  border: "1px solid rgba(15,124,144,0.05)",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                  All plans include
                </Typography>
                <Stack spacing={1}>
                  {[
                    "HIPAA-ready secure platform",
                    "Online appointment booking",
                    "Doctor / nurse notes",
                    "Email support (24–48 hrs)",
                  ].map((f) => (
                    <Stack
                      key={f}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "rgba(11,134,157,0.12)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 12,
                          color: "primary.main",
                        }}
                      >
                        ✓
                      </Box>
                      <Typography variant="body2">{f}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background:
                    "linear-gradient(160deg, rgba(5,99,123,0.14) 0%, rgba(255,255,255,1) 100%)",
                  border: "1px solid rgba(5,99,123,0.08)",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
                  Need enterprise / multi-location?
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  We support assisted living facilities, group homes, LTC /
                  combo pharmacies and telehealth providers.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    boxShadow: "0 12px 30px rgba(5,99,123,0.25)",
                  }}
                >
                  Talk to sales
                </Button>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Still not sure which plan to pick?
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Tell us about your facility and we’ll match you to a plan in under
              24 hours.
            </Typography>
            <Button
              variant="outlined"
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              Get a custom quote
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PricingPage;
