import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import Contact from "./Contact.jsx";

const MODULE_GROUPS = [
  {
    id: "care",
    label: "Care",
    tagline: "Resident-centered clinical tools",
    items: [
      {
        title: "EMAR (Medication Admin.)",
        desc: "Pass meds accurately, online or offline with no installed software needed.",
      },
      {
        title: "Assessments & Care Plans",
        desc: "Use prebuilt or state-specific forms, calculate care levels and costs.",
      },
      {
        title: "Charting & ADLs",
        desc: "Daily notes that auto-sync with care plans so staff always see the latest.",
      },
      {
        title: "TeleHealth",
        desc: "Connect residents to providers remotely, useful for lockdowns or rural teams.",
      },
    ],
  },
  {
    id: "engagement",
    label: "Engagement",
    tagline: "Connect families, providers and residents",
    items: [
      {
        title: "Family Portal",
        desc: "Secure view for families to see care updates and activities.",
      },
      {
        title: "Provider Portal",
        desc: "Let hospice, home health or doctors view just their patients.",
      },
      {
        title: "Activities Calendar",
        desc: "Schedule, track attendance and share with families.",
      },
      {
        title: "Secure Messaging",
        desc: "Internal messages to staff/partners right inside the platform.",
      },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    tagline: "Run properties without paper",
    items: [
      {
        title: "CRM / Inquiries",
        desc: "Track prospects and move them to residency faster.",
      },
      {
        title: "Repairs & Work Orders",
        desc: "Submit, assign and track maintenance tasks from any device.",
      },
      {
        title: "Employee Scheduling",
        desc: "Create shifts, control overtime and stay within labor budget.",
      },
      {
        title: "Certifications / Training",
        desc: "Reminders for expirations so staff stay compliant.",
      },
      {
        title: "Electronic Fax & e-Consents",
        desc: "Send, receive and store signed forms automatically.",
      },
      {
        title: "Custom Forms",
        desc: "Use your own forms in the system — no learning curve.",
      },
    ],
  },
  {
    id: "financial",
    label: "Financial",
    tagline: "Billing, resident & facility financials",
    items: [
      {
        title: "Facility Financials",
        desc: "Budgeting, PRD and spend-down controls for management.",
      },
      {
        title: "Resident Billing",
        desc: "Monthly bills, payments and statements in a few clicks.",
      },
      {
        title: "Charge Capture",
        desc: "Transport, salon or other a-la-carte services billed easily.",
      },
      {
        title: "Personal Funds Tracker",
        desc: "Track deposits and spending for residents.",
      },
      {
        title: "Investor / Mgmt Reports",
        desc: "Share performance reports across properties.",
      },
    ],
  },
  {
    id: "compliance",
    label: "Compliance / Oversight",
    tagline: "Visibility for owners & corporate",
    items: [
      {
        title: "Performance Dashboards",
        desc: "Cross-property metrics across Care, Ops, Financial, Engagement.",
      },
      {
        title: "Budget Compliance",
        desc: "Spot overages early and fix them.",
      },
      {
        title: "Document Management",
        desc: "Store contracts, POA, DNR, staff certs — all in the chart.",
      },
      {
        title: "Risk Management",
        desc: "Protocols for falls, elopement and incident documentation.",
      },
      {
        title: "AI Support Assistant",
        desc: "24/7 in-app help like their ‘Alvin’.",
      },
    ],
  },
];

const Modules = () => {
  const [active, setActive] = useState("care");
  const current =
    MODULE_GROUPS.find((g) => g.id === active) || MODULE_GROUPS[0];

  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(140deg, #ebfbff 0%, #ffffff 44%, #dff3f8 100%)",
          py: { xs: 5, md: 7 },
          borderBottom: "1px solid rgba(15,124,144,0.06)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink underline="hover" color="inherit" href="/">
              Home
            </MuiLink>
            <Typography color="text.primary">Modules / Features</Typography>
          </Breadcrumbs>
          <Chip
            label="Platform Capabilities"
            size="small"
            sx={{
              mb: 2,
              bgcolor: "rgba(11,134,157,.08)",
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: 0.6,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#0f172a",
              lineHeight: 1.03,
            }}
          >
            Everything you need to run Assisted Living & Group Homes.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 720,
              color: "rgba(15,23,42,.7)",
            }}
          >
            EMAR, care plans, pharmacy-friendly charting, operations and
            billing&mdash;all in one cloud platform. Pick a module group to see
            what’s included.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 4,
                  p: 1,
                  boxShadow: "0 10px 30px rgba(7,81,106,0.05)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  position: "sticky",
                  top: 90,
                }}
              >
                <Tabs
                  orientation="vertical"
                  value={active}
                  onChange={(_, v) => setActive(v)}
                  variant="scrollable"
                  sx={{
                    "& .MuiTab-root": {
                      alignItems: "flex-start",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: 3,
                      minHeight: 56,
                      mb: 0.5,
                    },
                  }}
                >
                  {MODULE_GROUPS.map((g) => (
                    <Tab
                      key={g.id}
                      label={
                        <Box>
                          <Typography variant="body2">{g.label}</Typography>
                          <Typography
                            variant="caption"
                            sx={{ opacity: 0.5, display: "block" }}
                          >
                            {g.items.length} features
                          </Typography>
                        </Box>
                      }
                      value={g.id}
                    />
                  ))}
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {current.label}
                </Typography>
                <Chip
                  label={`${current.items.length} features`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(15,124,144,0.08)",
                    color: "primary.main",
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ mb: 3, opacity: 0.75, maxWidth: 600 }}
              >
                {current.tagline}
              </Typography>

              <Grid container spacing={2.5}>
                {current.items.map((item, idx) => (
                  <Grid key={item.title} item xs={12} sm={6}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        background: "rgba(255,255,255,.9)",
                        backdropFilter: "blur(14px)",
                        border: "1px solid rgba(15,124,144,0.04)",
                        boxShadow: "0 14px 30px rgba(15,124,144,0.04)",
                        opacity: 0,
                        animation: "moduleFade .4s ease forwards",
                        animationDelay: `${idx * 0.05}s`,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              bgcolor: "rgba(11,134,157,0.12)",
                              display: "grid",
                              placeItems: "center",
                              fontWeight: 700,
                              color: "primary.main",
                            }}
                          >
                            {idx + 1}
                          </Box>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ opacity: 0.7, mt: 0.5, lineHeight: 1.5 }}
                            >
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>

        <style>
          {`
            @keyframes moduleFade {
              0% { opacity: 0; transform: translateY(8px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        <Contact />
      </Box>
    </>
  );
};

export default Modules;
