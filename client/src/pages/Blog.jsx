// src/pages/Blogs.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import BlogCard from "../components/BlogCard.jsx";
import api from "../api/axios.js";

// fallback (same style as your Home.jsx)
const FALLBACK_BLOGS = [
  {
    _id: "b1",
    slug: "assisted-living-emar-software",
    title: "Why Assisted Living Needs Modern eMAR Software",
    excerpt:
      "Medication errors, paper MARs and disconnected pharmacies make AL ops hard. A modern eMAR fixes that for nurses and admins.",
    author: "CloudCare Editorial",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    category: "EMAR",
  },
  {
    _id: "b2",
    slug: "telemedicine-is-changing-healthcare",
    title: "How Telemedicine is Transforming Patient Care",
    excerpt:
      "Virtual appointments are making care more accessible, affordable and responsive for seniors.",
    author: "Dr. Imran Malik",
    date: "Sep 28, 2025",
    readTime: "6 min read",
    category: "Telehealth",
  },
  {
    _id: "b3",
    slug: "digital-intake-for-ltc",
    title: "Digital Intake for LTC & Group Homes",
    excerpt:
      "Move from clipboard intake to digital workflows connected to pharmacy, HR and billing.",
    author: "CloudCare Product Team",
    date: "Sep 20, 2025",
    readTime: "4 min read",
    category: "Workflows",
  },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState(FALLBACK_BLOGS);

  useEffect(() => {
    api
      .get("/api/blogs")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data);
        }
      })
      .catch(() => {
        setBlogs(FALLBACK_BLOGS);
      });
  }, []);

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          background:
            "linear-gradient(140deg, #ebfbff 0%, #ffffff 46%, #dff3f8 95%)",
          py: { xs: 6, md: 8 },
          borderBottom: "1px solid rgba(15,124,144,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink underline="hover" href="/">
              Home
            </MuiLink>
            <Typography color="text.primary">Blogs</Typography>
          </Breadcrumbs>

          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
            Insights for Assisted Living, Group Homes & LTC
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.75 }}>
            Product updates, eMAR best practices, pharmacy integrations and
            workflow tips — same idea as the AL-CloudCare blog.
          </Typography>
        </Container>
      </Box>

      {/* GRID */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {blogs.map((b, idx) => (
              <Grid key={b._id || b.slug} item xs={12} sm={6} md={4}>
                <BlogCard item={b} index={idx} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Blogs;
