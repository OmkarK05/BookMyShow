import React, { useEffect, useState } from "react";
import Movies from "../../components/movies/Movies";

const ComingMovies = () => {
  const [movies, setMovies] = useState(null);
  const [languages, setLanguages] = useState(null);

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
  };
  return (
    <div>
      <Movies movies={movies} />
    </div>
  );
};

export default ComingMovies;
