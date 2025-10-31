import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import SectionTitle from "./SectionTitle";

const plans = [
  {
    id: "basic",
    name: "Starter Care",
    price: "$19",
    period: "/month",
    desc: "For individuals who want basic online access.",
    features: [
      "Online appointment booking",
      "1 teleconsult / month",
      "Digital prescriptions",
    ],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Family Plus",
    price: "$39",
    period: "/month",
    desc: "Best for families up to 4 members.",
    features: [
      "Priority doctor access",
      "Up to 4 teleconsults / month",
      "Lab & diagnostics discounts",
      "24/7 support",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Clinic / Team",
    price: "$89",
    period: "/month",
    desc: "For small clinics, remote teams or corporates.",
    features: [
      "Unlimited appointments",
      "Dedicated care manager",
      "Staff health dashboard",
      "Custom integrations",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background:
          "radial-gradient(circle at 10% 20%, rgba(222,248,255,1) 0%, rgba(244,249,252,1) 61%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          subtitle="PLANS & PRICING"
          title="Flexible plans for patients, families and teams"
          center
        />
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          justifyContent="center"
        >
          {plans.map((plan) => (
            <Grid key={plan.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 4,
                  width: 350,
                  height: "100%",
                  backdropFilter: "blur(16px)",
                  background: plan.highlighted
                    ? "linear-gradient(160deg, rgba(5,99,123,0.85) 0%, rgba(5,99,123,0.35) 100%)"
                    : "rgba(255,255,255,0.5)",
                  border: plan.highlighted
                    ? "1px solid rgba(255,255,255,0.5)"
                    : "1px solid #e0edf0",
                  boxShadow: plan.highlighted
                    ? "0 20px 35px rgba(5,99,123,0.35)"
                    : "0 12px 25px rgba(15,116,137,0.08)",
                  color: plan.highlighted ? "#fff" : "inherit",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {plan.highlighted && (
                  <Chip
                    label="Most Popular"
                    color="secondary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: "rgba(255,255,255,.16)",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                )}
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                    {plan.desc}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
                    <Typography variant="h3" fontWeight={700}>
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1, opacity: 0.7 }}>
                      {plan.period}
                    </Typography>
                  </Box>

                  <Stack spacing={1.2} sx={{ mb: 3 }}>
                    {plan.features.map((f) => (
                      <Box
                        key={f}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: plan.highlighted
                              ? "rgba(255,255,255,0.2)"
                              : "#e0f2f7",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 12,
                          }}
                        >
                          ✓
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ opacity: plan.highlighted ? 0.85 : 0.9 }}
                        >
                          {f}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    fullWidth
                    variant={plan.highlighted ? "contained" : "outlined"}
                    sx={{
                      borderRadius: 99,
                      py: 1,
                      textTransform: "none",
                      bgcolor: plan.highlighted ? "#fff" : "transparent",
                      color: plan.highlighted ? "#05637b" : "inherit",
                      borderColor: plan.highlighted
                        ? "transparent"
                        : "rgba(5,99,123,0.35)",
                      "&:hover": {
                        bgcolor: plan.highlighted
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(5,99,123,0.05)",
                      },
                    }}
                  >
                    {plan.highlighted
                      ? "Start with Family Plus"
                      : "Choose plan"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
