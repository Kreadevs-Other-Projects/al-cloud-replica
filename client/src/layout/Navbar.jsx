import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Doctors", to: "/doctors" },
  { label: "Appointment", to: "/appointment" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          py: { xs: 1, md: 2 },
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid rgba(15,124,144,0.03)",
          transition: "all .35s ease",
          zIndex: 999,
          animation: "navDrop .4s ease",
          "@keyframes navDrop": {
            from: { transform: "translateY(-20px)", opacity: 0 },
            to: { transform: "translateY(0)", opacity: 1 },
          },
        }}
      >
        <Toolbar sx={{ minHeight: 100, px: { xs: 1.5, md: 3 } }}>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "#0F7C90",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            CloudCare.
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              alignItems: "center",
            }}
          >
            {navLinks.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  disableRipple
                  sx={{
                    position: "relative",
                    px: 2,
                    borderRadius: 999,
                    fontWeight: 500,
                    fontSize: 16,
                    color: active ? "primary.main" : "text.primary",
                    backgroundColor: active
                      ? "rgba(15,124,144,0.08)"
                      : "transparent",
                    transition: "all .2s",
                    "&:hover": {
                      backgroundColor: "rgba(15,124,144,0.08)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: "50%",
                      bottom: 4,
                      transform: active
                        ? "translateX(-50%) scaleX(1)"
                        : "translateX(-50%) scaleX(0)",
                      transformOrigin: "center",
                      width: "24px",
                      height: "2px",
                      borderRadius: 999,
                      background: "rgba(15,124,144,.95)",
                      transition: "transform .2s ease",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}

            {user ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outlined"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    ml: 1,
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={logout}
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    ml: 1,
                    boxShadow: "0 12px 20px rgba(240,68,56,0.15)",
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  ml: 1,
                  px: 3,
                  boxShadow: "0 12px 26px rgba(15,124,144,.25)",
                }}
              >
                Login
              </Button>
            )}
          </Box>

          <IconButton
            sx={{
              display: { xs: "inline-flex", md: "none" },
              ml: 1,
              scale: 1.4,
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(16px)",
            minWidth: 240,
          },
        }}
      >
        <Box sx={{ mt: 1, mb: 2, px: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#0F7C90", mb: 1.5 }}
          >
            CloudCare.
          </Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <List>
          {navLinks.map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.3,
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1 }} />

          {user ? (
            <>
              <ListItemButton
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
            >
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
