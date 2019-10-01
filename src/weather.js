import React from "react";
import "./App.css";

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
      WeatherData: props.data,
      date: props.date
    };
  }

  render() {
    const { WeatherData, date } = this.state;
    return (
      <div>
        <div>{search(date, WeatherData.data)}</div>
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
      WeatherData: null,
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
        this.setState({ WeatherData: resInJson });
      });
  }

  render() {
    const { WeatherData, date } = this.state;
    return (
      <div>
        <div>Weather Forecast:</div>
        <div>
          {WeatherData ? (
            <Display data={WeatherData} date={date} />
          ) : (
            <Loading />
          )}{" "}
        </div>
      </div>
    );
  }
}
