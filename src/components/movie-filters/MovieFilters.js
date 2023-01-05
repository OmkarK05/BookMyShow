import React from "react";
import MovieFilter from "../movie-filter/MovieFilter";
import MovieLeftFilter from "../movie-left-filter/MovieLeftFilter";
import "./MovieFilters.css";

const MovieFilters = (props) => {
  return (
    <div id="movie-filters" className="movie-filters">
      <div className="left-filters">
        {props["leftFilters"] &&
          props["leftFilters"]["values"].map((value) => (
            <MovieLeftFilter
              key={`movie-filter-${value}`}
              selectedValues={props["leftFilters"]["selectedValues"]}
              value={value}
              select={props["changeLeftFilter"]}
            />
          ))}
      </div>
      <div className="right-filters">
        {props["filters"] &&
          props["filters"].map((filter) => (
            <MovieFilter
              id={`movie-filter-${filter["uuid"]}`}
              key={`movie-filter-${filter["uuid"]}`}
              change={props["changeRightFilter"]}
              filter={filter}
            />
          ))}
      </div>
    </div>
  );
};

export default MovieFilters;
