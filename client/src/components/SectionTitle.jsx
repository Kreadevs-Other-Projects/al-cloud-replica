import React from "react";
import { Typography, Box } from "@mui/material";

const SectionTitle = ({ title, subtitle, center = false }) => {
  return (
    <Box sx={{ textAlign: center ? "center" : "left", mb: 4 }}>
      {subtitle && (
        <Typography
          variant="overline"
          sx={{
            letterSpacing: ".3em",
            color: "primary.main",
            fontWeight: 600,
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mt: 1,
          color: "#0f172a",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
