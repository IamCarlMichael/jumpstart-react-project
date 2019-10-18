import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CreateEvent } from "./CreateEvent";
import VotePage from "./VotePage";

function Header() {
  return (
    <div className="nav-links">
      <h1>My Event App</h1>
      <div className="links">
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className={"App"}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={CreateEvent} />
          <Route path="/votepage" component={VotePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
