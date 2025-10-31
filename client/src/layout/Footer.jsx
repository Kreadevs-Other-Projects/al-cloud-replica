import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        background:
          "radial-gradient(circle at top, #0f7c90 0%, #0F2435 35%, #0B1823 100%)",
        color: "#fff",
        pt: { xs: 6, md: 7 },
        pb: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          top: -80,
          right: -60,
          filter: "blur(4px)",
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={700}>
              CloudCare.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1.5, opacity: 0.75, maxWidth: 280, lineHeight: 1.6 }}
            >
              Smart, connected healthcare experience. Book, consult and manage —
              all in one place.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  "&:hover": { background: "rgba(255,255,255,0.25)" },
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  "&:hover": { background: "rgba(255,255,255,0.25)" },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  "&:hover": { background: "rgba(255,255,255,0.25)" },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              Quick links
            </Typography>
            <Stack spacing={1}>
              <Link
                href="/"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "#fff" },
                }}
              >
                Home
              </Link>
              <Link
                href="/services"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "#fff" },
                }}
              >
                Services
              </Link>
              <Link
                href="/doctors"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "#fff" },
                }}
              >
                Doctors
              </Link>
              <Link
                href="/appointment"
                underline="none"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { color: "#fff" },
                }}
              >
                Book appointment
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              hello@cloudcare.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              +1 (555) 123 4567
            </Typography>
            <Typography variant="body2" sx={{ mt: 1.5, opacity: 0.7 }}>
              204 E. Healthcare Ave,
              <br />
              Chicago, IL 60601
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
              For clinics
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Want to integrate CloudCare in your facility?
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                fontSize: 12,
                background: "rgba(255,255,255,.12)",
                display: "inline-flex",
                px: 1.6,
                py: 0.6,
                borderRadius: 999,
              }}
            >
              book@cloudcare.com
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
            pt: 2.5,
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.55 }}>
            © {year} CloudCare. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography
              variant="caption"
              sx={{ opacity: 0.55, cursor: "pointer" }}
            >
              Terms
            </Typography>
            <Typography
              variant="caption"
              sx={{ opacity: 0.55, cursor: "pointer" }}
            >
              Privacy
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
