import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
      isRegistered: false
    }
  }

  register = async e => {
    e.preventDefault();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
    const requestBody = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })

    if (this.state.firstName === '') {
      alert('Please Provde Your First Name');
    } else if
    (this.state.lastName === '') {
      alert('Please Provde Your Last Name');
    } else if
    (!emailRegex.test(this.state.email)) {
      alert('Please Provide Valid Email Address');
    } else if
    (this.state.password.length < 7 || !passwordRegex.test(this.state.password)) {
      alert('Password Must Be At Least 7 Characters and Contain 1 Number and 1 Special Character');
    } else {

      const response = await fetch('api/register', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseBody = await response.json();
      if (response.status === 409) {
        this.setState({
          errorMessage: responseBody.message
        });
        return;
      }
      localStorage.setItem('user_jwt', responseBody.token);
      this.setState({
        isRegistered: true
      })
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if (this.state.isRegistered) {
      const { from } = this.props.location.state || { from: { pathname: "/profile" } };
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="Register">
        <div className="title">RUCKLOG 2.0</div>
        <form className="register-form" onSubmit={this.register}>
          <input className="registration-input" type="text" value={this.state.firstName} placeholder="First Name" onChange={this.onInputChange} name="firstName" />
          <input className="registration-input" type="text" value={this.state.lastName} placeholder="Last Name" onChange={this.onInputChange} name="lastName" />
          <input className="registration-input" type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChange} name="email" />
          <input className="registration-input" type="password" value={this.state.password} placeholder="Password" onChange={this.onInputChange} name="password" />
        </form>
        <button className="register-button" type="button" onClick={this.register} className="register-button">Register</button>
        <div>{this.state.errorMessage}</div>
      </div>
    )
  }
}

export default Register;