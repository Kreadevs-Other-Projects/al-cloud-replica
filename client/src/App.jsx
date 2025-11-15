import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Modules from "./pages/Modules.jsx";
import SeniorCareHelp from "./pages/SeniorCareHelp.jsx";
import PharmacyFocus from "./pages/PharmacyFocus.jsx";
import Workflows from "./pages/Workflows.jsx";
import Privacy from "./pages/Privacy.jsx";
import NotFound from "./pages/NotFound.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import AdminPage from "./pages/Admin.jsx";
import Management from "./pages/BlogEdit.jsx";

import AdminLayout from "./layout/AdminLayout.jsx";

const App = () => {
  const { user } = useAuth();

  const isAdminRoute =
    window.location.pathname.startsWith("/admin") ||
    window.location.pathname.startsWith("/management");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isAdminRoute && <Navbar />}

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route
            path="/admin"
            element={(() => {
              if (!user) {
                return <Login redirectTo="/admin" />;
              }
              if (user.role !== "admin") {
                return <Navigate to="/" replace />;
              }

              return (
                <AdminLayout>
                  <AdminPage />
                </AdminLayout>
              );
            })()}
          />

          <Route
            path="/management"
            element={
              <AdminLayout>
                <Management />
              </AdminLayout>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/senior-care" element={<SeniorCareHelp />} />
          <Route path="/pharmacy-focus" element={<PharmacyFocus />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      {!isAdminRoute && <Footer />}
    </Box>
  );
};

export default App;
