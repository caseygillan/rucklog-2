import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Activity from "../Activity";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      powerScore: '',
      lifetimeMiles: '',
      activityList: []
    }
  }

  componentDidMount = async () => {
    await this.fetchUser();
    // this.fetchActivities();
  };

  fetchUser = async () => {
    const response = await fetch('api/current-user', {
      headers: {
        'jwt-token': localStorage.getItem('user_jwt')
      }
    });
    const user = await response.json();
    this.setState({
      user: user
    });
  };

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