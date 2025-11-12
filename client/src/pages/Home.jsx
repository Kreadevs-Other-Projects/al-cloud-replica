// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import Hero from "../components/Hero.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import TestimonialSlider from "../components/TestimonialSlider.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Pricing from "../components/Pricing.jsx";
import api from "../api/axios.js";

const Home = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/services")
      .then((res) => {
        console.log("services api:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data.slice(0, 6));
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.warn("services api failed:", err);
        setServices([]);
      });

    api
      .get("/api/doctors")
      .then((res) => {
        console.log("doctors api:", res.data);
        const doctorItems = Array.isArray(res.data.items)
          ? res.data.items
          : Array.isArray(res.data)
          ? res.data
          : [];
        if (doctorItems.length > 0) {
          setDoctors(doctorItems.slice(0, 4));
        } else {
          setDoctors([]);
        }
      })
      .catch((err) => {
        console.warn("doctors api failed:", err);
        setDoctors([]);
      });

    api
      .get("/api/blogs")
      .then((res) => {
        console.log("blogs api:", res.data);
        const blogItems = Array.isArray(res.data.items) ? res.data.items : [];
        setBlogs(blogItems.slice(0, 3));
      })
      .catch((err) => {
        console.warn("blogs api failed:", err);
        setBlogs([]);
      });
  }, []);

  return (
    <>
      <Hero />

      {loading ? (
        <Box
          sx={{
            py: 10,
            textAlign: "center",
            background: "#f5f8fb",
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading content...</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ py: { xs: 5, md: 7 }, background: "#f5f8fb" }}>
            <Container maxWidth="lg">
              <SectionTitle title="Our Services" subtitle="WHAT WE DO" center />
              {services.length > 0 ? (
                <Grid container spacing={3} justifyContent="center">
                  {services.map((s) => (
                    <Grid key={s._id} item xs={12} sm={6} md={4}>
                      <ServiceCard item={s} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography textAlign="center" sx={{ mt: 3 }}>
                  No services available.
                </Typography>
              )}
            </Container>
          </Box>

          <Box sx={{ py: { xs: 5, md: 7 }, background: "#e7f6f9" }}>
            <SectionTitle title="Our Doctors" subtitle="SPECIALISTS" center />
            {doctors.length > 0 ? (
              <Grid container spacing={3} justifyContent="center">
                {doctors.map((d) => (
                  <Grid key={d._id} item xs={12} sm={6} md={3}>
                    <DoctorCard item={d} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography textAlign="center" sx={{ mt: 3 }}>
                No doctors found.
              </Typography>
            )}
          </Box>

          <Pricing />
          <TestimonialSlider />

          <Box sx={{ py: { xs: 5, md: 7 }, background: "#f5f8fb" }}>
            <SectionTitle
              title="Latest from Blog"
              subtitle="KNOWLEDGE CENTER"
              center
            />
            {blogs.length > 0 ? (
              <Grid container spacing={3} justifyContent="center">
                {blogs.map((b) => (
                  <Grid key={b._id} item xs={12} sm={6} md={4}>
                    <BlogCard item={b} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography textAlign="center" sx={{ mt: 3 }}>
                No blog posts available.
              </Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
