import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import api from "../api/axios.js";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const AppointmentForm = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

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
    api
      .get("/api/services")
      .then((res) => {
        const arr = Array.isArray(res.data)
          ? res.data.filter((s) => s.isActive !== false)
          : [];
        setServices(arr);
      })
      .catch(() => {});

    api
      .get("/api/doctors")
      .then((res) => {
        const arr = Array.isArray(res.data?.items)
          ? res.data.items
          : Array.isArray(res.data)
          ? res.data
          : [];
        setDoctors(arr.filter((d) => d.isActive !== false));
      })
      .catch(() => {});
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!form.service) return doctors;
    const svc = services.find((s) => s._id === form.service);
    if (!svc) return doctors;
    const key = (svc.title || "").toLowerCase();
    const subset = doctors.filter((d) =>
      (d.specialty || "").toLowerCase().includes(key.split(" ")[0])
    );
    return subset.length ? subset : doctors;
  }, [form.service, doctors, services]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDone(false);

    if (
      !form.patientName ||
      !form.patientEmail ||
      !form.service ||
      !form.doctor ||
      !form.date
    ) {
      setError(
        "Please fill required fields (Name, Email, Service, Doctor, Date)."
      );
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
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const todayISO = new Date().toISOString().slice(0, 10);

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

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Service"
            name="service"
            value={form.service}
            onChange={(e) => {
              handleChange(e);
              setForm((prev) => ({ ...prev, doctor: "" }));
            }}
            required
            SelectProps={{ displayEmpty: true }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
              width: "240px",
            }}
          >
            {services.map((s) => (
              <MenuItem key={s._id} value={s._id}>
                {s.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
            SelectProps={{ displayEmpty: true }}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
              width: "240px",
            }}
          >
            {filteredDoctors.map((d) => (
              <MenuItem key={d._id} value={d._id}>
                {d.name} {!!d.specialty && `— ${d.specialty}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            type="date"
            label="Preferred Date"
            name="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: todayISO }}
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
