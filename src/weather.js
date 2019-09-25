import React from "react";

function search(date, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].datetime === date.toISOString().split("T")[0]) {
      let logo = myArray[i].weather.icon;
      return (
        <div>
          <div>{myArray[i].weather.description} </div>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${logo}.png`}
            alt={"icon"}
          />
          <div>{`${myArray[i].temp}°C/${myArray[i].max_temp}°C`}</div>
        </div>
      );
    }
  }

  return "Only God would know =D";
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
    return <div>Loading......</div>;
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
      .then(resInJson =>
        this.setState(state => {
          return { WeatherData: resInJson };
        })
      );
  }

  render() {
    const { WeatherData, date } = this.state;
    return (
      <div>
        <div>The Weather Forecast is:</div>
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
