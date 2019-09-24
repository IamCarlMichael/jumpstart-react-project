import React from "react";

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
        <div>
          {this.state.date.map(i => (
            <div>
              {i.toLocaleDateString()}
              <button onClick={() => this.addVote()}>+</button>
              <div>{this.state.namelist.length}</div>
              <div>
                {this.state.namelist.map(i => (
                  <div>{i}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <input
          type="Text"
          onChange={this.handleNameChange}
          value={this.state.names}
        />
      </div>
    );
  }
}
