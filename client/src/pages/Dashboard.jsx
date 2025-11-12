import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import api from "../api/axios.js";
import { useAuth } from "../hooks/useAuth.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api
      .get("/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch(() => {});
    api
      .get("/api/contact")
      .then((res) => setContacts(res.data))
      .catch(() => {});
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          Welcome, {user?.name}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.6 }}>
                Appointments
              </Typography>
              <Typography variant="h3">{appointments.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.6 }}>
                Contact Requests
              </Typography>
              <Typography variant="h3">{contacts.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.6 }}>
                Role
              </Typography>
              <Typography variant="h4">{user?.role}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Latest Appointments
              </Typography>
              <List>
                {appointments.slice(0, 5).map((a) => (
                  <ListItem key={a._id} divider>
                    <ListItemText
                      primary={a.patientName}
                      secondary={`${a.service?.title || ""} — ${new Date(
                        a.createdAt
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                New Messages
              </Typography>
              <List>
                {contacts.slice(0, 5).map((c) => (
                  <ListItem key={c._id} divider>
                    <ListItemText primary={c.name} secondary={c.message} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
