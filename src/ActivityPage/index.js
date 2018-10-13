import React, { Component } from "react";

class ActivityPage extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div className="ActivityPage">
        <div>{this.state.distance}</div>
        <button className="start-button" onClick={this.onStart}>START</button>
        <button className="stop-button" onClick={this.onStop}>STOP</button>
      </div>
    )
  }
}

export default ActivityPage;