import React, { useEffect, useState } from "react";

const MovieLeftFilter = ({ value, selectedValues, select }) => {
  const [values, setValues] = useState(new Set([]));

  useEffect(() => {
    setValues(new Set(selectedValues));
  }, [selectedValues]);

  return (
    <button
      id={`movie-left-filter-${value}`}
      className={`__btn ${
        values.has(value) ? "__btn-primary" : "__btn-secondary"
      } __filter-btn`}
      onClick={() => select(value)}
    >
      {value}
    </button>
  );
};
export default MovieLeftFilter;
