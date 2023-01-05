import React, { useMemo, useState, useEffect } from "react";
import "./MovieFilter.css";

const MovieFilter = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [values, setValues] = useState(new Set([]));

  useEffect(() => {
    setValues(new Set(props["filter"]["selectedValues"]));
  }, [props]);

  /**
   * Method to show select options container
   */
  const openOptions = () => {
    setShowOptions(true);
  };

  /**
   * Method to disable select option container
   */
  const closeOptions = () => {
    setShowOptions(false);
  };

  /**
   * This method handle filter selection/deselection.
   */
  const handleSelectOption = (value) => {
    props["change"](props["filter"]["uuid"], value);
  };

  /**
   * This method converts array of selected options into string to display
   */
  const getSelectedOptionsText = useMemo(
    () =>
      props["filter"]["selectedValues"].length
        ? props["filter"]["selectedValues"].join(", ")
        : "All " + props["filter"]["name"],
    [props]
  );

  return (
    <div
      id="movie-filter"
      className="movie-filter"
      onMouseEnter={openOptions}
      onMouseLeave={closeOptions}
    >
      <div className="select-container">
        <div
          id={`movie-filter-${props["filter"]["uuid"]}-text`}
          text={getSelectedOptionsText}
          className="__select-text font-regular"
        >
          {getSelectedOptionsText}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="#f84464"
          className="bi bi-chevron-down __icon"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      {showOptions && (
        <div
          className="options-container"
          id={`movie-filter-${props["filter"]["uuid"]}-options`}
        >
          {props["filter"]["values"].map((value, index) => (
            <div
              key={`filter-option-${value}`}
              onClick={() => handleSelectOption(value)}
              className={`option ${values.has(value) ? "active" : ""}`}
            >
              <div id={`movie-filter-${value}-checkbox`} className="__checkbox">
                {values.has(value) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="#ffffff"
                    className="bi bi-check-lg --icon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                )}
              </div>
              <div
                id={`movie-filter-${value}-option`}
                className="__value"
                key={value}
                value={value}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieFilter;
