import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import api from "../api/axios.js";

const AppointmentForm = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    service: "",
    doctor: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    api.get("/api/services").then((res) => setServices(res.data));
    api.get("/api/doctors").then((res) => setDoctors(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDone(false);
    try {
      await api.post("/api/appointments", form);
      setDone(true);
      setForm({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        service: "",
        doctor: "",
        date: "",
        notes: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {done && <Alert severity="success">Appointment request submitted!</Alert>}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Full Name"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            name="patientEmail"
            value={form.patientEmail}
            onChange={handleChange}
            fullWidth
            required
            type="email"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            name="patientPhone"
            value={form.patientPhone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Service"
            name="service"
            value={form.service}
            onChange={handleChange}
            fullWidth
            required
          >
            {services.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            fullWidth
          >
            {doctors.map((d) => (
              <MenuItem key={d._id} value={d._id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="date"
            label="Preferred Date"
            name="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Submitting..." : "Book Appointment"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentForm;
