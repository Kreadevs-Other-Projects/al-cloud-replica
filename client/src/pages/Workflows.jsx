// src/pages/Workflows.jsx
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
  Paper,
  Stack,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import api from "../api/axios.js";

const INTEGRATIONS = [
  {
    title: "eFax → Document Storage → File",
    desc: "Incoming faxes are captured and routed to the right resident/staff record — no printing, no double entry.",
  },
  {
    title: "HR → Scheduling → Budgeting",
    desc: "When you create a schedule, system checks hours/budget so you don’t overspend.",
  },
  {
    title: "HR → Docs → Alerts",
    desc: "Track licenses/certifications and auto-alert when they are about to expire.",
  },
  {
    title: "Care → Billing",
    desc: "Care level / services changes flow to billing so revenue isn’t lost.",
  },
];

const AREAS = [
  { title: "Care", desc: "EMAR, charting, tasks, assessments in one flow." },
  {
    title: "Engagement",
    desc: "Family / corporate portals, activities, updates.",
  },
  {
    title: "Operations",
    desc: "e-Consents, e-Docs, work orders, CRM, training.",
  },
  { title: "Financial", desc: "Budget, spend-down, resident funds, billing." },
  {
    title: "Compliance / Oversight",
    desc: "Dashboards, analytics, risk, surveys.",
  },
];

const Workflows = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/api/contact", {
        ...form,
        subject: "Workflows / Multi-Functional",
      });
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* HERO */}
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
            <Typography color="text.primary">Workflows</Typography>
          </Breadcrumbs>

          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1.5, color: "#0f172a" }}
          >
            Multi-Functional Workflows
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.75 }}>
            Manage Assisted Living, Group Home and IDD processes in one system —
            so faxing, HR, care, billing and budgeting talk to each other
            automatically.
          </Typography>
        </Container>
      </Box>

      {/* INTEGRATION CARDS */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background: "linear-gradient(120deg,#fff 0%,#e8f5f8 90%)",
            }}
          >
            <Typography
              variant="overline"
              sx={{ letterSpacing: 3, color: "primary.main" }}
            >
              Connected processes
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>
              Automate “fax → docs → tasks” and “HR → schedule → budget”.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75, maxWidth: 720 }}>
              These are the exact examples on the reference page — you can show
              them in demos for AL / group homes.
            </Typography>
          </Paper>

          <Grid container spacing={2.5}>
            {INTEGRATIONS.map((item) => (
              <Grid key={item.title} item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    background: "rgba(255,255,255,.9)",
                    border: "1px solid rgba(15,124,144,0.03)",
                    boxShadow: "0 14px 30px rgba(15,124,144,0.03)",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.7, mt: 0.6, lineHeight: 1.6 }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* COVERS ALL AREAS */}
      <Box sx={{ py: { xs: 4, md: 5 }, background: "#fff" }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 3,
              color: "primary.main",
              mb: 1.5,
              display: "block",
            }}
          >
            Care · Engagement · Operations · Financial · Compliance
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            One workflow layer across all departments
          </Typography>

          <Grid container spacing={2.5}>
            {AREAS.map((area) => (
              <Grid key={area.title} item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {area.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
                      {area.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* DEMO / CONTACT */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: "linear-gradient(180deg,#e7f6f9 0%,#f9fbfc 70%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Show me these workflows
              </Typography>
              <Typography sx={{ opacity: 0.7, mb: 3 }}>
                Tell us what you want to connect (eFax, HR, billing, docs…)
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                {sent && (
                  <Alert
                    severity="success"
                    sx={{ mb: 2, borderRadius: 2 }}
                    onClose={() => setSent(false)}
                  >
                    Thank you! We will be in touch soon.
                  </Alert>
                )}
                <Stack spacing={2}>
                  <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Which modules to connect?"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={sending}
                    sx={{
                      borderRadius: 999,
                      px: 4,
                      py: 1.1,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    {sending ? "Sending..." : "Submit"}
                  </Button>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 4,
                  minHeight: 240,
                  background:
                    "linear-gradient(160deg, rgba(5,99,123,0.12) 0%, rgba(5,99,123,0) 45%), url(https://images.unsplash.com/photo-1604691887309-456a5c13904e?auto=format&fit=crop&w=1400&q=70) center/cover",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Workflows;
