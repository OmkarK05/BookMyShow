import React from "react";
import { shallow } from "enzyme";
import "../../setupTests.js";
import MovieFilters from "./MovieFilters";

const filterProps = {
  change: jest.fn(),
  filters: [
    {
      name: "Type",
      uuid: "1672889659909",
      values: [
        {
          name: "Fresh",
          isSelected: false
        },
        {
          name: "Popular",
          isSelected: false
        }
      ],
      selectedValues: []
    },
    {
      name: "Language",
      uuid: "1672889659909",
      values: [
        {
          name: "Hindi",
          isSelected: false
        },
        {
          name: "English",
          isSelected: false
        },
        {
          name: "Tamil",
          isSelected: false
        }
      ]
    }
  ]
};

let wrapped = shallow(
  <MovieFilters
    movies={filterProps["movies"]}
    selectMovie={filterProps["selectMovie"]}
  />
);
describe("Movie Filters", () => {
  it("Should display 2 filter", () => {
    filterProps["filters"].forEach((filter) => {
      const imageWrapper = wrapped.find(`#movie-filter-${filter["uuid"]}`);
      expect(imageWrapper).toBeTruthy();
    });
  });
});
