import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ item, index = 0 }) => {
  const navigate = useNavigate();

  const imageSrc =
    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=60";

  return (
    <Card
      sx={{
        width: 400,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        bgcolor: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 14px 30px rgba(13,38,76,0.05)",
        transform: "translateY(0) scale(1)",
        transition:
          "transform 0.4s cubic-bezier(.25,.8,.25,1), box-shadow 0.4s, border-color 0.4s",
        animation: "fadeUp 0.55s ease forwards",
        animationDelay: `${index * 0.08}s`,
        opacity: 0,
        "&:hover": {
          transform: "translateY(-6px) scale(1.015)",
          boxShadow: "0 24px 50px rgba(13,38,76,0.14)",
          borderColor: "rgba(11,134,157,0.4)",
        },
        "&:hover .blog-img": {
          transform: "scale(1.07)",
          filter: "brightness(0.95)",
        },
        "&:hover .blog-overlay": {
          opacity: 1,
        },
        "&:hover .title": {
          color: "#0b869d",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/blog/${item.slug}`)}
        sx={{ height: "100%" }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={imageSrc}
            alt={item.title}
            className="blog-img"
            sx={{
              width: "100%",
              height: 200,
              objectFit: "cover",
              transition: "transform 0.5s ease, filter 0.5s ease",
            }}
          />

          <Box
            className="blog-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
              opacity: 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: 1 }}
          >
            {item.category || "HEALTH & WELLNESS"}
          </Typography>

          <Typography
            variant="h6"
            className="title"
            sx={{
              mb: 1,
              mt: 0.5,
              fontWeight: 600,
              transition: "color 0.4s ease",
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.75,
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            {item.excerpt
              ? item.excerpt.length > 120
                ? item.excerpt.slice(0, 120) + "..."
                : item.excerpt
              : "Read how modern digital care is changing healthcare for patients, clinics and remote teams."}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "#0b869d" }}
                src={item.authorImage}
              >
                {item.author?.[0] || "C"}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {item.author || "CloudCare Editorial"}
                </Typography>
                <Typography variant="caption" sx={{ display: "block" }}>
                  {item.date || "Oct 12, 2025"}
                </Typography>
              </Box>
            </Box>

            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {item.readTime || "4 min read"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(12px) scale(0.985); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
    </Card>
  );
};

export default BlogCard;
