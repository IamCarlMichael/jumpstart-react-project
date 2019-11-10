import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import VotePage from "./VotePage";
import MyEvents from "./MyEvents";
import Login from "./Login";
import NoMatch from "./NoMatch";
import Header from "./Header";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  update(loginBoolean) {
    this.setState({ loggedIn: loginBoolean });
    localStorage.setItem("loggedIn", loginBoolean);
  }

  componentDidMount = () => {
    try {
      const checkSavedState = localStorage.getItem("loggedIn");
      if (checkSavedState === null) {
        this.setState({ loggedIn: false });
      } else {
        this.setState({ loggedIn: checkSavedState });
      }
    } catch (err) {
      return err.message;
    }
  };

  render() {
    return (
      <div className={"App"}>
        <Router>
          <Header status={this.state.loggedIn} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login {...props} update={this.update.bind(this)} />
              )}
            />
            <Route exact path="/home" component={MyEvents} />
            <Route
              exact
              path="/newevent"
              render={props => (
                <CreateEvent {...props} status={this.state.loggedIn} />
              )}
            />
            <Route path="/votepage" component={VotePage} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
