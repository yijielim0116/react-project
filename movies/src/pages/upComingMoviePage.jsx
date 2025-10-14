import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data.results}
      action={(movie) => <PlaylistAdd movie={movie} />}  // or your favorite button if you want
    />
  );
};

export default UpcomingMoviesPage;