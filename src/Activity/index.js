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
        <div>{this.props.activity.date}</div>
        <div>{this.props.activity.distance}</div>
        <div>{this.props.activity.hour}:{this.props.activity.minute}:{this.props.activity.second}</div>
        <div>{this.props.activity.ruckWeight}</div>
        <div>{this.props.activity.powerScore}</div>
      </div>
    )
  }
}

export default Activity;