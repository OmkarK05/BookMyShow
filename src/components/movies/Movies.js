import React from "react";
import MovieCard from "../movie-card/MovieCard";
import "./Movies.css";

const Movies = (props) => {
  return (
    <div id="movies-container" className="movies-container">
      {props["movies"] &&
        props["movies"].map((movie) => (
          <div className="movie-card-container">
            <MovieCard
              key={`movie-card-${movie["EventCode"]}`}
              movie={movie}
              select={props["selectMovie"]}
            />
          </div>
        ))}
    </div>
  );
};

export default Movies;
