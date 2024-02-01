import Cookies from 'js-cookie'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const apiUrl = 'https://apis.ccbp.in/login'

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />

          <div className="input-container">
            <label htmlFor="USERNAME" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="USERNAME"
              className="user-name-input-field"
              value={username}
              onChange={this.onchangeUsername}
            />
          </div>

          <div className="input-container">
            <label htmlFor="PASSWORD" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="PASSWORD"
              className="password-input-field"
              value={password}
              onChange={this.onchangePasswordInput}
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>

          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
