import React from "react";
import "./App.css";

console.log("This is awesome");

function search(date, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].datetime === date.toISOString().split("T")[0]) {
      let logo = myArray[i].weather.icon;
      return (
        <div className={"weather-content"} data-testid="weather-forecast">
          <img
            className={"weather-icon"}
            src={`https://www.weatherbit.io/static/img/icons/${logo}.png`}
            alt={"icon"}
          />
          <div>{myArray[i].weather.description} </div>
          <div
            className={"temp"}
          >{`Low / High: ${myArray[i].temp}°C / ${myArray[i].max_temp}°C`}</div>
        </div>
      );
    }
  }

  return (
    <div>
      <label>?? ¯\_(ツ)_/¯ ??</label>
      <div className={"temp"}>??☂☁☀Only God would know☀ ☁ ☂??</div>
    </div>
  );
}

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: props.data,
      date: props.date
    };
  }

  render() {
    const { weatherData, date } = this.state;
    return (
      <div>
        <div>{search(date, weatherData.data)}</div>
      </div>
    );
  }
}

class Loading extends React.Component {
  render() {
    return <div className={"spinner"}></div>;
  }
}

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      date: props.date
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(
      "https://api.weatherbit.io/v2.0/forecast/daily?" +
        "city=" +
        "Singapore" +
        "&" +
        "country=" +
        "SG" +
        "&" +
        "key=" +
        process.env.REACT_APP_WEATHER_API_KEY
    )
      .then(res => res.json())
      .then(resInJson => {
        this.setState({ weatherData: resInJson });
      });
  }

  render() {
    const { weatherData, date } = this.state;
    return (
      <div>
        <div>Weather Forecast:</div>
        <div>
          {weatherData ? (
            <Display data={weatherData} date={date} />
          ) : (
            <Loading />
          )}{" "}
        </div>
      </div>
    );
  }
}
