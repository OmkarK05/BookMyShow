import React from "react";
import { shallow } from "enzyme";
import MovieFilter from "./MovieFilter.js";
import "../../setupTests.js";

const filter = {
  change: jest.fn(),
  filter: {
    name: "Languages",
    uuid: "1672886623616",
    values: ["Hindi", "English", "Marathi"],
    selectedValues: []
  }
};

let wrapped = shallow(
  <MovieFilter filter={filter["filter"]} change={filter["change"]} />
);
describe("Movie Filter", () => {
  it("should render title", () => {
    const imageWrapper = wrapped.find(
      `#movie-filter-${filter["filter"]["uuid"]}-text`
    );
    expect(imageWrapper).toBeTruthy();
  });

  describe("Hover on filter to open options", () => {
    beforeEach(() => {
      wrapped.simulate("mouseenter");
    });

    it("should open options container on hover", () => {
      const nameWrapper = wrapped.find(
        `#movie-filter-${filter["filter"]["uuid"]}-options`
      );
      console.log(nameWrapper.html());
      expect(nameWrapper).toBeTruthy();
    });

    it("should have options with checkbox", () => {
      filter["filter"]["values"].forEach((value) => {
        const checkbox = wrapped.find(`#movie-filter-${value}-checkbox`);
        const option = wrapped.find(`#movie-filter-${value}-option`);
        expect(checkbox).toBeTruthy();
        expect(option.text()).toEqual(value);
      });
    });
  });
});
