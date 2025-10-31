// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Hero from "../components/Hero.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import TestimonialSlider from "../components/TestimonialSlider.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Pricing from "../components/Pricing.jsx";
import api from "../api/axios.js";

const FALLBACK_SERVICES = [
  {
    _id: "1",
    title: "Teleconsultation",
    description:
      "Talk to certified doctors from home for instant health advice.",
    icon: "📞",
  },
  {
    _id: "2",
    title: "Diagnostics",
    description: "Book lab tests and get digital reports delivered securely.",
    icon: "🧪",
  },
  {
    _id: "3",
    title: "Home Nursing",
    description:
      "Professional nursing care and physiotherapy at your doorstep.",
    icon: "🏥",
  },
  {
    _id: "4",
    title: "Medicine Delivery",
    description: "Order prescriptions with same-day delivery.",
    icon: "💊",
  },
  {
    _id: "5",
    title: "Vaccination",
    description: "Book child or adult vaccination appointments easily online.",
    icon: "💉",
  },
  {
    _id: "6",
    title: "Health Packages",
    description: "Comprehensive health checkups tailored to your lifestyle.",
    icon: "📦",
  },
];

const FALLBACK_DOCTORS = [
  {
    _id: "d1",
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    email: "ayesha.khan@cloudcare.com",
    image: "",
  },
  {
    _id: "d2",
    name: "Dr. Imran Malik",
    specialty: "Dermatologist",
    email: "imran.malik@cloudcare.com",
    image: "",
  },
  {
    _id: "d3",
    name: "Dr. Fatima Noor",
    specialty: "Pediatrician",
    email: "fatima.noor@cloudcare.com",
    image: "",
  },
  {
    _id: "d4",
    name: "Dr. Kamran Abbas",
    specialty: "Orthopedic Surgeon",
    email: "kamran.abbas@cloudcare.com",
    image: "",
  },
];

export const FALLBACK_BLOGS = [
  {
    _id: "b1",
    slug: "boost-your-immunity-naturally",
    title: "5 Everyday Habits to Boost Your Immunity",
    excerpt:
      "Simple lifestyle changes — hydration, sleep, and the right nutrition — can strengthen your natural defenses.",
    image:
      "https://images.unsplash.com/photo-1551198291-b23a97ce0b9a?auto=format&fit=crop&w=1000&q=60",
    author: "Dr. Ayesha Khan",
    readTime: "4 min read",
    date: "Oct 2, 2025",
  },
  {
    _id: "b2",
    slug: "telemedicine-is-changing-healthcare",
    title: "How Telemedicine is Transforming Patient Care",
    excerpt:
      "Virtual appointments are making healthcare more accessible, affordable, and responsive for patients.",
    image:
      "https://images.unsplash.com/photo-1618498082410-b4aa1ae0f32e?auto=format&fit=crop&w=1000&q=60",
    author: "Dr. Imran Malik",
    readTime: "6 min read",
    date: "Sep 28, 2025",
  },
  {
    _id: "b3",
    slug: "managing-diabetes-the-right-way",
    title: "Managing Diabetes/Sugar the Right Way",
    excerpt:
      "Monitoring sugar, staying active, and following doctor-led plans can dramatically reduce diabetes.",
    image:
      "https://images.unsplash.com/photo-1583361704493-d4d4d1b1d70b?auto=format&fit=crop&w=1000&q=60",
    author: "Nutrition Team, CloudCare",
    readTime: "5 min read",
    date: "Sep 12, 2025",
  },
  {
    _id: "b4",
    slug: "heart-health-in-your-30s",
    title: "Heart Health in Your 30s: What to Watch",
    excerpt:
      "BP, cholesterol, and stress management matter earlier than you think. Here's how to stay on track.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=60",
    author: "Cardiology Dept.",
    readTime: "3 min read",
    date: "Aug 30, 2025",
  },
];

const Home = () => {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [doctors, setDoctors] = useState(FALLBACK_DOCTORS);
  const [blogs, setBlogs] = useState(FALLBACK_BLOGS);

  useEffect(() => {
    api
      .get("/api/services")
      .then((res) => {
        console.log("services api:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data.slice(0, 6));
        } else {
          setServices(FALLBACK_SERVICES);
        }
      })
      .catch((err) => {
        console.warn("services api failed, using fallback", err);
        setServices(FALLBACK_SERVICES);
      });

    api
      .get("/api/doctors")
      .then((res) => {
        console.log("doctors api:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setDoctors(res.data.slice(0, 4));
        } else {
          setDoctors(FALLBACK_DOCTORS);
        }
      })
      .catch((err) => {
        console.warn("doctors api failed, using fallback", err);
        setDoctors(FALLBACK_DOCTORS);
      });

    api
      .get("/api/blogs")
      .then((res) => {
        console.log("blogs api:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data.slice(0, 3));
        } else {
          setBlogs(FALLBACK_BLOGS);
        }
      })
      .catch((err) => {
        console.warn("blogs api failed, using fallback", err);
        setBlogs(FALLBACK_BLOGS);
      });
  }, []);

  return (
    <>
      <Hero />

      <Box sx={{ py: { xs: 5, md: 7 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <SectionTitle title="Our Services" subtitle="WHAT WE DO" center />
          <Grid container spacing={3} justifyContent="center">
            {services.map((s) => (
              <Grid key={s._id} item xs={12} sm={6} md={4}>
                <ServiceCard item={s} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 7 }, background: "#e7f6f9" }}>
        <SectionTitle title="Our Doctors" subtitle="SPECIALISTS" center />
        <Grid container spacing={3} justifyContent="center">
          {doctors.map((d) => (
            <Grid key={d._id} item xs={12} sm={6} md={3}>
              <DoctorCard item={d} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Pricing />

      <TestimonialSlider />

      <Box sx={{ py: { xs: 5, md: 7 }, background: "#f5f8fb" }}>
        <SectionTitle
          title="Latest from blog"
          subtitle="KNOWLEDGE CENTER"
          center
        />
        <Grid container spacing={3} justifyContent="center">
          {blogs.map((b) => (
            <Grid key={b._id} item xs={12} sm={6} md={4}>
              <BlogCard item={b} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
