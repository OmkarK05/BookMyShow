import React, { useMemo, useState } from "react";
import "./MovieFilter.css";

const MovieFilter = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(null);

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
   * It updated selectedOptions state and calls change parent function to update filter state
   */
  const handleSelectOption = (value) => {
    // Getting options
    let options = [...(selectedOptions || [])];

    // If options include value then filter out value else add it
    if (options.includes(value["name"])) {
      options = options.filter((__value) => __value !== value["name"]);
    } else {
      options.push(value["name"]);
    }

    setSelectedOptions(options);
    props["change"](props["filter"]["uuid"], value, options);
  };

  /**
   * This method converts array of selected options into string to display
   */
  const getSelectedOptionsText = useMemo(
    () =>
      selectedOptions
        ? selectedOptions.join(", ")
        : "All " + props["filter"]["name"],
    [selectedOptions, props]
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
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      {showOptions && (
        <div className="options-container">
          {props["filter"]["values"].map((value, index) => (
            <div
              onClick={() => handleSelectOption(value)}
              className={`option ${value["isSelected"] ? "active" : ""}`}
            >
              <div className="__checkbox">
                {value["isSelected"] && (
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
                className="__value"
                key={value["name"]}
                value={value["name"]}
              >
                {value["name"]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieFilter;
