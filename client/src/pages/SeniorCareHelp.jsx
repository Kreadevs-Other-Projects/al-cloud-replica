import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
  Alert,
  Chip,
  Paper,
} from "@mui/material";
import api from "../api/axios.js";
import Contact from "./Contact.jsx";

const FEATURE_SECTIONS = [
  {
    title: "Document & Faxes",
    desc: "Receive, file and route documents/faxes in seconds instead of minutes.",
  },
  {
    title: "Quality of Care",
    desc: "Use EMAR, charting, tasks and real-time dashboards to stay compliant.",
  },
  {
    title: "Informed Consent e-Signatures",
    desc: "Send vaccine/flu/COVID consents to POAs, auto-track and auto-file.",
  },
  {
    title: "Awards / Recognition",
    desc: "Get certificates / recognition when communities hit quality marks.",
  },
  {
    title: "Marketing / Sales",
    desc: "Show families proof of quality and stand out from local competitors.",
  },
  {
    title: "Reduce Risk",
    desc: "Trigger protocols and tasks for adverse events so nothing is missed.",
  },
  {
    title: "Budget / Cost Control",
    desc: "See budget vs actual and get alerts when lines approach limits.",
  },
  {
    title: "Multi-Location Overview",
    desc: "View and manage multiple homes from your phone.",
  },
  {
    title: "Improved Operations",
    desc: "Analytics help you find bottlenecks and fix compliance gaps.",
  },
];

const SeniorCareHelp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/api/contact", {
        ...form,
        subject: "Senior Care / ALF Demo Request",
      });
      setSent(true);
      setForm({ name: "", email: "", phone: "", org: "", message: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(140deg, #ebfbff 0%, #ffffff 46%, #dff3f8 95%)",
          py: { xs: 6, md: 8 },
          borderBottom: "1px solid rgba(15,124,144,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink underline="hover" href="/">
              Home
            </MuiLink>
            <Typography color="text.primary">
              How we help Senior Care
            </Typography>
          </Breadcrumbs>

          <Chip
            label="ALF / Group Home Focus"
            size="small"
            sx={{
              mb: 2,
              bgcolor: "rgba(11,134,157,.09)",
              color: "primary.main",
              fontWeight: 600,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.04,
              mb: 1.5,
              maxWidth: 760,
            }}
          >
            How CloudCare helps Senior Care & Group Homes
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 700, color: "rgba(15,23,42,.7)", mb: 3 }}
          >
            Save time, stay compliant and give families visibility — without
            buying 5 different systems.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              href="#demo"
              sx={{
                borderRadius: 999,
                px: 3.5,
                py: 1.1,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Get a demo
            </Button>
            <Button
              variant="outlined"
              href="/modules"
              sx={{
                borderRadius: 999,
                px: 3,
                textTransform: "none",
              }}
            >
              View all modules
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background: "linear-gradient(120deg, #ffffff 0%, #e8f5f8 90%)",
            }}
          >
            <Typography
              variant="overline"
              sx={{ letterSpacing: 3, color: "primary.main" }}
            >
              End-to-End Time Savers
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mt: 1, mb: 1, color: "#0f172a" }}
            >
              Built for assisted living, group homes, IDD and middle-market
              senior care.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75, maxWidth: 720 }}>
              From EMAR and e-consents to multi-location dashboards — everything
              lives in one cloud platform.
            </Typography>
          </Paper>

          <Grid container spacing={2.5}>
            {FEATURE_SECTIONS.map((item, idx) => (
              <Grid key={item.title} item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    background: "rgba(255,255,255,.9)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(15,124,144,0.035)",
                    boxShadow: "0 14px 30px rgba(15,124,144,0.03)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 2,
                          bgcolor: "rgba(11,134,157,0.12)",
                          display: "grid",
                          placeItems: "center",
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ opacity: 0.7, mt: 0.6, lineHeight: 1.6 }}
                        >
                          {item.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Contact />
    </>
  );
};

export default SeniorCareHelp;
