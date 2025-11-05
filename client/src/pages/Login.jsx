// src/pages/Auth.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = ({ redirectTo = "/" }) => {
  const { login, signup } = useAuth(); // make sure your context exposes signup, or we’ll mock below
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const dest = loc.state?.from || redirectTo;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(loginForm.email, loginForm.password);
      nav(dest, { replace: true });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // if your context has no signup yet, comment next line and just nav
      if (signup) {
        await signup(signupForm.name, signupForm.email, signupForm.password);
      }
      // you can auto-login or redirect to login
      await login(signupForm.email, signupForm.password);
      nav(dest, { replace: true });
    } catch (err) {
      setError("Could not create account. Try a different email.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #ebfbff 0%, #e5f1f4 45%, #ffffff 80%)",
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="overline"
          sx={{
            display: "block",
            textAlign: "center",
            mb: 2,
            letterSpacing: 3,
            color: "primary.main",
            fontWeight: 600,
          }}
        >
          WELCOME TO CLOUDCARE
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 5 },
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "0 20px 45px rgba(15,124,144,0.12)",
            animation: "slideUp .55s ease",
          }}
        >
          {/* toggle */}
          <Stack
            direction="row"
            sx={{
              mb: 4,
              bgcolor: "rgba(15,124,144,0.05)",
              borderRadius: 999,
              p: 0.5,
            }}
          >
            <Button
              onClick={() => {
                setMode("login");
                setError("");
              }}
              fullWidth
              variant={mode === "login" ? "contained" : "text"}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                boxShadow:
                  mode === "login"
                    ? "0 12px 30px rgba(15,124,144,0.3)"
                    : "none",
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              fullWidth
              variant={mode === "signup" ? "contained" : "text"}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 600,
                boxShadow:
                  mode === "signup"
                    ? "0 12px 30px rgba(15,124,144,0.3)"
                    : "none",
              }}
            >
              Sign up
            </Button>
          </Stack>

          {mode === "login" ? (
            <>
              <Typography
                variant="h4"
                sx={{ mb: 1.5, textAlign: "center", fontWeight: 700 }}
              >
                Welcome back 👋
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3.5, textAlign: "center", color: "text.secondary" }}
              >
                Sign in to manage appointments and content.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ animation: "fadeIn .4s ease" }}
              >
                <TextField
                  label="Email address"
                  fullWidth
                  required
                  sx={{ mb: 2.5 }}
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type={showPass ? "text" : "password"}
                  fullWidth
                  required
                  sx={{ mb: 1.5 }}
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass((p) => !p)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    mb: 2,
                    opacity: 0.7,
                  }}
                >
                  Forgot password?
                </Typography>

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 999,
                    py: 1.1,
                    fontWeight: 600,
                    boxShadow: "0 12px 40px rgba(15,124,144,0.35)",
                    textTransform: "none",
                    mb: 3,
                  }}
                >
                  Sign in
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{ mb: 1.5, textAlign: "center", fontWeight: 700 }}
              >
                Create an account ✨
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 3.5, textAlign: "center", color: "text.secondary" }}
              >
                Join CloudCare to book, meet doctors and manage teams.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSignup}
                noValidate
                sx={{ animation: "fadeIn .4s ease" }}
              >
                <TextField
                  label="Full name"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Email address"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type={showPass ? "text" : "password"}
                  fullWidth
                  required
                  sx={{ mb: 2.5 }}
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass((p) => !p)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 999,
                    py: 1.1,
                    fontWeight: 600,
                    boxShadow: "0 12px 40px rgba(15,124,144,0.35)",
                    textTransform: "none",
                    mb: 3,
                  }}
                >
                  Create account
                </Button>
              </Box>
            </>
          )}

          <Divider sx={{ my: 2.5 }}>secure by CloudCare</Divider>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            By continuing you agree to our Terms & Privacy.
          </Typography>
        </Paper>

        <style>
          {`
            @keyframes slideUp {
              0% { opacity: 0; transform: translateY(10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              0% { opacity: 0; transform: translateY(6px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Container>
    </Box>
  );
};

export default Auth;
