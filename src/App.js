import React from "react";
import "react-day-picker/lib/style.css";
import "./App.css";
import Calendar from "./CalendarSelector";
import PollGenerator from "./poll.js";

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
    if (this.state.eventName !== "" && this.state.selectedDates.length !== 0) {
      this.setState({
        displayVoteApp: !this.state.displayVoteApp,
        eventInput: this.state.eventName
      });
    }
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
          placeholder="Enter Event Title"
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
          <PollGenerator
            value={this.state.eventInput}
            dates={this.state.selectedDates}
          />
        ) : null}
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
