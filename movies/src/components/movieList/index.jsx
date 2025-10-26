import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";

const MovieList = ({ movies = [], action }) => {
  return (
    <Grid container spacing={3}>
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MovieCard movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
