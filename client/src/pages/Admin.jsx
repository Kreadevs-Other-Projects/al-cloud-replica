import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const Admin = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/contact");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-14",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joinDate: "2024-01-13",
      status: "Inactive",
    },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <NotificationsIcon />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
            U
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Welcome back, Admin! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your platform today.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PeopleIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total Users</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                1,234
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+12% this month</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(240, 147, 251, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ArticleIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Total Blogs</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                45
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+5% this month</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(79, 172, 254, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Appointments</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                67
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+8% this month</Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                color: "white",
                boxShadow: "0 4px 20px rgba(67, 233, 123, 0.3)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <MoneyIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Revenue</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                $12,345
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2">+15% this month</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: 600, mb: 3 }}
              >
                Recent Users
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Join Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                mr: 2,
                                bgcolor: "primary.main",
                              }}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={
                              user.status === "Active" ? "success" : "default"
                            }
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                mb: 3,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Platform Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  User Registration
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />

                <Typography variant="body2" gutterBottom>
                  Blog Posts
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />

                <Typography variant="body2" gutterBottom>
                  Appointments
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />

                <Typography variant="body2" gutterBottom>
                  Revenue Target
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;
