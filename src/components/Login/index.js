import Cookies from 'js-cookie'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  onchangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onchangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onsubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitLoginUser = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onsubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginUser}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />

          <div className="username-input-container">
            <label htmlFor="USERNAME" className="label-element">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="USERNAME"
              className="input-element"
              value={username}
              onChange={this.onchangeUsernameInput}
            />
          </div>

          <div className="username-input-container">
            <label htmlFor="PASSWORD" className="label-element">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="PASSWORD"
              className="input-element"
              value={password}
              onChange={this.onchangePasswordInput}
            />
          </div>

          <button className="login-button" type="submit">
            Login
          </button>

          {isError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
