import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import MockDate from "mockdate";
import "@testing-library/jest-dom/extend-expect";
import Weather from "./weather";
import mockFetch from "./mockFetch";
import { mockWeatherData } from "./testData/test-weather-data";
import App from "./App";

describe("Weather API component", () => {
  const today = new Date();

  beforeEach(() => {
    today.setFullYear(2019);
    today.setMonth(8); // September
    today.setDate(27);
    MockDate.set(today);
  });

  it("should render out the weather forecast when selecting a date ", () => {
    const { getByText } = render(<Weather date={today} />);
    expect(getByText("Weather Forecast:")).toBeInTheDocument();
  });

  it("should render out the weather forecast when selecting a date (actual weather forecast)", async () => {
    mockFetch.mock(mockWeatherData);
    const { getByTestId } = render(<Weather date={today} />);
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
