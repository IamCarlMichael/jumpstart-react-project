import React from "react";
import "react-day-picker/lib/style.css";
import "./App.css";
import Calendar from "./CalendarSelector";

let event = "Hello";

class EventName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <div className="{event-input}">
        <h1>Event Form</h1>
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
      displayQuestions: false
    };
  }

  displayValue = () => {
    this.setState({
      displayQuestions: !this.state.displayQuestions
    });
  };

  render() {
    return (
      <div className="{submit-button}">
        <button onClick={this.displayValue}>Submit</button>
        {this.state.displayQuestions ? <EventVotePage /> : null}
      </div>
    );
  }
}

class EventVotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: event
    };
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
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
