import React, { useMemo } from "react";
import "./MovieTrailer.css";

const MovieTrailer = (props) => {
  const getEmbbedUrl = useMemo(
    () =>
      props["movie"]
        ? `https://www.youtube.com/embed/${
            props["movie"]["TrailerURL"].split("v=")[1]
          }?autoplay=1`
        : "",
    [props]
  );

  return (
    <div className="trailer-container">
      <iframe
        title={props["EventTitle"]}
        className="__youtube-video"
        src={getEmbbedUrl}
      />
    </div>
  );
};

export default MovieTrailer;
