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
    document.location.reload(true);
  }


  render() {
    return (
      <div className="Activity">
        <div>{this.props.activity.date}</div>
        <div className="activity-info">
          <div>{this.props.activity.distance} mi<br />DISTANCE</div>
          <div>{this.props.activity.duration}<br />DURATION</div>
          <div>{this.props.activity.ruckWeight} lbs<br />RUCK WEIGHT</div>
          <div>{this.props.activity.powerScore}<br />POWER SCORE</div>
          <button className="delete-button" onClick={this.delete}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Activity;