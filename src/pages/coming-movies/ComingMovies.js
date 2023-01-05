import React, { useEffect, useMemo, useState } from "react";
import MovieFilters from "../../components/movie-filters/MovieFilters";
import MovieTrailer from "../../components/movie-trailer/MovieTrailer";
import Movies from "../../components/movies/Movies";
import "./ComingMovies.css";

const ComingMovies = () => {
  const [movies, setMovies] = useState(null);
  const [filters, setFilters] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [leftFilters, setLeftFilters] = useState(null);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Method to get language and movies list through api call and sets languages and movies state
   */
  const fetchMovies = async () => {
    let response;
    setFilters(null);
    try {
      response = await fetch(
        "https://in.bmscdn.com/m6/static/interview-mock/data.json"
      ).then((response) => response.json());
    } catch (error) {
      alert("Error while fetching movies");
    }
    setMovies(Object.values(response["moviesData"]));
    addFilter("Type", ["Fresh", "Popular"], true);
    addFilter("Languages", response["languageList"]);
    setupLeftFilters();
  };

  /**
   * Method to get uuid
   */
  const getUUID = () => {
    return "id" + Math.random().toString(16).slice(2);
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
      values: values,
      selectedValues: []
    };
  };

  /**
   * Method to setup filter. It creates filter and adds it to filters state
   * @param {String} name - filter name
   * @param {Array} values - array of filter values/options
   */
  const addFilter = (name, values, preselect) => {
    let filter = getDefaultFilter(name, values);
    if (preselect) filter["selectedValues"].push(filter["values"][0]);
    setFilters((filters) => [...(filters || []), filter]);
  };

  /**
   * When filter are selected/deselected this method is triggered to update the filters state
   * @param {String} uuid - uuid of that filter
   * @param {Array} value - changed value
   * @param {Array} selectedValues - array of selected values
   */
  const updateFilterValues = (uuid, value) => {
    const newFilters = [...filters];
    const updatedFilter = newFilters.find((filter) => filter["uuid"] === uuid);

    // updating selected values list
    if (updatedFilter["selectedValues"].includes(value)) {
      updatedFilter["selectedValues"] = updatedFilter["selectedValues"].filter(
        (__value) => __value !== value
      );
    } else {
      updatedFilter["selectedValues"].push(value);
    }

    setFilters(newFilters);
  };

  /**
   * This method is called after clicking on movie. It updates selectedMovie state
   * @param {Object} movie - movie object
   */
  const handleSelectMovie = (movie) => {
    setSelectedMovie({ ...movie });
  };

  /**
   * Method filters movie as per language filter
   * @param {Object} movie -
   */
  const applyLanguageFilter = (movie) => {
    if (!(getLanguageFilter && getLanguageFilter["selectedValues"].length))
      return true;
    return getLanguageFilter["selectedValues"].includes(movie["EventLanguage"]);
  };

  /**
   * Method to get language filter from filters
   */
  const getLanguageFilter = useMemo(
    () =>
      filters &&
      filters.find((filter) => filter["name"].toLowerCase() === "languages"),
    [filters]
  );

  /**
   * Method to get filtered movies as per the filters
   */
  const getFilteredMovies = useMemo(() => {
    return movies && movies.filter((movie) => applyLanguageFilter(movie));
  }, [filters]);

  /**
   * Method to setup left side filters coming-soon/now-showing
   */
  const setupLeftFilters = () => {
    let filter = getDefaultFilter("left", ["Comming Soon", "Now Showing"]);
    filter["selectedValues"].push(filter["values"][0]);
    setLeftFilters(filter);
  };

  /**
   * Method is trigged on change in left side filters
   * @param {String} value - filter value
   */
  const updateLeftFilter = (value) => {
    // updating selected values list
    leftFilters["selectedValues"] = [];
    leftFilters["selectedValues"].push(value);

    setLeftFilters({ ...leftFilters });
  };

  return (
    <div className="coming-movies-container">
      <MovieFilters
        changeRightFilter={updateFilterValues}
        changeLeftFilter={updateLeftFilter}
        leftFilters={leftFilters}
        filters={filters}
      />
      {selectedMovie && <MovieTrailer movie={selectedMovie} />}
      <Movies selectMovie={handleSelectMovie} movies={getFilteredMovies} />
    </div>
  );
};

export default ComingMovies;
