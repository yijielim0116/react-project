import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { MoviesContext } from "../../contexts/moviesContext";

export default function PlaylistAdd({ movie }) {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleClick = () => {
    addToMustWatch(movie);
  };

  return (
    <Tooltip title="Add to Must Watch">
      <IconButton aria-label="add to must watch" onClick={handleClick}>
        <PlaylistAddIcon />
      </IconButton>
    </Tooltip>
  );
}