import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./style.css";
import ActivityPage from "../ActivityPage";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";
import PrivateRoute from "../PrivateRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
          <Route exact path="/activity" component={ActivityPage} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </Router>
    )
  }
}

export default App;
