import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Alert,
  Skeleton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import api from "../api/axios.js";
import { FALLBACK_SERVICES } from "../constants/services.js";

const Services = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErr("");

    api
      .get(`/api/services`, { params: { active: true, q } })
      .then((res) => {
        if (!ignore) {
          const data = Array.isArray(res.data) ? res.data : [];
          if (data.length > 0) {
            setList(data);
          } else {
            setList(FALLBACK_SERVICES);
          }
        }
      })
      .catch(() => {
        if (!ignore) {
          setList(FALLBACK_SERVICES);
        }
      })
      .finally(() => !ignore && setLoading(false));

    return () => (ignore = true);
  }, [q]);

  return (
    <Box sx={{ py: { xs: 5, md: 6 }, background: "#f5f8fb" }}>
      <Container maxWidth="lg">
        <SectionTitle
          title="All Services"
          subtitle="OUR OFFERING"
          center={false}
        />

        <Box sx={{ mb: 3, maxWidth: 420 }}>
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services…"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Box>

        {err && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {err}
          </Alert>
        )}

        <Grid container spacing={2.5}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Skeleton
                  variant="rounded"
                  height={170}
                  sx={{ borderRadius: 3 }}
                />
              </Grid>
            ))
          ) : list.length > 0 ? (
            list.map((s) => (
              <Grid key={s._id} item xs={12} sm={6} md={4}>
                <ServiceCard item={s} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                No services found{q ? ` for “${q}”` : ""}.
              </Alert>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
