import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import api from "../api/axios.js";

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: "Jessica Jones",
    designation: "Web Designer",
    message:
      "CloudCare helped me schedule my consultations in minutes. The UI is clean and the doctors are super responsive.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80",
  },
  {
    id: 2,
    name: "Ahmed Raza",
    designation: "Patient, Chicago",
    message:
      "No more waiting in lines — I can talk to a doctor online and get my reports digitally. Exactly what I needed.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80",
  },
  {
    id: 3,
    name: "Dr. Fatima Noor",
    designation: "Pediatrician",
    message:
      "As a doctor, I love how CloudCare keeps everything connected — appointments, notes and follow-ups.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-ed1c874a3e65?auto=format&fit=facearea&facepad=3&w=200&h=200&q=80",
  },
];

const TestimonialSlider = () => {
  const [items, setItems] = useState(FALLBACK_TESTIMONIALS);
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);

  // fetch from API
  useEffect(() => {
    api
      .get("/api/testimonials")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        }
      })
      .catch(() => {
        // keep fallback
      });
  }, []);

  // auto rotate
  useEffect(() => {
    if (items.length === 0) return;
    const t = setInterval(() => {
      // trigger animation
      setAnimate(true);
      setTimeout(() => {
        setActive((p) => (p + 1) % items.length);
        setAnimate(false);
      }, 250); // small delay for exit
    }, 4500);
    return () => clearInterval(t);
  }, [items]);

  if (!items || items.length === 0) return null;

  const prevIndex = (active - 1 + items.length) % items.length;
  const nextIndex = (active + 1) % items.length;

  const centerItem = items[active];
  const leftItem = items[prevIndex];
  const rightItem = items[nextIndex];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background:
          "linear-gradient(180deg, #e7f6f9 0%, rgba(231,246,249,0.4) 100%)", // your site tone
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            minHeight: 340,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              position: "absolute",
              left: { xs: "2%", md: "9%" },
              top: { xs: "61%", md: "50%" },
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
                src={leftItem.avatar}
                sx={{
                  width: 58,
                  height: 58,
                  mx: "auto",
                  mb: 1.5,
                  border: "3px solid #0b869d",
                }}
              />
              <Typography variant="body2" sx={{ px: 2, mb: 1 }}>
                “{leftItem.message}”
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                {leftItem.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#0b869d" }}>
                {leftItem.designation}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              position: "absolute",
              right: { xs: "2%", md: "9%" },
              top: { xs: "61%", md: "50%" },
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
                src={rightItem.avatar}
                sx={{
                  width: 58,
                  height: 58,
                  mx: "auto",
                  mb: 1.5,
                  border: "3px solid #0b869d",
                }}
              />
              <Typography variant="body2" sx={{ px: 2, mb: 1 }}>
                “{rightItem.message}”
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                {rightItem.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#0b869d" }}>
                {rightItem.designation}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 520,
              width: "100%",
              mx: "auto",
              borderRadius: 5,
              background: "#ffffff",
              boxShadow: "0 26px 50px rgba(9, 19, 33, 0.12)",
              textAlign: "center",
              p: { xs: 3, md: 5 },
              zIndex: 10,
              animation: animate ? "slideIn .4s ease" : "none",
            }}
          >
            <Avatar
              src={centerItem.avatar}
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 3,
                border: "4px solid #0b869d",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                color: "rgba(0,0,0,0.65)",
              }}
            >
              “{centerItem.message}”
            </Typography>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {centerItem.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#0b869d",
                letterSpacing: 2,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {centerItem.designation}
            </Typography>
          </Card>
        </Box>
      </Container>

      <style>
        {`
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
              50% {
              opacity: 0.5;
              transform: translateY(15);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default TestimonialSlider;
