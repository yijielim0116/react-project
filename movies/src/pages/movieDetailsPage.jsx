import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import PageTemplate from "../components/templateMoviePage";
import MovieDetails from "../components/movieDetails";
import Spinner from "../components/spinner";

import { getMovie } from "../api/tmdb-api";

const MoviePage = () => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
    staleTime: 360000,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  if (!movie) return <p>Waiting for movie details…</p>;

  return (
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} />
    </PageTemplate>
  );
};

export default MoviePage;

