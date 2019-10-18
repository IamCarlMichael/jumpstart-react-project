import React from "react";
import Weather from "./weather";

let result;
var str = document.location.href;
str.slice(0, str.lastIndexOf("/") + 1);
var uri = str.slice(str.lastIndexOf("/") + 1);

class VoteEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namelist: []
    };
  }

  addVote(item) {
    if (this.props.data !== "" && !this.state.namelist.includes(item)) {
      this.setState({
        namelist: [...this.state.namelist, item]
      });
    }
  }

  render() {
    return (
      <div>
        <div className={"date"}>{this.props.date}</div>
        <button
          className={"vote"}
          onClick={() => this.addVote(this.props.data)}
        >
          Vote!
        </button>
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
      data: null
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

  renderMyData() {
    if (uri !== "") {
      console.log(uri);
      fetch("http://localhost:3003/events/" + uri)
        .then(response => response.json())
        .then(responseJson => {
          this.transformDatesArr(responseJson[0].dates);
          console.log(result);
          this.setState({
            date: result,
            event: responseJson[0].eventName
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
                  date={i.toLocaleDateString()}
                  data={this.state.name}
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
