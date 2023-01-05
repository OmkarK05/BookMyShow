import React from "react";
import { shallow } from "enzyme";
import "../../setupTests.js";
import MovieLeftFilter from "./MovieLeftFilter.js";

const filter = {
  change: jest.fn(),
  value: "Coming Soon",
  values: ["Now Showing"]
};

let wrapped = shallow(
  <MovieLeftFilter
    value="Coming Soon"
    values={["Now Showing"]}
    select={jest.fn()}
  />
);
describe("Movie Left Filter", () => {
  it("should render button", () => {
    const imageWrapper = wrapped.find(`#movie-left-filter-${filter["value"]}`);
    expect(imageWrapper).toBeTruthy();
  });
});
