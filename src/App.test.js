import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("event-form", () => {
  it("should have an event form side bar", () => {
    const { getByText } = render(<App />);
    expect(getByText("Event Form")).toBeInTheDocument();
  });

  it("should have an event name input box", () => {
    const { getByText } = render(<App />);
    expect(getByText("Event Name:")).toBeInTheDocument();
  });

  it("should have submit button for submission of the event form", () => {
    const { getByText } = render(<App />);
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("should allow users to select a date as an option", () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText("28"));
    expect(getByText("9/28/2019")).toBeInTheDocument();
  });

  it("should allow users to select multiple dates as options", () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText("28"));
    fireEvent.click(getByText("29"));
    fireEvent.click(getByText("30"));
    expect(getByText("9/28/2019")).toBeInTheDocument();
    expect(getByText("9/29/2019")).toBeInTheDocument();
    expect(getByText("9/30/2019")).toBeInTheDocument();
  });

  it("should allow users to delete dates that were mistakenly selected as options", () => {
    const { getByText, queryByText } = render(<App />);
    fireEvent.click(getByText("28"));
    expect(getByText("9/28/2019")).toBeInTheDocument();
    fireEvent.click(getByText("Delete"));
    expect(queryByText("9/28/2019")).toBe(null);
  });

  it("should allow users to delete dates that were mistakenly selected as options on the Calendar itself by re-clicking the selected date", () => {
    const { getByText, queryByText } = render(<App />);
    fireEvent.click(getByText("28"));
    expect(getByText("9/28/2019")).toBeInTheDocument();
    fireEvent.click(getByText("28"));
    expect(queryByText("9/28/2019")).toBe(null);
  });

  it("should not allow users to select dates that have passed", () => {
    const { getByText, queryByText } = render(<App />);
    fireEvent.click(getByText("20"));
    expect(queryByText("9/20/2019")).toBe(null);
  });

  it("should not allow users to submit without filling in the event name AND the dates", () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("Submit"));
    expect(queryByText("9/20/2019")).toBe(null);
  });

  it("should allow users to submit after filling in the event name AND selecting the dates", () => {
    const { getByText, getByLabelText } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("29"));
    fireEvent.click(getByText("Submit"));
    expect(getByText("0")).toBeInTheDocument();
  });
});

describe("poll-form", () => {
  it("should allow users to vote after entering their names and clicking on the vote button", () => {
    const { getByText, getByLabelText } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("29"));
    fireEvent.click(getByText("Submit"));
    const addMemberInput3 = getByLabelText("input-name-box");
    fireEvent.change(addMemberInput3, { target: { value: "John" } });
    fireEvent.click(getByText("Vote!"));
    expect(getByText("John")).toBeInTheDocument();
  });

  it("should not allow users to vote before entering their names and clicking on the vote button", () => {
    const { getByText, getByLabelText } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("29"));
    fireEvent.click(getByText("Submit"));
    fireEvent.click(getByText("Vote!"));
    expect(getByText("0")).toBeInTheDocument();
  });

  it("should not allow users to vote more than once if their names are the same and clicking on the vote button", () => {
    const { getByText, getByLabelText } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("29"));
    fireEvent.click(getByText("Submit"));
    const addMemberInput3 = getByLabelText("input-name-box");
    fireEvent.change(addMemberInput3, { target: { value: "John" } });
    fireEvent.click(getByText("Vote!"));
    fireEvent.click(getByText("Vote!"));
    fireEvent.change(addMemberInput3, { target: { value: "" } });
    fireEvent.click(getByText("Vote!"));
    expect(getByText("John")).toBeInTheDocument();
    fireEvent.change(addMemberInput3, { target: { value: "Peter" } });
    fireEvent.click(getByText("Vote!"));
    expect(getByText("Peter")).toBeInTheDocument();
  });
});

describe("weather-js-file", () => {
  it("should render out the weather forecast when selecting a date ", () => {
    const { getByText, getByLabelText } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("29"));
    expect(getByText("Weather Forecast:")).toBeInTheDocument();
  });

  it("should render out the weather forecast when selecting a date (actual weather forecast)", async () => {
    const { getByText, getByLabelText, getByTestId } = render(<App />);
    const addMemberInput = getByLabelText("input-event-box");
    fireEvent.change(addMemberInput, { target: { value: "123" } });
    fireEvent.click(getByText("29"));
    const countspan = await waitForElement(() =>
      getByTestId("weather-forecast")
    );
    expect(countspan).toBeInTheDocument();
  });

  it("should render not knowing the weather forecast when selecting a date (when no weather forecast available)", async () => {
    const { getByText, getByLabelText } = render(<App />);
    const addMemberInput = getByLabelText("Next Month");
    fireEvent.click(addMemberInput);
    fireEvent.click(getByText("29"));
    const countspan = await waitForElement(() =>
      getByText("??☂☁☀Only God would know☀ ☁ ☂??")
    );
    expect(countspan).toBeInTheDocument();
  });
});
