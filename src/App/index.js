import React, { Component } from "react";
import "./style.css";
import ActivityPage from "../ActivityPage";
import Register from "../Register";
import Login from "../Login";

class App extends Component {
  render() {
    return (
    <div className="App">
      <ActivityPage />
      <Register />
      <Login />
    </div>
    )
  }
}

export default App;
