import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class DeleteEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteThisEvent = async () => {
    const url = "http://localhost:3003/events/" + this.props.Id;
    axios
      .delete(url)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
    this.props.updatelist(this.props.Id, this.props.name);
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.deleteThisEvent();
          }}
        >
          Delete Event
        </button>
      </div>
    );
  }
}

class MyEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventId: []
    };
  }

  updatelist(eventId, name) {
    let rmvEventId = this.state.eventId.filter(function(arr) {
      return arr !== eventId;
    });
    let rmvEvent = this.state.events.filter(function(arr) {
      return arr !== name;
    });
    this.setState({
      events: rmvEvent,
      eventId: rmvEventId
    });
  }

  componentDidMount = () => {
    const checkSavedState = localStorage.getItem("loggedIn");
    if (checkSavedState === null || checkSavedState === false) {
      this.props.history.push("/");
    } else {
      this.getEvents();
    }
  };

  getEvents = async (dateString, nameToRemove) => {
    const userId = localStorage.getItem("userId");
    const url = "http://localhost:3003/events/user/" + userId;
    await axios
      .get(url)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.setState({
            events: [...this.state.events, res.data[i].eventName],
            eventId: [...this.state.eventId, res.data[i]._id]
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>My Created events</h2>
        <p>
          {" "}
          <Link to="/newevent">Create new event</Link>{" "}
        </p>
        <div>
          {this.state.events.map(i => (
            <div key={i}>
              <a
                rel="noopener noreferrer"
                href={`http://localhost:3000/votepage/${
                  this.state.eventId[this.state.events.indexOf(i)]
                }`}
              >
                {i}
              </a>
              <DeleteEvent
                Id={this.state.eventId[this.state.events.indexOf(i)]}
                name={i}
                updatelist={this.updatelist.bind(this)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default MyEvents;
