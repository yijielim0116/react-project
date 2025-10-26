import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const NowPlayingMovies = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["nowPlaying", { page }],
    queryFn: getNowPlayingMovies,
    keepPreviousData: true,
    staleTime: 360000,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  const handlePageChange = (_e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageTemplate
        title="Now Playing Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <PlaylistAdd movie={movie} />
          </>
        )}
      />
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Pagination
          page={page}
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default NowPlayingMovies;