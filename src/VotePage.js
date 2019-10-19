import React from "react";
import Weather from "./weather";
import axios from "axios";

let result;
let resultIso;
var str = document.location.href;
str.slice(0, str.lastIndexOf("/") + 1);
var uri = str.slice(str.lastIndexOf("/") + 1);

class VoteEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namelist: [],
      voted: false
    };
  }

  addVotesToDB = async (dateString, nameToAdd) => {
    const url =
      "http://localhost:3003/events/" +
      uri +
      "/dates/" +
      dateString +
      "/users/" +
      nameToAdd;
    await axios
      .patch(url)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  removeVote(item) {
    let rmvVote = this.state.namelist.filter(function(arr) {
      return arr !== item;
    });
    this.setState({
      namelist: rmvVote,
      voted: false
    });
  }

  addVote(item) {
    if (this.props.data !== "" && !this.state.namelist.includes(item)) {
      console.log(this.props.isoDates);
      this.addVotesToDB(this.props.isoDates, item);
      this.setState({
        namelist: [...this.state.namelist, item],
        voted: true
      });
    }
  }

  render() {
    return (
      <div>
        <div className={"date"}>{this.props.date.toLocaleDateString()}</div>
        {this.state.voted ? (
          <button
            className={"remove_vote"}
            onClick={() => this.removeVote(this.props.data)}
          >
            Remove Vote!
          </button>
        ) : (
          <button
            className={"vote"}
            onClick={() => this.addVote(this.props.data)}
          >
            Vote!
          </button>
        )}

        <div className={"vote-counter"}>{this.state.namelist.length}</div>
        <div>
          {this.state.namelist.map(i => (
            <div key={i} className={"vote-namelist"}>
              {i}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default class GenerateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      date: [],
      name: "",
      namelist: [],
      data: null,
      isoDbdates: []
    };
  }

  handleNameChange = text => {
    this.setState({
      name: text.target.value
    });
  };

  componentDidMount() {
    this.renderMyData();
  }

  transformDatesArr(Arr) {
    result = [];
    result = Arr.map(({ date }) => new Date(date));
  }

  transformDatesArriso(Arr) {
    resultIso = [];
    resultIso = Arr.map(({ date }) => date);
  }
  renderMyData() {
    if (uri !== "") {
      fetch("http://localhost:3003/events/" + uri)
        .then(response => response.json())
        .then(responseJson => {
          this.transformDatesArr(responseJson[0].dates);
          this.transformDatesArriso(responseJson[0].dates);
          this.setState({
            date: result,
            event: responseJson[0].eventName,
            isoDbdates: resultIso
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <div className={"voter-Form"}>
        <h1>{this.state.event}</h1>
        <label>Who are you? </label>
        <input
          type="Text"
          aria-label={"input-name-box"}
          data-testid="username-input"
          placeholder="Enter Name to Vote"
          onChange={this.handleNameChange}
          value={this.state.name}
        />
        <div>
          <div className={"voters-options-form"}>
            {this.state.date.map(i => (
              <div key={i} className={"individual-voters-option"}>
                <VoteEntry
                  date={i}
                  data={this.state.name}
                  isoDates={this.state.isoDbdates[this.state.date.indexOf(i)]}
                />
                <Weather date={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
