import React, { useState } from "react";
import { Box, Container, Grid, TextField, Button, Alert } from "@mui/material";
import api from "../api/axios.js";

const Contact = () => {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/contact", form);
    setDone(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit}>
              {done && (
                <Alert severity="success">We have received your message.</Alert>
              )}
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" type="submit">
                Send Message
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#f5f5f5",
                height: "100%",
                borderRadius: 4,
                p: 4,
              }}
            >
              Reach us at:
              <br />
              hello@cloudcare.com
              <br />
              +1 (555) 123 4567
              <br />
              99 Medical Park, Chicago
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
