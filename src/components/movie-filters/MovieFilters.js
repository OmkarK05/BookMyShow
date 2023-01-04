import React from "react";
import MovieFilter from "../movie-filter/MovieFilter";
import "./MovieFilters.css";

const MovieFilters = (props) => {
  return (
    <div id="movie-filters" className="movie-filters">
      {props["filters"] &&
        props["filters"].map((filter) => (
          <MovieFilter change={props["change"]} filter={filter} />
        ))}
    </div>
  );
};

export default MovieFilters;
