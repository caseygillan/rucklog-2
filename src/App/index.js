import React, { Component } from "react";
import "./style.css";
import ActivityPage from "../ActivityPage";
import Register from "../Register";

class App extends Component {
  render() {
    return (
    <div className="App">
      <ActivityPage />
      <Register />
    </div>
    )
  }
}

export default App;
