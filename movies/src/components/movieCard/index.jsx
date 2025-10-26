import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import img from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);
  const isFav = favorites.includes(movie.id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          isFav ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" noWrap title={movie.title}>
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        component="img"
        loading="lazy"
        alt={movie.title}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        sx={{ display: "block", width: "100%", height: "auto" }}
      />

      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1" component="p">
              <CalendarIcon fontSize="small" />
              {" "}
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography variant="body1" component="p">
              <StarRateIcon fontSize="small" />
              {" "}
              {(movie.vote_average ?? 0).toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        {action ? action(movie) : null}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" sx={{ ml: 1 }}>
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}