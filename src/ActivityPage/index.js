import React, { Component } from "react";

class ActivityPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      distance: 0,
      path: []
    }
  }

  onStart = () => {
    if (!navigator.geolocation) return;

    const activityPage = this;

    navigator.geolocation.watchPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      activityPage.setState(prevState => {
        return { path: [...prevState.path, pos] }
      });

      console.log(activityPage.state.path);

      activityPage.calcPathLength(activityPage.state.path);

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
    console.log(distance);
    this.setState({
      distance: distance
    });
  };

  render() {
    return (
      <div className="ActivityPage">
        <div>Distance: {this.state.distance}</div>
        <button className="start-button" onClick={this.onStart}>START</button>
        <button className="stop-button" onClick={this.onStop}>STOP</button>
      </div>
    )
  }
}

export default ActivityPage;