import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Activity from "../Activity";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="Profile">
          <Link to="/activity"><button className="new-activity">Start New Ruck</button></Link>
          <div>Name</div>
          <div>Overall Power Score:</div>
          <div>Lifetime Miles Rucked:</div>
          <Activity />
      </div>
    )
  }
}

export default Profile;