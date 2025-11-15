import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/sidebar.jsx";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, padding: 3 }}>{children}</Box>
    </Box>
  );
};

export default AdminLayout;
