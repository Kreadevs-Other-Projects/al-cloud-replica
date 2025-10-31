import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ borderRadius: 3, height: "100%" }}>
      <CardActionArea onClick={() => navigate(`/blog/${item.slug}`)}>
        <CardContent>
          <Typography variant="overline" color="primary">
            Health & Care
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {item.excerpt || item.content?.slice(0, 120) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
