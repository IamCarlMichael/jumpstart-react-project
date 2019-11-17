import React from "react";
import "./App.css";
import firebase from "firebase";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.status,
      user: this.props.username
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.status !== prevState.status ||
      nextProps.username !== prevState.username
    ) {
      return { loggedIn: nextProps.status, user: nextProps.username };
    } else return;
  }

  componentDidMount = () => {
    try {
      let checkUsername = localStorage.getItem("username");
      const checkSavedState = localStorage.getItem("loggedIn");
      if (checkUsername === "null") {
        this.setState({ loggedIn: checkSavedState, user: null });
      } else {
        this.setState({ loggedIn: checkSavedState, user: checkUsername });
      }
    } catch (err) {
      return err.message;
    }
  };

  signOutButton() {
    firebase.auth().signOut();
    localStorage.clear();
    window.location.href = process.env.REACT_APP_BASE_URL_FRONTEND;
  }

  render() {
    return (
      <div className="nav-links">
        <h1>My Event App</h1>
        <div className="links">
          {this.state.loggedIn ? (
            <div>
              <div>
                {typeof this.state.user === "object" ||
                (typeof this.state.user === "string" &&
                  this.state.user === "null")
                  ? `Welcome User`
                  : `Welcome ${this.state.user}`}
                <div>
                  <Link className={"HomePageLink"} to="/Home">
                    Home Page
                  </Link>
                </div>
              </div>
              <button
                className={"SignOutButton"}
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
