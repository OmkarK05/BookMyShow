import React, { useMemo } from "react";
import "./MovieCard.css";

const MovieCard = (props) => {
  const getDate = useMemo(() => props["movie"]["ShowDate"].split(",")[0], [
    props
  ]);
  return (
    <div
      id="movie-card"
      className={`movie-card ${props["loading"] ? "loading" : ""}`}
      onClick={() => props["select"](props["movie"])}
    >
      <div className="image-container">
        <img
          id={`movie-card-${props["movie"]["EventCode"]}-image`}
          className="__image"
          alt={props["movie"]["EventName"]}
          src={props["movie"]["EventImageUrl"]}
          loading="lazy"
        />
        <div className="date-container">
          <div className="__date">{getDate}</div>
          <div className="__play">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#ffffff"
              className="bi bi-play-fill"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </div>
        </div>
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
