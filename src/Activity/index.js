import React, { Component } from "react";

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  delete = async () => {
    await fetch(`/api/activity/${this.props.activity.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.props.delete();
  }


  render() {
    return (
      <div className="Activity">
        <div className="activity-date">{this.props.activity.date}</div>
        <div className="activity-info">
          <div>{this.props.activity.distance} mi<br /><span className="activity-span">DISTANCE</span></div>
          <div>{this.props.activity.duration}<br /><span className="activity-span">DURATION</span></div>
          <div>{this.props.activity.ruckWeight} lbs<br /><span className="activity-span">RUCK WEIGHT</span></div>
          <div>{this.props.activity.powerScore}<br /><span className="activity-span">POWER SCORE</span></div>
          <button className="delete-button" onClick={this.delete}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Activity;