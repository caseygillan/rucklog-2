import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import ActivityPage from "../ActivityPage";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <div>Hello</div>
        {/* <ActivityPage /> */}
      </div>
    )
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById("root"));
