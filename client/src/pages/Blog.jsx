import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import BlogCard from "../components/BlogCard.jsx";
import api from "../api/axios.js";
import SectionTitle from "../components/SectionTitle.jsx";

const Blog = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/api/blogs").then((res) => setList(res.data));
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <SectionTitle title="Health Articles" subtitle="BLOG" align="left" />
        <Grid container spacing={3}>
          {list.map((b) => (
            <Grid key={b._id} item xs={12} md={4}>
              <BlogCard item={b} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
