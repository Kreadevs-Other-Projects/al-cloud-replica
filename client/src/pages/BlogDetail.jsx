// src/pages/BlogDetail.jsx
import React from "react";
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

const BLOG_CONTENT = {
  "assisted-living-emar-software": {
    title: "Assisted Living EMAR Software – Why it matters in 2025",
    date: "Oct 12, 2025",
    author: "CloudCare Editorial",
    readTime: "5 min read",
    body: [
      "Assisted living and group home providers still struggle with paper MARs, late med passes and poor communication with the pharmacy.",
      "A modern eMAR system connects the community, the staff and the pharmacy so medication changes, discontinued orders and new residents are all in sync.",
      "In AL settings, staff turnover is higher — so you need a system that is simple, guided and mobile-friendly. That’s what most paper processes fail to do.",
      "When your eMAR is part of the SAME platform as your e-Docs, e-Consents, work orders and HR, you avoid multiple logins and reduce training time for new staff.",
      "Finally, a good EMAR should be pharmacy-friendly: allow bidirectional data, reduce medication wastage and support compliance / survey requirements.",
    ],
  },
};

const FALLBACK = {
  title: "CloudCare Blog",
  date: "Oct 1, 2025",
  author: "CloudCare Editorial",
  readTime: "4 min read",
  body: [
    "This is a blog article detail page.",
    "You navigated here from the blog card. You can render dynamic content from your API here.",
  ],
};

const BlogDetail = () => {
  const { slug } = useParams();
  const data = BLOG_CONTENT[slug] || FALLBACK;

  return (
    <>
      {/* HERO */}
      <Box
        sx={{
          background:
            "linear-gradient(140deg, #ebfbff 0%, #ffffff 46%, #dff3f8 95%)",
          py: { xs: 6, md: 7 },
          borderBottom: "1px solid rgba(15,124,144,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink underline="hover" component={RouterLink} to="/">
              Home
            </MuiLink>
            <MuiLink underline="hover" component={RouterLink} to="/blogs">
              Blogs
            </MuiLink>
            <Typography color="text.primary">
              {data.title.slice(0, 32)}...
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1.5, color: "#0f172a" }}
          >
            {data.title}
          </Typography>
          <Typography sx={{ opacity: 0.65 }}>
            {data.date} · {data.author} · {data.readTime}
          </Typography>
        </Container>
      </Box>

      {/* CONTENT */}
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
              {data.body.map((p, i) => (
                <Typography key={i} sx={{ lineHeight: 1.7, opacity: 0.9 }}>
                  {p}
                </Typography>
              ))}

              <Divider />

              <Typography variant="caption" sx={{ opacity: 0.5 }}>
                If you want a demo of CloudCare EMAR for Assisted Living / Group
                Homes, contact us.
              </Typography>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default BlogDetail;
