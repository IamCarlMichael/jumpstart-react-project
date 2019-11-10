import React from "react";
import "./App.css";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.status
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.status !== prevState.status) {
      return { loggedIn: nextProps.status };
    } else return null;
  }

  componentDidMount = () => {
    try {
      const checkSavedState = localStorage.getItem("loggedIn");
      this.setState({ loggedIn: checkSavedState });
    } catch (err) {
      return err.message;
    }
  };

  signOutButton() {
    firebase.auth().signOut();
    localStorage.removeItem("loggedIn");
    window.location.href = "http://localhost:3000";
  }

  render() {
    return (
      <div className="nav-links">
        <h1>My Event App</h1>
        <div className="links">
          {this.state.loggedIn ? (
            <div>
              <div>Welcome</div>
              <button
                onClick={() => {
                  this.signOutButton();
                }}
              >
                Sign out!
              </button>
            </div>
          ) : (
            <Link to="/">Login</Link>
          )}
        </div>
      </div>
    );
  }
}
