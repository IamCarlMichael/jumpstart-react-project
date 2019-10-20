import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notLoggedIn: this.props.status
    };
  }

  render() {
    return (
      <div className="nav-links">
        <h1>My Event App</h1>
        {/* <button
          onClick={() => {
            console.log(this.props.status);
          }}
        >
          Click me
        </button> */}
        <div className="links">
          {this.props.status ? <div>Welcome</div> : <Link to="/">Login</Link>}
        </div>
      </div>
    );
  }
}
