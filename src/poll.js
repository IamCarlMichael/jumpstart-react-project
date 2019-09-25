import React from "react";
import Weather from "./weather";

class VoteEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namelist: []
    };
  }

  addVote(item) {
    if (this.state.names !== "" && !this.state.namelist.includes(item)) {
      this.setState({
        namelist: [...this.state.namelist, item]
      });
    }
  }

  render() {
    return (
      <div>
        <div>{this.props.date}</div>
        <button onClick={() => this.addVote(this.props.data)}>+</button>
        <div>{this.state.namelist.length}</div>
        <div>
          {this.state.namelist.map(i => (
            <div>{i}</div>
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
      event: props.value,
      date: props.dates,
      names: "",
      namelist: []
    };
  }

  handleNameChange = text => {
    this.setState({
      names: text.target.value
    });
  };

  addVote() {
    if (
      this.state.names !== "" &&
      !this.state.namelist.includes(this.state.names)
    ) {
      this.setState({
        namelist: [...this.state.namelist, this.state.names]
      });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.event}</h1>
        <input
          type="Text"
          placeholder="Enter Name to Vote"
          onChange={this.handleNameChange}
          value={this.state.names}
        />
        <div>
          {this.state.date.map(i => (
            <div>
              <Weather date={i} />
              <VoteEntry
                date={i.toLocaleDateString()}
                data={this.state.names}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
