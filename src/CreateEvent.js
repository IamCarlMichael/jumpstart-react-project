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
      res: "",
      buttonDisabled: false
    };
  }
  componentDidMount = () => {
    const checkSavedState = localStorage.getItem("loggedIn");
    if (checkSavedState === null || checkSavedState === false) {
      this.props.history.push("/");
    }
  };

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
    if (!this.props.status) {
      this.setState({
        displayVoteApp: true,
        buttonDisabled: true
      });
    } else if (
      this.props.status &&
      this.state.eventName !== "" &&
      this.state.selectedDates.length !== 0 &&
      this.state.buttonDisabled !== true &&
      this.state.displayVoteApp !== true
    ) {
      datesArrToDb.length = 0;
      this.DateFormat(this.state.selectedDates);
      await axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "events/new",
        data: {
          eventName: this.state.eventName,
          dates: datesArrToDb,
          dateCreated: new Date(),
          voteExpires: this.state.voteExpiryDate,
          organiserName: localStorage.getItem("username"),
          uid: localStorage.getItem("userId")
        }
      })
        .then(res => {
          this.setState({
            displayVoteApp: !this.state.displayVoteApp,
            eventInput: this.state.eventName,
            res: res.data._id
          });
        })
        .catch(error => {
          return error.message;
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
            status={this.props.status}
          />
        ) : null}
        <div className={"event-form"}>
          <h1 className={"eventFormHeader"}>Event Form</h1>
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

export default MainForm;
