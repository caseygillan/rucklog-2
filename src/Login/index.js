import React, { Component } from "react";

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

  onInputChnge = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="Login">
          <form onSubmit={this.login}>
              <input type="text" value={this.state.email} placeholder="Email" onChange={this.onInputChnge} name="email" />
              <input type="password" value={this.state.password} placeholder="Password" onChange={this.onInputChnge} name="password" />
              <button type="button" onClick={this.login}>Log In</button>
              <div>{this.state.errorMessage && <p className="login-error-message">{this.state.errorMessage}</p>}</div>
          </form>
      </div>
    )
  }
}

export default Login;