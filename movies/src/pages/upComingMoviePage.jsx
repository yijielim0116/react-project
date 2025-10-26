import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results ?? [];

  // ✅ Now it's safe to use movies here
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <PlaylistAdd movie={movie} />
        </>
      )}
    />
  );
};

export default UpcomingMoviesPage;