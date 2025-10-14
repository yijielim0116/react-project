import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function PlaylistAdd({ movie, onClick }) {
  // For this exercise, it doesn’t need to do anything.
  return (
    <Tooltip title="Add to watchlist">
      <IconButton aria-label="add to watchlist" size="large" onClick={onClick ?? (()=>{})}>
        <PlaylistAddIcon />
      </IconButton>
    </Tooltip>
  );
}