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
      activityList: [],
      edit: false,
      updateFirstName: '',
      updateLastName: ''
    }
  }

  componentDidMount = async () => {
    await this.fetchUser();
    this.fetchActivities();
  };

  fetchUser = async () => {
    const response = await fetch('/api/current-user', {
      headers: {
        'jwt-token': localStorage.getItem('user_jwt')
      }
    });
    const user = await response.json();
    this.setState({
      user: user
    });
  };

  fetchActivities = async () => {
    const response = await fetch(`/api/${this.state.user.userId}/userActivities`);
    const activityList = await response.json();
    await this.setState({
      activityList: activityList
    });
    this.calcLifetimeMiles();
    this.calcPowerScore();
  };

  calcLifetimeMiles = () => {
    let lifetimeMiles = 0;
    this.state.activityList.map((activity) => {
      lifetimeMiles = lifetimeMiles + activity.distance;
    });
    this.setState({
      lifetimeMiles: lifetimeMiles
    })
  };

  calcPowerScore = () => {
    let powerScore = 0;
    let count = 0;
    this.state.activityList.map((activity) => {
      count = count + 1;
      powerScore = (powerScore + activity.powerScore) / count;
    });
    this.setState({
      powerScore: powerScore
    })
  };

  edit = () => {
    this.setState({
      edit: true
    })
  }

  update = async () => {
    const requestBody = await JSON.stringify({
      firstName: this.state.updateFirstName,
      lastName: this.state.updateLastName
    })
    const response = await fetch(`/api/users/${this.state.user.userId}`, {
      method: 'PUT',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.setState({
      edit: false
    });
    this.fetchUser();
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  logout = () => {
    localStorage.clear();
  }

  render() {
    return (
      <div className="Profile">
        <div className="profile-header">
          <div className="title-small">RUCK LOG 2.0</div>
          <Link to="/activity"><button className="new-activity">Start New Ruck</button></Link>
          <Link to="/"><button className="logout" onClick={this.logout}>Log Out</button></Link>
        </div>
        <div className="info">
          {!this.state.edit && (
            <div className="name">
              <div>{this.state.user.firstName} {this.state.user.lastName}</div>
              <button className="edit-button" onClick={this.edit}>Edit Name</button>
            </div>
          )}
          {this.state.edit && (
            <div className="name">
              <form>
                <input className="update-input" type="text" placeholder={this.state.user.firstName} onChange={this.onInputChange} name="updateFirstName" />
                <input className="update-input" type="text" placeholder={this.state.user.lastName} onChange={this.onInputChange} name="updateLastName" />
              </form>
              <button className="update-button" onClick={this.update}>Update</button>
            </div>
          )}
          <div>Overall Power Score: {this.state.powerScore}</div>
          <div>Lifetime Miles Rucked: {this.state.lifetimeMiles}</div>
          <div>Activities</div>
        </div>
        <div className="activity-list">
        {this.state.activityList.reverse().map((activity, index) => {
          return (
            <Activity
              key={index}
              activity={activity}
              delete={this.fetchActivities}
            />
          )
        })
        }
        </div>
      </div>
    )
  }
}

export default Profile;