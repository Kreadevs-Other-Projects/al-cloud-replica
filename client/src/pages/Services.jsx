import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import api from "../api/axios.js";

const Services = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/api/services").then((res) => setList(res.data));
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <SectionTitle
          title="All Services"
          subtitle="OUR OFFERING"
          align="left"
        />
        <Grid container spacing={3}>
          {list.map((s) => (
            <Grid key={s._id} item xs={12} md={4}>
              <ServiceCard item={s} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
