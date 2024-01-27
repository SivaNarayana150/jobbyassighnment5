import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutAndGoToLoginPage = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />

      <div className="tabs-container">
        <Link to="/" className="tabs-description">
          <p className="tabs-description">Home</p>
        </Link>
        <Link to="/jobs" className="tabs-description">
          <p className="tabs-description">Jobs</p>
        </Link>
      </div>

      <button
        type="button"
        className="logout-button"
        onClick={logoutAndGoToLoginPage}
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
