//Sample for using react test library to mock async functions

// const realFetch = window.fetch;

// export const mock = data => {
//   if (window.fetch === realFetch) {
//     window.fetch = jest.fn();
//   }
//   window.fetch.mock({
//     json: jest.fn().mockResolvedValue(data),
//   });
// };

// export const mockOnce = data => {
//   if (window.fetch === realFetch) {
//     window.fetch = jest.fn();
//   }
//   window.fetch.mockResolvedValueOnce({
//     json: jest.fn().mockResolvedValue(data),
//   });
// };

// export const mockRestore = () => {
//   if (window.fetch !== realFetch) {
//     window.fetch.mockRestore();
//   }
// };

// export default {
//   mock,
//   mockOnce,
//   mockRestore,
// };

// Actual implementation

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { render, wait } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
// import pokemonTestData from "./testData/pokemonTestData";
// import mockFetch from "./fetch-utils";

// describe("Pokemon APp", () => {
//   beforeEach(() => {});
//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });

//   it("should render pokemon cards", async () => {
//     window.fetch = jest.fn().mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValue(pokemonTestData),
//     });

//     mockFetch.mockOnce(pokemonTestData);
//     const { debug, getByText, getAllByTestId } = render(<App />);
//     await wait(() => getByText("Bulbasaur"));
//     expect(getByText("Bulbasaur")).toBeInTheDocument();
//     expect(getAllByTestId("cardComponent")).toHaveLength(4);
//   });
// });
