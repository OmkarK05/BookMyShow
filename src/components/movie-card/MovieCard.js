import React from "react";
import "./MovieCard.css";
import "../../setupTests.js";

const MovieCard = (props) => {
  return (
    <div id="movie-card" className="movie-card">
      <div className="image-container">
        <img
          id={`movie-card-${props["movie"]["EventCode"]}-image`}
          className="__image"
          alt={props["movie"]["EventName"]}
          src={props["movie"]["EventImageUrl"]}
        />
      </div>
      <div className="content">
        <p
          id={`movie-card-${props["movie"]["EventCode"]}-name`}
          title={props["movie"]["EventName"]}
          className="__name font-regular"
        >
          {props["movie"]["EventName"]}
        </p>
        <p
          id={`movie-card-${props["movie"]["EventCode"]}-language`}
          title={props["movie"]["EventLanguage"]}
          className="__language font-small"
        >
          {props["movie"]["EventLanguage"]}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
