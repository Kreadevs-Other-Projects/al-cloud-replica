import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar.jsx";
import Footer from "./layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointment from "./pages/Appointment.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { useAuth } from "./hooks/useAuth.jsx";
import { Box } from "@mui/material";

const App = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Login redirectTo="/dashboard" />}
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
