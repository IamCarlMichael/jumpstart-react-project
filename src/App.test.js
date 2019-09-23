import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Event Form", () => {
  it("should have Hello World", () => {
    const { getByText } = render(<App />);
    expect(getByText("Hello World")).toBeInTheDocument();
  });

  it("should have Hello World", () => {
    const { getByText } = render(<App />);
    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
