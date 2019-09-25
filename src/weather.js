import React from "react";

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
        <div>{WeatherData.data[0].weather.description}</div>
        <div>{date.toISOString().split("T")[0]}</div>
        <div>{console.log(date)}</div>
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
        "f514acd2cde7436392796aaafdc30552"
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
