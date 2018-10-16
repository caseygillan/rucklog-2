import React, { Component } from "react";

class ActivityPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      date: '',
      distance: 0,
      path: [],
      hour: '00',
      minute: '00',
      second: '00',
      ruckWeight: '',
      stopped: true,
      start: '',
      stop: ''
    }
  }

  componentDidMount = async () => {
    await this.fetchUser();
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

  onStart = () => {
    let d = new Date();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let yyyy = d.getFullYear();

    this.setState({
      date: `${mm}/${dd}/${yyyy}`,
      distance: 0,
      path: [],
      stopped: false,
      start: d
    });

    this.startTimer = setInterval(this.timer, 1000);

    if (!navigator.geolocation) return;

    const activityPage = this;

    let watchID = navigator.geolocation.watchPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      activityPage.setState(prevState => {
        return { path: [...prevState.path, pos] }
      });

      console.log(activityPage.state.path);

      activityPage.calcPathLength(activityPage.state.path);

      if (activityPage.state.stopped === true) {
        navigator.geolocation.clearWatch(watchID);
      }
    });
  }

  // https://developers.google.com/maps/documentation/javascript/geometry
  // https://stackoverflow.com/questions/38183201/get-distance-by-array-of-latitude-and-longitude-on-google-map

  calcPathLength = (path) => {
    var distance = 0;
    for (var i = 0; i < path.length - 1; i++) {
      var pos1 = new window.google.maps.LatLng(path[i].lat, path[i].lng);
      var pos2 = new window.google.maps.LatLng(path[i + 1].lat, path[i + 1].lng);
      distance += window.google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
    };
    this.setState({
      distance: distance * 0.000621371
    });
  };

  onStop = async () => {
    clearInterval(this.startTimer);
    let d = new Date();
    await this.setState({
      stopped: true,
      stop: d
    });
    let timeElapsed = this.state.stop - this.state.start;
    let seconds = parseInt((timeElapsed / 1000) % 60);
    let minutes = parseInt((timeElapsed / (1000 * 60)) % 60);
    let hours = parseInt((timeElapsed / (1000 * 60 * 60)) % 24);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    await this.setState({
      hour: hours,
      minute: minutes,
      second: seconds
    });
    this.ruckPower();
    this.createActivity();
  }

  ruckPower = () => {
    const hour = parseFloat(this.state.hour);
    const minute = parseFloat(this.state.minute / 60);
    const second = parseFloat(this.state.second / 3600);
    const convertedTime = hour + minute + second;
    const rW = this.state.ruckWeight * this.state.distance;
    const powerScore = (rW / convertedTime / 60).toFixed(2);
    this.setState({
      powerScore: powerScore
    })
  }

  createActivity = async () => {
    console.log('createActivity');
    const requestBody = JSON.stringify({
      date: this.state.date,
      distance: this.state.distance,
      hour: this.state.hour,
      minute: this.state.minute,
      second: this.state.second,
      ruckWeight: this.state.ruckWeight,
      powerScore: this.state.powerScore,
      userId: this.state.user.userId
    });

    const response = await fetch('/api/activities', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await response.json();
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="ActivityPage">
        <div>RUCK LOG 2.0</div>
        <div>Distance: {this.state.distance}</div>
        <div className="timer">Duration: {this.state.hour}:{this.state.minute}:{this.state.second}</div>
        {this.state.stopped && (
          <div>
            <span>Enter Ruck Weight:</span>
            <input className="ruck-weight" name="ruckWeight" type="text" placeholder="lbs" onChange={this.onInputChange} />
          </div>
        )}
        {!this.state.stopped && (
          <div>
            <span>Ruck Weight: </span>
            <span>{this.state.ruckWeight} lbs</span>
          </div>
        )}
        <button className="start-button" onClick={this.onStart}>START</button>
        <button className="stop-button" onClick={this.onStop}>STOP</button>
      </div>
    )
  }
}

export default ActivityPage;