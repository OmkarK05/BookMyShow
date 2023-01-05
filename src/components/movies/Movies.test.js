import React from "react";
import { shallow } from "enzyme";
import Movies from "./Movies";
import "../../setupTests.js";

const moviesProps = {
  selectMovie: jest.fn(),
  movies: [
    {
      EventGroup: "EG00071990",
      EventTitle: "Notebook",
      EventCode: "ET00093903",
      EventImageCode: "notebook-2019-et00093903-10-01-2019-03-50-36",
      EventImageUrl:
        "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/notebook-2019-et00093903-10-01-2019-03-50-36.jpg",
      EventLanguage: "Hindi",
      EventGenre: "Drama|Romance",
      EventURL: "notebook",
      EventName: "Notebook",
      ShowDate: "29 Mar, 2019",
      DispReleaseDate: "MARCH 29, 2019",
      MonthID: "201903",
      TrailerURL: "https://www.youtube.com/watch?v=SXYxOCLc9-c",
      AllowPreBook: "N",
      IsAtmosEnabled: "N",
      TentativeReleaseDate: "0",
      EventIsDefault: "Y",
      EventCensor: "U",
      EventDimension: "2D",
      TrailerURLUploadDate: "2019-02-22 19:34:18",
      LanguageSequence: "1",
      IsMovieClubEnabled: "N",
      IsPremiere: "N",
      wtsCount: 9010,
      dwtsCount: 16,
      maybeCount: 0,
      csCount: "9,026",
      trailerUploadDate: 1550844258000,
      totalVotes: 0,
      avgRating: 0,
      wtsPerc: 100,
      trailerType: "cs"
    },
    {
      EventGroup: "EG00045309",
      EventTitle: "Junglee",
      EventCode: "ET00065129",
      EventImageCode: "junglee-et00065129-13-11-2017-03-34-14",
      EventImageUrl:
        "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/medium/junglee-et00065129-13-11-2017-03-34-14.jpg",
      EventLanguage: "Hindi",
      EventGenre: "Action|Adventure|Thriller",
      EventURL: "junglee",
      EventName: "Junglee",
      ShowDate: "29 Mar, 2019",
      DispReleaseDate: "MARCH 29, 2019",
      MonthID: "201903",
      TrailerURL: "https://www.youtube.com/watch?v=tcsJ-3GLDE4",
      AllowPreBook: "N",
      IsAtmosEnabled: "N",
      TentativeReleaseDate: "0",
      EventIsDefault: "Y",
      EventCensor: "UA",
      EventDimension: "2D",
      TrailerURLUploadDate: "2019-03-06 12:04:25",
      LanguageSequence: "1",
      IsMovieClubEnabled: "N",
      IsPremiere: "N",
      wtsCount: 20314,
      dwtsCount: 26,
      maybeCount: 0,
      csCount: "20,340",
      trailerUploadDate: 1551854065000,
      totalVotes: 0,
      avgRating: 0,
      wtsPerc: 100,
      trailerType: "cs"
    }
  ]
};

let wrapped = shallow(
  <Movies
    movies={moviesProps["movies"]}
    selectMovie={moviesProps["selectMovie"]}
  />
);
describe("Movies", () => {
  it("Should display movie cards", () => {
    moviesProps["movies"].forEach((movie) => {
      const imageWrapper = wrapped.find(`#movie-card-${movie["EventCode"]}`);
      expect(imageWrapper).toBeTruthy();
    });
  });
});
