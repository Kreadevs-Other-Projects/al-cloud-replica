// src/components/TestimonialSlider.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Typography,
  Stack,
  ButtonBase,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import api from "../api/axios.js";
import { FALLBACK_TESTIMONIALS } from "../constants/testimonials.js";

const Stars = ({ value = 5, size = 18, color = "#f59e0b" }) => (
  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.25 }}>
    {Array.from({ length: 5 }).map((_, i) =>
      i < value ? (
        <StarIcon key={i} sx={{ fontSize: size, color }} />
      ) : (
        <StarBorderIcon key={i} sx={{ fontSize: size, color }} />
      )
    )}
  </Box>
);

const TestimonialSlider = () => {
  const [items, setItems] = useState(FALLBACK_TESTIMONIALS);
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    api
      .get("/api/testimonials?limit=20")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length) setItems(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    autoplayRef.current = setInterval(() => {
      setActive((p) => (p + 1) % items.length);
      setAnimKey((k) => k + 1);
    }, 4500);
    return () => clearInterval(autoplayRef.current);
  }, [items.length, paused]);

  const prev = () => {
    setActive((p) => (p - 1 + items.length) % items.length);
    setAnimKey((k) => k + 1);
  };

  const next = () => {
    setActive((p) => (p + 1) % items.length);
    setAnimKey((k) => k + 1);
  };

  const prevIndex = useMemo(
    () => (active - 1 + items.length) % items.length,
    [active, items.length]
  );
  const nextIndex = useMemo(
    () => (active + 1) % items.length,
    [active, items.length]
  );

  if (!items.length) return null;

  const center = items[active];
  const left = items[prevIndex];
  const right = items[nextIndex];

  return (
    <Box
      role="region"
      aria-label="Testimonials"
      sx={{
        py: { xs: 6, md: 8 },
        background:
          "linear-gradient(180deg, #e7f6f9 0%, rgba(231,246,249,0.4) 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            minHeight: 360,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 1.5, md: 0 },
          }}
        >
          <Card
            aria-hidden
            sx={{
              position: "absolute",
              left: { xs: "2%", md: "9%" },
              top: { xs: "62%", md: "50%" },
              transform: "translateY(-50%) scale(.9)",
              width: { xs: "66%", md: 360 },
              borderRadius: 4,
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.15)",
              opacity: 0.35,
              display: { xs: "none", md: "block" },
            }}
            elevation={0}
          >
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Avatar
                src={left?.avatar}
                alt={left?.name}
                sx={{
                  width: 58,
                  height: 58,
                  mx: "auto",
                  mb: 1.5,
                  border: "3px solid #0b869d",
                }}
              />
              <Typography variant="body2" sx={{ px: 2, mb: 1 }}>
                “{left?.message}”
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                {left?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#0b869d" }}>
                {left?.designation}
              </Typography>
            </CardContent>
          </Card>
          <Card
            aria-hidden
            sx={{
              position: "absolute",
              right: { xs: "2%", md: "9%" },
              top: { xs: "62%", md: "50%" },
              transform: "translateY(-50%) scale(.9)",
              width: { xs: "66%", md: 360 },
              borderRadius: 4,
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.15)",
              opacity: 0.35,
              display: { xs: "none", md: "block" },
            }}
            elevation={0}
          >
            <CardContent sx={{ textAlign: "center", py: 4 }}>
              <Avatar
                src={right?.avatar}
                alt={right?.name}
                sx={{
                  width: 58,
                  height: 58,
                  mx: "auto",
                  mb: 1.5,
                  border: "3px solid #0b869d",
                }}
              />
              <Typography variant="body2" sx={{ px: 2, mb: 1 }}>
                “{right?.message}”
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                {right?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#0b869d" }}>
                {right?.designation}
              </Typography>
            </CardContent>
          </Card>

          <Card
            key={animKey}
            sx={{
              maxWidth: 560,
              width: "100%",
              mx: "auto",
              borderRadius: 5,
              background: "#ffffff",
              boxShadow: "0 26px 50px rgba(9, 19, 33, 0.12)",
              textAlign: "center",
              p: { xs: 3, md: 5 },
              zIndex: 10,
              animation: "slideIn .45s ease",
            }}
          >
            <Avatar
              src={center.avatar}
              alt={center.name}
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 2,
                border: "4px solid #0b869d",
              }}
            />
            <Stack alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Stars value={center.rating || 5} />
              <Typography
                variant="body1"
                sx={{ mb: 2, lineHeight: 1.6, color: "rgba(0,0,0,0.65)" }}
              >
                “{center.message}”
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {center.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#0b869d", letterSpacing: 1, fontWeight: 500 }}
            >
              {center.designation}
            </Typography>
          </Card>

          <IconButton
            aria-label="Previous testimonial"
            onClick={prev}
            sx={{
              position: "absolute",
              left: { xs: 6, md: 24 },
              top: "50%",
              transform: "translateY(-50%)",
              background: "#fff",
              border: "1px solid rgba(15,124,144,0.15)",
              "&:hover": { background: "rgba(255,255,255,0.85)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next testimonial"
            onClick={next}
            sx={{
              position: "absolute",
              right: { xs: 6, md: 24 },
              top: "50%",
              transform: "translateY(-50%)",
              background: "#fff",
              border: "1px solid rgba(15,124,144,0.15)",
              "&:hover": { background: "rgba(255,255,255,0.85)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          {items.map((_, i) => {
            const isActive = i === active;
            return (
              <ButtonBase
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setActive(i);
                  setAnimKey((k) => k + 1);
                }}
                sx={{
                  width: isActive ? 18 : 10,
                  height: 10,
                  borderRadius: 999,
                  transition: "all .2s",
                  background: isActive ? "#0b869d" : "rgba(11,134,157,0.25)",
                }}
              />
            );
          })}
        </Stack>
      </Container>

      <style>{`
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default TestimonialSlider;
