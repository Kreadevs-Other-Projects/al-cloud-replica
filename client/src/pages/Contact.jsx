import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Alert,
  Typography,
  Fade,
  Stack,
  Paper,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import api from "../api/axios.js";

const Contact = () => {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/api/contact", form);
      setDone(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: "linear-gradient(180deg, #e7f6f9 0%, #f9fbfc 55%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 4, color: "primary.main" }}
          >
            CONTACT
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mt: 1, color: "#0f172a" }}
          >
            We’d love to hear from you
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 500, mx: "auto", mt: 1, opacity: 0.7 }}
          >
            Reach out for appointments, partnership inquiries or platform
            support — we usually respond within a few hours.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* LEFT: FORM */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={500}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 18px 46px rgba(15,124,144,0.08)",
                }}
              >
                {done && (
                  <Alert
                    severity="success"
                    sx={{ mb: 2, borderRadius: 2 }}
                    onClose={() => setDone(false)}
                  >
                    We have received your message. Our care team will contact
                    you soon.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="email"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        label="Subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        fullWidth
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
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
                          py: 1.2,
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "0 14px 30px rgba(11,134,157,0.2)",
                        }}
                      >
                        {sending ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          {/* RIGHT: CONTACT INFO + MAP */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={620}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 14px 26px rgba(15,124,144,0.06)",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ opacity: 0.6, mb: 1 }}>
                    Contact details
                  </Typography>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: "rgba(11,134,157,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                        }}
                      >
                        <EmailOutlinedIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          hello@cloudcare.com
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          for appointments & support
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: "rgba(11,134,157,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                        }}
                      >
                        <PhoneInTalkOutlinedIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          +1 (555) 123 4567
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          Mon – Fri, 9am – 6pm
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: "rgba(11,134,157,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                        }}
                      >
                        <LocationOnOutlinedIcon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="body2">
                          99 Medical Park, Chicago
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          Illinois, United States
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>

                {/* Map / illustration placeholder */}
                <Box
                  sx={{
                    flex: 1,
                    minHeight: 210,
                    borderRadius: 4,
                    overflow: "hidden",
                    background:
                      "url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=60) center/cover",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(120deg, #0f7c90bb 0%, #0f243500 70%)",
                    }}
                  />
                  <Box sx={{ position: "absolute", bottom: 16, left: 16 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#fff", mb: 0.5 }}
                    >
                      Our clinic location
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#fff" }}>
                      Easily accessible, parking available
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
