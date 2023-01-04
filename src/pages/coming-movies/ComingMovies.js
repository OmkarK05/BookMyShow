import React, { useEffect, useMemo, useState } from "react";
import MovieFilters from "../../components/movie-filters/MovieFilters";
import Movies from "../../components/movies/Movies";

const ComingMovies = () => {
  const [movies, setMovies] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  /**
   * Method to get language and movies list through api call and sets languages and movies state
   */
  const fetchMovies = async () => {
    const response = await fetch(
      "https://in.bmscdn.com/m6/static/interview-mock/data.json"
    ).then((response) => response.json());
    setMovies(response["moviesData"]);
    setLanguages(response["languageList"]);
    setupFilters();
  };

  const getUUID = () => {
    return new Date().getTime().toString();
  };

  const getDefaultFilter = (name = "", values) => {
    return {
      name: name,
      uuid: getUUID(),
      values: values,
      selectedValues: []
    };
  };

  const setupFilters = () => {
    let filters = [];
    filters.push(getDefaultFilter("Language", languages));
    setFilters(filters);
  };

  return (
    <div>
      <MovieFilters filters={filters} />
      <Movies movies={movies} />
    </div>
  );
};

export default ComingMovies;
