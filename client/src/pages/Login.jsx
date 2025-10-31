import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ redirectTo = "/" }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const dest = loc.state?.from || redirectTo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      nav(dest, { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
