import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      isLoggedIn: false
    }
  }

  login = async e => {
    e.preventDefault();
    const requestBody = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });

    const response = await fetch('/api/login', {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseBody = await response.json();
    if (response.status === 401 || response.status === 400) {
      this.setState({
        errorMessage: responseBody.message
      });
    } else {
      localStorage.setItem('user_jwt', responseBody.token);
      this.setState({
        isLoggedIn: true
      })
    }
  }

  onSubmit = e => {
    e.preventDefault();
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      const { from } = this.props.location.state || { from: { pathname: "/profile" } };
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="Login">
        <div className="title">RUCK LOG 2.0</div>
        <form className="login-form" onSubmit={this.login}>
          <input className="login-input" type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChange} name="email" /><hr />
          <input className="login-input" type="password" value={this.state.password} placeholder="Password" onChange={this.onInputChange} name="password" /><hr />
          <button className="login-button" type="button" onClick={this.login}>Log In</button>
          <div>{this.state.errorMessage && <p className="login-error-message">{this.state.errorMessage}</p>}</div>
        </form>
        <div>New Here? Click To <Link to="/register" className="register-link">Register</Link></div>
      </div>
    )
  }
}

export default Login;