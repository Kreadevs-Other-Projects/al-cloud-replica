// src/pages/PharmacyFocus.jsx
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
  Button,
  TextField,
  Alert,
  Chip,
} from "@mui/material";
import api from "../api/axios.js";

const BENEFITS = [
  {
    title: "Help LTC customers grow",
    desc: "Give them EMAR so they stay compliant and paperless.",
  },
  {
    title: "Differentiate your pharmacy",
    desc: "Show up with software, not just fills.",
  },
  {
    title: "Run e-consent campaigns",
    desc: "Send flu/COVID/vaccine consents in clicks.",
  },
  {
    title: "Reduce med wastage",
    desc: "Get move-out / D/C info fast so you don't ship unneeded meds.",
  },
  {
    title: "Easy connections",
    desc: "Works with existing LTC / AL partners.",
  },
  {
    title: "Grow revenue per facility",
    desc: "Use the partner program to keep the account.",
  },
];

const PharmacyFocus = () => {
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
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/api/contact", {
        ...form,
        subject: "Pharmacy Focus / LTC EMAR Demo Request",
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
            <Typography color="text.primary">Pharmacy Focus</Typography>
          </Breadcrumbs>

          <Chip
            label="For LTC & Combo Pharmacies"
            size="small"
            sx={{
              mb: 2,
              bgcolor: "rgba(11,134,157,.09)",
              color: "primary.main",
              fontWeight: 600,
            }}
          />

          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Pharmacy-friendly EMAR
          </Typography>
          <Typography sx={{ maxWidth: 620, mb: 3 }}>
            EMAR for LTC pharmacies, starting at <b>$3.99/bed/month</b>, to help
            you serve AL / group homes better.
          </Typography>

          <Button
            variant="contained"
            href="#pharmacy-demo"
            sx={{ borderRadius: 999, px: 3, textTransform: "none" }}
          >
            Request a demo
          </Button>
        </Container>
      </Box>

      {/* BENEFITS */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            How it helps your pharmacy
          </Typography>

          <Grid container spacing={2.5}>
            {BENEFITS.map((b) => (
              <Grid key={b.title} item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: "rgba(255,255,255,.9)",
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {b.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
                      {b.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* DEMO FORM */}
      <Box
        id="pharmacy-demo"
        sx={{
          py: { xs: 5, md: 6 },
          background: "linear-gradient(180deg, #e7f6f9 0%, #f9fbfc 70%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Get in touch with us for a demo!
              </Typography>
              <Typography sx={{ opacity: 0.7, mb: 3 }}>
                One of our team will be in contact with you shortly.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                {sent && (
                  <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                    onClose={() => setSent(false)}
                  >
                    Thank you! We will be in touch soon.
                  </Alert>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      name="name"
                      fullWidth
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      fullWidth
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Pharmacy / Org"
                      name="org"
                      fullWidth
                      value={form.org}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="What are you trying to solve?"
                      name="message"
                      fullWidth
                      multiline
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={sending}
                      sx={{
                        borderRadius: 999,
                        px: 4,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      {sending ? "Sending..." : "Submit"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Typography
                variant="caption"
                sx={{ display: "block", mt: 2, opacity: 0.6 }}
              >
                By submitting you agree you may receive SMS messages.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 4,
                  minHeight: 240,
                  background:
                    "linear-gradient(160deg, rgba(5,99,123,0.12) 0%, rgba(5,99,123,0.0) 45%), url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=70) center/cover",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PharmacyFocus;
