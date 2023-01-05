import React, { useEffect, useMemo, useState } from "react";
import MovieFilters from "../../components/movie-filters/MovieFilters";
import MovieTrailer from "../../components/movie-trailer/MovieTrailer";
import Movies from "../../components/movies/Movies";
import "./ComingMovies.css";

const ComingMovies = () => {
  const [movies, setMovies] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Method to get language and movies list through api call and sets languages and movies state
   */
  const fetchMovies = async () => {
    const response = await fetch(
      "https://in.bmscdn.com/m6/static/interview-mock/data.json"
    ).then((response) => response.json());
    setMovies(Object.values(response["moviesData"]));
    setupFilters("Type", ["Fresh", "Popular"]);
    setupFilters("Language", response["languageList"]);
  };

  /**
   * Method to get uuid
   */
  const getUUID = () => {
    return new Date().getTime().toString();
  };

  /**
   * Method returns filter structure by using name and values
   * @param {String} name - filter name
   * @param {Array} values - array of filter values/options
   */
  const getDefaultFilter = (name = "", values) => {
    return {
      name: name,
      uuid: getUUID(),
      values: values.map((value) => ({ name: value, isSelected: false })),
      selectedValues: []
    };
  };

  /**
   * Method to setup filter. It creates filter and adds it to filters state
   * @param {String} name - filter name
   * @param {Array} values - array of filter values/options
   */
  const setupFilters = (name, values) => {
    let filter = getDefaultFilter(name, values);
    console.log(filter);
    setFilters((filters) => [...(filters || []), filter]);
  };

  /**
   * When filter are selected/deselected this method is triggered to update the filters state
   * @param {String} uuid - uuid of that filter
   * @param {Array} value - changed value
   * @param {Array} selectedValues - array of selected values
   */
  const updateFilterValues = (uuid, value, selectedValues) => {
    const newFilters = [...filters];
    const updatedFilter = newFilters.find((filter) => filter["uuid"] === uuid);
    // Getting value object from filter values
    let selectedValue = updatedFilter["values"].find(
      (__value) => __value["name"] === value["name"]
    );

    // Toggling isSelected state
    selectedValue["isSelected"] = !selectedValue["isSelected"];
    updatedFilter["selectedValues"] = [...selectedValues];

    setFilters(newFilters);
  };

  /**
   * This method is called after clicking on movie. It updates selectedMovie state
   * @param {Object} movie - movie object
   */
  const handleSelectMovie = (movie) => {
    setSelectedMovie({ ...movie });
  };

  const applyLanguageFilter = (movie) => {
    if (!getLanguageFilter["selectedValues"].length) return true;
    return getLanguageFilter["selectedValues"].includes(movie["EventLanguage"]);
  };

  const getLanguageFilter = useMemo(
    () =>
      filters &&
      filters.find((filter) => filter["name"].toLowerCase() === "language"),
    [filters]
  );

  const getFilteredMovies = useMemo(() => {
    return movies && movies.filter((movie) => applyLanguageFilter(movie));
  }, [filters]);

  return (
    <div className="coming-movies-container">
      <MovieFilters change={updateFilterValues} filters={filters} />
      {selectedMovie && <MovieTrailer movie={selectedMovie} />}
      <Movies selectMovie={handleSelectMovie} movies={getFilteredMovies} />
    </div>
  );
};

export default ComingMovies;
