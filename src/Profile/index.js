import React, { Component } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="Profile">
          <div>Name</div>
          <div>Overall Power Score:</div>
          <div>Lifetime Miles Rucked:</div>
      </div>
    )
  }
}

export default Profile;