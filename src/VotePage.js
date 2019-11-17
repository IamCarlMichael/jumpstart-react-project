import React from "react";
import Weather from "./weather";
import axios from "axios";
import NoMatch from "./NoMatch";
import "./VotePage.css";

let result;
let resultIso;
let resultNames;
var str = document.location.href;
str.slice(0, str.lastIndexOf("/") + 1);
var uri = str.slice(str.lastIndexOf("/") + 1);

class VoteEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namelist: this.props.namesProp,
      voted: false
    };
  }

  removeVotesfromDB = async (dateString, nameToRemove) => {
    const url =
      "http://localhost:3003/events/" +
      uri +
      "/dates/" +
      dateString +
      "/users/" +
      nameToRemove;
    await axios
      .delete(url)
      .then(res => {})
      .catch(err => {
        return err.message;
      });
  };

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
      .then(res => {})
      .catch(err => {
        return err.message;
      });
  };

  removeVote(item) {
    let rmvVote = this.state.namelist.filter(function(arr) {
      return arr !== item;
    });
    this.removeVotesfromDB(this.props.isoDates, item);
    this.setState({
      namelist: rmvVote,
      voted: false
    });
  }

  addVote(item) {
    if (this.props.data !== "" && !this.state.namelist.includes(item)) {
      this.addVotesToDB(this.props.isoDates, item);
      this.setState({
        namelist: [...this.state.namelist, item],
        voted: true
      });
    } else if (this.props.data !== "") {
      this.setState({
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
      isoDbdates: [],
      nameArr: "",
      pageNotFound: false
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

  transformNamesArr(Arr) {
    resultNames = [];
    resultNames = Arr.map(({ names }) => names);
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
        .then(response => {
          if (response.status === 500) {
            this.setState({
              pageNotFound: true
            });
          } else {
            return response.json();
          }
        })
        .then(responseJson => {
          if (responseJson.length === 0) {
            this.setState({
              pageNotFound: true
            });
          } else {
            this.transformDatesArr(responseJson[0].dates);
            this.transformDatesArriso(responseJson[0].dates);
            this.transformNamesArr(responseJson[0].dates);
            this.setState({
              date: result,
              event: responseJson[0].eventName,
              isoDbdates: resultIso,
              nameArr: resultNames,
              pageNotFound: false
            });
          }
        })
        .catch(error => {
          return error.message;
        });
    } else {
      this.setState({
        pageNotFound: true
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.pageNotFound ? (
          <div>
            <NoMatch />
          </div>
        ) : (
          <div className={"voter-Form"}>
            <h1 className={"voter-Form-Title"}>{this.state.event}</h1>
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
                      isoDates={
                        this.state.isoDbdates[this.state.date.indexOf(i)]
                      }
                      namesProp={this.state.nameArr[this.state.date.indexOf(i)]}
                    />
                    <Weather date={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
