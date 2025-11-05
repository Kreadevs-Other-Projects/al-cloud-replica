import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import api from "../api/axios.js";

// dummy / fallback data
const FALLBACK_SERVICES = [
  {
    _id: "1",
    title: "Teleconsultation",
    description:
      "Talk to certified doctors from home for instant health advice.",
    icon: "📞",
  },
  {
    _id: "2",
    title: "Diagnostics",
    description: "Book lab tests and get digital reports delivered securely.",
    icon: "🧪",
  },
  {
    _id: "3",
    title: "Home Nursing",
    description:
      "Professional nursing care and physiotherapy at your doorstep.",
    icon: "🏥",
  },
  {
    _id: "4",
    title: "Medicine Delivery",
    description: "Order prescriptions with same-day delivery.",
    icon: "💊",
  },
  {
    _id: "5",
    title: "Vaccination",
    description: "Book child or adult vaccination appointments online.",
    icon: "💉",
  },
  {
    _id: "6",
    title: "Health Packages",
    description: "Comprehensive health checkups tailored to your lifestyle.",
    icon: "📦",
  },
  {
    _id: "7",
    title: "Chronic Care Follow-up",
    description: "Remote follow-ups for diabetes, hypertension and COPD.",
    icon: "🩻",
  },
  {
    _id: "8",
    title: "Corporate Health",
    description: "Plans designed for clinics, hospitals and remote teams.",
    icon: "🏢",
  },
];

const Services = () => {
  const [list, setList] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    api
      .get("/api/services")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setList(res.data);
        }
      })
      .catch(() => {
        // keep fallback
        setList(FALLBACK_SERVICES);
      });
  }, []);

  return (
    <>
      {/* top hero / header */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #ebfbff 0%, #ffffff 48%, #e1f3f7 100%)",
          py: { xs: 6, md: 8 },
          borderBottom: "1px solid rgba(0,0,0,0.03)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.55)" }}>
            <MuiLink underline="hover" color="inherit" href="/">
              Home
            </MuiLink>
            <Typography color="text.primary">Services</Typography>
          </Breadcrumbs>

          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: 3 }}
          >
            OUR OFFERING
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#0f172a",
              lineHeight: 1.05,
            }}
          >
            Clinical & remote care services.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 620,
              color: "rgba(15,23,42,.7)",
            }}
          >
            Everything from teleconsultations to diagnostics, home nursing,
            vaccination and personalized wellness packages — built for patients,
            doctors and care-coordination teams.
          </Typography>
        </Container>
      </Box>

      {/* main grid */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="All Services"
            subtitle="CHOOSE WHAT YOU NEED"
            center={false}
          />

          <Grid container spacing={2.5}>
            {list.map((s, idx) => (
              <Grid key={s._id || idx} item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    animation: "serviceFade .45s ease forwards",
                    animationDelay: `${idx * 0.06}s`,
                    opacity: 0,
                  }}
                >
                  <ServiceCard item={s} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* page-level animation keyframes */}
        <style>
          {`
            @keyframes serviceFade {
              0% { opacity: 0; transform: translateY(14px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Box>
    </>
  );
};

export default Services;
