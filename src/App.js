import React from "react";
import "react-day-picker/lib/style.css";
import "./App.css";
import Calendar from "./CalendarSelector";

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventInput: "",
      selectedDates: [""],
      displayVoteApp: false
    };
  }

  handleEventNameChange = text => {
    this.setState({
      eventName: text.target.value
    });
  };

  display = () => {
    this.setState({
      displayVoteApp: !this.state.displayVoteApp,
      eventInput: this.state.eventName
    });
  };

  dateChange(item) {
    this.setState({ selectedDates: item });
  }

  render() {
    return (
      <div className="{event-input}">
        <h1>Event Form</h1>
        <input
          type="Text"
          onChange={this.handleEventNameChange}
          value={this.state.eventName}
        />
        <Calendar
          data={{
            dateChange: this.dateChange.bind(this)
          }}
        />
        <button onClick={this.display}>Submit</button>
        {this.state.displayVoteApp ? (
          <GenerateForm
            value={this.state.eventInput}
            dates={this.state.selectedDates}
          />
        ) : null}
      </div>
    );
  }
}

class GenerateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.value,
      date: props.dates
    };
  }

  render() {
    console.log(this.state.date);
    return (
      <div>
        <h1>{this.state.event}</h1>
        <div>
          {this.state.date.map(i => (
            <div>{i.toLocaleDateString()}</div>
          ))}
        </div>
      </div>
    );
  }
}

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
      value: ""
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
      <MainForm />
    </div>
  );
}

export default App;
