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
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [solutionsAnchor, setSolutionsAnchor] = React.useState(null);

  const topLinks = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Pricing", to: "/pricing" },
    { label: "Doctors", to: "/doctors" },
    { label: "Appointment", to: "/appointment" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const solutionLinks = [
    { label: "Modules / Features", to: "/modules" },
    { label: "ALF / Senior Care", to: "/senior-care" },
    { label: "Pharmacy Focus", to: "/pharmacy-focus" },
    { label: "Workflows", to: "/workflows" },
    { label: "Privacy", to: "/privacy" },
  ];

  const handleSolutionsEnter = (event) => {
    setSolutionsAnchor(event.currentTarget);
  };
  const handleSolutionsLeave = () => {
    setSolutionsAnchor(null);
  };

  const isSolutionsOpen = Boolean(solutionsAnchor);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          py: { xs: 1, md: 2 },
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(15,124,144,0.03)",
          zIndex: 999,
        }}
      >
        <Toolbar sx={{ minHeight: 100, px: { xs: 1.5, md: 3 } }}>
          <Typography
            variant="h4"
            sx={{
              flexGrow: { xs: 1, md: 0 },
              fontWeight: 700,
              color: "#0F7C90",
              cursor: "pointer",
              mr: { md: 3 },
            }}
            onClick={() => navigate("/")}
          >
            CloudCare.
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {topLinks.slice(0, 2).map((item) => {
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

            <Box
              onMouseEnter={handleSolutionsEnter}
              onMouseLeave={handleSolutionsLeave}
              sx={{ position: "relative" }}
            >
              <Button
                disableRipple
                endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />}
                sx={{
                  position: "relative",
                  px: 2,
                  borderRadius: 999,
                  fontWeight: 500,
                  fontSize: 16,
                  color: isSolutionsOpen
                    ? "primary.main"
                    : solutionLinks.some((s) =>
                        location.pathname.startsWith(s.to)
                      )
                    ? "primary.main"
                    : "text.primary",
                  backgroundColor:
                    isSolutionsOpen ||
                    solutionLinks.some((s) =>
                      location.pathname.startsWith(s.to)
                    )
                      ? "rgba(15,124,144,0.08)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(15,124,144,0.08)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "50%",
                    bottom: 4,
                    transform:
                      solutionLinks.some((s) =>
                        location.pathname.startsWith(s.to)
                      ) || isSolutionsOpen
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
                Solutions
              </Button>

              <Menu
                anchorEl={solutionsAnchor}
                open={isSolutionsOpen}
                onClose={handleSolutionsLeave}
                MenuListProps={{
                  onMouseLeave: handleSolutionsLeave,
                  sx: { py: 1 },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1,
                    borderRadius: 3,
                    minWidth: 230,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(11,134,157,0.12)",
                  },
                }}
              >
                {solutionLinks.map((item) => (
                  <MenuItem
                    key={item.to}
                    onClick={() => {
                      navigate(item.to);
                      handleSolutionsLeave();
                    }}
                    selected={location.pathname === item.to}
                    sx={{
                      py: 1,
                      fontWeight: location.pathname === item.to ? 600 : 400,
                      fontSize: 14.5,
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {topLinks.slice(2).map((item) => {
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
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outlined"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
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
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(12px)",
            minWidth: 250,
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
          {topLinks.map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={() => setOpenDrawer(false)}
              sx={{ mx: 1, borderRadius: 2 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <Divider sx={{ my: 1 }} />
          <ListItemText
            primary="Solutions"
            sx={{ pl: 2, mb: 0.5, fontWeight: 700 }}
          />
          {solutionLinks.map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={() => setOpenDrawer(false)}
              sx={{ pl: 3, borderRadius: 2 }}
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
                  setOpenDrawer(false);
                }}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  logout();
                  setOpenDrawer(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              onClick={() => {
                navigate("/login");
                setOpenDrawer(false);
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
