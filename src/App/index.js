import React, { Component } from "react";
import "./style.css";
import ActivityPage from "../ActivityPage";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";

class App extends Component {
  render() {
    return (
    <div className="App">
      <Register />
      <Login />
      <ActivityPage />
      <Profile />
    </div>
    )
  }
}

export default App;
