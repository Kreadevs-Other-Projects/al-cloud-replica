import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import SectionTitle from "../components/SectionTitle.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import api from "../api/axios.js";

const Doctors = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/api/doctors").then((res) => setList(res.data));
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <SectionTitle title="Find a Doctor" subtitle="OUR TEAM" align="left" />
        <Grid container spacing={3}>
          {list.map((d) => (
            <Grid key={d._id} item xs={12} md={3}>
              <DoctorCard item={d} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Doctors;
