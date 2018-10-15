import React, { Component } from "react";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="Activity">
        <div>Date</div>
        <div>Distance</div>
        <div>Duration</div>
        <div>Ruck Weight</div>
        <div>Power Score</div>
      </div>
    )
  }
}

export default Activity;