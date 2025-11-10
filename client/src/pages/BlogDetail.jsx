import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import api from "../api/axios.js";
import { Fallback } from "../constants/blogDetail.js";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(Fallback);

  useEffect(() => {
    api
      .get(`/api/blogs/slug/${slug}`)
      .then((res) => {
        const d = res.data;
        setPost({
          title: d.title,
          date: d.date,
          authorName: d.authorName || "CloudCare Editorial",
          readTime: d.readTime || "",
          content: d.content || d.excerpt || "",
        });
      })
      .catch(() => setPost(Fallback));
  }, [slug]);

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(140deg,#ebfbff 0%,#ffffff 46%,#dff3f8 95%)",
          py: { xs: 6, md: 7 },
          borderBottom: "1px solid rgba(15,124,144,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink underline="hover" component={RouterLink} to="/">
              Home
            </MuiLink>
            <MuiLink underline="hover" component={RouterLink} to="/blog">
              Blog
            </MuiLink>
            <Typography color="text.primary">
              {post.title?.slice(0, 32)}...
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1.5, color: "#0f172a" }}
          >
            {post.title}
          </Typography>
          <Typography sx={{ opacity: 0.65 }}>
            {post.date} · {post.authorName}{" "}
            {post.readTime ? `· ${post.readTime}` : ""}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background: "#fff",
              border: "1px solid rgba(15,124,144,0.03)",
              maxWidth: 900,
            }}
          >
            <Stack spacing={2.5}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <Divider />
              <Typography variant="caption" sx={{ opacity: 0.5 }}>
                Want a demo of CloudCare eMAR for Assisted Living / Group Homes?
                Contact us.
              </Typography>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default BlogDetail;
