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
  InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import api from "../api/axios.js";

const Contact = () => {
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      if (!form.name || !form.email || !form.message) {
        throw new Error("Please fill Name, Email and Message.");
      }
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        throw new Error("Please enter a valid email.");
      }
      if (form.website?.trim()) return setSending(false);

      const res = await api.post("/api/contact", form);

      if (res.status === 201) {
        setDone(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        throw new Error("Failed to submit contact form.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background:
          "linear-gradient(180deg, #e7f6f9 0%, rgba(247,250,252,0.85) 55%)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
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
            sx={{ maxWidth: 560, mx: "auto", mt: 1, opacity: 0.72 }}
          >
            Reach out for appointments, partnership inquiries or platform
            support — we usually respond within a few hours.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Fade in timeout={400}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(15,124,144,0.06)",
                  boxShadow: "0 14px 32px rgba(11,134,157,0.10)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {done && (
                  <Alert
                    severity="success"
                    sx={{ mb: 2, borderRadius: 2 }}
                    onClose={() => setDone(false)}
                  >
                    We’ve received your message. Our care team will contact you
                    soon.
                  </Alert>
                )}

                {error && (
                  <Alert
                    severity="error"
                    sx={{ mb: 2, borderRadius: 2 }}
                    onClose={() => setError("")}
                  >
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        size="medium"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        size="medium"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneInTalkOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        size="medium"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SubjectOutlinedIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        size="medium"
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        rows={4}
                        label="Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                      />
                    </Grid>

                    <TextField
                      label="Website"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      autoComplete="off"
                      tabIndex={-1}
                      style={{
                        position: "absolute",
                        opacity: 0,
                        height: 0,
                        overflow: "hidden",
                        pointerEvents: "none",
                      }}
                    />

                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "flex-start", md: "flex-end" },
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={sending}
                        fullWidth={false}
                        sx={{
                          borderRadius: 999,
                          px: 4,
                          py: 1,
                          textTransform: "none",
                          fontWeight: 700,
                          boxShadow: "0 12px 26px rgba(11,134,157,0.22)",
                          width: { xs: "100%", md: "auto" },
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

          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Fade in timeout={520}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                    width: "145%",
                    minHeight: { xs: 360, md: 260 },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      flex: { xs: "1 1 100%", md: "0 0 40%" },
                      p: 3,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.92)",
                      border: "1px solid rgba(15,124,144,0.06)",
                      boxShadow: "0 10px 24px rgba(15,124,144,0.08)",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ opacity: 0.65, mb: 2 }}
                    >
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
                  </Paper>

                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", md: "1 1 60%" },
                      borderRadius: 4,
                      overflow: "hidden",
                      position: "relative",
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=60')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: { xs: 180, sm: 220, md: 260 },
                      boxShadow: "0 10px 24px rgba(9,19,33,0.10)",
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
                      <Typography
                        variant="caption"
                        sx={{ color: "#fff", opacity: 0.9 }}
                      >
                        Easily accessible, parking available
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
