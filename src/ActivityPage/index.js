import React, { Component } from "react";

class ActivityPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      distance: 0,
      path: [],
      hour: '00',
      minute: '00',
      second: '00',
      ruckWeight: '',
      stopped: false
    }
  }

  onStart = () => {
    this.setState({
      distance: 0,
      path: [
        {
          lat: 40.748440,
          lng: -73.985664
        }
      ],
      stopped: false
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

  timer = () => {
    let second = parseInt(this.state.second);
    let minute = parseInt(this.state.minute);
    let hour = parseInt(this.state.hour);
    if (second < 59) {
      if (second < 9) {
        second = second + 1
        this.setState({
          second: '0' + second
        })
      } else {
        this.setState({
          second: second + 1
        })
      }
    } else if (minute < 59) {
      if (minute < 9) {
        minute = minute + 1
        this.setState({
          second: '00',
          minute: '0' + minute
        })
      } else {
        this.setState({
          second: '00',
          minute: minute + 1
        })
      }
    } else {
      this.setState({
        second: '00',
        minute: '00',
        hour: hour + 1
      })
    }
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

  onStop = () => {
    clearInterval(this.startTimer);
    this.setState({
      stopped: true,
    });
  }

  ruckPower = () => {
    const hour = parseFloat(this.state.hour);
    const minute = parseFloat(this.state.minute / 60);
    const second = parseFloat(this.state.second / 3600);
    const convertedTime = hour + minute + second;
    const rW = this.state.ruckWeight * this.state.distance;
    const rP = (rW / convertedTime / 60).toFixed(2);
    return rP;
  }

  render() {
    return (
      <div className="ActivityPage">
        <div>Distance: {this.state.distance}</div>
        <div className="timer">Duration: {this.state.hour}:{this.state.minute}:{this.state.second}</div>
        <button className="start-button" onClick={this.onStart}>START</button>
        <button className="stop-button" onClick={this.onStop}>STOP</button>
      </div>
    )
  }
}

export default ActivityPage;