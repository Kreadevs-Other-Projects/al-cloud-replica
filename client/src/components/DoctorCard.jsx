import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

const DoctorCard = ({ item }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        textAlign: "center",
        py: 3,
        background: "rgba(255, 255, 255, 0.38)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.42)",
        boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
        transition: "all .25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 36px rgba(15, 23, 42, 0.14)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          mb: 2,
        }}
      >
        <Avatar
          src={item.image}
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            bgcolor: "primary.main",
            fontWeight: 600,
            fontSize: 28,
          }}
        >
          {item.name?.[0]}
        </Avatar>
        <Box
          sx={{
            position: "absolute",
            inset: -5,
            borderRadius: "50%",
            border: "3px solid rgba(14,165,233,0.45)",
          }}
        />
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h6" fontWeight={600}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {item.specialty}
        </Typography>
        {item.email && (
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {item.email}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
