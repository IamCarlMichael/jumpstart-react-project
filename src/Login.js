import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyBtIJQ_ZXpk5UTijNH7WQtHRB5I7bfUxKc",
  authDomain: "event-app-e4568.firebaseapp.com"
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    const checkSavedState = localStorage.getItem("loggedIn");
    if (checkSavedState === true) {
      this.setState({ isSignedIn: checkSavedState });
    } else {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user });
        if (!!user) {
          this.props.update(
            !!user,
            firebase.auth().currentUser.displayName,
            firebase.auth().currentUser.uid
          );
          this.props.history.push("/home");
        }
      });
    }
  };

  logoutHandler() {
    firebase.auth().signOut();
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <h1>Event App Login Page</h1>
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <Link to="/Home">Go to My Events</Link>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default Login;
