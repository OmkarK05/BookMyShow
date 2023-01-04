import React, { useState } from "react";
import MovieCard from "../movie-card/MovieCard";
import "./Movies.css";

const Movies = (props) => {
  return (
    <div id="movies-container" className="movies-container">
      {props["movies"] &&
        Object.values(props["movies"]).map((movie) => (
          <div className="movie-card-container">
            <MovieCard key={`movie-card-${movie["EventCode"]}`} movie={movie} />
          </div>
        ))}
    </div>
  );
};

export default Movies;
