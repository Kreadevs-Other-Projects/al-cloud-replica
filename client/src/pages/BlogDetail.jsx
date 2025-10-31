import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/api/blogs/slug/${slug}`).then((res) => setBlog(res.data));
  }, [slug]);

  if (!blog) return null;

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="overline" color="primary">
          BLOG
        </Typography>
        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.6, mb: 4 }}>
          {new Date(blog.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {blog.content}
        </Typography>
      </Container>
    </Box>
  );
};

export default BlogDetail;
