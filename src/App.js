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
      <div className={"main-page"}>
        {this.state.displayVoteApp ? (
          <PollGenerator
            value={this.state.eventInput}
            dates={this.state.selectedDates}
          />
        ) : null}
        <div className={"event-form"}>
          <h1>Event Form</h1>
          <label>Event Name: </label>
          <input
            type="Text"
            placeholder="What's your big occasion?"
            onChange={this.handleEventNameChange}
            value={this.state.eventName}
          />
          <h4>And When?</h4>
          <p> Select your Dates: </p>
          <button className={"submit-button"} onClick={this.display}>
            Submit
          </button>
          <Calendar
            data={{
              dateChange: this.dateChange.bind(this)
            }}
          />
        </div>
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
