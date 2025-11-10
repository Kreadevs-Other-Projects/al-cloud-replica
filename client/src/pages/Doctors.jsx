import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Alert,
  Skeleton,
  TextField,
  InputAdornment,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SectionTitle from "../components/SectionTitle.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import api from "../api/axios.js";

const Doctors = () => {
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [page, setPage] = useState(1);

  const limit = 12;

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErr("");
    api
      .get("/api/doctors", {
        params: { q, specialty, page, limit, active: true },
      })
      .then((res) => {
        if (!ignore) setData(res.data);
      })
      .catch(() => !ignore && setErr("Could not load doctors"))
      .finally(() => !ignore && setLoading(false));
    return () => (ignore = true);
  }, [q, specialty, page]);

  const specialties = useMemo(() => {
    const set = new Set();
    data.items.forEach((d) => d.specialty && set.add(d.specialty));
    return Array.from(set).sort();
  }, [data.items]);

  return (
    <Box sx={{ py: { xs: 5, md: 6 }, background: "#e7f6f9" }}>
      <Container maxWidth="lg">
        <SectionTitle
          title="Find a Doctor"
          subtitle="OUR TEAM"
          center={false}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mb: 3 }}
        >
          <TextField
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Search name or specialty…"
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
          <TextField
            select
            size="small"
            label="Specialty"
            value={specialty}
            onChange={(e) => {
              setPage(1);
              setSpecialty(e.target.value);
            }}
            sx={{
              minWidth: 220,
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
          >
            <MenuItem value="">All specialties</MenuItem>
            {specialties.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {err && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {err}
          </Alert>
        )}

        <Grid container spacing={2.5}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <Skeleton
                  variant="rounded"
                  height={210}
                  sx={{ borderRadius: 3 }}
                />
              </Grid>
            ))
          ) : data.items.length > 0 ? (
            data.items.map((d) => (
              <Grid key={d._id} item xs={12} sm={6} md={3}>
                <DoctorCard item={d} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info" sx={{ borderRadius: 2 }}>
                No doctors found{q ? ` for “${q}”` : ""}.
              </Alert>
            </Grid>
          )}
        </Grid>

        {!loading && data.pages > 1 && (
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={data.pages}
              page={page}
              onChange={(_, v) => setPage(v)}
              shape="rounded"
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default Doctors;
