import React from "react";
import { Link } from "react-router-dom";
export default class GenerateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://localhost:3000/votepage/" + props.id,
      event: props.value,
      date: props.dates,
      name: "",
      namelist: []
    };
  }

  handleNameChange = text => {
    this.setState({
      name: text.target.value
    });
  };

  render() {
    return (
      <div className={"voter-Form"}>
        {this.props.status ? (
          <div>
            <h1>{this.state.event}</h1>
            <label>Your Voting Link can be found here</label>
            <p>
              <a rel="noopener noreferrer" href={this.state.url}>
                {this.state.url}
              </a>
            </p>
            <Link to="/Home">Go to Home</Link>
          </div>
        ) : (
          <div>
            <h1>Please Sign in to Create an event</h1>
            <label>Click on the login to go to login page</label>
          </div>
        )}
      </div>
    );
  }
}
