import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
  Typography,
} from "@mui/material";
import api from "../api/axios.js";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const FALLBACK_SERVICES = [
  { _id: "s1", title: "General Consultation" },
  { _id: "s2", title: "Online / Telehealth" },
  { _id: "s3", title: "Cardiology" },
  { _id: "s4", title: "Diagnostics & Lab Tests" },
];

const FALLBACK_DOCTORS = [
  { _id: "d1", name: "Dr. Ayesha Khan" },
  { _id: "d2", name: "Dr. Imran Malik" },
  { _id: "d3", name: "Dr. Fatima Noor" },
];

const AppointmentForm = () => {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [doctors, setDoctors] = useState(FALLBACK_DOCTORS);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    service: "Select Service",
    doctor: "Select Doctor",
    date: "",
    notes: "",
  });

  useEffect(() => {
    api
      .get("/api/services")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0)
          setServices(res.data);
      })
      .catch(() => {});
    api
      .get("/api/doctors")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0)
          setDoctors(res.data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDone(false);

    if (!form.patientName || !form.patientEmail || !form.service) {
      setError("Please fill required fields (Name, Email, Service).");
      return;
    }

    setLoading(true);
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
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {done && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
          Appointment request submitted! We’ll confirm shortly.
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* Full Name */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Full Name"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Email"
            name="patientEmail"
            value={form.patientEmail}
            onChange={handleChange}
            fullWidth
            required
            type="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Phone"
            name="patientPhone"
            value={form.patientPhone}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Grid>

        {/* Service */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Service"
            name="service"
            value={form.service}
            onChange={handleChange}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          >
            <MenuItem selected={true} value="Select Service">
              Select Service
            </MenuItem>
            {services.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Doctor */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            fullWidth
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          >
            <MenuItem selected={true} value="Select Doctor">
              Select Doctor
            </MenuItem>
            {doctors.map((d) => (
              <MenuItem key={d._id} value={d._id}>
                {d.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Date */}
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            type="date"
            label="Preferred Date"
            name="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Grid>

        {/* Notes */}
        {/* <Grid item xs={12} md={8}>
          <TextField
            label="Notes / Symptoms / Message"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            placeholder="Tell us what you’re feeling or what you need..."
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Grid> */}

        {/* Button */}
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
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            sx={{
              borderRadius: 999,
              px: 4,
              py: 2,
              width: { xs: "100%", md: "auto" },
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 18px 30px rgba(11,134,157,0.25)",
              right: 0,
            }}
          >
            {loading ? "Submitting..." : "Book Appointment"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentForm;
