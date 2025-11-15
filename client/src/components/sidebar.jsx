import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
    { text: "Blogs", icon: <ArticleIcon />, path: "/management" },
    { text: "Management", icon: <PeopleIcon />, path: "/management" },
    { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
  ];

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>A</Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Admin Panel
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administrator
          </Typography>
        </Box>
      </Box>

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
            boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
            boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
