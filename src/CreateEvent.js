import React from "react";
import "react-day-picker/lib/style.css";
import "./App.css";
import Calendar from "./CalendarSelector";
import PollGenerator from "./poll.js";
import axios from "axios";
let datesArrToDb = [];

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventInput: "",
      selectedDates: [],
      voteExpiryDate: "",
      displayVoteApp: false,
      redirectToReferrer: false,
      res: ""
    };
  }

  handleVoteExpiryChange = date => {
    this.setState({
      voteExpiryDate: new Date(date.target.value)
    });
  };

  handleEventNameChange = text => {
    this.setState({
      eventName: text.target.value
    });
  };

  DateFormat(selectedDatesArray) {
    selectedDatesArray.forEach(element => {
      datesArrToDb.push({ date: element, names: [] });
    });
  }

  submit = async () => {
    if (this.state.eventName !== "" && this.state.selectedDates.length !== 0) {
      datesArrToDb.length = 0;
      this.DateFormat(this.state.selectedDates);
      await axios({
        method: "post",
        url: "http://localhost:3003/events/new",
        data: {
          eventName: this.state.eventName,
          dates: datesArrToDb,
          dateCreated: new Date(),
          voteExpires: this.state.voteExpiryDate,
          organiserName: "John"
        }
      })
        .then(res => {
          console.log(res.data._id);
          this.setState({
            displayVoteApp: !this.state.displayVoteApp,
            eventInput: this.state.eventName,
            res: res.data._id
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  display = () => {
    if (this.state.eventName !== "" && this.state.selectedDates.length !== 0) {
      this.setState({
        displayVoteApp: !this.state.displayVoteApp,
        eventInput: this.state.eventName
      });
    } else return {};
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
            id={this.state.res}
          />
        ) : null}
        <div className={"event-form"}>
          <h1>Event Form</h1>
          <label>Event Name: </label>
          <input
            type="Text"
            aria-label={"input-event-box"}
            placeholder="What's your big occasion?"
            onChange={this.handleEventNameChange}
            value={this.state.eventName}
          />
          <p></p>
          <label>Vote Expiry: </label>
          <input
            type="date"
            onChange={this.handleVoteExpiryChange}
            min={new Date().toISOString().split("T")[0]}
            className={"date-picker-button input-group"}
          />
          <h4>And When?</h4>
          <p> Select your Dates: </p>
          <button className={"submit-button"} onClick={this.submit}>
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

export const CreateEvent = () => {
  return (
    <div>
      <MainForm />
    </div>
  );
};
