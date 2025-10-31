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
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
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
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navLinks.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                color={location.pathname === item.to ? "primary" : "inherit"}
                sx={{
                  fontWeight: 500,
                  color:
                    location.pathname === item.to
                      ? "primary.main"
                      : "text.primary",
                }}
              >
                {item.label}
              </Button>
            ))}
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  color="primary"
                  variant="outlined"
                >
                  Dashboard
                </Button>
                <Button onClick={logout} color="secondary" variant="contained">
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            )}
          </Box>
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, mt: 2 }}>
          <List>
            {navLinks.map((item) => (
              <ListItemButton
                key={item.to}
                component={Link}
                to={item.to}
                selected={location.pathname === item.to}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </ListItemButton>
            ))}
            {user ? (
              <>
                <ListItemButton
                  onClick={() => {
                    navigate("/dashboard");
                    setOpen(false);
                  }}
                >
                  Dashboard
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </ListItemButton>
              </>
            ) : (
              <ListItemButton
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
              >
                Login
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
