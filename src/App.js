import React from "react";
import "react-day-picker/lib/style.css";
import "./App.css";
import Calendar from "./CalendarSelector";

class EventName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      list: []
    };
  }

  render() {
    return (
      <div className="{event-input}">
        <h1>Event</h1>
        <input type={"Text"} aria-label="event-input-1"></input>
      </div>
    );
  }
}

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      list: []
    };
  }

  render() {
    return (
      <div className="{submit-button}">
        <button>Submit</button>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <EventName />
      <Calendar />
      <SubmitButton />
    </div>
  );
}

export default App;
