import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import BlogCard from "../components/BlogCard.jsx";
import api from "../api/axios.js";
import { FALLBACK_BLOGS } from "../constants/blogs.js";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    let ignore = false;

    // api
    //   .get(`/api/blogs?page=${page}&limit=9`)
    //   .then((res) => {
    //     if (ignore) return;
    //     const items = Array.isArray(res.data?.items) ? res.data.items : [];
    //     if (items.length > 0) {
    //       setBlogs(items);
    //       setPages(res.data.pages || 1);
    //     } else {
    //       setBlogs(FALLBACK_BLOGS);
    //       setPages(1);
    //     }
    //   })
    //   .catch((err) => {
    //     if (ignore) return;
    //     console.error("Failed to fetch blogs:", err);
    //     setBlogs(FALLBACK_BLOGS);
    //     setPages(1);
    //   });

    // Use fallback blogs only
    if (!ignore) {
      setBlogs(FALLBACK_BLOGS);
      setPages(1);
    }

    return () => (ignore = true);
  }, [page]);

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(140deg,#ebfbff 0%,#ffffff 46%,#dff3f8 95%)",
          py: { xs: 6, md: 8 },
          borderBottom: "1px solid rgba(15,124,144,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink underline="hover" href="/">
              Home
            </MuiLink>
            <Typography color="text.primary">Blog</Typography>
          </Breadcrumbs>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
            Insights for Assisted Living, Group Homes & LTC
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.75 }}>
            Product updates, eMAR best practices, pharmacy integrations and
            workflow tips.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {blogs.map((b) => (
              <Grid item xs={12} sm={4} md={4}>
                <BlogCard item={b} />
              </Grid>
            ))}
          </Grid>

          {pages > 1 && (
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Pagination
                count={pages}
                page={page}
                onChange={(_, p) => setPage(p)}
              />
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Blogs;
