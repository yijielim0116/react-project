import React, { useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";

// sort helpers
const sorters = {
  popularity: (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
  rating: (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0),
  release: (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0),
};

export default function MovieListPageTemplate({
  title,
  movies = [],
  action,
  page,
  totalPages,
  onPageChange,
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [year, setYear] = useState("");
  const [sortKey, setSortKey] = useState("popularity");

  const handleLeftFilterChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  const displayed = useMemo(() => {
    let list = Array.isArray(movies) ? movies.slice() : [];

    // Left filter: name text in FilterCard
    if (nameFilter.trim()) {
      const q = nameFilter.toLowerCase();
      list = list.filter((m) => (m.title || "").toLowerCase().includes(q));
    }

    // Left filter: genre id in FilterCard
    const genreId = Number(genreFilter);
    if (genreId > 0) {
      list = list.filter((m) => m.genre_ids?.includes(genreId));
    }

    // Top controls: search text
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) => (m.title || "").toLowerCase().includes(q));
    }

    // Top controls: year
    if (year) {
      list = list.filter((m) => (m.release_date || "").startsWith(String(year)));
    }

    // Top controls: min rating
    if (minRating > 0) {
      list = list.filter((m) => (m.vote_average ?? 0) >= minRating);
    }

    // Sort
    list.sort(sorters[sortKey] ?? sorters.popularity);
    return list;
  }, [movies, nameFilter, genreFilter, search, minRating, year, sortKey]);

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 5 }}>
      <Header title={title} />

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Search title"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", md: 280 } }}
        />

        <TextField
          label="Year"
          size="small"
          value={year}
          onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
          sx={{ width: { xs: "100%", md: 120 } }}
          placeholder="YYYY"
          inputProps={{ inputMode: "numeric" }}
        />

        <Stack sx={{ px: 1, width: 220 }}>
          <Typography variant="caption">Min rating: {minRating.toFixed(1)}</Typography>
          <Slider
            size="small"
            step={0.5}
            min={0}
            max={10}
            value={minRating}
            onChange={(_, v) => setMinRating(v)}
          />
        </Stack>

        <TextField
          label="Sort by"
          size="small"
          select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          sx={{ width: { xs: "100%", md: 180 } }}
        >
          <MenuItem value="popularity">Popularity</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="release">Release date</MenuItem>
        </TextField>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={2}>
          <FilterCard
            onUserInput={handleLeftFilterChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          <MovieList movies={displayed} action={action} />
        </Grid>
      </Grid>

      {typeof page === "number" &&
        typeof totalPages === "number" &&
        typeof onPageChange === "function" && (
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              page={page}
              count={totalPages}
              color="primary"
              onChange={(_, p) => onPageChange(p)}
            />
          </Stack>
        )}
    </Container>
  );
}