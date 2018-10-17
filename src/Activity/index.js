import React, { Component } from "react";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  delete = async () => {
    console.log(this.props.activity.id);
    const response = await fetch(`/api/activity/${this.props.activity.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <div className="Activity">
        <div>{this.props.activity.date}</div>
        <div>{this.props.activity.distance}</div>
        <div>{this.props.activity.hour}:{this.props.activity.minute}:{this.props.activity.second}</div>
        <div>{this.props.activity.ruckWeight}</div>
        <div>{this.props.activity.powerScore}</div>
        <button className="delete-button" onClick={this.delete}>Delete</button>
      </div>
    )
  }
}

export default Activity;