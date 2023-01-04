import React, { useEffect, useMemo, useState } from "react";
import MovieFilters from "../../components/movie-filters/MovieFilters";
import MovieTrailer from "../../components/movie-trailer/MovieTrailer";
import Movies from "../../components/movies/Movies";
import "./ComingMovies.css";

const ComingMovies = () => {
  const [movies, setMovies] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    setupFilters("Language", response["languageList"]);
  };

  const getUUID = () => {
    return new Date().getTime().toString();
  };

  const getDefaultFilter = (name = "", values) => {
    return {
      name: name,
      uuid: getUUID(),
      values: values.map((value) => ({ name: value, isSelected: false })),
      selectedValues: []
    };
  };

  const setupFilters = (name, values) => {
    let updatedFilters = [...(filters || [])];
    updatedFilters.push(getDefaultFilter(name, values));
    setFilters(updatedFilters);
  };

  const updateFilterValues = (uuid, value, selectedValues) => {
    const newFilters = [...filters];
    const updatedFilter = newFilters.find((filter) => filter["uuid"] === uuid);
    // Getting value object from filter values
    let selectedValue = updatedFilter["values"].find(
      (__value) => __value["name"] === value["name"]
    );

    // Toggling
    selectedValue["isSelected"] = !selectedValue["isSelected"];
    updatedFilter["selectedValues"] = [...selectedValues];

    setFilters(newFilters);
    console.log(newFilters);
  };

  const handleSelectMovie = (movie) => {
    console.log(movie);
    setSelectedMovie({ ...movie });
  };

  return (
    <div className="coming-movies-container">
      <MovieFilters change={updateFilterValues} filters={filters} />
      {selectedMovie && <MovieTrailer movie={selectedMovie} />}
      <Movies selectMovie={handleSelectMovie} movies={movies} />
    </div>
  );
};

export default ComingMovies;
