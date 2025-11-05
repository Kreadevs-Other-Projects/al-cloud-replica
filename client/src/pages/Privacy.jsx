// src/pages/Privacy.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  Stack,
} from "@mui/material";

const Privacy = () => {
  return (
    <>
      {/* HERO / HEADER */}
      <Box
        sx={{
          background:
            "linear-gradient(140deg, #ebfbff 0%, #ffffff 46%, #dff3f8 95%)",
          py: { xs: 6, md: 8 },
          borderBottom: "1px solid rgba(15,124,144,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ mb: 2, color: "rgba(15,23,42,.6)" }}>
            <MuiLink href="/" underline="hover">
              Home
            </MuiLink>
            <Typography color="text.primary">Privacy</Typography>
          </Breadcrumbs>

          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1.5, color: "#0f172a" }}
          >
            Privacy Policy
          </Typography>
          <Typography sx={{ maxWidth: 720, opacity: 0.7 }}>
            How CloudCare (your version of AL CloudCare) collects, uses and
            protects patient, staff and facility data.
          </Typography>
        </Container>
      </Box>
      {/* MAIN CONTENT */}
      <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background: "#fff",
              border: "1px solid rgba(15,124,144,0.03)",
            }}
          >
            <Stack spacing={3}>
              {/* Intro */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  1. Introduction
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  This Privacy Policy describes how we collect, store, use and
                  share information when you use our platform, mobile
                  applications, admin portals and patient/family portals
                  (collectively, the “Services”). By using the Services you
                  agree to this policy.
                </Typography>
              </Box>

              {/* What we collect */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  2. Information we collect
                </Typography>
                <Typography sx={{ opacity: 0.75, mb: 1 }}>
                  Depending on how you use the system (facility, staff, doctor,
                  pharmacy, family), we may collect:
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: "1.1rem" }}>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      **Account & contact data** — name, email, phone,
                      facility/community name, role.
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      **Clinical / resident data** — information entered by care
                      teams for assisted living, group homes, IDD, memory care
                      and similar settings (med lists, tasks, notes, vitals,
                      assessments, MAR/eMAR).
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      **Usage / device data** — IP address, device type,
                      browser, time of access, pages visited (used to secure the
                      platform and improve performance).
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      **Integrated sources** — eFax, pharmacy, HR, billing,
                      payroll and other integrated modules you have enabled.
                    </Typography>
                  </li>
                </ul>
              </Box>

              {/* How we use */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  3. How we use your information
                </Typography>
                <Typography sx={{ opacity: 0.75, mb: 1 }}>
                  We use data only to operate and improve the platform, not to
                  sell lists.
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: "1.1rem" }}>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      To provide the service (care workflows, eMAR, documents,
                      e-consents, reporting).
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      To communicate with you about feature changes, outages,
                      security alerts and support.
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      To meet legal / regulatory / audit requirements applicable
                      to healthcare / senior care providers.
                    </Typography>
                  </li>
                </ul>
              </Box>

              {/* Sharing */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  4. When we share information
                </Typography>
                <Typography sx={{ opacity: 0.75, mb: 1 }}>
                  We may share your information only in these situations:
                </Typography>
                <ul style={{ marginTop: 0, paddingLeft: "1.1rem" }}>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      With your facility / organization administrators, if your
                      account is part of their tenant.
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      With service providers that help us host, store, send
                      emails/SMS or process e-signatures — under confidentiality
                      agreements.
                    </Typography>
                  </li>
                  <li>
                    <Typography sx={{ opacity: 0.75 }}>
                      To comply with law, court orders or to protect the safety
                      of users.
                    </Typography>
                  </li>
                </ul>
              </Box>

              {/* Data security */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  5. Data security & retention
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  We use industry-standard security controls (encrypted
                  transport, role-based access, audit logs). Data is kept for as
                  long as your account/facility remains active or as required by
                  regulation or contract. You may request deletion where
                  permitted.
                </Typography>
              </Box>

              {/* Cookies */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  6. Cookies & tracking
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  Our web apps may use cookies/session storage to keep you
                  signed in, remember your preferences and measure usage. You
                  can block cookies in your browser but some features may not
                  work.
                </Typography>
              </Box>

              {/* Children / PHI */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  7. PHI / sensitive data
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  Where PHI or resident information is processed, we follow the
                  agreements we have with your organization. End users should
                  not upload non-care-related sensitive data unless required for
                  care or operations.
                </Typography>
              </Box>

              {/* Changes */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  8. Changes to this Policy
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  We may update this Privacy Policy from time to time. The
                  “Effective date” will tell you when it was last updated. Your
                  continued use of the Services after changes means you accept
                  the new policy.
                </Typography>
              </Box>

              {/* Contact */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  9. Contact
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  For privacy questions, DSR/DSAR requests or data sharing
                  questions, contact:
                  <br />
                  <b>privacy@cloudcare.com</b>
                  <br />
                  or your account manager.
                </Typography>
              </Box>

              {/* Effective */}
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  Effective date: {new Date().getFullYear()}-01-01
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Privacy;
